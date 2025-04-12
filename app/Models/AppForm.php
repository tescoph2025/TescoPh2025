<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppForm extends Model
{
    protected $table = 'application_form';

    protected $fillable = [
        'app_type',
        'last_name',
        'first_name',
        'middle_name',
        'date_of_birth',
        'gender',
        'present_address',
        'nationality',
        'phone_number',
        'email',
        'highest_education',
        'school_name',
        'year_graduated',
        'source_of_income',
        'company_name',
        'years_of_employment',
        'nature_of_business',
        'duration_business_operation',

        'monthly_income',
        'tesco_active_deposit',
        'tesco_monthly_income',
        'purpose',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];
}
