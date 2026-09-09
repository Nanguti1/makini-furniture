<?php
namespace App\Actions\Catalog\Collections;
use App\Models\Collection;
class RestoreCollection { public function handle(Collection $collection): bool { return $collection->restore(); } }
