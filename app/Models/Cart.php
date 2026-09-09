<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class Cart extends Model
{
    protected $fillable = ['user_id','session_id','status'];

    protected function casts(): array
    {
        return ['status'=>\App\Enums\CartStatus::class];
    }

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function items(): HasMany { return $this->hasMany(CartItem::class); }
}
