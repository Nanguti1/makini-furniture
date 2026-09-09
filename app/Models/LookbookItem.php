<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class LookbookItem extends Model
{
    protected $fillable = ['lookbook_id','product_id','image','title','description','sort_order'];

    public function lookbook(): BelongsTo { return $this->belongsTo(Lookbook::class); }
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
}
