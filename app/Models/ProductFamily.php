<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany};

class ProductFamily extends Model
{
    use SoftDeletes;

    protected $fillable = ['brand_id','collection_id','name','slug','description','hero_image','is_active','sort_order'];

    protected function casts(): array
    {
        return ['is_active'=>'boolean'];
    }

    public function brand(): BelongsTo { return $this->belongsTo(Brand::class); }
    public function collection(): BelongsTo { return $this->belongsTo(Collection::class); }
    public function products(): HasMany { return $this->hasMany(Product::class); }
}

