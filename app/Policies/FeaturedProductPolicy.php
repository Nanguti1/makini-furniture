<?php

namespace App\Policies;

use App\Models\FeaturedProduct;
use App\Models\User;

class FeaturedProductPolicy
{
    use RequiresAdministrator;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, FeaturedProduct $model): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, FeaturedProduct $model): bool
    {
        return true;
    }

    public function delete(User $user, FeaturedProduct $model): bool
    {
        return true;
    }

    public function restore(User $user, FeaturedProduct $model): bool
    {
        return true;
    }
}
