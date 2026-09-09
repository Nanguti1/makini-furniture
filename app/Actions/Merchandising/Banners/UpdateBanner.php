<?php

namespace App\Actions\Merchandising\Banners;

use App\Models\Banner;
use Illuminate\Support\Facades\DB;

class UpdateBanner
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function handle(Banner $banner, array $attributes): Banner
    {
        return DB::transaction(function () use ($banner, $attributes) {
            $banner->update($attributes);
            return $banner->refresh();
        });
    }
}
