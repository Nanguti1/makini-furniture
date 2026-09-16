<?php

namespace App\Policies;

use App\Models\Page;
use App\Models\User;

class PagePolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('view pages');
    }

    public function view(User $user, Page $model): bool
    {
        return $user->can('view pages');
    }

    public function create(User $user): bool
    {
        return $user->can('create pages');
    }

    public function update(User $user, Page $model): bool
    {
        return $user->can('edit pages');
    }

    public function delete(User $user, Page $model): bool
    {
        return $user->can('delete pages');
    }

    public function restore(User $user, Page $model): bool
    {
        return $user->can('edit pages');
    }

    public function publish(User $user, Page $model): bool
    {
        return $user->can('publish pages');
    }

    public function unpublish(User $user, Page $model): bool
    {
        return $user->can('unpublish pages');
    }

    public function manageSections(User $user): bool
    {
        return $user->can('manage page sections');
    }
}
