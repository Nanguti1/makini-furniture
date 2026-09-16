<?php

namespace App\Policies;

use App\Models\FeaturedCollection;
use App\Models\User;

class FeaturedCollectionPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('view featured collections');
    }

    public function view(User $user, FeaturedCollection $model): bool
    {
        return $user->can('view featured collections');
    }

    public function create(User $user): bool
    {
        return $user->can('create featured collections');
    }

    public function update(User $user, FeaturedCollection $model): bool
    {
        return $user->can('edit featured collections');
    }

    public function delete(User $user, FeaturedCollection $model): bool
    {
        return $user->can('delete featured collections');
    }

    public function restore(User $user, FeaturedCollection $model): bool
    {
        return $user->can('edit featured collections');
    }

    public function reorder(User $user): bool
    {
        return $user->can('reorder featured collections');
    }
}
