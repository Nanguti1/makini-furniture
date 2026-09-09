<?php

namespace Tests\Feature\Merchandising;

use App\Actions\Merchandising\Banners\CreateBanner;
use App\Actions\Merchandising\Banners\ActivateBanner;
use App\Actions\Merchandising\Banners\DeactivateBanner;
use App\Models\Banner;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BannerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_banner(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $action = app(CreateBanner::class);

        $banner = $action->handle([
            'title' => 'Summer Sale',
            'subtitle' => 'Up to 50% off',
            'image' => 'https://example.com/banner.jpg',
            'mobile_image' => 'https://example.com/banner-mobile.jpg',
            'link' => '/summer-sale',
            'link_type' => 'page',
            'placement' => 'hero',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $this->assertDatabaseHas('banners', [
            'title' => 'Summer Sale',
            'placement' => 'hero',
            'is_active' => true,
        ]);
    }

    public function test_banner_scheduling_only_returns_active_banners(): void
    {
        $now = now();
        $action = app(CreateBanner::class);

        $activeBanner = $action->handle([
            'title' => 'Active Banner',
            'image' => 'https://example.com/active.jpg',
            'placement' => 'hero',
            'is_active' => true,
            'starts_at' => $now->subDay(),
            'ends_at' => $now->addDay(),
            'sort_order' => 1,
        ]);

        $futureBanner = $action->handle([
            'title' => 'Future Banner',
            'image' => 'https://example.com/future.jpg',
            'placement' => 'hero',
            'is_active' => true,
            'starts_at' => $now->addDays(2),
            'sort_order' => 2,
        ]);

        $expiredBanner = $action->handle([
            'title' => 'Expired Banner',
            'image' => 'https://example.com/expired.jpg',
            'placement' => 'hero',
            'is_active' => true,
            'starts_at' => $now->subDays(5),
            'ends_at' => $now->subDay(),
            'sort_order' => 3,
        ]);

        $active = Banner::query()
            ->where('is_active', true)
            ->where(fn($q) => $q->whereNull('starts_at')->orWhere('starts_at', '<=', $now))
            ->where(fn($q) => $q->whereNull('ends_at')->orWhere('ends_at', '>=', $now))
            ->get();

        $this->assertCount(1, $active);
        $this->assertEquals('Active Banner', $active->first()->title);
    }

    public function test_can_activate_banner(): void
    {
        $action = app(CreateBanner::class);
        $banner = $action->handle([
            'title' => 'Test Banner',
            'image' => 'https://example.com/test.jpg',
            'placement' => 'hero',
            'is_active' => false,
        ]);

        $activateAction = app(ActivateBanner::class);
        $activateAction->handle($banner);

        $this->assertDatabaseHas('banners', [
            'id' => $banner->id,
            'is_active' => true,
        ]);
    }

    public function test_can_deactivate_banner(): void
    {
        $action = app(CreateBanner::class);
        $banner = $action->handle([
            'title' => 'Test Banner',
            'image' => 'https://example.com/test.jpg',
            'placement' => 'hero',
            'is_active' => true,
        ]);

        $deactivateAction = app(DeactivateBanner::class);
        $deactivateAction->handle($banner);

        $this->assertDatabaseHas('banners', [
            'id' => $banner->id,
            'is_active' => false,
        ]);
    }
}
