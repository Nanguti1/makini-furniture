<?php

namespace App\Policies;

use App\Models\User;

trait RequiresAdministrator
{
    /**
     * Determine if the user is an administrator.
     */
    public function before(User $user): ?bool
    {
        if ($user->is_admin) {
            return true;
        }

        return null;
    }
}