<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Queries\Catalog\LookbookQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LookbookController extends Controller
{
    public function index(LookbookQuery $query): Response
    {
        return Inertia::render('Storefront/Lookbooks/Index', [
            'lookbooks' => $query->getPublished(),
        ]);
    }

    public function show(string $slug, LookbookQuery $query): Response
    {
        $lookbook = $query->findBySlug($slug);

        abort_unless($lookbook, 404);

        return Inertia::render('Storefront/Lookbooks/Show', [
            'lookbook' => $lookbook->load('items.product'),
        ]);
    }
}
