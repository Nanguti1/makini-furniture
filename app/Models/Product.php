<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany};
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = ['brand_id','category_id','collection_id','product_family_id','name','slug','sku','short_description','description','specifications','care_instructions','assembly_information','warranty_information','status','product_type','is_featured','is_new','is_bestseller','is_customizable','is_active','sort_order','meta_title','meta_description'];

    protected function casts(): array
    {
        return ['specifications'=>'array','status'=>\App\Enums\ProductStatus::class,'is_featured'=>'boolean','is_new'=>'boolean','is_bestseller'=>'boolean','is_customizable'=>'boolean','is_active'=>'boolean'];
    }

    public function brand(): BelongsTo { return $this->belongsTo(Brand::class); }
    public function category(): BelongsTo { return $this->belongsTo(Category::class); }
    public function collection(): BelongsTo { return $this->belongsTo(Collection::class); }
    public function productFamily(): BelongsTo { return $this->belongsTo(ProductFamily::class); }
    public function variants(): HasMany { return $this->hasMany(ProductVariant::class); }
    public function images(): HasMany { return $this->hasMany(ProductImage::class); }
    public function videos(): HasMany { return $this->hasMany(ProductVideo::class); }
    public function documents(): HasMany { return $this->hasMany(ProductDocument::class); }
    public function dimensions(): HasMany { return $this->hasMany(ProductDimension::class); }
    public function categories(): BelongsToMany { return $this->belongsToMany(Category::class)->withTimestamps(); }
    public function collections(): BelongsToMany { return $this->belongsToMany(Collection::class)->withTimestamps(); }
    public function materials(): BelongsToMany { return $this->belongsToMany(Material::class)->withTimestamps(); }
    public function finishes(): BelongsToMany { return $this->belongsToMany(Finish::class)->withTimestamps(); }
    public function colors(): BelongsToMany { return $this->belongsToMany(Color::class)->withTimestamps(); }
    public function tags(): BelongsToMany { return $this->belongsToMany(Tag::class)->withTimestamps(); }
    public function features(): BelongsToMany { return $this->belongsToMany(Feature::class)->withTimestamps(); }
    public function rooms(): BelongsToMany { return $this->belongsToMany(Room::class)->withPivot('sort_order')->withTimestamps(); }
    public function relatedProducts(): BelongsToMany { return $this->belongsToMany(self::class, 'related_products', 'product_id', 'related_product_id')->withPivot(['relationship_type','sort_order'])->withTimestamps(); }
    public function relatedToProducts(): BelongsToMany { return $this->belongsToMany(self::class, 'related_products', 'related_product_id', 'product_id')->withPivot(['relationship_type','sort_order'])->withTimestamps(); }
    public function prices(): HasMany { return $this->hasMany(Price::class); }
    public function reviews(): HasMany { return $this->hasMany(Review::class); }
    public function options(): BelongsToMany { return $this->belongsToMany(Option::class, 'product_options')->withPivot(['sort_order','is_required'])->withTimestamps(); }
}

