<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transferfund extends Model
{
    use HasFactory;

    protected $table = 'transferfund';

    protected $fillable = [
        'user_id',
        'transfer_amount',
        'receiver_user_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function referrer()
    {
        return $this->belongsTo(User::class, 'receiver_user_id', 'id');
    }
}
