<?php
namespace App\Policies;
use App\Models\FAQ;
use App\Models\User;
class FAQPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return true; } public function view(User $user, FAQ $model): bool { return true; } public function create(User $user): bool { return true; } public function update(User $user, FAQ $model): bool { return true; } public function delete(User $user, FAQ $model): bool { return true; } public function restore(User $user, FAQ $model): bool { return true; } }
