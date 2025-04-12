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
        Schema::table('receiving_bank', function (Blueprint $table) {
            $table->string('receiving_bank')->after('account_number'); // Adds column after 'account_number'
        });
    }

    public function down(): void
    {
        Schema::table('receiving_bank', function (Blueprint $table) {
            $table->dropColumn('receiving_bank');
        });
    }
};
