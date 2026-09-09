<?php
namespace App\Actions\Catalog\Media;
use App\Models\ProductImage;
use Illuminate\Support\Facades\DB;
class RemoveProductImage { public function handle(ProductImage $image): bool { return DB::transaction(function() use($image) { $product=$image->product; $wasPrimary=$image->is_primary; $deleted=$image->delete(); if($wasPrimary) { $replacement=$product->images()->where('product_variant_id',$image->product_variant_id)->orderBy('sort_order')->first(); $replacement?->update(['is_primary'=>true]); } return $deleted; }); } }
