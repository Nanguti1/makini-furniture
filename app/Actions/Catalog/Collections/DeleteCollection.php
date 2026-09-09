<?php
namespace App\Actions\Catalog\Collections;
use App\Models\Collection;
class DeleteCollection { public function handle(Collection $collection): bool { return $collection->delete(); } }
