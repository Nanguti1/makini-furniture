<?php

namespace App\Policies;

use App\Models\FeaturedCollection;
use App\Models\User;

class FeaturedCollectionPolicy
{
    use RequiresAdministrator;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, FeaturedCollection $model): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, FeaturedCollection $model): bool
    {
        return true;
    }

    public function delete(User $user, FeaturedCollection $model): bool
    {
        return true;
    }

    public function restore(User $user, FeaturedCollection $model): bool
    {
        return true;
    }
}
