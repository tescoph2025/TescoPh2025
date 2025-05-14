<?php

namespace App\Console\Commands;

use App\Models\AccountBalance;
use App\Models\TotalInterest;
use App\Models\DailyInterestLog;
use App\Models\DepositPackageTransac;
use App\Models\Package;
use App\Services\AccountBalanceService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class UpdateTotalInterest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'interest:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update total accumulated interest for all users based on daily interest rate';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $interests = TotalInterest::where('status', 'active')->where('days_remaining', '>', 0)->get();
        $accountBalService = new AccountBalanceService();

        foreach ($interests as $interest) {
            // Calculate the interest for the day
            $interestAdd = $interest->initial_amount * $interest->daily_rate;
            $newInterest = $interest->total_interest_amount + $interestAdd;

            // Update the total accumulated interest and days remaining
            $interest->update([
                'total_interest_amount' => $newInterest,
                'days_remaining' => $interest->days_remaining - 1
            ]);

            // Get package name
            $depositTrans = DepositPackageTransac::find($interest->deposit_trans_id);
            $package = Package::find($depositTrans->package_id ?? null);
            $packageName = $package->package_name ?? 'Unknown Package';

            // Log daily interest
            DailyInterestLog::create([
                'user_id' => $interest->user_id,
                'deposit_trans_id' => $interest->deposit_trans_id,
                'package_name' => $packageName,
                'daily_shares_rate' => $interest->daily_rate,
                'daily_shares_value' => $interestAdd,
                'daily_shares_total' => $newInterest,
            ]);

            // Deactivate if term is finished
            if ($interest->days_remaining <= 0) {
                $interest->update(['status' => 'inactive']);
            }

            // Update account balance
            try {
                $accountBalService->addAccountBalance($interest->user_id, $interestAdd);
            } catch (\Exception $e) {
                Log::error('Failed to update account balance', [
                    'user_id' => $interest->user_id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        $this->info('Interest updated successfully!');
    }
}
