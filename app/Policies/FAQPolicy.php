<?php
namespace App\Policies;
use App\Models\FAQ;
use App\Models\User;
class FAQPolicy { use RequiresAdministrator; public function viewAny(User $user): bool { return false; } public function view(User $user, FAQ $model): bool { return false; } public function create(User $user): bool { return false; } public function update(User $user, FAQ $model): bool { return false; } public function delete(User $user, FAQ $model): bool { return false; } public function restore(User $user, FAQ $model): bool { return false; } }
