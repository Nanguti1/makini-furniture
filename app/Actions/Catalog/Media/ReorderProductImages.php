<?php
namespace App\Actions\Catalog\Media;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
class ReorderProductImages { /** @param array<int> $ids */ public function handle(Product $product,array $ids): void { DB::transaction(function() use($product,$ids) { $images=$product->images()->whereIn('id',$ids)->lockForUpdate()->get()->keyBy('id'); if($images->count()!==count(array_unique($ids))) abort(422,'Every image must belong to the product.'); foreach($ids as $order=>$id) $images[$id]->update(['sort_order'=>$order]); }); } }
