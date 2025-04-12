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

    // protected $accountBalService;

    // public function __construct(AccountBalanceService $accountBalService)
    // {
    //     parent::__construct();
    //     $this->accountBalService = $accountBalService;
    // }
    public function handle()
    {
        $interests = TotalInterest::all();
        $accountBalService = new AccountBalanceService();

        foreach ($interests as $interest) {
            if ($interest->status == 'active' && $interest->days_remaining > 0) {
                $interestAdd = $interest->initial_amount * $interest->daily_rate;
                $newInterest = $interest->total_interest_amount + $interestAdd;

                // Update the total_accumulated_interest
                $interest->update([
                    'total_interest_amount' => $newInterest,
                    'days_remaining' => $interest->days_remaining -= 1
                ]);

                $deposit_trans_packageID = DepositPackageTransac::where('id', $interest->deposit_trans_id)->first()->package_id;

                $packagename = Package::where('id', $deposit_trans_packageID)->first()->package_name;

                DailyInterestLog::create([
                    'user_id' => $interest->user_id,
                    'deposit_trans_id' => $interest->deposit_trans_id,
                    'package_name' => $packagename,
                    'daily_shares_rate' => $interest->daily_rate,
                    'daily_shares_value' => $interestAdd,
                    'daily_shares_total' => $newInterest,

                ]);

                // log::info('Daily Interest Log', ['dailyLog' => $dailyLog]);
                if ($interest->days_remaining == 0) {
                    $interest->update([
                        'status' => 'inactive',
                    ]);
                }


                $accountBalService->addAccountBalance($interest->user_id, $interestAdd);
            }
        }
        $this->info('Interest updated successfully!');
    }
}
