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

        // Get both active and pending deposits in a single raw query and group them by status
        $deposits = DB::table('total_interest')
            ->join('deposit_package_transac', 'total_interest.deposit_trans_id', '=', 'deposit_package_transac.id') // Join with deposit_package_transac
            ->join('package', 'deposit_package_transac.package_id', '=', 'package.id') // Join with package using package_id
            ->select(
                'package.package_name', // Select the package name
                'total_interest.days_remaining', // Select remaining days from total_interest
                'deposit_package_transac.created_at as deposit_date', // Select created_at as deposit_date from deposit_package_transac
                'deposit_package_transac.status', // Select status from deposit_package_transac
                'deposit_package_transac.amount', // Select amount from deposit_package_transac
                'deposit_package_transac.payment_method', // Select paymentmode from deposit_package_transac
                'deposit_package_transac.bank_id' // Select bank_id from deposit_package_transac
            )
            ->whereIn('deposit_package_transac.status', ['approved', 'pending']) // Get both 'approved' and 'pending' status
            ->where('deposit_package_transac.user_id', $user->id)->latest('deposit_package_transac.created_at', 'desc')
            ->get();

        // Separate active and pending deposits
        $active = $deposits->filter(function ($deposit) {
            return $deposit->status === 'approved';
        })->values();  // Re-index the collection

        $pending = $deposits->filter(function ($deposit) {
            return $deposit->status === 'pending';
        })->values();  // Re-index the collection

        // Convert to array before passing to Inertia
        return Inertia::render('client/deposit-history', [
            'active' => $active->toArray(),  // Convert to array
            'pending' => $pending->toArray(),  // Convert to array
        ]);
    }
}
