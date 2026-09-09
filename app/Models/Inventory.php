<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class Inventory extends Model
{
    protected $fillable = ['warehouse_id','product_variant_id','quantity_on_hand','quantity_reserved','reorder_level'];

    public function warehouse(): BelongsTo { return $this->belongsTo(Warehouse::class); }
    public function productVariant(): BelongsTo { return $this->belongsTo(ProductVariant::class); }
    public function movements(): HasMany { return $this->hasMany(StockMovement::class); }
}
