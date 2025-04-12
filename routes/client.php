<?php

use App\Http\Controllers\AppForm\AppFormController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Deposit\DepositController;
use App\Http\Controllers\DepositHistory\DepositHistoryController;
use App\Http\Controllers\FranchiseApplication\FranchiseController;
use App\Http\Controllers\Income\IncomeController;
use App\Http\Controllers\Referral\ReferralController;
use App\Http\Controllers\Transferfund\TransferfundController;
use App\Http\Controllers\Withdraw\WithdrawController;
use Illuminate\Support\Facades\Route;





Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

//package module
Route::get('deposit', [DepositController::class, 'index'])->name('package.index');
Route::post('postpackage', [DepositController::class, 'postDeposit']);

Route::get('income-history', [IncomeController::class, 'index']);
Route::get('deposit-history', [DepositHistoryController::class, 'index'])->name('deposit-history');

//withdraw module
Route::get('withdraw', [WithdrawController::class, 'index']);
Route::post('postwithdraw', [WithdrawController::class, 'postWithdraw']);
Route::get('withdraw-history', [WithdrawController::class, 'indexHistory'])->name('withdraw-history');

//transfer fund module
Route::get('transfer-fund', [TransferfundController::class, 'index']);
Route::post('posttransfer-fund', [TransferfundController::class, 'postTransferfund']);


Route::get('/referrals/{userId}', [ReferralController::class, 'getReferralLevels'])->name('referrals.levels');

//referral module
Route::get('referrals', [ReferralController::class, 'index'])->name('referrals.index');

//application form module
//franchise 
Route::get('franchise-application', [AppFormController::class, 'index_franchise'])->name('franchise.index');
//cerdit 
Route::get('credit-application', [AppFormController::class, 'index_credit'])->name('credit.index');

Route::post('post-appForm', [AppFormController::class, 'postAppForm']);
