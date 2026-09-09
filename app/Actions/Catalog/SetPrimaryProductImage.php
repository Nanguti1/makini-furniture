<?php
namespace App\Actions\Catalog;
use App\Models\ProductImage; use Illuminate\Support\Facades\DB;
class SetPrimaryProductImage { public function handle(ProductImage $image): ProductImage { return DB::transaction(function() use($image) { $query=$image->product->images(); if($image->product_variant_id) $query->where('product_variant_id',$image->product_variant_id); else $query->whereNull('product_variant_id'); $query->update(['is_primary'=>false]); $image->update(['is_primary'=>true]); return $image->refresh(); }); } }
