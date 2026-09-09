<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class PageSection extends Model
{
    protected $fillable = ['page_id','type','configuration','sort_order'];

    protected function casts(): array
    {
        return ['configuration'=>'array'];
    }

    public function page(): BelongsTo { return $this->belongsTo(Page::class); }
}
