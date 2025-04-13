<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestFund extends Model
{
    use HasFactory;

    protected $table = 'request_fund';

    protected $fillable = [
        'user_id',
        'bank_id',
        'amount',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function receivingBank()
    {
        return $this->belongsTo(ReceivingBank::class, 'bank_id');
    }
}
