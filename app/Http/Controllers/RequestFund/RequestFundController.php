<?php

namespace App\Http\Controllers\RequestFund;

use App\Http\Controllers\Controller;
use App\Models\ReceivingBank;
use App\Models\RequestFund;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RequestFundController extends Controller
{

    public function banks()
    {
        return Inertia::render('client/request-fund', [
            'receiving_bank' => ReceivingBank::all(),
        ]);
    }

}
