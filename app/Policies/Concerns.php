<?php

namespace App\Policies;

use App\Models\User;

trait HasSuperAdminAccess
{
    public function before(User $user, string $ability): ?bool
    {
        // Super Admin has all permissions
        if ($user->hasRole('Super Admin')) {
            return true;
        }

        return null;
    }
}
