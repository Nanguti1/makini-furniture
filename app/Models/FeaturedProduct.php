<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class FeaturedProduct extends Model
{
    protected $fillable = ['product_id','placement','sort_order','starts_at','ends_at','is_active'];

    protected function casts(): array
    {
        return ['starts_at'=>'datetime','ends_at'=>'datetime','is_active'=>'boolean'];
    }

    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
}
