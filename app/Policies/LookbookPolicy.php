<?php

namespace App\Policies;

use App\Models\Lookbook;
use App\Models\User;

class LookbookPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('view lookbooks');
    }

    public function view(User $user, Lookbook $model): bool
    {
        return $user->can('view lookbooks');
    }

    public function create(User $user): bool
    {
        return $user->can('create lookbooks');
    }

    public function update(User $user, Lookbook $model): bool
    {
        return $user->can('edit lookbooks');
    }

    public function delete(User $user, Lookbook $model): bool
    {
        return $user->can('delete lookbooks');
    }

    public function restore(User $user, Lookbook $model): bool
    {
        return $user->can('edit lookbooks');
    }

    public function publish(User $user, Lookbook $model): bool
    {
        return $user->can('publish lookbooks');
    }

    public function unpublish(User $user, Lookbook $model): bool
    {
        return $user->can('unpublish lookbooks');
    }

    public function manageItems(User $user): bool
    {
        return $user->can('manage lookbook items');
    }
}
