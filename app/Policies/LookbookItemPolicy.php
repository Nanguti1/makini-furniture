<?php

namespace App\Policies;

use App\Models\LookbookItem;
use App\Models\User;

class LookbookItemPolicy
{
    use RequiresAdministrator;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, LookbookItem $model): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, LookbookItem $model): bool
    {
        return true;
    }

    public function delete(User $user, LookbookItem $model): bool
    {
        return true;
    }

    public function restore(User $user, LookbookItem $model): bool
    {
        return true;
    }
}
