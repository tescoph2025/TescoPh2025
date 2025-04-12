<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TotalInterest extends Model
{
    use HasFactory;

    protected $table = 'total_interest';

    protected $fillable = [
        'user_id',
        'deposit_trans_id',
        'total_interest_amount',
        'initial_amount',
        'daily_rate',
        'days_remaining',
        'status',
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
