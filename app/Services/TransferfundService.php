<?php

namespace App\Services;

use App\Models\TotalInterest;
use App\Models\Transferfund;
use Illuminate\Support\Facades\Log;

class TransferfundService
{
    /**
     * Create a new total interest record.
     *
     * @param array $data
     * @return Transferfund|null
     */
    public function createTransferfund(array $data): ?Transferfund
    {
        Log::info('Daily Interest Log', ['accountBalanceUpdate' => $data]);
        try {
            return Transferfund::create([
                'user_id' => $data['user_id'],
                'transfer_amount' => $data['transfer_amount'],
                'receiver_user_id' => $data['receiver_user_id'],
                'status' => 'approved',
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating transfer fund record: ' . $e->getMessage());
            return null;
        }
    }
}
