<?php

namespace App\Http\Controllers\TotalInterest;

use App\Http\Controllers\Controller;
use App\Services\TotalInterestService;
use Illuminate\Http\Request;

class TotalInterestController extends Controller
{
    protected $totalInterestService;

    public function __construct(TotalInterestService $totalInterestService)
    {
        $this->totalInterestService = $totalInterestService;
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'deposit_trans_id' => 'required|exists:deposit_package_transac,id',
            'initial_amount' => 'required|numeric|min:0',
        ]);

        $totalInterest = $this->totalInterestService->createTotalInterest($request->all());

        if ($totalInterest) {
            return response()->json(['message' => 'Total Interest created successfully', 'data' => $totalInterest], 201);
        }

        return response()->json(['message' => 'Failed to create Total Interest'], 500);
    }
}
