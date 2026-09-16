<?php

namespace App\Policies;

use App\Models\Banner;
use App\Models\User;

class BannerPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('view banners');
    }

    public function view(User $user, Banner $model): bool
    {
        return $user->can('view banners');
    }

    public function create(User $user): bool
    {
        return $user->can('create banners');
    }

    public function update(User $user, Banner $model): bool
    {
        return $user->can('edit banners');
    }

    public function delete(User $user, Banner $model): bool
    {
        return $user->can('delete banners');
    }

    public function restore(User $user, Banner $model): bool
    {
        return $user->can('edit banners');
    }

    public function activate(User $user, Banner $model): bool
    {
        return $user->can('activate banners');
    }

    public function deactivate(User $user, Banner $model): bool
    {
        return $user->can('deactivate banners');
    }

    public function reorder(User $user): bool
    {
        return $user->can('reorder banners');
    }
}
