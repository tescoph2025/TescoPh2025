<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Package::insert([
            [
                'package_name' => 'Basic',
                'min_amount' => 200.00,
                'max_amount' => 799.00,
                'daily_shares_rate' => 0.005,
                'available_slots' => 500,
                'effective_days' => 180,
                'referal_bonus_rate' => 0.05,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'package_name' => 'Advance',
                'min_amount' => 800.00,
                'max_amount' => 9999.00,
                'daily_shares_rate' => 0.007,
                'available_slots' => 500,
                'effective_days' => 180,
                'referal_bonus_rate' => 0.05,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'package_name' => 'Elite',
                'min_amount' => 10000.00,
                'max_amount' => 9999999.00,
                'daily_shares_rate' => 0.009,
                'available_slots' => 500,
                'effective_days' => 180,
                'referal_bonus_rate' => 0.05,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
