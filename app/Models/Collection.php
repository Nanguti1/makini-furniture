<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany};

class Collection extends Model
{
    use SoftDeletes;

    protected $fillable = ['brand_id','name','slug','description','short_description','hero_image','banner_image','is_featured','is_active','sort_order','meta_title','meta_description'];

    protected function casts(): array
    {
        return ['is_featured'=>'boolean','is_active'=>'boolean'];
    }

    public function brand(): BelongsTo { return $this->belongsTo(Brand::class); }
    public function products(): HasMany { return $this->hasMany(Product::class); }
    public function productFamilies(): HasMany { return $this->hasMany(ProductFamily::class); }
    public function featuredEntries(): HasMany { return $this->hasMany(FeaturedCollection::class); }
}

