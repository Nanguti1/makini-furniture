<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class ProductImage extends Model
{
    protected $fillable = ['product_id','product_variant_id','path','alt_text','title','type','sort_order','is_primary','metadata'];

    protected $appends = ['url'];

    protected function casts(): array
    {
        return ['metadata'=>'array','is_primary'=>'boolean'];
    }

    public function getUrlAttribute(): string
    {
        return $this->path;
    }

    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
    public function variant(): BelongsTo { return $this->belongsTo(ProductVariant::class, 'product_variant_id'); }
}
