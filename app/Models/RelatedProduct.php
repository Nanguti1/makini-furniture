<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class RelatedProduct extends Model
{
    protected $fillable = ['product_id','related_product_id','relationship_type','sort_order'];

    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
    public function relatedProduct(): BelongsTo { return $this->belongsTo(Product::class, 'related_product_id'); }
}
