<?php

use App\Http\Controllers\ActivationFund\ActivationfundController;
use App\Http\Controllers\AdminDeposits\AdminDepositController;
use App\Http\Controllers\AdminManageUsers\AdminManageUsersController;
use App\Http\Controllers\AdminRequestFund\AdminRequestFundController;
use App\Http\Controllers\AdminTransferFunds\AdminTransferFundsController;
use App\Http\Controllers\AdminWithdraw\AdminWithdrawController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AdminRole;
//test2
Route::middleware([AdminRole::class])->group(function () {
    Route::get('admin-dashboard', function () {
        return Inertia::render('admin/admin-dashboard');
    })->name('admin-dashboard');

    Route::get('admin-withdraw', function () {
        return Inertia::render('admin/admin-withdraw');
    })->name('admin-withdraw');

    Route::get('admin-pending-deposits', [AdminDepositController::class, 'pendingDeposits'])->name('admin-pending-deposits');
    Route::get('admin-approved-deposits', [AdminDepositController::class, 'approvedDeposits'])->name('admin-approved-deposits');
    Route::post('post-approve-deposit', [AdminDepositController::class, 'approveDeposit']);
    Route::post('post-deny-deposit', [AdminDepositController::class, 'denyDeposit']);
    Route::post('post-delete-deposit', [AdminDepositController::class, 'deleteDeposit']);

    Route::get('admin-pending-withdraw', [AdminWithdrawController::class, 'pendingWithdraw'])->name('admin-pending-withdraw');
    Route::get('admin-approved-withdraw', [AdminWithdrawController::class, 'approvedWithdraw'])->name('admin-approved-withdraw');
    Route::post('post-approve-withdraw', [AdminWithdrawController::class, 'approveWithdraw']);
    Route::post('post-deny-withdraw', [AdminWithdrawController::class, 'denyWithdraw']);

    Route::get('admin-pending-requestfund', [AdminRequestFundController::class, 'pendingReqFund'])->name('admin-pending-requestfund');
    Route::get('admin-approved-requestfund', [AdminRequestFundController::class, 'approvedReqFund'])->name('admin-approved-requestfund');
    Route::post('post-approve-requestfund', [AdminRequestFundController::class, 'approveReqFund']);
    Route::post('post-deny-requestfund', [AdminRequestFundController::class, 'denyReqFund']);

    Route::get('admin-manage-users', [AdminManageUsersController::class, 'allUsers'])->name('admin-manage-users');
    // Route::get('admin-dashboard', [AdminManageUsersController::class, 'allUsers'])->name('admin-dashboard');
    Route::get('admin-transfer-funds', [AdminTransferFundsController::class, 'index'])->name('admin-transfer-funds');
    Route::get('admin-activation-fund', [ActivationfundController::class, 'index'])->name('admin/admin-activation-fund');

    // Route::get('admin-manage-users', function () {
    //     return Inertia::render('admin/admin-manage-users');
    // })->name('admin-manage-users');


    Route::get('getmanageusers', [AdminManageUsersController::class, 'allUsers']);


    // Route::get('admin-pending-withdraw', function () {
    //     return Inertia::render('admin/admin-pending-withdraw');
    // })->name('admin-pending-withdraw');

});
