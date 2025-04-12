<?php

namespace App\Http\Controllers\AdminTransferFunds;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminTransferFundsController extends Controller
{


    public function index()
{
    $data = DB::table('transferfund as a')
        ->join('users as b', 'b.id', '=', 'a.user_id')
        ->join('users as c', 'c.id', '=', 'a.receiver_user_id')
        ->select(
            'a.transfer_amount as amount',
            'b.name as sender',
            'c.name as receiver',
            'a.created_at as date',
           
        )
        // ->where('a.status', 'approved') // Uncomment if you want to add a filter for user status
        ->get();

    return Inertia::render('admin/admin-transfer-funds', [
        'accountbalance' => $data->toArray(),
    ]);
}

 
}
