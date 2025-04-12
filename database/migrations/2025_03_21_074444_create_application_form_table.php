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
        Schema::create('application_form', function (Blueprint $table) {
            $table->id();

            $table->enum('app_type', ['franchise', 'credit']);
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_name')->nullable(); // Middle name is optional
            $table->date('date_of_birth');
            $table->enum('gender', ['m', 'f', 'o']);
            $table->text('present_address');
            $table->string('nationality');
            $table->string('phone_number');
            $table->string('email');
            $table->string('highest_education');
            $table->string('school_name');
            $table->integer('year_graduated');
            $table->enum('source_of_income', ['employment', 'business_owner']);

            // Employment specific fields
            $table->string('company_name')->nullable();
            $table->integer('years_of_employment')->nullable();

            // Business owner specific fields
            $table->string('nature_of_business')->nullable();
            $table->integer('duration_business_operation')->nullable();

            // for credit application
            // $table->string('monthly_income')->nullable();
            $table->string('tesco_active_deposit')->nullable();
            $table->string('tesco_monthly_income')->nullable();
            $table->string('purpose')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_form');
    }
};
