<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class OrderItem extends Model
{
    protected $fillable = ['order_id','product_id','product_variant_id','sku','product_name','variant_name','quantity','unit_price','discount_amount','total','metadata'];

    protected function casts(): array
    {
        return ['unit_price'=>'decimal:2','discount_amount'=>'decimal:2','total'=>'decimal:2','metadata'=>'array'];
    }

    public function order(): BelongsTo { return $this->belongsTo(Order::class); }
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
    public function variant(): BelongsTo { return $this->belongsTo(ProductVariant::class, 'product_variant_id'); }
}
