<?php

namespace App\Services;

use App\Models\Package;

class PackageService
{
    /**
     *
     * @param array $data
     * @return Package|null
     */
    public function deductSlot($id): bool
    {
        $package = Package::find($id);

        if ($package && $package->available_slots > 0) {
            $package->available_slots -= 1;
            $package->save();
            return true;
        }

        return false;
    }
}
