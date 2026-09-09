<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class StockMovement extends Model
{
    protected $fillable = ['inventory_id','quantity','movement_type','reference_type','reference_id','notes','created_by'];

    protected function casts(): array
    {
        return ['movement_type'=>\App\Enums\StockMovementType::class];
    }

    public function inventory(): BelongsTo { return $this->belongsTo(Inventory::class); }
    public function reference(): MorphTo { return $this->morphTo(); }
    public function creator(): BelongsTo { return $this->belongsTo(User::class, 'created_by'); }
}
