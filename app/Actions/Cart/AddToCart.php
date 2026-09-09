<?php
namespace App\Actions\Cart;
use App\Exceptions\CartItemUnavailableException;
use App\Models\Cart;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Services\Inventory\InventoryService;
use App\Services\Pricing\PricingService;
use Illuminate\Support\Facades\DB;
class AddToCart { public function __construct(private PricingService $pricing,private InventoryService $inventory) {} public function handle(Cart $cart,Product $product,?ProductVariant $variant,int $quantity): Cart { return DB::transaction(function() use($cart,$product,$variant,$quantity) { if($quantity<1 || !$product->is_active || $product->status->value!=='active' || ($variant && (!$variant->is_active || $variant->product_id!==$product->id))) throw new CartItemUnavailableException('This product configuration is unavailable.'); if($variant && $this->inventory->available($variant)<$quantity) throw new CartItemUnavailableException('Insufficient inventory.'); $price=$this->pricing->effectivePrice($product,$variant); if(!$price) throw new CartItemUnavailableException('No active price is available.'); $item=$cart->items()->where('product_id',$product->id)->where('product_variant_id',$variant?->id)->lockForUpdate()->first(); if($item) $item->update(['quantity'=>$item->quantity+$quantity,'unit_price'=>$price->amount]); else $cart->items()->create(['product_id'=>$product->id,'product_variant_id'=>$variant?->id,'quantity'=>$quantity,'unit_price'=>$price->amount]); return $cart->load('items.product','items.variant'); }); } }
