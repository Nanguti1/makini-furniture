<?php
namespace App\Actions\Catalog;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;
class SetDefaultVariant { public function handle(ProductVariant $variant): ProductVariant { return DB::transaction(function() use($variant) { $variant->product->variants()->update(['is_default'=>false]); $variant->update(['is_default'=>true]); return $variant->refresh(); }); } }
