<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany, HasOne, MorphTo};

class Page extends Model
{
    protected $fillable = ['title','slug','content','meta_title','meta_description','status','published_at'];

    protected function casts(): array
    {
        return ['published_at'=>'datetime'];
    }

    public function sections(): HasMany { return $this->hasMany(PageSection::class); }
}
