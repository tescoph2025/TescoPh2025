<?php

namespace App\Http\Controllers\DepositHistory;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\DailyInterestLog;
use App\Models\DepositPackageTransac;
use App\Models\Package;
use App\Models\ReceivingBank;
use App\Models\TotalInterest;
use App\Services\PackageService;
use App\Services\TotalInterestService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function Pest\Laravel\get;

class DepositHistoryController extends Controller
{


    public function index()
    {
        $user = Auth::user();

        $deposits = DB::table('deposit_package_transac as dpt')
            ->leftJoin('total_interest as ti', 'ti.deposit_trans_id', '=', 'dpt.id')
            ->leftJoin('package as p', 'p.id', '=', 'dpt.package_id')
            ->select([
                'dpt.user_id',
                'p.package_name',
                'dpt.payment_method',
                'dpt.bank_id',
                'ti.days_remaining',
                'dpt.updated_at',
                'dpt.status',   // ✅ Make sure to include dpt.status
                'dpt.amount'
            ])
            ->whereIn('dpt.status', ['approved', 'pending'])  // ✅ Only fetch relevant statuses
            ->where('dpt.user_id', $user->id)->latest('dpt.created_at', 'desc')
            ->get();

        // Separate active and pending deposits
        $active = $deposits->filter(fn($deposit) => $deposit->status === 'approved')->values();
        $pending = $deposits->filter(fn($deposit) => $deposit->status === 'pending')->values();
        // Convert to array before passing to Inertia

        $receiving_banks = ReceivingBank::all();
        return Inertia::render('client/deposit-history', [
            'active' => $active,  // Convert to array
            'pending' => $pending,  // Convert to array
            'receiving_banks' => $receiving_banks,
        ]);
    }
}
