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

        return Inertia::render('client/request-fund', [
            'data' => [],
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
