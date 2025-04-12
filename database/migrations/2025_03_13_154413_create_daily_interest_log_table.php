<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daily_interest_log', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('deposit_trans_id')->constrained('deposit_package_transac')->onDelete('cascade');
            $table->string('package_name');
            $table->decimal('daily_shares_rate', 15, 4)->default(0.00);
            $table->decimal('daily_shares_value', 15, 4)->default(0.00);
            $table->decimal('daily_shares_total', 15, 4)->default(0.00);
            // $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_interest_log');
    }
};
