<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $table = 'package';

    protected $fillable = [
        'package_name',
        'min_amount',
        'max_amount',
        'daily_shares_rate',
        'available_slots',
        'effective_days',
        'referal_bonus_rate',
    ];
}
