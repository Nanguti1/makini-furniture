<?php

namespace Tests\Feature\Account;

use App\Actions\Reviews\CreateReview;
use App\Actions\Reviews\DeleteReview;
use App\Actions\Reviews\UpdateReview;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use App\Queries\Account\ReviewQuery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_their_reviews(): void
    {
        $user = User::factory()->create();

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

        Review::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'rating' => 5,
            'title' => 'Great product',
            'body' => 'I really love this product',
            'status' => 'approved',
            'verified_purchase' => true,
        ]);

        $this->assertEquals(1, $user->reviews()->count());
    }

    public function test_user_can_create_review_for_purchased_product(): void
    {
        $user = User::factory()->create();

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

        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-001',
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => 1000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 160.00,
            'grand_total' => 1660.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'sku' => 'SKU-001',
            'product_name' => 'Test Product',
            'quantity' => 1,
            'unit_price' => 1000.00,
            'discount_amount' => 0,
            'total' => 1000.00,
        ]);

        $action = app(CreateReview::class);
        $review = $action->handle($user, $product, [
            'rating' => 5,
            'title' => 'Great product',
            'body' => 'I really love this product',
        ]);

        $this->assertDatabaseHas('reviews', [
            'user_id' => $user->id,
            'product_id' => $product->id,
            'rating' => 5,
            'status' => 'pending',
        ]);

        $this->assertTrue($review->verified_purchase);
    }

    public function test_user_cannot_review_product_not_purchased(): void
    {
        $user = User::factory()->create();

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

        $this->expectException(\Illuminate\Http\Exceptions\HttpResponseException::class);

        $action = app(CreateReview::class);
        $action->handle($user, $product, [
            'rating' => 5,
            'title' => 'Great product',
            'body' => 'I really love this product',
        ]);
    }

    public function test_user_cannot_review_product_from_incomplete_order(): void
    {
        $user = User::factory()->create();

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

        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-001',
            'status' => 'pending',
            'currency' => 'KES',
            'subtotal' => 1000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 160.00,
            'grand_total' => 1660.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'sku' => 'SKU-001',
            'product_name' => 'Test Product',
            'quantity' => 1,
            'unit_price' => 1000.00,
            'discount_amount' => 0,
            'total' => 1000.00,
        ]);

        $this->expectException(\Illuminate\Http\Exceptions\HttpResponseException::class);

        $action = app(CreateReview::class);
        $action->handle($user, $product, [
            'rating' => 5,
            'title' => 'Great product',
            'body' => 'I really love this product',
        ]);
    }

    public function test_user_cannot_create_duplicate_review(): void
    {
        $user = User::factory()->create();

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

        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-001',
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => 1000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 160.00,
            'grand_total' => 1660.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'sku' => 'SKU-001',
            'product_name' => 'Test Product',
            'quantity' => 1,
            'unit_price' => 1000.00,
            'discount_amount' => 0,
            'total' => 1000.00,
        ]);

        $action = app(CreateReview::class);
        $action->handle($user, $product, [
            'rating' => 5,
            'title' => 'Great product',
            'body' => 'I really love this product',
        ]);

        $this->expectException(\Illuminate\Http\Exceptions\HttpResponseException::class);

        $action->handle($user, $product, [
            'rating' => 4,
            'title' => 'Updated review',
            'body' => 'Updated review body',
        ]);
    }

    public function test_user_can_update_their_review(): void
    {
        $user = User::factory()->create();

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

        $review = Review::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'rating' => 5,
            'title' => 'Original title',
            'body' => 'Original body',
            'status' => 'approved',
            'verified_purchase' => true,
        ]);

        $action = app(UpdateReview::class);
        $action->handle($review, [
            'rating' => 4,
            'title' => 'Updated title',
            'body' => 'Updated body',
        ]);

        $this->assertDatabaseHas('reviews', [
            'id' => $review->id,
            'rating' => 4,
            'title' => 'Updated title',
            'body' => 'Updated body',
        ]);
    }

    public function test_user_can_delete_their_review(): void
    {
        $user = User::factory()->create();

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

        $review = Review::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'rating' => 5,
            'title' => 'Original title',
            'body' => 'Original body',
            'status' => 'approved',
            'verified_purchase' => true,
        ]);

        $action = app(DeleteReview::class);
        $action->handle($review);

        $this->assertDatabaseMissing('reviews', [
            'id' => $review->id,
        ]);
    }

    public function test_user_cannot_update_other_users_review(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

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

        $review = Review::create([
            'user_id' => $otherUser->id,
            'product_id' => $product->id,
            'rating' => 5,
            'title' => 'Original title',
            'body' => 'Original body',
            'status' => 'approved',
            'verified_purchase' => true,
        ]);

        $response = $this
            ->actingAs($user)
            ->put(route('account.reviews.update', $review), [
                'rating' => 1,
                'title' => 'Hacked',
                'body' => 'Hacked review',
            ]);

        $response->assertForbidden();
    }

    public function test_user_cannot_delete_other_users_review(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

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

        $review = Review::create([
            'user_id' => $otherUser->id,
            'product_id' => $product->id,
            'rating' => 5,
            'title' => 'Original title',
            'body' => 'Original body',
            'status' => 'approved',
            'verified_purchase' => true,
        ]);

        $response = $this
            ->actingAs($user)
            ->delete(route('account.reviews.destroy', $review));

        $response->assertForbidden();
        $this->assertDatabaseHas('reviews', ['id' => $review->id]);
    }

    public function test_review_query_returns_only_user_reviews(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

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

        $userReview = Review::create([
            'user_id' => $user->id,
            'product_id' => $product1->id,
            'rating' => 5,
            'title' => 'User review',
            'body' => 'User review body',
            'status' => 'approved',
            'verified_purchase' => true,
        ]);

        $otherUserReview = Review::create([
            'user_id' => $otherUser->id,
            'product_id' => $product2->id,
            'rating' => 4,
            'title' => 'Other user review',
            'body' => 'Other user review body',
            'status' => 'approved',
            'verified_purchase' => true,
        ]);

        $query = app(ReviewQuery::class);
        $reviews = $query->forUser($user);

        $this->assertCount(1, $reviews);
        $this->assertEquals($userReview->id, $reviews->first()->id);
    }

    public function test_review_query_can_find_user_review(): void
    {
        $user = User::factory()->create();

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

        $review = Review::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'rating' => 5,
            'title' => 'User review',
            'body' => 'User review body',
            'status' => 'approved',
            'verified_purchase' => true,
        ]);

        $query = app(ReviewQuery::class);
        $foundReview = $query->findForUser($user, $review->id);

        $this->assertNotNull($foundReview);
        $this->assertEquals($review->id, $foundReview->id);
    }

    public function test_review_query_returns_null_for_other_users_review(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

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

        $review = Review::create([
            'user_id' => $otherUser->id,
            'product_id' => $product->id,
            'rating' => 5,
            'title' => 'Other user review',
            'body' => 'Other user review body',
            'status' => 'approved',
            'verified_purchase' => true,
        ]);

        $query = app(ReviewQuery::class);
        $foundReview = $query->findForUser($user, $review->id);

        $this->assertNull($foundReview);
    }

    public function test_eligible_products_excludes_already_reviewed(): void
    {
        $user = User::factory()->create();

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

        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-001',
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => 2000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 320.00,
            'grand_total' => 2820.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product1->id,
            'sku' => 'SKU-001',
            'product_name' => 'Test Product 1',
            'quantity' => 1,
            'unit_price' => 1000.00,
            'discount_amount' => 0,
            'total' => 1000.00,
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product2->id,
            'sku' => 'SKU-002',
            'product_name' => 'Test Product 2',
            'quantity' => 1,
            'unit_price' => 1000.00,
            'discount_amount' => 0,
            'total' => 1000.00,
        ]);

        Review::create([
            'user_id' => $user->id,
            'product_id' => $product1->id,
            'rating' => 5,
            'title' => 'User review',
            'body' => 'User review body',
            'status' => 'approved',
            'verified_purchase' => true,
        ]);

        $query = app(ReviewQuery::class);
        $eligibleProducts = $query->getEligibleProducts($user);

        $this->assertCount(1, $eligibleProducts);
        $this->assertEquals($product2->id, $eligibleProducts->first()->id);
    }

    public function test_eligible_products_only_includes_completed_orders(): void
    {
        $user = User::factory()->create();

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

        $completedOrder = Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-001',
            'status' => 'completed',
            'currency' => 'KES',
            'subtotal' => 1000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 160.00,
            'grand_total' => 1660.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        $pendingOrder = Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-002',
            'status' => 'pending',
            'currency' => 'KES',
            'subtotal' => 1000.00,
            'discount_total' => 0,
            'shipping_total' => 500.00,
            'tax_total' => 160.00,
            'grand_total' => 1660.00,
            'billing_first_name' => 'John',
            'billing_last_name' => 'Doe',
            'billing_phone' => '+254712345678',
            'billing_address_line_1' => '123 Main St',
            'billing_city' => 'Nairobi',
            'billing_state' => 'Nairobi',
            'billing_postal_code' => '00100',
            'billing_country' => 'KE',
            'shipping_first_name' => 'John',
            'shipping_last_name' => 'Doe',
            'shipping_phone' => '+254712345678',
            'shipping_address_line_1' => '123 Main St',
            'shipping_city' => 'Nairobi',
            'shipping_state' => 'Nairobi',
            'shipping_postal_code' => '00100',
            'shipping_country' => 'KE',
        ]);

        OrderItem::create([
            'order_id' => $completedOrder->id,
            'product_id' => $product1->id,
            'sku' => 'SKU-001',
            'product_name' => 'Test Product 1',
            'quantity' => 1,
            'unit_price' => 1000.00,
            'discount_amount' => 0,
            'total' => 1000.00,
        ]);

        OrderItem::create([
            'order_id' => $pendingOrder->id,
            'product_id' => $product2->id,
            'sku' => 'SKU-002',
            'product_name' => 'Test Product 2',
            'quantity' => 1,
            'unit_price' => 1000.00,
            'discount_amount' => 0,
            'total' => 1000.00,
        ]);

        $query = app(ReviewQuery::class);
        $eligibleProducts = $query->getEligibleProducts($user);

        $this->assertCount(1, $eligibleProducts);
        $this->assertEquals($product1->id, $eligibleProducts->first()->id);
    }
}
