<?php
namespace App\Policies;
use App\Models\Product;
use App\Models\User;
class ProductPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('view products');
    }

    public function view(User $user, Product $model): bool
    {
        return $user->can('view products');
    }

    public function create(User $user): bool
    {
        return $user->can('create products');
    }

    public function update(User $user, Product $model): bool
    {
        return $user->can('edit products');
    }

    public function delete(User $user, Product $model): bool
    {
        return $user->can('delete products');
    }

    public function restore(User $user, Product $model): bool
    {
        return $user->can('edit products');
    }

    public function publish(User $user, Product $model): bool
    {
        return $user->can('publish products');
    }

    public function unpublish(User $user, Product $model): bool
    {
        return $user->can('unpublish products');
    }
}
