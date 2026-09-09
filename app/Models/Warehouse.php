<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class Warehouse extends Model
{
    protected $fillable = ['name','code','phone','email','address_line_1','address_line_2','city','state','postal_code','country','is_active'];

    protected function casts(): array
    {
        return ['is_active'=>'boolean'];
    }

    public function inventories(): HasMany { return $this->hasMany(Inventory::class); }
}
