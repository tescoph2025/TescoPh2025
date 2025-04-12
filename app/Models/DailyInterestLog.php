<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyInterestLog extends Model
{
    //
    protected $table = 'daily_interest_log';

    protected $fillable = [
        'user_id',
        'deposit_trans_id',
        'package_name',
        'daily_shares_rate',
        'daily_shares_value',
        'daily_shares_total',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function depositPackageTransac()
    {
        return $this->belongsTo(DepositPackageTransac::class, 'deposit_trans_id');
    }
}
