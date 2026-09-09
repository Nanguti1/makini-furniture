<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany};

class Brand extends Model
{
    use SoftDeletes;

    protected $fillable = ['name','slug','description','short_description','logo','cover_image','website_url','meta_title','meta_description','is_active','sort_order'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function products(): HasMany { return $this->hasMany(Product::class); }
    public function collections(): HasMany { return $this->hasMany(Collection::class); }
    public function productFamilies(): HasMany { return $this->hasMany(ProductFamily::class); }
}

