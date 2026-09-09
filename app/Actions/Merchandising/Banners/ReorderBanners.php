<?php

namespace App\Actions\Merchandising\Banners;

use App\Models\Banner;
use Illuminate\Support\Facades\DB;

class ReorderBanners
{
    /**
     * @param array<int, int> $bannerIds [banner_id => sort_order]
     */
    public function handle(array $bannerIds): void
    {
        DB::transaction(function () use ($bannerIds) {
            foreach ($bannerIds as $id => $sortOrder) {
                Banner::whereKey($id)->update(['sort_order' => $sortOrder]);
            }
        });
    }
}
