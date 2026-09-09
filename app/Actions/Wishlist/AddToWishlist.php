<?php
namespace App\Actions\Wishlist;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Wishlist;
class AddToWishlist { public function handle(Wishlist $wishlist,Product $product,?ProductVariant $variant=null): void { if($variant && $variant->product_id!==$product->id) abort(422,'The variant does not belong to the product.'); $wishlist->items()->firstOrCreate(['product_id'=>$product->id,'product_variant_id'=>$variant?->id]); } }
