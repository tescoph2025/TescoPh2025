<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferralList extends Model
{
    //
    use HasFactory;

    protected $table = 'referral_list';

    protected $fillable = [
        'user_id',
        'ref_user_username',
        'ref_user_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function referrer()
    {
        return $this->belongsTo(User::class, 'ref_user_id', 'id');
    }
}
