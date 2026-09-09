<?php

namespace App\Actions\Merchandising\Banners;

use App\Models\Banner;
use Illuminate\Support\Facades\DB;

class CreateBanner
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(array $attributes): Banner
    {
        return DB::transaction(function () use ($attributes) {
            return Banner::create($attributes);
        });
    }
}
