<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class Feature extends Model
{
    protected $fillable = ['name','slug','description','is_active','sort_order'];

    protected function casts(): array
    {
        return ['is_active'=>'boolean'];
    }

    public function products(): BelongsToMany { return $this->belongsToMany(Product::class)->withTimestamps(); }
}
