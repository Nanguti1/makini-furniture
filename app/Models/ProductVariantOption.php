<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class ProductVariantOption extends Model
{
    protected $fillable = ['product_variant_id','option_value_id'];

    public function variant(): BelongsTo { return $this->belongsTo(ProductVariant::class, 'product_variant_id'); }
    public function optionValue(): BelongsTo { return $this->belongsTo(OptionValue::class); }
}
