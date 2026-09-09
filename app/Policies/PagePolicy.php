<?php
namespace App\Policies;
use App\Models\Page;
use App\Models\User;
class PagePolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, Page $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, Page $model): bool { return false; } public function delete(User $user, Page $model): bool { return false; } public function restore(User $user, Page $model): bool { return false; } }
