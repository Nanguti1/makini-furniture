<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class Option extends Model
{
    protected $fillable = ['name','slug','sort_order'];

    public function values(): HasMany { return $this->hasMany(OptionValue::class); }
    public function products(): BelongsToMany { return $this->belongsToMany(Product::class, 'product_options')->withPivot(['sort_order','is_required'])->withTimestamps(); }
}
