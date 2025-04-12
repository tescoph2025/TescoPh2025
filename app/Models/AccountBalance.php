<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountBalance extends Model
{
    use HasFactory;

    protected $table = 'account_balance';

    protected $fillable = [
        'user_id',
        'balance',
        'date_stamp',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
