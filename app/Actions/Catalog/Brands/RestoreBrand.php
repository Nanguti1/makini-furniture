<?php
namespace App\Actions\Catalog\Brands;
use App\Models\Brand;
class RestoreBrand { public function handle(Brand $brand): bool { return $brand->restore(); } }
