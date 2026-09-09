<?php
namespace App\Policies;
use App\Models\Lookbook;
use App\Models\User;
class LookbookPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return true; } public function view(User $user, Lookbook $model): bool { return true; } public function create(User $user): bool { return true; } public function update(User $user, Lookbook $model): bool { return true; } public function delete(User $user, Lookbook $model): bool { return true; } public function restore(User $user, Lookbook $model): bool { return true; } }
