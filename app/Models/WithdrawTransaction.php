<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WithdrawTransaction extends Model
{
    use HasFactory;

    protected $table = 'withdraw_transaction';

    protected $fillable = [
        'user_id',
        'withdrawal_amount',
        'status',
        'remarks',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
