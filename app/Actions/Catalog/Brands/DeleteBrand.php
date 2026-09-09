<?php
namespace App\Actions\Catalog\Brands;
use App\Models\Brand;
class DeleteBrand { public function handle(Brand $brand): bool { return $brand->delete(); } }
