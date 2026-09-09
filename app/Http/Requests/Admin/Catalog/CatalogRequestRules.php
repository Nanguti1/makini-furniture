<?php
namespace App\Http\Requests\Admin\Catalog;
trait CatalogRequestRules { protected function slugRules(string $table,?int $ignore=null): array { return ['nullable','string','max:255',\Illuminate\Validation\Rule::unique($table,'slug')->ignore($ignore)]; } protected function flagRules(): array { return ['nullable','boolean']; } }
