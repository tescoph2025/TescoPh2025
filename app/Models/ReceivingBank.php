<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceivingBank extends Model
{
    use HasFactory;

    protected $table = 'receiving_bank';

    protected $fillable = [
        'bank_name',
        'payment_channel',
        'account_name',
        'account_number',
        'receiving_bank',
    ];
}
