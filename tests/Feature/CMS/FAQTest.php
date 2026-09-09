<?php

namespace Tests\Feature\CMS;

use App\Actions\CMS\CreateFAQ;
use App\Actions\CMS\ActivateFAQ;
use App\Actions\CMS\DeactivateFAQ;
use App\Models\FAQ;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FAQTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_faq(): void
    {
        $action = app(CreateFAQ::class);

        $faq = $action->handle([
            'question' => 'What is your return policy?',
            'answer' => 'We offer 30-day returns on all items.',
            'category' => 'Shipping & Returns',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $this->assertDatabaseHas('faqs', [
            'question' => 'What is your return policy?',
            'category' => 'Shipping & Returns',
            'is_active' => true,
        ]);
    }

    public function test_can_activate_faq(): void
    {
        $action = app(CreateFAQ::class);
        $faq = $action->handle([
            'question' => 'Test Question',
            'answer' => 'Test Answer',
            'is_active' => false,
        ]);

        $activateAction = app(ActivateFAQ::class);
        $activateAction->handle($faq);

        $this->assertDatabaseHas('faqs', [
            'id' => $faq->id,
            'is_active' => true,
        ]);
    }

    public function test_can_deactivate_faq(): void
    {
        $action = app(CreateFAQ::class);
        $faq = $action->handle([
            'question' => 'Test Question',
            'answer' => 'Test Answer',
            'is_active' => true,
        ]);

        $deactivateAction = app(DeactivateFAQ::class);
        $deactivateAction->handle($faq);

        $this->assertDatabaseHas('faqs', [
            'id' => $faq->id,
            'is_active' => false,
        ]);
    }

    public function test_only_active_faqs_returned(): void
    {
        $action = app(CreateFAQ::class);

        $activeFAQ = $action->handle([
            'question' => 'Active Question',
            'answer' => 'Active Answer',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $inactiveFAQ = $action->handle([
            'question' => 'Inactive Question',
            'answer' => 'Inactive Answer',
            'is_active' => false,
            'sort_order' => 2,
        ]);

        $active = FAQ::query()->where('is_active', true)->get();

        $this->assertCount(1, $active);
        $this->assertEquals('Active Question', $active->first()->question);
    }

    public function test_can_filter_faqs_by_category(): void
    {
        $action = app(CreateFAQ::class);

        $shippingFAQ = $action->handle([
            'question' => 'Shipping Question',
            'answer' => 'Shipping Answer',
            'category' => 'Shipping',
            'is_active' => true,
        ]);

        $returnsFAQ = $action->handle([
            'question' => 'Returns Question',
            'answer' => 'Returns Answer',
            'category' => 'Returns',
            'is_active' => true,
        ]);

        $shippingFAQs = FAQ::query()
            ->where('is_active', true)
            ->where('category', 'Shipping')
            ->get();

        $this->assertCount(1, $shippingFAQs);
        $this->assertEquals('Shipping Question', $shippingFAQs->first()->question);
    }
}
