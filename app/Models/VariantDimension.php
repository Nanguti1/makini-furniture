<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class VariantDimension extends Model
{
    protected $fillable = ['product_variant_id','width','depth','height','seat_height','seat_depth','arm_height','clearance','weight','dimension_unit','weight_unit','label'];

    protected function casts(): array
    {
        return ['width'=>'decimal:2','depth'=>'decimal:2','height'=>'decimal:2','seat_height'=>'decimal:2','seat_depth'=>'decimal:2','arm_height'=>'decimal:2','clearance'=>'decimal:2','weight'=>'decimal:3'];
    }

    public function productVariant(): BelongsTo { return $this->belongsTo(ProductVariant::class); }
}
