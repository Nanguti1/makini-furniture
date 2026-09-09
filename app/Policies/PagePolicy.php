<?php
namespace App\Policies;
use App\Models\Page;
use App\Models\User;
class PagePolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return true; } public function view(User $user, Page $model): bool { return true; } public function create(User $user): bool { return true; } public function update(User $user, Page $model): bool { return true; } public function delete(User $user, Page $model): bool { return true; } public function restore(User $user, Page $model): bool { return true; } }
