<?php
namespace App\Actions\Catalog\Collections;
use App\Actions\Catalog\CreatesCatalogRecord;
use App\Models\Collection;
class UpdateCollection { use CreatesCatalogRecord; /** @param array<string,mixed> $attributes */ public function handle(Collection $collection, array $attributes): Collection { return $this->updateRecord($collection, $attributes); } }
