<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\ReferralList;
use App\Models\UserBankDetails;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $user = Auth::user();
        $referral_used = ReferralList::where('user_id', $user->id)->first()->ref_user_username;

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'referral_used' => $referral_used ? $referral_used  : 'none',
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    public function profileBank(Request $request): Response
    {
        $bank_details = UserBankDetails::firstWhere('user_id', $request->user()->id);
        return Inertia::render('settings/profile-bank', [
            'bank_details' => $bank_details,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }
    public function updateProfileBank(Request $request)
    {
        $validated = $request->validate([
            'bank_name' => 'required|string',
            'bank_account_name' => 'required|string',
            'bank_account_number' => 'required|string',
        ]);

        // Update if the record exists, otherwise create a new one
        $userBank = UserBankDetails::updateOrCreate(
            ['user_id' => $request->user()->id], // Search for existing record
            $validated // Data to update or insert
        );

        Log::info(['user_bank' => $userBank]);

        return redirect()->route('profile.bank')->with('success', 'Profile bank updated successfully.');
    }

    public function profileImage(Request $request): Response
    {
        return Inertia::render('settings/profile-image', [
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }
    public function updateProfileImage(Request $request)
    {
        Log::info($request);
        // $request->validate([
        //     'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        // ]);
        Log::info('dsfsdf');

        $user = Auth::user();
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($user->profile_image) {
                Storage::disk('public')->delete($user->profile_image);
            }

            $imagePath = $request->file('image')->store('profile_images', 'public');
            $user->profile_image = $imagePath;
            $user->save();
        }
        // return redirect()->route('profile.image')->with('success', 'Profile image updated successfully.');
        return to_route('profile.image');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
