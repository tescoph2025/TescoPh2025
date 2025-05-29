<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    // Explicitly define table name if it’s singular in your DB
    protected $table = 'package';

    // Allow mass assignment for these fields
    protected $fillable = [
        'package_name',
        'min_amount',
        'max_amount',
        'daily_shares_rate',
        'available_slots',
        'effective_days',
        'referal_bonus_rate',
    ];

    // (Optional) Add any default casting if needed
    protected $casts = [
        'min_amount' => 'float',
        'max_amount' => 'float',
        'daily_shares_rate' => 'float',
        'referal_bonus_rate' => 'float',
        'available_slots' => 'integer',
        'effective_days' => 'integer',
    ];
}
