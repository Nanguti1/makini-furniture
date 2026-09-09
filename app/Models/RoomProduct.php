<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class RoomProduct extends Model
{
    protected $fillable = ['room_id','product_id','sort_order'];

    public function room(): BelongsTo { return $this->belongsTo(Room::class); }
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
}
