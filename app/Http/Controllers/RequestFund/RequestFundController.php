<?php

namespace App\Http\Controllers\RequestFund;

use App\Http\Controllers\Controller;
use App\Models\RequestFund;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RequestFundController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        $data = DB::table('request_fund as rf')
            ->select('rf.status', 'rf.created_at', 'rf.amount', 'rb.bank_name', 'rb.account_number')
            ->leftJoin('receiving_bank as rb', 'rb.id', '=', 'rf.bank_id')
            ->where('rf.user_id', $user->id)
            ->orderByDesc('rf.created_at')
            ->get();


        return Inertia::render('client/request-fund', [
            'data' => $data,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    public function postRequestfund(Request $request)
    {
        $user = $request->user();
        $time = now()->format('H:i:s');

        $requestFund = RequestFund::create([
            'user_id' => $user->id,
            'bank_id' => $request->bank_id,
            'amount' => $request->amount,
            'status' => 'pending',
        ]);

        if ($requestFund) {
            return redirect()->back()->with('success', ['message' => 'Fund request created successfully!', $time]);
        } else {
            return redirect()->back()->with('error', ['message' => 'Fund request failed', $time]);
        }
    }
}
