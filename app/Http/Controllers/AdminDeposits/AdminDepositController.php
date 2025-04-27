<?php

namespace App\Http\Controllers\AdminDeposits;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\DailyInterestLog;
use App\Models\DepositPackageTransac;
use App\Models\Package;
use App\Models\ReceivingBank;
use App\Models\ReferralBonus;
use App\Models\ReferralList;
use App\Models\TotalInterest;
use App\Models\WithdrawTransaction;
use App\Services\AccountBalanceService;
use App\Services\PackageService;
use App\Services\TotalInterestService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use function Pest\Laravel\get;

class AdminDepositController extends Controller
{


    public function approvedDeposits()
    {
        $user = Auth::user();

        $deposits = DB::table('total_interest')
            ->join('deposit_package_transac', 'total_interest.deposit_trans_id', '=', 'deposit_package_transac.id')
            ->join('package', 'deposit_package_transac.package_id', '=', 'package.id')
            ->join('users', 'deposit_package_transac.user_id', '=', 'users.id')
            ->select(
                'users.name',
                'users.email',
                'package.package_name',
                'total_interest.days_remaining',
                'deposit_package_transac.created_at as deposit_date',
                'deposit_package_transac.status',
                'deposit_package_transac.amount',
                'deposit_package_transac.payment_method',
                'deposit_package_transac.bank_id',
                'deposit_package_transac.id'

            )
            ->where('deposit_package_transac.status', 'approved')
            ->get();

        return Inertia::render('admin/admin-approved-deposits', [
            'deposits' => $deposits->toArray(),
        ]);
    }

    public function pendingDeposits()
    {

        $pending = DB::table('deposit_package_transac as dpt')
            ->leftJoin('total_interest as ti', 'ti.deposit_trans_id', '=', 'dpt.id')
            ->leftJoin('package as p', 'p.id', '=', 'dpt.package_id')
            ->leftJoin('users as u', 'u.id', '=', 'dpt.user_id')
            ->select([
                'dpt.user_id',
                'dpt.id',
                'u.name',
                'u.email',
                'p.package_name',
                'dpt.payment_method',
                'dpt.bank_id',
                'ti.days_remaining',
                'dpt.created_at',
                'dpt.updated_at',
                'dpt.status',   // ✅ Make sure to include dpt.status
                'dpt.amount'
            ])
            ->whereIn('dpt.status', ['pending'])  // ✅ Only fetch relevant statuses
            ->get();



        return Inertia::render('admin/admin-pending-deposits', [
            'deposits' => $pending,
            'success' => session('success')
        ]);
    }
    public function approveDeposit(Request $request)
    {
        $time = now()->format('H:i:s');

        $deposit_trans = DepositPackageTransac::find($request->id);
        Log::info(['deposit' => $deposit_trans]);
        $deposit_trans->status = 'approved';
        $deposit_trans->save();

        $accountBalService = new AccountBalanceService();

        $package = Package::where('id', $deposit_trans->package_id)->first();

        $dataForTotalInterest = [
            'user_id' => $deposit_trans->user_id,
            'deposit_trans_id' => $deposit_trans->id,
            'total_interest_amount' => 0,
            'initial_amount' => $deposit_trans->amount,
            'daily_rate' => $package->daily_shares_rate,
            'days_remaining' => $package->effective_days,
            'status' => 'active',
        ];

        $totalInterestService = new TotalInterestService();
        $newTotalInterest = $totalInterestService->createTotalInterest($dataForTotalInterest);

        $packageService = new PackageService();
        $packageService->deductSlot($package->id);

        // $accountBalance = AccountBalance::where('user_id', $deposit_trans->user_id)->first();
        // $accountBalance->balance -= $deposit_trans->amount;
        // $accountBalance->save();

        $bonusRate = $package->referal_bonus_rate * $deposit_trans->amount;
        $refUserId = ReferralList::where('user_id', $deposit_trans->user_id)->first()->ref_user_id;
        $accountBalService->addAccountBalance($refUserId, $bonusRate);
        // Log::info('Daily Interest Log', ['accountBalanceUpdate' => $logthis]);
        ReferralBonus::create([
            'deposit_trans_id' => $newTotalInterest->id,
            'bonus_amount'  => $bonusRate,
        ]);

        return back()->with('success', ['message' => 'Request approved.', $time]);
    }

    public function denyDeposit(Request $request)
    {
        $time = now()->format('H:i:s');

        $deposit_trans = DepositPackageTransac::find($request->id);
        // Log::info(['deposit' => $deposit_trans]);
        $deposit_trans->status = 'declined';
        $deposit_trans->save();

        return back()->with('success', ['message' => 'Request denied.', $time]);
    }

    public function deleteDeposit(Request $request)
    {
        $deposit_trans = DepositPackageTransac::find($request->id);
    
        if (!$deposit_trans) {
            return back()->with('error', ['message' => 'Deposit transaction not found.']);
        }
    
        // Delete related ReferralBonus

        $referralBonusUser = DB::table('referral_bonus as rb')
        ->leftJoin('deposit_package_transac as dpt', 'rb.deposit_trans_id', '=', 'dpt.id')
        ->leftJoin('referral_list as rl', 'rl.user_id', '=', 'dpt.user_id')
        ->leftJoin('package as p', 'p.id', '=', 'dpt.package_id')
        ->leftJoin('users as u', 'u.id', '=', 'rl.user_id')
        ->select(
            'rb.created_at',
            'rb.bonus_amount',
            'p.package_name',
            'rl.ref_user_username',
            'rl.ref_user_id',
            'rl.user_id',
            'u.name'
        )
        ->where('rb.deposit_trans_id', $request->id)
        ->orderBy('rb.created_at', 'desc')
        ->first();

        $userBalance = AccountBalance::where('user_id', $referralBonusUser->ref_user_id)->first();

        if ($userBalance) {
            // Subtract the referral bonus amount
            $userBalance->balance -= $referralBonusUser->bonus_amount;

            // Save the updated balance
            $userBalance->save();
          }

        ReferralBonus::where('deposit_trans_id', $request->id)->delete();
    
        // Delete related TotalInterest
        TotalInterest::where('deposit_trans_id', $request->id)->delete();
    
        // After deleting related records, delete the deposit itself
        $deposit_trans->delete();
    
        return back()->with('success', ['message' => 'Deposit deleted successfully.']);
    }
    
}
