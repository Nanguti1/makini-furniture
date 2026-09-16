<?php

namespace App\Policies;

use App\Models\FeaturedProduct;
use App\Models\User;

class FeaturedProductPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('view featured products');
    }

    public function view(User $user, FeaturedProduct $model): bool
    {
        return $user->can('view featured products');
    }

    public function create(User $user): bool
    {
        return $user->can('create featured products');
    }

    public function update(User $user, FeaturedProduct $model): bool
    {
        return $user->can('edit featured products');
    }

    public function delete(User $user, FeaturedProduct $model): bool
    {
        return $user->can('delete featured products');
    }

    public function restore(User $user, FeaturedProduct $model): bool
    {
        return $user->can('edit featured products');
    }

    public function reorder(User $user): bool
    {
        return $user->can('reorder featured products');
    }
}
