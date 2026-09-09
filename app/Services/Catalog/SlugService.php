<?php
namespace App\Services\Catalog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class SlugService { public function unique(Model $model,string $value,string $column='slug',?int $ignoreId=null): string { $slug=Str::slug($value) ?: Str::random(8); $candidate=$slug; $suffix=2; $query=$model->newQuery()->withTrashed(); while($query->where($column,$candidate)->when($ignoreId,fn($q)=>$q->whereKeyNot($ignoreId))->exists()) $candidate="{$slug}-".$suffix++; return $candidate; } }
