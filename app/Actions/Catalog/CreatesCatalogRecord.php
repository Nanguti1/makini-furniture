<?php
namespace App\Actions\Catalog;
use App\Services\Catalog\SlugService;
use Illuminate\Database\Eloquent\Model;
trait CreatesCatalogRecord { public function __construct(private SlugService $slugs) {} /** @param class-string<Model> $model @param array<string,mixed> $attributes */ protected function createRecord(string $model,array $attributes): Model { if(empty($attributes['slug']) && isset($attributes['name'])) $attributes['slug']=$this->slugs->unique(new $model,$attributes['name']); return $model::create($attributes); } /** @param array<string,mixed> $attributes */ protected function updateRecord(Model $model,array $attributes): Model { if(array_key_exists('slug',$attributes) && $attributes['slug']==='') unset($attributes['slug']); $model->update($attributes); return $model->refresh(); } }
