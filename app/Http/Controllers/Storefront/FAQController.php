<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Queries\Catalog\FAQQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FAQController extends Controller
{
    public function index(Request $request, FAQQuery $query): Response
    {
        $category = $request->query('category');

        return Inertia::render('Storefront/FAQs/Index', [
            'faqs' => $query->getActive($category),
            'categories' => $query->getCategories(),
            'selectedCategory' => $category,
        ]);
    }
}
