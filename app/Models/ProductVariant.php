<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class ProductVariant extends Model
{
    use SoftDeletes;

    protected $fillable = ['product_id','sku','name','barcode','price_override','cost_price','weight','weight_unit','status','is_default','is_active'];

    protected function casts(): array
    {
        return ['price_override'=>'decimal:2','cost_price'=>'decimal:2','weight'=>'decimal:3','status'=>\App\Enums\ProductStatus::class,'is_default'=>'boolean','is_active'=>'boolean'];
    }

    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
    public function optionValues(): BelongsToMany { return $this->belongsToMany(OptionValue::class, 'product_variant_options')->withTimestamps(); }
    public function images(): HasMany { return $this->hasMany(ProductImage::class); }
    public function videos(): HasMany { return $this->hasMany(ProductVideo::class); }
    public function dimensions(): HasMany { return $this->hasMany(VariantDimension::class); }
    public function inventories(): HasMany { return $this->hasMany(Inventory::class); }
    public function prices(): HasMany { return $this->hasMany(Price::class); }
    public function colors(): BelongsToMany { return $this->belongsToMany(Color::class)->withTimestamps(); }
}
