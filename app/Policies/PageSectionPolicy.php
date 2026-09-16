<?php

namespace App\Policies;

use App\Models\PageSection;
use App\Models\User;

class PageSectionPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('manage page sections');
    }

    public function view(User $user, PageSection $model): bool
    {
        return $user->can('manage page sections');
    }

    public function create(User $user): bool
    {
        return $user->can('manage page sections');
    }

    public function update(User $user, PageSection $model): bool
    {
        return $user->can('manage page sections');
    }

    public function delete(User $user, PageSection $model): bool
    {
        return $user->can('manage page sections');
    }

    public function restore(User $user, PageSection $model): bool
    {
        return $user->can('manage page sections');
    }
}
