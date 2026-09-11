<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany};

class Category extends Model
{
    use SoftDeletes;

    protected $fillable = ['parent_id','name','slug','description','image','meta_title','meta_description','is_active','sort_order'];

    protected $appends = ['hero_image'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function getHeroImageAttribute(): ?string
    {
        return $this->image;
    }

    public function parent(): BelongsTo { return $this->belongsTo(self::class, 'parent_id'); }
    public function children(): HasMany { return $this->hasMany(self::class, 'parent_id'); }
    public function products(): BelongsToMany { return $this->belongsToMany(Product::class)->withTimestamps(); }
}

