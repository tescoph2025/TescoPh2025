<?php

namespace App\Http\Controllers\ActivationFund;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\Transferfund;
use App\Services\AccountBalanceService;
use App\Services\TransferfundService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ActivationfundController extends Controller
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
        // $sent_transactions = Transferfund::where('user_id', $this->currentUser->id)->get();

        $sent_transactions = DB::table('transferfund as tf')
        ->leftJoin('users as u', 'u.id', '=', 'tf.receiver_user_id')
        ->select('u.name', 'tf.transfer_amount', 'tf.updated_at')
            ->where('tf.user_id', $this->currentUser->id)
            ->orderBy('tf.updated_at')
            ->get();

        $received_transactions = DB::table('transferfund as tf')
            ->leftJoin('users as u', 'u.id', '=', 'tf.user_id')
            ->select('u.name', 'tf.transfer_amount', 'tf.updated_at')
            ->where('tf.receiver_user_id', $this->currentUser->id)
            ->orderBy('tf.updated_at')
            ->get();

        return Inertia::render('admin/admin-activation-fund', [
            'account_balance' => $this->balance,
            'sent_transactions' => $sent_transactions,
            'received_transactions' => $received_transactions,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    public function postTransferfund(Request $request)
    {
        $time = now()->format('H:i:s');

        $userSearch = new UserService();
        $userSearchResult = $userSearch->searchName($request->name);

        if ($this->currentUser->name == $request->name || $this->currentUser->username == $request->name) {
            return redirect()->back()->with('error', ['message' => "Sorry, you can't send money to your own name.", $time]);
        }

        if (!$request->name || $this->currentUser->name == $request->name || $this->currentUser->username == $request->name) {
            return redirect()->back()->with('error', ['message' => "Invalid receiver's name.", $time]);
        }
        if (!$userSearchResult) {
            return redirect()->back()->with('error', ['message' => "Receiver's name not found.", $time]);
        }

        if ($request->transfer_amount > $this->balance) {
            return redirect()->back()->with('error', ['message' => 'Insufficient Balance.', $time]);
        } elseif ($request->transfer_amount < 1 || !$request->transfer_amount) {
            return redirect()->back()->with('error', ['message' => 'Requested amount is less than 1$.', $time]);
        }

        $transferfundData = [
            "user_id" => $this->currentUser->id,
            "transfer_amount" => $request->transfer_amount,
            "receiver_user_id" => $userSearchResult->id,
        ];

        $transferfundService = new TransferfundService();
        $transferfundService->createTransferfund($transferfundData);

        $accountBalService = new AccountBalanceService();
        $accountBalService->deductAccountBalance($this->currentUser->id, $request->transfer_amount);

        $accountBalServiceTransfer = new AccountBalanceService();
        $accountBalServiceTransfer->addAccountBalance($userSearchResult->id, $request->transfer_amount);

        return redirect()->back()->with('success', ['message' => 'Fund sent successfully', $time]);
    }
}
