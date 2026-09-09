<?php
namespace App\Services\Inventory;
use App\Enums\StockMovementType;
use App\Exceptions\InsufficientStockException;
use App\Models\Inventory;
use App\Models\ProductVariant;
use App\Models\Warehouse;
use Illuminate\Support\Facades\DB;
class InventoryService {
 public function adjust(Inventory $inventory,int $quantity,StockMovementType $type=StockMovementType::Adjustment,?object $reference=null,?int $userId=null,?string $notes=null): Inventory { return DB::transaction(function() use($inventory,$quantity,$type,$reference,$userId,$notes) { $inventory=Inventory::query()->lockForUpdate()->findOrFail($inventory->id); if($inventory->quantity_on_hand+$quantity<0 || $inventory->quantity_reserved>$inventory->quantity_on_hand+$quantity) throw new InsufficientStockException('Inventory cannot become negative or less than reserved stock.'); $inventory->increment('quantity_on_hand',$quantity); $inventory->movements()->create(['quantity'=>$quantity,'movement_type'=>$type,'reference_type'=>$reference?->getMorphClass(),'reference_id'=>$reference?->getKey(),'created_by'=>$userId,'notes'=>$notes]); return $inventory->refresh(); }); }
 public function reserve(Inventory $inventory,int $quantity,?object $reference=null): Inventory { return DB::transaction(function() use($inventory,$quantity,$reference) { $inventory=Inventory::query()->lockForUpdate()->findOrFail($inventory->id); if($quantity<1 || $inventory->quantity_on_hand-$inventory->quantity_reserved<$quantity) throw new InsufficientStockException('Insufficient available inventory.'); $inventory->increment('quantity_reserved',$quantity); $inventory->movements()->create(['quantity'=>-$quantity,'movement_type'=>StockMovementType::Sale,'reference_type'=>$reference?->getMorphClass(),'reference_id'=>$reference?->getKey(),'notes'=>'Stock reserved']); return $inventory->refresh(); }); }
 public function release(Inventory $inventory,int $quantity,?object $reference=null): Inventory { return DB::transaction(function() use($inventory,$quantity,$reference) { $inventory=Inventory::query()->lockForUpdate()->findOrFail($inventory->id); if($quantity<1 || $inventory->quantity_reserved<$quantity) throw new InsufficientStockException('Cannot release more stock than is reserved.'); $inventory->decrement('quantity_reserved',$quantity); $inventory->movements()->create(['quantity'=>$quantity,'movement_type'=>StockMovementType::Return,'reference_type'=>$reference?->getMorphClass(),'reference_id'=>$reference?->getKey(),'notes'=>'Stock reservation released']); return $inventory->refresh(); }); }
 public function available(ProductVariant $variant): int { return (int) $variant->inventories()->selectRaw('coalesce(sum(quantity_on_hand - quantity_reserved), 0) as available')->value('available'); }
}
