<?php

namespace App\Http\Controllers\AdminRequestFund;

use App\Http\Controllers\Controller;
use App\Models\RequestFund;
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
            'success' => session('success'),
            'error' => session('error'),
            // 'data' => $data->toArray(),
        ]);
    }

    public function pendingReqFund()
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
            ->where('request_fund.status', '=', 'pending')
            ->orderByDesc('request_fund.updated_at')
            ->get();

        return Inertia::render('admin/admin-pending-requestfund', [
            'data' => $data,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }
    public function approveReqFund(Request $request)
    {
        $time = now()->format('H:i:s');

        $accountBalService = new AccountBalanceService();

        $requestFund = RequestFund::find($request->id);
        $requestFund->status = 'approved';
        $requestFund->save();

        $accountBalService->addAccountBalance($requestFund->user_id, $requestFund->amount);

        return redirect()->back()->with('success', ['message' => 'Request approved!', $time]);
    }

    public function denyReqFund(Request $request)
    {
        $time = now()->format('H:i:s');

        $requestFund = RequestFund::find($request->id);
        $requestFund->status = 'denied';
        $requestFund->save();

        return redirect()->back()->with('success', ['message' => 'Request denied!', $time]);
    }
}
