<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBankDetails extends Model
{
    use HasFactory;

    protected $table = 'user_bank_details';

    protected $fillable = [
        'user_id',
        'bank_name',
        'bank_account_name',
        'bank_account_number',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
