<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;

class CategoryPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('view categories');
    }

    public function view(User $user, Category $model): bool
    {
        return $user->can('view categories');
    }

    public function create(User $user): bool
    {
        return $user->can('create categories');
    }

    public function update(User $user, Category $model): bool
    {
        return $user->can('edit categories');
    }

    public function delete(User $user, Category $model): bool
    {
        return $user->can('delete categories');
    }

    public function restore(User $user, Category $model): bool
    {
        return $user->can('restore categories');
    }
}
