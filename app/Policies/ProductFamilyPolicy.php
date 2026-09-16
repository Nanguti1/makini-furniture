<?php

namespace App\Policies;

use App\Models\ProductFamily;
use App\Models\User;

class ProductFamilyPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('view product families');
    }

    public function view(User $user, ProductFamily $model): bool
    {
        return $user->can('view product families');
    }

    public function create(User $user): bool
    {
        return $user->can('create product families');
    }

    public function update(User $user, ProductFamily $model): bool
    {
        return $user->can('edit product families');
    }

    public function delete(User $user, ProductFamily $model): bool
    {
        return $user->can('delete product families');
    }

    public function restore(User $user, ProductFamily $model): bool
    {
        return $user->can('restore product families');
    }
}
