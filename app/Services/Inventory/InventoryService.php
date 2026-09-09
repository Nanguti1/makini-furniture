<?php

namespace App\Services\Inventory;

use App\Enums\StockMovementType;
use App\Exceptions\InsufficientStockException;
use App\Models\Inventory;
use App\Models\ProductVariant;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class InventoryService
{
    public function available(ProductVariant $variant): int
    {
        return (int) $variant->inventories()
            ->selectRaw('coalesce(sum(quantity_on_hand - quantity_reserved), 0) as available')
            ->value('available');
    }

    /** @return Collection<int, Inventory> */
    public function reserveVariant(ProductVariant $variant, int $quantity, object $reference): Collection
    {
        return DB::transaction(function () use ($variant, $quantity, $reference): Collection {
            if ($quantity < 1) {
                throw new InsufficientStockException('Reservation quantity must be positive.');
            }

            $inventories = Inventory::query()->where('product_variant_id', $variant->id)->orderBy('id')->lockForUpdate()->get();
            if ($inventories->sum(fn (Inventory $inventory) => $inventory->quantity_on_hand - $inventory->quantity_reserved) < $quantity) {
                throw new InsufficientStockException('Insufficient available inventory.');
            }

            $remaining = $quantity;
            $reserved = collect();
            foreach ($inventories as $inventory) {
                $allocation = min($remaining, $inventory->quantity_on_hand - $inventory->quantity_reserved);
                if ($allocation < 1) continue;
                $inventory->increment('quantity_reserved', $allocation);
                $inventory->movements()->create(['quantity' => -$allocation, 'movement_type' => StockMovementType::Sale, 'reference_type' => $reference->getMorphClass(), 'reference_id' => $reference->getKey(), 'notes' => 'Stock reserved']);
                $reserved->push($inventory->refresh());
                $remaining -= $allocation;
                if ($remaining === 0) break;
            }
            return $reserved;
        });
    }

    public function release(Inventory $inventory, int $quantity, ?object $reference = null): Inventory
    {
        return DB::transaction(function () use ($inventory, $quantity, $reference): Inventory {
            $inventory = Inventory::query()->lockForUpdate()->findOrFail($inventory->id);
            if ($quantity < 1 || $inventory->quantity_reserved < $quantity) throw new InsufficientStockException('Cannot release more stock than is reserved.');
            $inventory->decrement('quantity_reserved', $quantity);
            $inventory->movements()->create(['quantity' => $quantity, 'movement_type' => StockMovementType::Return, 'reference_type' => $reference?->getMorphClass(), 'reference_id' => $reference?->getKey(), 'notes' => 'Stock reservation released']);
            return $inventory->refresh();
        });
    }
}
