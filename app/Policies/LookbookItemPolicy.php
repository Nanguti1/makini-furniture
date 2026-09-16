<?php

namespace App\Policies;

use App\Models\LookbookItem;
use App\Models\User;

class LookbookItemPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('manage lookbook items');
    }

    public function view(User $user, LookbookItem $model): bool
    {
        return $user->can('manage lookbook items');
    }

    public function create(User $user): bool
    {
        return $user->can('manage lookbook items');
    }

    public function update(User $user, LookbookItem $model): bool
    {
        return $user->can('manage lookbook items');
    }

    public function delete(User $user, LookbookItem $model): bool
    {
        return $user->can('manage lookbook items');
    }

    public function restore(User $user, LookbookItem $model): bool
    {
        return $user->can('manage lookbook items');
    }
}
