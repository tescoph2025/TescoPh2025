<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\DepositPackageTransac;
use App\Models\TotalInterest;
use App\Models\WithdrawTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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


        return Inertia::render('client/dashboard', [
            'APP_DOMAIN' => config('app.url'),
            'testpass' => 'testinggg',
            'account_balance' => $balance->balance ? $balance->balance : 0,
            'total_interest' => $totalInterest ? $totalInterest : 0,
            'active_deposit' => $totalApprovedAmount ? $totalApprovedAmount : 0,
            'total_withdraw' => $total_withdraw,
            'recentHistory' => ['recentDeposit' => $recentDeposit ? $recentDeposit : 0, 'recentWithdraw' => $recentWithdraw ? $recentWithdraw : 0]
        ]);
    }
}
