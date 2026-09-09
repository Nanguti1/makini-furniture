<?php

namespace Tests\Feature\Merchandising;

use App\Actions\Merchandising\Lookbooks\CreateLookbook;
use App\Actions\Merchandising\Lookbooks\PublishLookbook;
use App\Actions\Merchandising\Lookbooks\UnpublishLookbook;
use App\Models\Lookbook;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LookbookTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_lookbook_with_slug_generation(): void
    {
        $action = app(CreateLookbook::class);

        $lookbook = $action->handle([
            'title' => 'Summer Collection 2024',
            'description' => 'Our latest summer styles',
            'hero_image' => 'https://example.com/hero.jpg',
            'status' => 'draft',
        ]);

        $this->assertDatabaseHas('lookbooks', [
            'title' => 'Summer Collection 2024',
            'slug' => 'summer-collection-2024',
            'status' => 'draft',
        ]);
    }

    public function test_can_publish_lookbook(): void
    {
        $action = app(CreateLookbook::class);
        $lookbook = $action->handle([
            'title' => 'Test Lookbook',
            'hero_image' => 'https://example.com/test.jpg',
            'status' => 'draft',
        ]);

        $publishAction = app(PublishLookbook::class);
        $publishAction->handle($lookbook);

        $this->assertDatabaseHas('lookbooks', [
            'id' => $lookbook->id,
            'status' => 'published',
        ]);

        $this->assertNotNull($lookbook->refresh()->published_at);
    }

    public function test_can_unpublish_lookbook(): void
    {
        $action = app(CreateLookbook::class);
        $lookbook = $action->handle([
            'title' => 'Test Lookbook',
            'hero_image' => 'https://example.com/test.jpg',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $unpublishAction = app(UnpublishLookbook::class);
        $unpublishAction->handle($lookbook);

        $this->assertDatabaseHas('lookbooks', [
            'id' => $lookbook->id,
            'status' => 'draft',
        ]);

        $this->assertNull($lookbook->refresh()->published_at);
    }

    public function test_published_lookbooks_only_visible_on_storefront(): void
    {
        $now = now();
        $action = app(CreateLookbook::class);

        $publishedLookbook = $action->handle([
            'title' => 'Published Lookbook',
            'hero_image' => 'https://example.com/published.jpg',
            'status' => 'published',
            'published_at' => $now->subDay(),
        ]);

        $draftLookbook = $action->handle([
            'title' => 'Draft Lookbook',
            'hero_image' => 'https://example.com/draft.jpg',
            'status' => 'draft',
        ]);

        $futureLookbook = $action->handle([
            'title' => 'Future Lookbook',
            'hero_image' => 'https://example.com/future.jpg',
            'status' => 'published',
            'published_at' => $now->addDay(),
        ]);

        $visible = Lookbook::query()
            ->where('status', 'published')
            ->where('published_at', '<=', $now)
            ->get();

        $this->assertCount(1, $visible);
        $this->assertEquals('Published Lookbook', $visible->first()->title);
    }
}
