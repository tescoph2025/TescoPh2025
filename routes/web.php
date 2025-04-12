<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/testpulblic', function () {
    return response('success!');
});

Route::get('/', function () {
    return Inertia::render('welcome', []);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    require __DIR__ . '/admin.php';
    require __DIR__ . '/client.php';
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
