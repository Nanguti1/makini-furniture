<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class ProductOption extends Model
{
    protected $fillable = ['product_id','option_id','sort_order','is_required'];

    protected function casts(): array
    {
        return ['is_required'=>'boolean'];
    }

    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
    public function option(): BelongsTo { return $this->belongsTo(Option::class); }
}
