<?php

use App\Console\Commands\UpdateTotalInterest;
use App\Models\TotalInterest;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

// Schedule::command(UpdateTotalInterest::class)->everyFifteenMinutes();
// Schedule::command(UpdateTotalInterest::class)->everyFiveSeconds();
// Schedule::command(UpdateTotalInterest::class)->everyThirtySeconds();
Schedule::command(UpdateTotalInterest::class)->daily();

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
