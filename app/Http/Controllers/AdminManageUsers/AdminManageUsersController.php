<?php

namespace App\Http\Controllers\AdminManageUsers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Package;

class AdminManageUsersController extends Controller
{
    public function allUsers()
    {
        $data = DB::table('users as a')
            ->join('account_balance as b', 'b.user_id', '=', 'a.id')
            ->select(
                'a.name',
                'a.email',
                'b.balance',
                'a.created_at as date_joined',
                'a.username as referral_code',
                DB::raw('(
                    SELECT COALESCE(SUM(x.amount), 0) 
                    FROM deposit_package_transac x 
                    WHERE x.user_id = a.id AND x.status = \'approved\' 
                    GROUP BY x.user_id
                ) as total_deposit'),
                DB::raw('(
                    SELECT y.name 
                    FROM referral_list x 
                    JOIN users y ON y.id = x.ref_user_id 
                    WHERE x.user_id = a.id
                    LIMIT 1
                ) as referred_by')
            )
            ->orderBy('a.created_at', 'desc')
            ->get();

        $packages = Package::select('id', 'package_name')->get();

        return Inertia::render('admin/admin-manage-users', [
            'data' => $data->toArray(),
            'packages' => $packages,
        ]);
    }
}
