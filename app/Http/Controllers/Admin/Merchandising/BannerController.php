<?php

namespace App\Http\Controllers\Admin\Merchandising;

use App\Actions\Merchandising\Banners\ActivateBanner;
use App\Actions\Merchandising\Banners\CreateBanner;
use App\Actions\Merchandising\Banners\DeactivateBanner;
use App\Actions\Merchandising\Banners\DeleteBanner;
use App\Actions\Merchandising\Banners\ReorderBanners;
use App\Actions\Merchandising\Banners\UpdateBanner;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Merchandising\StoreBannerRequest;
use App\Http\Requests\Admin\Merchandising\UpdateBannerRequest;
use App\Models\Banner;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BannerController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Banner::class);

        return Inertia::render('Admin/Banners/Index', [
            'banners' => Banner::query()
                ->orderBy('sort_order')
                ->orderBy('created_at')
                ->paginate(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Banner::class);

        return Inertia::render('Admin/Banners/Create');
    }

    public function store(StoreBannerRequest $request, CreateBanner $action): RedirectResponse
    {
        $banner = $action->handle($request->validated());

        return to_route('admin.banners.edit', $banner)
            ->with('success', 'Banner created.');
    }

    public function edit(Banner $banner): Response
    {
        $this->authorize('update', $banner);

        return Inertia::render('Admin/Banners/Edit', [
            'banner' => $banner,
        ]);
    }

    public function update(
        UpdateBannerRequest $request,
        Banner $banner,
        UpdateBanner $action
    ): RedirectResponse {
        $this->authorize('update', $banner);
        $action->handle($banner, $request->validated());

        return back()->with('success', 'Banner updated.');
    }

    public function destroy(Banner $banner, DeleteBanner $action): RedirectResponse
    {
        $this->authorize('delete', $banner);
        $action->handle($banner);

        return to_route('admin.banners.index')
            ->with('success', 'Banner deleted.');
    }

    public function activate(Banner $banner, ActivateBanner $action): RedirectResponse
    {
        $this->authorize('update', $banner);
        $action->handle($banner);

        return back()->with('success', 'Banner activated.');
    }

    public function deactivate(Banner $banner, DeactivateBanner $action): RedirectResponse
    {
        $this->authorize('update', $banner);
        $action->handle($banner);

        return back()->with('success', 'Banner deactivated.');
    }

    public function reorder(): RedirectResponse
    {
        $this->authorize('update', Banner::class);

        $action = app(ReorderBanners::class);
        $action->handle($this->validate(request(), [
            'banners' => ['required', 'array'],
            'banners.*' => ['integer'],
        ])['banners']);

        return back()->with('success', 'Banners reordered.');
    }
}
