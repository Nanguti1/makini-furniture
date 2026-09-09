<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class Lookbook extends Model
{
    protected $fillable = ['title','slug','description','hero_image','status','published_at'];

    protected function casts(): array
    {
        return ['published_at'=>'datetime'];
    }

    public function items(): HasMany { return $this->hasMany(LookbookItem::class)->orderBy('sort_order'); }
}
