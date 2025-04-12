<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferralBonus extends Model
{
    use HasFactory;

    protected $table = 'referral_bonus';

    protected $fillable = [
        'deposit_trans_id',
        'bonus_amount',
    ];

    public function depositPackageTransac()
    {
        return $this->belongsTo(DepositPackageTransac::class, 'deposit_trans_id');
    }
}
