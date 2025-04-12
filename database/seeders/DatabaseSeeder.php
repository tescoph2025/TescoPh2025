<?php

namespace Database\Seeders;

use App\Models\ReceivingBank;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UsersTableSeeder::class,
            PackageSeeder::class,
            ReceivingBankSeeder::class,
            // PasswordResetTokensSeeder::class,
            // SessionsTableSeeder::class,
        ]);
    }
}
