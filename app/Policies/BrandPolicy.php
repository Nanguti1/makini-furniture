<?php
namespace App\Policies;
use App\Models\Brand;
use App\Models\User;
class BrandPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('view brands');
    }

    public function view(User $user, Brand $model): bool
    {
        return $user->can('view brands');
    }

    public function create(User $user): bool
    {
        return $user->can('create brands');
    }

    public function update(User $user, Brand $model): bool
    {
        return $user->can('edit brands');
    }

    public function delete(User $user, Brand $model): bool
    {
        return $user->can('delete brands');
    }

    public function restore(User $user, Brand $model): bool
    {
        return $user->can('restore brands');
    }
}
