<?php

namespace Database\Seeders;

use App\Models\ReceivingBank;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReceivingBankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        ReceivingBank::insert([
            [
                'bank_name' => 'BPI',
                'receiving_bank' => 'Bank of the Philippine Islands/ BPI Savings',
                'payment_channel' => 'Bank Transfer - Instapay',
                'account_name' => 'Tesco Supermart Incoporation',
                'account_number' => '4016352729 ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'bank_name' => 'RCBC',
                'receiving_bank' => 'RCBC Savings',
                'payment_channel' => 'Bank Transfer - Instapay',
                'account_name' => 'Tesco Supermart Inc.',
                'account_number' => '7591395917',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // [
            //     'bank_name' => 'GoTyme',
            //     'receiving_bank' => 'GoTyme Bank',
            //     'payment_channel' => 'Bank Transfer - Instapay',
            //     'account_name' => 'Tesco Supermart Incoporation',
            //     'account_number' => '017537760396',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
        ]);
    }
}
