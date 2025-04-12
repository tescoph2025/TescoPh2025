<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    /**
     *
     * @param array $data
     * @return User|null
     */
    public function searchName($name)
    {
        $time = now()->format('H:i:s');

        $username = User::where('username', $name)->first();
        if ($username) {

            return $username;
        }

        $fullname = User::where('name', $name)->first();
        if ($fullname) {
            return $fullname;
        }

        return false;
        // return ['error' => ['message' => 'Receiver name is not found.', $time]];
    }
}
