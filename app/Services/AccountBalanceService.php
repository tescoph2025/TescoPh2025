<?php

namespace App\Services;

use App\Models\AccountBalance;

class AccountBalanceService
{
    /**
     *
     * @param array $data
     * @return AccountBalance|null
     */
    public function addAccountBalance($id, $amount): AccountBalance
    {
        $accountBalanceUpdate = AccountBalance::where('user_id', $id)->first();
        $accountBalanceUpdate->balance += $amount;
        $accountBalanceUpdate->save(); // Save changes to the database

        return $accountBalanceUpdate;
    }
    public function deductAccountBalance($id, $amount): AccountBalance
    {
        $accountBalanceUpdate = AccountBalance::where('user_id', $id)->first();
        $accountBalanceUpdate->balance -= $amount;
        $accountBalanceUpdate->save(); // Save changes to the database

        return $accountBalanceUpdate;
    }
}
