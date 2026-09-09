<?php

namespace App\Policies;

use App\Models\User;

trait RequiresAdministrator
{
    public function before(User $user, string $ability): ?bool
    {
        return $user->is_admin ? true : null;
    }
}
