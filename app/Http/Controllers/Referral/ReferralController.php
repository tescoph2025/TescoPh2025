<?php

namespace App\Http\Controllers\Referral;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReferralController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        $referrals = [];
        $processed = [];

        $this->getReferralsRecursive($user->id, $referrals, $processed, 1);

        // Sort by level ascending, then created_at descending
        usort($referrals, function ($a, $b) {
            if ($a['level'] === $b['level']) {
                return strtotime($b['created_at']) - strtotime($a['created_at']);
            }
            return $a['level'] - $b['level'];
        });

        $activeReferrals = [];
        $inactiveReferrals = [];

        foreach ($referrals as $referral) {
            $approvedAmount = DB::table('deposit_package_transac')
                ->where('user_id', $referral['user_id'])
                ->where('status', 'approved')
                ->sum('amount');

            if ($approvedAmount > 0) {
                $activeReferrals[] = array_merge($referral, ['total_deposit' => $approvedAmount]);
            } else {
                $inactiveReferrals[] = array_merge($referral, ['total_deposit' => 0]);
            }
        }

        return Inertia::render('client/referrals', [
            'active' => $activeReferrals,
            'inactive' => $inactiveReferrals,
        ]);
    }

    public function getReferralLevels($userId)
    {
        $referrals = [];
        $processed = [];

        $this->getReferralsRecursive($userId, $referrals, $processed, 1);

        // Sort by level ascending, then created_at descending
        usort($referrals, function ($a, $b) {
            if ($a['level'] === $b['level']) {
                return strtotime($b['created_at']) - strtotime($a['created_at']);
            }
            return $a['level'] - $b['level'];
        });

        return response()->json($referrals);
    }

    private function getReferralsRecursive($userId, &$referrals, &$processed, $level)
    {
        $referredUsers = DB::table('referral_list')
            ->where('ref_user_id', $userId)
            ->get();

        foreach ($referredUsers as $referredUser) {
            if (in_array($referredUser->user_id, $processed)) {
                continue;
            }
            $processed[] = $referredUser->user_id;

            $user = DB::table('users')->find($referredUser->user_id);

            if ($user) {
                $referrals[] = [
                    'username' => $user->username,
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'level' => $level,
                    'created_at' => $user->created_at,
                ];

                $this->getReferralsRecursive($referredUser->user_id, $referrals, $processed, $level + 1);
            }
        }
    }
    // public function getReferralLevels(Request $request, $userId)
    // {
    //     $referrals = [];
    //     $processed = []; // To avoid infinite loops in case of circular references

    //     $this->getReferralsRecursive($userId, $referrals, $processed, 1);

    //     return response()->json($referrals);
    // }

    // private function getReferralsRecursive($userId, &$referrals, &$processed, $level)
    // {
    //     $referredUsers = DB::table('referral_list')
    //         ->where('ref_user_id', $userId)
    //         ->get();

    //     foreach ($referredUsers as $referredUser) {
    //         if (in_array($referredUser->user_id, $processed)) {
    //             // Avoid processing already processed user (potential circular ref)
    //             continue;
    //         }
    //         $processed[] = $referredUser->user_id;

    //         $user = DB::table('users')->find($referredUser->user_id);

    //         if ($user) {
    //             $referrals[] = [
    //                 'username' => $user->username,
    //                 'user_id' => $user->id,
    //                 'level' => $level,
    //             ];

    //             $this->getReferralsRecursive($referredUser->user_id, $referrals, $processed, $level + 1);
    //         }
    //     }
    // }
}
