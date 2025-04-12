<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/profile-image', [ProfileController::class, 'profileImage'])->name('profile.image');
    Route::post('postsettings/profile-image', [ProfileController::class, 'updateProfileImage'])->name('postprofile.image');

    Route::get('settings/profile-bank', [ProfileController::class, 'profileBank'])->name('profile.bank');
    Route::post('postsettings/profile-bank', [ProfileController::class, 'updateProfileBank'])->name('postprofile.bank');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');


    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});

// Route::get('admin-dashboard', function () {
//     $user = User::all();
//     return response()->json(['message' => $user]);
// });
