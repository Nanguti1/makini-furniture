<?php

namespace App\Policies;

use App\Models\PageSection;
use App\Models\User;

class PageSectionPolicy
{
    use RequiresAdministrator;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, PageSection $model): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, PageSection $model): bool
    {
        return true;
    }

    public function delete(User $user, PageSection $model): bool
    {
        return true;
    }

    public function restore(User $user, PageSection $model): bool
    {
        return true;
    }
}
