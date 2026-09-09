<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Queries\Catalog\PageQuery;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function show(string $slug, PageQuery $query): Response
    {
        $page = $query->findBySlug($slug);

        abort_unless($page, 404);

        return Inertia::render('Storefront/Pages/Show', [
            'page' => $page,
        ]);
    }
}
