<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class Address extends Model
{
    protected $fillable = ['user_id','first_name','last_name','company','phone','address_line_1','address_line_2','city','state','postal_code','country','is_default'];

    protected function casts(): array
    {
        return ['is_default'=>'boolean'];
    }

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
}
