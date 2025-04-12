<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'username' => 'tescoadminuser',
                'name' => 'Admin User',
                'email' => 'tescoadminuser@example.com',
                'password' => Hash::make('tescoadminuser1!'),
                'role' => 'admin',
                'gender' => 'o',
                // 'used_ref' => null, // No referral
                // 'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'john',
                'name' => 'John Garcia',
                'email' => 'john@example.com',
                // 'email_verified_at' => now(),
                'password' => Hash::make('john1234!'),
                'role' => 'client',
                'gender' => 'm',
                // 'used_ref' => 'tescoadminuser', // Referred by admin
                // 'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'gary',
                'name' => 'gary Garcia',
                'email' => 'gary@example.com',
                // 'email_verified_at' => now(),
                'password' => Hash::make('gary1234!'),
                'role' => 'client',
                'gender' => 'm',
                // 'used_ref' => 'john', // Referred by admin
                // 'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'mary',
                'name' => 'mary Garcia',
                'email' => 'mary@example.com',
                // 'email_verified_at' => now(),
                'password' => Hash::make('mary1234!'),
                'role' => 'client',
                'gender' => 'f',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'jane',
                'name' => 'jane Garcia',
                'email' => 'jane@example.com',
                // 'email_verified_at' => now(),
                'password' => Hash::make('jane1234!'),
                'role' => 'client',
                'gender' => 'f',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
        DB::table('account_balance')->insert([
            [
                'user_id' => 1,
                'balance' => 1000, // Default balance when user registers
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'balance' => 1000, // Default balance when user registers
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'balance' => 1000, // Default balance when user registers
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 4,
                'balance' => 1000, // Default balance when user registers
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 5,
                'balance' => 1000, // Default balance when user registers
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
        DB::table('referral_list')->insert([

            [
                'user_id' => 2,
                'ref_user_username' => 'tescoadminuser',
                'ref_user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'ref_user_username' => 'tescoadminuser',
                'ref_user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'ref_user_username' => 'john',
                'ref_user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 4,
                'ref_user_username' => 'gary',
                'ref_user_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 5,
                'ref_user_username' => 'john',
                'ref_user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
