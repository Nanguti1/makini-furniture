<?php

namespace App\Http\Controllers\Admin\CMS;

use App\Actions\CMS\CreatePage;
use App\Actions\CMS\CreatePageSection;
use App\Actions\CMS\DeletePage;
use App\Actions\CMS\DeletePageSection;
use App\Actions\CMS\PublishPage;
use App\Actions\CMS\ReorderPageSections;
use App\Actions\CMS\UnpublishPage;
use App\Actions\CMS\UpdatePage;
use App\Actions\CMS\UpdatePageSection;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CMS\StorePageRequest;
use App\Http\Requests\Admin\CMS\StorePageSectionRequest;
use App\Http\Requests\Admin\CMS\UpdatePageRequest;
use App\Http\Requests\Admin\CMS\UpdatePageSectionRequest;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Page::class);

        return Inertia::render('Admin/Pages/Index', [
            'pages' => Page::query()
                ->withCount('sections')
                ->latest()
                ->paginate(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Page::class);

        return Inertia::render('Admin/Pages/Create');
    }

    public function store(StorePageRequest $request, CreatePage $action): RedirectResponse
    {
        $page = $action->handle($request->validated());

        return to_route('admin.pages.edit', $page)
            ->with('success', 'Page created.');
    }

    public function edit(Page $page): Response
    {
        $this->authorize('update', $page);

        $page->load('sections');

        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page,
        ]);
    }

    public function update(
        UpdatePageRequest $request,
        Page $page,
        UpdatePage $action
    ): RedirectResponse {
        $this->authorize('update', $page);
        $action->handle($page, $request->validated());

        return back()->with('success', 'Page updated.');
    }

    public function destroy(Page $page, DeletePage $action): RedirectResponse
    {
        $this->authorize('delete', $page);
        $action->handle($page);

        return to_route('admin.pages.index')
            ->with('success', 'Page deleted.');
    }

    public function publish(Page $page, PublishPage $action): RedirectResponse
    {
        $this->authorize('update', $page);
        $action->handle($page);

        return back()->with('success', 'Page published.');
    }

    public function unpublish(Page $page, UnpublishPage $action): RedirectResponse
    {
        $this->authorize('update', $page);
        $action->handle($page);

        return back()->with('success', 'Page unpublished.');
    }

    public function storeSection(
        StorePageSectionRequest $request,
        CreatePageSection $action
    ): RedirectResponse {
        $this->authorize('create', \App\Models\PageSection::class);
        $action->handle($request->validated());

        return back()->with('success', 'Page section added.');
    }

    public function updateSection(
        UpdatePageSectionRequest $request,
        int $sectionId,
        UpdatePageSection $action
    ): RedirectResponse {
        $section = \App\Models\PageSection::findOrFail($sectionId);
        $this->authorize('update', $section);
        $action->handle($section, $request->validated());

        return back()->with('success', 'Page section updated.');
    }

    public function destroySection(int $sectionId, DeletePageSection $action): RedirectResponse
    {
        $section = \App\Models\PageSection::findOrFail($sectionId);
        $this->authorize('delete', $section);
        $action->handle($section);

        return back()->with('success', 'Page section removed.');
    }

    public function reorderSections(): RedirectResponse
    {
        $action = app(ReorderPageSections::class);
        $action->handle($this->validate(request(), [
            'sections' => ['required', 'array'],
            'sections.*' => ['integer'],
        ])['sections']);

        return back()->with('success', 'Page sections reordered.');
    }
}
