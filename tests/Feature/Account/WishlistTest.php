<?php

namespace Tests\Feature\Account;

use App\Actions\Wishlist\AddToWishlist;
use App\Actions\Wishlist\MergeWishlist;
use App\Actions\Wishlist\RemoveFromWishlist;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WishlistTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_their_wishlist(): void
    {
        $user = User::factory()->create();
        $wishlist = Wishlist::factory()->create(['user_id' => $user->id]);

        $this->assertEquals(1, $user->wishlists()->count());
        $this->assertEquals($wishlist->id, $user->wishlists()->first()->id);
    }

    public function test_user_can_add_product_to_wishlist(): void
    {
        $user = User::factory()->create();
        $wishlist = Wishlist::factory()->create(['user_id' => $user->id]);

        // Create required foreign key records
        $brand = \App\Models\Brand::create(['name' => 'Test Brand', 'slug' => 'test-brand']);
        $category = \App\Models\Category::create(['name' => 'Test Category', 'slug' => 'test-category']);

        $product = Product::create([
            'brand_id' => $brand->id,
            'category_id' => $category->id,
            'name' => 'Test Product',
            'slug' => 'test-product',
            'sku' => 'TEST-001',
            'status' => 'published',
        ]);

        $action = app(AddToWishlist::class);
        $action->handle($wishlist, $product, null);

        $this->assertDatabaseHas('wishlist_items', [
            'wishlist_id' => $wishlist->id,
            'product_id' => $product->id,
        ]);
    }

    public function test_user_can_add_product_variant_to_wishlist(): void
    {
        $user = User::factory()->create();
        $wishlist = Wishlist::factory()->create(['user_id' => $user->id]);

        $brand = \App\Models\Brand::create(['name' => 'Test Brand', 'slug' => 'test-brand']);
        $category = \App\Models\Category::create(['name' => 'Test Category', 'slug' => 'test-category']);

        $product = Product::create([
            'brand_id' => $brand->id,
            'category_id' => $category->id,
            'name' => 'Test Product',
            'slug' => 'test-product',
            'sku' => 'TEST-001',
            'status' => 'published',
        ]);
        $variant = ProductVariant::create([
            'product_id' => $product->id,
            'sku' => 'VAR-001',
            'name' => 'Variant 1',
            'status' => 'active',
        ]);

        $action = app(AddToWishlist::class);
        $action->handle($wishlist, $product, $variant);

        $this->assertDatabaseHas('wishlist_items', [
            'wishlist_id' => $wishlist->id,
            'product_id' => $product->id,
            'product_variant_id' => $variant->id,
        ]);
    }

    public function test_adding_duplicate_product_does_not_create_duplicate_item(): void
    {
        $user = User::factory()->create();
        $wishlist = Wishlist::factory()->create(['user_id' => $user->id]);

        $brand = \App\Models\Brand::create(['name' => 'Test Brand', 'slug' => 'test-brand']);
        $category = \App\Models\Category::create(['name' => 'Test Category', 'slug' => 'test-category']);

        $product = Product::create([
            'brand_id' => $brand->id,
            'category_id' => $category->id,
            'name' => 'Test Product',
            'slug' => 'test-product',
            'sku' => 'TEST-001',
            'status' => 'published',
        ]);

        $action = app(AddToWishlist::class);
        $action->handle($wishlist, $product, null);
        $action->handle($wishlist, $product, null);

        $this->assertDatabaseCount('wishlist_items', 1);
    }

    public function test_user_can_remove_product_from_wishlist(): void
    {
        $user = User::factory()->create();
        $wishlist = Wishlist::factory()->create(['user_id' => $user->id]);

        $brand = \App\Models\Brand::create(['name' => 'Test Brand', 'slug' => 'test-brand']);
        $category = \App\Models\Category::create(['name' => 'Test Category', 'slug' => 'test-category']);

        $product = Product::create([
            'brand_id' => $brand->id,
            'category_id' => $category->id,
            'name' => 'Test Product',
            'slug' => 'test-product',
            'sku' => 'TEST-001',
            'status' => 'published',
        ]);

        $addAction = app(AddToWishlist::class);
        $addAction->handle($wishlist, $product, null);

        $removeAction = app(RemoveFromWishlist::class);
        $removeAction->handle($wishlist, $product, null);

        $this->assertDatabaseMissing('wishlist_items', [
            'wishlist_id' => $wishlist->id,
            'product_id' => $product->id,
        ]);
    }

    public function test_user_can_remove_product_variant_from_wishlist(): void
    {
        $user = User::factory()->create();
        $wishlist = Wishlist::factory()->create(['user_id' => $user->id]);

        $brand = \App\Models\Brand::create(['name' => 'Test Brand', 'slug' => 'test-brand']);
        $category = \App\Models\Category::create(['name' => 'Test Category', 'slug' => 'test-category']);

        $product = Product::create([
            'brand_id' => $brand->id,
            'category_id' => $category->id,
            'name' => 'Test Product',
            'slug' => 'test-product',
            'sku' => 'TEST-001',
            'status' => 'published',
        ]);
        $variant = ProductVariant::create([
            'product_id' => $product->id,
            'sku' => 'VAR-001',
            'name' => 'Variant 1',
            'status' => 'active',
        ]);

        $addAction = app(AddToWishlist::class);
        $addAction->handle($wishlist, $product, $variant);

        $removeAction = app(RemoveFromWishlist::class);
        $removeAction->handle($wishlist, $product, $variant);

        $this->assertDatabaseMissing('wishlist_items', [
            'wishlist_id' => $wishlist->id,
            'product_id' => $product->id,
            'product_variant_id' => $variant->id,
        ]);
    }

    public function test_user_can_merge_wishlists(): void
    {
        $user = User::factory()->create();
        $sourceWishlist = Wishlist::factory()->create(['user_id' => $user->id, 'name' => 'Source']);
        $targetWishlist = Wishlist::factory()->create(['user_id' => $user->id, 'name' => 'Target']);

        $brand = \App\Models\Brand::create(['name' => 'Test Brand', 'slug' => 'test-brand']);
        $category = \App\Models\Category::create(['name' => 'Test Category', 'slug' => 'test-category']);

        $product1 = Product::create([
            'brand_id' => $brand->id,
            'category_id' => $category->id,
            'name' => 'Test Product 1',
            'slug' => 'test-product-1',
            'sku' => 'TEST-001',
            'status' => 'published',
        ]);
        $product2 = Product::create([
            'brand_id' => $brand->id,
            'category_id' => $category->id,
            'name' => 'Test Product 2',
            'slug' => 'test-product-2',
            'sku' => 'TEST-002',
            'status' => 'published',
        ]);

        $addAction = app(AddToWishlist::class);
        $addAction->handle($sourceWishlist, $product1, null);
        $addAction->handle($targetWishlist, $product2, null);

        $mergeAction = app(MergeWishlist::class);
        $mergeAction->handle($sourceWishlist, $targetWishlist);

        $this->assertDatabaseHas('wishlist_items', [
            'wishlist_id' => $targetWishlist->id,
            'product_id' => $product1->id,
        ]);

        $this->assertDatabaseHas('wishlist_items', [
            'wishlist_id' => $targetWishlist->id,
            'product_id' => $product2->id,
        ]);

        $this->assertDatabaseMissing('wishlist_items', [
            'wishlist_id' => $sourceWishlist->id,
        ]);
    }

    public function test_user_cannot_view_other_users_wishlist(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $wishlist = Wishlist::factory()->create(['user_id' => $otherUser->id]);

        // User should only see their own wishlists
        $this->assertEquals(0, $user->wishlists()->count());
        $this->assertEquals(1, $otherUser->wishlists()->count());
    }

    public function test_wishlist_is_created_automatically_if_not_exists(): void
    {
        $user = User::factory()->create();

        $this->assertDatabaseCount('wishlists', 0);

        // Simulate the automatic creation logic from the controller
        $wishlist = $user->wishlists()->firstOrCreate(['name' => 'My Wishlist']);

        $this->assertDatabaseCount('wishlists', 1);
        $this->assertDatabaseHas('wishlists', [
            'user_id' => $user->id,
            'name' => 'My Wishlist',
        ]);
    }
}
