<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        // Log::info('login log request', ['request', $request]);

        $request->authenticate();

        $requestSession = $request->session()->regenerate();
        Log::info('login log requestSession', ['requestSession', $request->user()]);

        if ($requestSession) {
            $user = $request->user();
            $role = $user->role;

            // Set the 'role' cookie
            Cookie::queue('role', $role, 60 * 24 * 7); // 7 days expiration
            if ($request->user()->role === 'client') {
                return redirect()->intended(route('dashboard', absolute: false));
            }
            if ($request->user()->role === 'admin') {
                return redirect()->intended(route('admin-pending-deposits'));
            }
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
