<?php
namespace App\Actions\Inventory;
use App\Enums\StockMovementType;
use App\Exceptions\InsufficientStockException;
use App\Models\Inventory;
use Illuminate\Support\Facades\DB;
class TransferInventory { public function handle(Inventory $from, Inventory $to, int $quantity, ?int $userId = null): void { DB::transaction(function () use($from,$to,$quantity,$userId) { if($quantity<1 || $from->product_variant_id!==$to->product_variant_id) throw new InsufficientStockException('Transfers require a positive quantity of the same variant.'); $locked=Inventory::query()->whereKey([$from->id,$to->id])->lockForUpdate()->get()->keyBy('id'); $source=$locked[$from->id]; $target=$locked[$to->id]; if($source->quantity_on_hand-$source->quantity_reserved<$quantity) throw new InsufficientStockException('Insufficient unreserved stock for transfer.'); $source->decrement('quantity_on_hand',$quantity); $target->increment('quantity_on_hand',$quantity); $source->movements()->create(['quantity'=>-$quantity,'movement_type'=>StockMovementType::Transfer,'created_by'=>$userId,'notes'=>"Transferred to inventory {$target->id}"]); $target->movements()->create(['quantity'=>$quantity,'movement_type'=>StockMovementType::Transfer,'created_by'=>$userId,'notes'=>"Transferred from inventory {$source->id}"]); }); } }
