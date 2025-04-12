<?php

namespace App\Http\Controllers\AppForm;

use App\Http\Controllers\Controller;
use App\Models\AppForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AppFormController extends Controller
{
    public function index_franchise()
    {
        return Inertia::render('client/app-form', [
            'type' => 'franchise',
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    public function index_Credit()
    {
        return Inertia::render('client/app-form', [
            'type' => 'credit',
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    public function postAppForm(Request $request)
    {
        Log::info('appform', ['request' => $request]);

        // Define validation rules based on your migration
        $rules = [
            'app_type' => 'required|in:franchise,credit',
            'last_name' => 'required|string',
            'first_name' => 'required|string',
            'middle_name' => 'nullable|string',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:m,f,o',
            'present_address' => 'required|string',
            'nationality' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|email',
            'highest_education' => 'required|string',
            'school_name' => 'required|string',
            'year_graduated' => 'required|integer',
            'source_of_income' => 'required|in:employment,business_owner',
            'company_name' => 'nullable|string',
            'years_of_employment' => 'nullable|integer',
            'nature_of_business' => 'nullable|string',
            'duration_business_operation' => 'nullable|integer',
            'tesco_active_deposit' => 'nullable|string',
            'tesco_monthly_income' => 'nullable|string',
            'purpose' => 'nullable|string',
        ];

        // Additional validation based on app_type and source_of_income
        if ($request->input('source_of_income') === 'employment') {
            $rules['company_name'] = 'required|string';
            $rules['years_of_employment'] = 'required|integer';
        } elseif ($request->input('source_of_income') === 'business_owner') {
            $rules['nature_of_business'] = 'required|string';
            $rules['duration_business_operation'] = 'required|integer';
        }

        if ($request->input('app_type') === 'credit') {
            $rules['tesco_active_deposit'] = 'required|string';
            $rules['tesco_monthly_income'] = 'required|string';
            $rules['purpose'] = 'required|string';
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->with('error', ['message' => $validator->errors()->first()]);
        }

        AppForm::create($request->all());

        return redirect()->back()->with('success', ['message' => 'Application submitted successfully!']);
    }
}
