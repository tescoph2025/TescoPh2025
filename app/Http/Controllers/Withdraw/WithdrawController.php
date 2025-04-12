<?php

namespace App\Http\Controllers\Withdraw;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\UserBankDetails;
use App\Models\WithdrawTransaction;
use App\Services\AccountBalanceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WithdrawController extends Controller
{
    protected $currentUser;
    protected $balance;

    public function __construct()
    {
        $this->currentUser = Auth::user();
        $this->balance = AccountBalance::where('user_id', $this->currentUser->id)->first()->balance;
    }

    public function index()
    {
        $bank_details = UserBankDetails::firstWhere('user_id', $this->currentUser->id);
        return Inertia::render('client/withdraw', [
            'account_balance' => $this->balance,
            'success' => session('success'),
            'error' => session('error'),
            'bank_details' => $bank_details
        ]);
    }

    public function indexHistory()
    {
        $history = WithdrawTransaction::where('user_id', $this->currentUser->id)->latest('created_at', 'desc')->get();
        $total_withdraw = WithdrawTransaction::where('user_id', $this->currentUser->id)->where('status', 'approved')->sum('withdrawal_amount');
        return Inertia::render('client/withdraw-history', [
            'history' => $history,
            'total_withdraw' => $total_withdraw,
        ]);
    }

    public function postWithdraw(Request $request)
    {
        $time = now()->format('H:i:s');

        $accountBalService = new AccountBalanceService();

        if (!is_numeric($request->withdrawal_amount)) {
            return redirect()->back()->with('error', ['message' => 'Invalid inputted amount.', $time]);
        } elseif ($request->withdrawal_amount > $this->balance) {
            return redirect()->back()->with('error', ['message' => 'Insufficient Balance.'], $time);
        } elseif ($request->withdrawal_amount < 20 || !$request->withdrawal_amount) {
            return redirect()->back()->with('error', ['message' => 'Requested amount is less than the minimum.', $time]);
        } elseif ($request->withdrawal_amount > 500 || !$request->withdrawal_amount) {
            return redirect()->back()->with('error', ['message' => 'Requested amount is greater than the maximum.', $time]);
        }

        WithdrawTransaction::create([
            'user_id'  => $this->currentUser->id,
            'withdrawal_amount' => $request->withdrawal_amount,
            'status' => 'pending', //testing purposes
            'remarks' => 'test', //testing purposes
        ]);

        // $accountBalService->deductAccountBalance($this->currentUser->id, $request->withdrawal_amount);

        return redirect()->back()->with('success', ['message' => 'Request successfully sent.', $time]);
    }
}
