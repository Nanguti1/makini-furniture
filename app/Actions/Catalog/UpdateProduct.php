<?php
namespace App\Actions\Catalog;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
class UpdateProduct { /** @param array<string,mixed> $attributes */ public function handle(Product $product,array $attributes): Product { return DB::transaction(function() use($product,$attributes) { $relations=collect($attributes)->only(['categories','collections','materials','finishes','colors','tags','features','rooms'])->all(); foreach(array_keys($relations) as $key) unset($attributes[$key]); unset($attributes['slug']); $product->update($attributes); foreach($relations as $relation=>$ids) $product->$relation()->sync($ids); return $product->refresh()->load(array_keys($relations)); }); } }
