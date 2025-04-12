<?php

namespace App\Services;

use App\Models\TotalInterest;
use Illuminate\Support\Facades\Log;

class TotalInterestService
{
    /**
     * Create a new total interest record.
     *
     * @param array $data
     * @return TotalInterest|null
     */
    public function createTotalInterest(array $data): ?TotalInterest
    {
        try {
            return TotalInterest::create([
                'user_id' => $data['user_id'],
                'deposit_trans_id' => $data['deposit_trans_id'],
                'total_interest_amount' => $data['total_interest_amount'] ?? 0.00,
                'initial_amount' => $data['initial_amount'],
                'daily_rate' => $data['daily_rate'],
                'days_remaining' => $data['days_remaining'],
                'status' => $data['status'] ?? 'active',
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating total interest record: ' . $e->getMessage());
            return null;
        }
    }
}
