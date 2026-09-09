<?php

namespace App\Http\Controllers\Admin\CMS;

use App\Actions\CMS\ActivateFAQ;
use App\Actions\CMS\CreateFAQ;
use App\Actions\CMS\DeactivateFAQ;
use App\Actions\CMS\DeleteFAQ;
use App\Actions\CMS\ReorderFAQs;
use App\Actions\CMS\UpdateFAQ;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CMS\StoreFAQRequest;
use App\Http\Requests\Admin\CMS\UpdateFAQRequest;
use App\Models\FAQ;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FAQController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', FAQ::class);

        return Inertia::render('Admin/FAQs/Index', [
            'faqs' => FAQ::query()
                ->orderBy('sort_order')
                ->orderBy('created_at')
                ->paginate(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', FAQ::class);

        return Inertia::render('Admin/FAQs/Create');
    }

    public function store(StoreFAQRequest $request, CreateFAQ $action): RedirectResponse
    {
        $faq = $action->handle($request->validated());

        return to_route('admin.faqs.edit', $faq)
            ->with('success', 'FAQ created.');
    }

    public function edit(FAQ $faq): Response
    {
        $this->authorize('update', $faq);

        return Inertia::render('Admin/FAQs/Edit', [
            'faq' => $faq,
        ]);
    }

    public function update(
        UpdateFAQRequest $request,
        FAQ $faq,
        UpdateFAQ $action
    ): RedirectResponse {
        $this->authorize('update', $faq);
        $action->handle($faq, $request->validated());

        return back()->with('success', 'FAQ updated.');
    }

    public function destroy(FAQ $faq, DeleteFAQ $action): RedirectResponse
    {
        $this->authorize('delete', $faq);
        $action->handle($faq);

        return to_route('admin.faqs.index')
            ->with('success', 'FAQ deleted.');
    }

    public function activate(FAQ $faq, ActivateFAQ $action): RedirectResponse
    {
        $this->authorize('update', $faq);
        $action->handle($faq);

        return back()->with('success', 'FAQ activated.');
    }

    public function deactivate(FAQ $faq, DeactivateFAQ $action): RedirectResponse
    {
        $this->authorize('update', $faq);
        $action->handle($faq);

        return back()->with('success', 'FAQ deactivated.');
    }

    public function reorder(): RedirectResponse
    {
        $this->authorize('update', FAQ::class);

        $action = app(ReorderFAQs::class);
        $action->handle($this->validate(request(), [
            'faqs' => ['required', 'array'],
            'faqs.*' => ['integer'],
        ])['faqs']);

        return back()->with('success', 'FAQs reordered.');
    }
}
