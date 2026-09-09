<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class Price extends Model
{
    protected $fillable = ['product_id','product_variant_id','amount','currency','price_type','starts_at','ends_at','is_active'];

    protected function casts(): array
    {
        return ['amount'=>'decimal:2','starts_at'=>'datetime','ends_at'=>'datetime','is_active'=>'boolean'];
    }

    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
    public function variant(): BelongsTo { return $this->belongsTo(ProductVariant::class, 'product_variant_id'); }
}
