<?php
namespace App\Actions\Catalog;
use App\Models\ProductVariant;
use App\Services\Catalog\ProductConfigurationService;
use Illuminate\Support\Facades\DB;
class ConfigureVariantOptions { public function __construct(private ProductConfigurationService $configuration) {} /** @param array<int> $ids */ public function handle(ProductVariant $variant,array $ids): ProductVariant { return DB::transaction(function() use($variant,$ids) { $values=$this->configuration->validate($variant->product,$ids,$variant); $variant->optionValues()->sync($values->modelKeys()); return $variant->load('optionValues.option'); }); } }
