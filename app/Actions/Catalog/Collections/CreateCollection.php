<?php
namespace App\Actions\Catalog\Collections;
use App\Actions\Catalog\CreatesCatalogRecord;
use App\Models\Collection;
class CreateCollection { use CreatesCatalogRecord; /** @param array<string,mixed> $attributes */ public function handle(array $attributes): Collection { return $this->createRecord(Collection::class, $attributes); } }
