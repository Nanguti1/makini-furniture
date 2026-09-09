<?php
namespace App\Actions\Catalog\Media;
use App\Actions\Catalog\SetPrimaryProductImage;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;
class AddProductImage { public function __construct(private SetPrimaryProductImage $primary) {} /** @param array<string,mixed> $attributes */ public function handle(Product $product,array $attributes,?ProductVariant $variant=null): ProductImage { if($variant && $variant->product_id!==$product->id) abort(422,'The variant does not belong to this product.'); return DB::transaction(function() use($product,$attributes,$variant) { $attributes['product_variant_id']=$variant?->id; $attributes['sort_order']=$attributes['sort_order']??((int) $product->images()->max('sort_order')+1); $image=$product->images()->create($attributes); if($attributes['is_primary']??!$product->images()->where('is_primary',true)->exists()) $this->primary->handle($image); return $image->refresh(); }); } }
