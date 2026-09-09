<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class Promotion extends Model
{
    protected $fillable = ['name','code','description','discount_type','discount_value','product_id','category_id','collection_id','starts_at','ends_at','is_active'];

    protected function casts(): array
    {
        return ['discount_type'=>\App\Enums\DiscountType::class,'discount_value'=>'decimal:2','starts_at'=>'datetime','ends_at'=>'datetime','is_active'=>'boolean'];
    }

    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
    public function category(): BelongsTo { return $this->belongsTo(Category::class); }
    public function collection(): BelongsTo { return $this->belongsTo(Collection::class); }
}
