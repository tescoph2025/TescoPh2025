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
        Schema::create('deposit_package_transac', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')->constrained('package')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('bank_id')->nullable()->constrained('receiving_bank')->onDelete('cascade');
            $table->enum('payment_method', [1, 2]);
            $table->decimal('amount', 15, 2)->default(0.00);
            $table->enum('status', ['pending', 'approved', 'declined'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deposit_package_transac');
    }
};
