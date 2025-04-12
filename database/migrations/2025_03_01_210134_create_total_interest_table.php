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
        Schema::create('total_interest', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('deposit_trans_id')->constrained('deposit_package_transac')->onDelete('cascade');
            $table->decimal('total_interest_amount', 15, 4)->default(0.00);
            $table->decimal('initial_amount', 15, 4);
            $table->decimal('daily_rate', 15, 4);
            $table->integer('days_remaining');
            $table->enum('status', ['active', 'inactive'])->default('active');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('total_interest');
    }
};
