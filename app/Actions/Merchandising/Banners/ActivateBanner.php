<?php

namespace App\Actions\Merchandising\Banners;

use App\Models\Banner;
use Illuminate\Support\Facades\DB;

class ActivateBanner
{
    public function handle(Banner $banner): Banner
    {
        return DB::transaction(function () use ($banner) {
            $banner->update(['is_active' => true]);
            return $banner->refresh();
        });
    }
}
