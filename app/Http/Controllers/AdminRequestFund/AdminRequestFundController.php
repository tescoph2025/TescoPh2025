<?php

namespace App\Http\Controllers\AdminRequestFund;

use App\Http\Controllers\Controller;
use App\Models\WithdrawTransaction;
use App\Services\AccountBalanceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminRequestFundController extends Controller
{

    public function approvedReqFund()
    {
        $data = DB::table('request_fund')
            ->select([
                'request_fund.status',
                'request_fund.created_at as request_date',
                'request_fund.amount',
                'receiving_bank.bank_name',
                'receiving_bank.account_number',
                'users.name',
                'users.email',
                'request_fund.updated_at as approved_date'
            ])
            ->leftJoin('receiving_bank', 'receiving_bank.id', '=', 'request_fund.bank_id')
            ->leftJoin('users', 'users.id', '=', 'request_fund.user_id')
            ->where('request_fund.status', '=', 'approved')
            ->orderByDesc('request_fund.updated_at')
            ->get();

        return Inertia::render('admin/admin-approved-requestfund', [
            'data' => $data,
            // 'data' => $data->toArray(),
        ]);
    }

    public function pendingReqFund()
    {

        $data = DB::table('withdraw_transaction as a')
            ->join('users as b', 'a.user_id', '=', 'b.id')
            ->leftJoin('user_bank_details as c', 'c.user_id', '=', 'a.id')
            ->select(
                'a.id',
                'b.name',
                'b.email',
                'a.withdrawal_amount as amount',
                'c.bank_name',
                'c.bank_account_name',
                'c.bank_account_number',
                'a.created_at'
            )
            ->where('a.status', 'pending')
            ->get();


        return Inertia::render('admin/admin-pending-requestfund', [
            'data' => $data->toArray(),
            'success' => session('success')
        ]);
    }
    public function approveReqFund(Request $request)
    {
        $time = now()->format('H:i:s');

        $accountBalService = new AccountBalanceService();

        $withdraw_trans = WithdrawTransaction::find($request->id);
        $withdraw_trans->status = 'approved';
        $withdraw_trans->save();

        $accountBalService->deductAccountBalance($withdraw_trans->user_id, $withdraw_trans->withdrawal_amount);

        return redirect()->back()->with('success', ['message' => 'Request approved!', $time]);
    }

    public function denyReqFund(Request $request)
    {
        $time = now()->format('H:i:s');

        $withdraw_trans = WithdrawTransaction::find($request->id);
        $withdraw_trans->status = 'denied';
        $withdraw_trans->save();

        return redirect()->back()->with('success', ['message' => 'Request denied!', $time]);
    }
}
