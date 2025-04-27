<?php

namespace App\Http\Controllers\AdminWithdraw;

use App\Http\Controllers\Controller;
use App\Models\WithdrawTransaction;
use App\Services\AccountBalanceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminWithdrawController extends Controller
{


    public function approvedWithdraw()
    {
        $data = DB::table('withdraw_transaction as a')
            ->join('users as b', 'a.user_id', '=', 'b.id')
            ->select(
                'b.name',
                'b.email',
                'a.withdrawal_amount as amount',
                'a.created_at as withdraw_date',
                'a.updated_at as date_approved'
            )
            ->where('a.status', 'approved')
            ->get();
        return Inertia::render('admin/admin-approved-withdraw', [
            'data' => $data->toArray(),
        ]);
    }

    public function pendingWithdraw()
    {

        $data = DB::table('withdraw_transaction as a')
            ->join('users as b', 'a.user_id', '=', 'b.id')
            ->leftJoin('user_bank_details as c', 'c.user_id', '=', 'a.user_id')
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


        return Inertia::render('admin/admin-pending-withdraw', [
            'data' => $data->toArray(),
            'success' => session('success')
        ]);
    }
    public function approveWithdraw(Request $request)
    {
        $time = now()->format('H:i:s');

        $accountBalService = new AccountBalanceService();

        $withdraw_trans = WithdrawTransaction::find($request->id);
        $withdraw_trans->status = 'approved';
        $withdraw_trans->save();

        $accountBalService->deductAccountBalance($withdraw_trans->user_id, $withdraw_trans->withdrawal_amount);

        return redirect()->back()->with('success', ['message' => 'Request approved!', $time]);
    }

    public function denyWithdraw(Request $request)
    {
        $time = now()->format('H:i:s');

        $withdraw_trans = WithdrawTransaction::find($request->id);
        $withdraw_trans->status = 'denied';
        $withdraw_trans->save();

        return redirect()->back()->with('success', ['message' => 'Request denied!', $time]);
    }
}
