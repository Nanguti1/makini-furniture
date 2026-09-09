<?php

namespace Tests\Feature\CMS;

use App\Actions\CMS\CreatePage;
use App\Actions\CMS\PublishPage;
use App\Actions\CMS\UnpublishPage;
use App\Models\Page;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_page_with_slug_generation(): void
    {
        $action = app(CreatePage::class);

        $page = $action->handle([
            'title' => 'About Us',
            'content' => 'Our company story',
            'meta_title' => 'About Our Company',
            'meta_description' => 'Learn about our company',
            'status' => 'draft',
        ]);

        $this->assertDatabaseHas('pages', [
            'title' => 'About Us',
            'slug' => 'about-us',
            'status' => 'draft',
        ]);
    }

    public function test_can_publish_page(): void
    {
        $action = app(CreatePage::class);
        $page = $action->handle([
            'title' => 'Test Page',
            'content' => 'Test content',
            'status' => 'draft',
        ]);

        $publishAction = app(PublishPage::class);
        $publishAction->handle($page);

        $this->assertDatabaseHas('pages', [
            'id' => $page->id,
            'status' => 'published',
        ]);

        $this->assertNotNull($page->refresh()->published_at);
    }

    public function test_can_unpublish_page(): void
    {
        $action = app(CreatePage::class);
        $page = $action->handle([
            'title' => 'Test Page',
            'content' => 'Test content',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $unpublishAction = app(UnpublishPage::class);
        $unpublishAction->handle($page);

        $this->assertDatabaseHas('pages', [
            'id' => $page->id,
            'status' => 'draft',
        ]);

        $this->assertNull($page->refresh()->published_at);
    }

    public function test_published_pages_only_visible_on_storefront(): void
    {
        $now = now();
        $action = app(CreatePage::class);

        $publishedPage = $action->handle([
            'title' => 'Published Page',
            'content' => 'Published content',
            'status' => 'published',
            'published_at' => $now->subDay(),
        ]);

        $draftPage = $action->handle([
            'title' => 'Draft Page',
            'content' => 'Draft content',
            'status' => 'draft',
        ]);

        $futurePage = $action->handle([
            'title' => 'Future Page',
            'content' => 'Future content',
            'status' => 'published',
            'published_at' => $now->addDay(),
        ]);

        $visible = Page::query()
            ->where('status', 'published')
            ->where('published_at', '<=', $now)
            ->get();

        $this->assertCount(1, $visible);
        $this->assertEquals('Published Page', $visible->first()->title);
    }
}
