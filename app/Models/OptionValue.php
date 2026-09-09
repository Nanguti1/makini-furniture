<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class OptionValue extends Model
{
    protected $fillable = ['option_id','value','slug','sort_order'];

    public function option(): BelongsTo { return $this->belongsTo(Option::class); }
    public function variants(): BelongsToMany { return $this->belongsToMany(ProductVariant::class, 'product_variant_options')->withTimestamps(); }
}
