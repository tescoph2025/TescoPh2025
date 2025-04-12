<?php

namespace App\Http\Controllers\Income;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\DailyInterestLog;
use App\Models\DepositPackageTransac;
use App\Models\Package;
use App\Models\ReceivingBank;
use App\Services\PackageService;
use App\Services\TotalInterestService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function Pest\Laravel\get;

class IncomeController extends Controller
{

    public function index()
    {
        $user = Auth::user();
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
            ->get();

        return Inertia::render('client/income-history', [
            'data' => DailyInterestLog::where('user_id', $user->id)->latest('updated_at', 'desc')->get(),
            'referral_bonus' => $referralBonuses,
        ]);
    }
}
