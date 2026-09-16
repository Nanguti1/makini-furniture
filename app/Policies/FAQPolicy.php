<?php

namespace App\Policies;

use App\Models\FAQ;
use App\Models\User;

class FAQPolicy
{
    use HasSuperAdminAccess;

    public function viewAny(User $user): bool
    {
        return $user->can('view faqs');
    }

    public function view(User $user, FAQ $model): bool
    {
        return $user->can('view faqs');
    }

    public function create(User $user): bool
    {
        return $user->can('create faqs');
    }

    public function update(User $user, FAQ $model): bool
    {
        return $user->can('edit faqs');
    }

    public function delete(User $user, FAQ $model): bool
    {
        return $user->can('delete faqs');
    }

    public function restore(User $user, FAQ $model): bool
    {
        return $user->can('edit faqs');
    }

    public function activate(User $user, FAQ $model): bool
    {
        return $user->can('activate faqs');
    }

    public function deactivate(User $user, FAQ $model): bool
    {
        return $user->can('deactivate faqs');
    }

    public function reorder(User $user): bool
    {
        return $user->can('reorder faqs');
    }
}
