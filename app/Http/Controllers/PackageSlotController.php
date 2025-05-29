<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Package;

class PackageSlotController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'package_id' => 'required|exists:package,id',
            'additional_slots' => 'required|integer|min:1',
        ]);

        $package = Package::find($request->package_id);

        if ($package) {
            $package->available_slots += $request->additional_slots;
            $package->save();

            return redirect()->back()->with('success', 'Slots updated successfully!');
        }

        return redirect()->back()->withErrors(['Package not found or invalid.']);
    }
}
