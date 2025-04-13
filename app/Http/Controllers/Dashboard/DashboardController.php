<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\DepositPackageTransac;
use App\Models\TotalInterest;
use App\Models\WithdrawTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $balance = AccountBalance::where('user_id', $user->id)->first();
        $totalApprovedAmount = DepositPackageTransac::where('user_id', $user->id)
            ->where('status', 'approved')
            ->sum('amount');
        $totalInterest = TotalInterest::where('user_id', $user->id)->sum('total_interest_amount');
        $total_withdraw = WithdrawTransaction::where('user_id', $user->id)->where('status', 'approved')->sum('withdrawal_amount');
        $recentDeposit = DepositPackageTransac::where('user_id', $user->id)->where('status', 'approved')->latest('updated_at')->first();

        $recentWithdraw = WithdrawTransaction::where('user_id', $user->id)->where('status', 'approved')->latest('updated_at')->first();

        $referralBonuses = DB::table('referral_bonus as rb')
            ->leftJoin('deposit_package_transac as dpt', 'rb.deposit_trans_id', '=', 'dpt.id')
            ->leftJoin('referral_list as rl', 'rl.user_id', '=', 'dpt.user_id')
            ->leftJoin('package as p', 'p.id', '=', 'dpt.package_id')
            ->leftJoin('users as u', 'u.id', '=', 'rl.user_id')
            ->select(
                'rb.created_at',
                'rb.bonus_amount',
                'p.package_name',
                'rl.ref_user_username',
                'rl.user_id',
                'u.name'
            )
            ->where('rl.ref_user_id', $user->id)
            ->orderBy('rb.created_at', 'desc')
            ->first();


        return Inertia::render('client/dashboard', [
            'APP_DOMAIN' => config('app.url'),
            'testpass' => 'testinggg',
            'account_balance' => $balance->balance ? $balance->balance : 0,
            'total_interest' => $totalInterest ? $totalInterest : 0,
            'referral_bonus' => $referralBonuses,
            'active_deposit' => $totalApprovedAmount ? $totalApprovedAmount : 0,
            'total_withdraw' => $total_withdraw,
            'recentHistory' => ['recentDeposit' => $recentDeposit ? $recentDeposit : 0, 'recentWithdraw' => $recentWithdraw ? $recentWithdraw : 0]
        ]);
    }
}
