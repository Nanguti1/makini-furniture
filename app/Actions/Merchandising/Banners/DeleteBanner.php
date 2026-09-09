<?php

namespace App\Actions\Merchandising\Banners;

use App\Models\Banner;
use Illuminate\Support\Facades\DB;

class DeleteBanner
{
    public function handle(Banner $banner): void
    {
        DB::transaction(function () use ($banner) {
            $banner->delete();
        });
    }
}
