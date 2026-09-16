<?php

namespace App\Policies;

use App\Models\Collection;
use App\Models\User;

class CollectionPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('view collections');
    }

    public function view(User $user, Collection $model): bool
    {
        return $user->can('view collections');
    }

    public function create(User $user): bool
    {
        return $user->can('create collections');
    }

    public function update(User $user, Collection $model): bool
    {
        return $user->can('edit collections');
    }

    public function delete(User $user, Collection $model): bool
    {
        return $user->can('delete collections');
    }

    public function restore(User $user, Collection $model): bool
    {
        return $user->can('restore collections');
    }
}
