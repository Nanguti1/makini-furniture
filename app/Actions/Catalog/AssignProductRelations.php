<?php
namespace App\Actions\Catalog;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
class AssignProductRelations { /** @param array<string,array<int>> $relations */ public function handle(Product $product,array $relations): Product { return DB::transaction(function() use($product,$relations) { foreach(['categories','collections','materials','finishes','colors','tags','features','rooms'] as $relation) if(array_key_exists($relation,$relations)) $product->$relation()->sync($relations[$relation]); return $product->load(array_keys($relations)); }); } }
