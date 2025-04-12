<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AccountBalance;
use App\Models\ReferralList;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create($ref = null): Response
    {
        return Inertia::render('auth/register', [
            'ref' => $ref,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'regex:/\s/', // Must contain at least one space
                'unique:' . User::class, // <--- Make 'name' unique
            ],
            'username' => [
                'required',
                'string',
                'max:255',
                'regex:/^\S+$/', // No spaces allowed
                'unique:' . User::class, // <--- Make 'username' unique
            ],
            'used_ref' => [
                'required',
                'string',
                'max:255',
                'regex:/^\S+$/', // No spaces allowed
                'exists:users,username' // Must exist in the users table
            ],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                'unique:' . User::class
            ],
            'gender' => [
                'required',
                Rule::in(['m', 'f', 'o']) // Ensures only 'm', 'f', or 'o' are allowed
            ],
            'password' => [
                'required',
                'confirmed',
                'min:8',
                'regex:/[0-9]/', // Must contain at least one number
                // 'regex:/[\W]/',  // Must contain at least one symbol
                Rules\Password::defaults()
            ],
        ], $this->messages());

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
        ]);
        Log::info('Daily Interest Log', ['accountBalanceUpdate' => $user]);

        AccountBalance::create([
            'user_id' => $user->id,
            // 'balance' => 1000, // Default balance when user registers
        ]);

        $userSearch = new UserService();
        $userSearchResult = $userSearch->searchName($request->used_ref);

        ReferralList::create([
            'user_id' => $user->id,
            'ref_user_username' => $request->used_ref,
            'ref_user_id' => $userSearchResult->id,

        ]);

        event(new Registered($user));

        Auth::login($user);


        return to_route('dashboard');
    }

    protected function messages(): array
    {
        return [
            'name.required' => 'Please enter your full name.',
            'name.regex' => 'Your name must contain at least one space.',
            'name.unique' => 'This name is already taken.',
            'username.unique' => 'This username is already taken.',
            'username.required' => 'Please enter a username.',
            'username.regex' => 'Username cannot contain spaces.',
            'used_ref.required' => 'Please enter a referral code.',
            'used_ref.regex' => 'Referral code cannot contain spaces.',
            'used_ref.exists' => 'The referral code does not exist.',
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email address is already in use.',
            'gender.required' => 'Please select your gender.',
            'gender.in' => 'Please select a valid gender.',
            'password.required' => 'Please enter a password.',
            'password.confirmed' => 'Passwords do not match.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.regex' => 'Password must contain at least one number',
            // Add more custom messages as needed.
        ];
    }
}
