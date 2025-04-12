<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepositPackageTransac extends Model
{
    use HasFactory;

    protected $table = 'deposit_package_transac';

    protected $fillable = [
        'package_id',
        'user_id',
        'bank_id',
        'payment_method',
        'amount',
        'status',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function receivingBank()
    {
        return $this->belongsTo(ReceivingBank::class, 'bank_id');
    }
}
