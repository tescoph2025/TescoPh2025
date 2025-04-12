<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referrer extends Model
{
    use HasFactory;

    protected $table = 'referrer';

    protected $fillable = [
        'user_id',
        'link',
        'rate'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
