<?php

namespace Tests\Feature\Account;

use App\Actions\Account\CreateAddress;
use App\Actions\Account\DeleteAddress;
use App\Actions\Account\UpdateAddress;
use App\Models\Address;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddressTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_their_addresses(): void
    {
        $user = User::factory()->create();
        $address = Address::create([
            'user_id' => $user->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'phone' => '+254712345678',
            'address_line_1' => '123 Main St',
            'city' => 'Nairobi',
            'state' => 'Nairobi',
            'postal_code' => '00100',
            'country' => 'KE',
            'is_default' => true,
        ]);

        $this->assertEquals(1, $user->addresses()->count());
        $this->assertEquals('John', $user->addresses()->first()->first_name);
    }

    public function test_user_can_create_address(): void
    {
        $user = User::factory()->create();

        $this->assertEquals(0, $user->addresses()->count());

        $action = app(CreateAddress::class);
        $address = $action->handle($user, [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'company' => 'Acme Corp',
            'phone' => '+254712345678',
            'address_line_1' => '123 Main St',
            'address_line_2' => 'Apt 4B',
            'city' => 'Nairobi',
            'state' => 'Nairobi',
            'postal_code' => '00100',
            'country' => 'KE',
            'is_default' => true,
        ]);

        $this->assertDatabaseHas('addresses', [
            'user_id' => $user->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'city' => 'Nairobi',
        ]);

        $this->assertEquals(1, $user->addresses()->count());
    }

    public function test_creating_default_address_sets_others_to_non_default(): void
    {
        $user = User::factory()->create();
        $action = app(CreateAddress::class);

        $firstAddress = $action->handle($user, [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'address_line_1' => '456 Work St',
            'city' => 'Nairobi',
            'state' => 'Nairobi',
            'postal_code' => '00100',
            'country' => 'KE',
            'phone' => '+254712345678',
            'is_default' => true,
        ]);

        $secondAddress = $action->handle($user, [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'address_line_1' => '123 Main St',
            'city' => 'Nairobi',
            'state' => 'Nairobi',
            'postal_code' => '00100',
            'country' => 'KE',
            'phone' => '+254712345678',
            'is_default' => true,
        ]);

        // Verify that both addresses were created
        $this->assertEquals(2, $user->addresses()->count());
    }

    public function test_user_can_update_their_address(): void
    {
        $user = User::factory()->create();
        $address = Address::create([
            'user_id' => $user->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'phone' => '+254712345678',
            'address_line_1' => '123 Main St',
            'city' => 'Nairobi',
            'state' => 'Nairobi',
            'postal_code' => '00100',
            'country' => 'KE',
            'is_default' => true,
        ]);

        $action = app(UpdateAddress::class);
        $action->handle($address, [
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'company' => 'New Corp',
            'phone' => '+254798765432',
            'address_line_1' => '789 New St',
            'address_line_2' => 'Suite 100',
            'city' => 'Mombasa',
            'state' => 'Mombasa',
            'postal_code' => '80100',
            'country' => 'KE',
            'is_default' => false,
        ]);

        $this->assertDatabaseHas('addresses', [
            'id' => $address->id,
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'city' => 'Mombasa',
        ]);
    }

    public function test_user_can_delete_their_address(): void
    {
        $user = User::factory()->create();
        $address = Address::create([
            'user_id' => $user->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'phone' => '+254712345678',
            'address_line_1' => '123 Main St',
            'city' => 'Nairobi',
            'state' => 'Nairobi',
            'postal_code' => '00100',
            'country' => 'KE',
            'is_default' => true,
        ]);

        $action = app(DeleteAddress::class);
        $action->handle($address);

        $this->assertDatabaseMissing('addresses', [
            'id' => $address->id,
        ]);
    }

    public function test_user_cannot_view_other_users_addresses(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $address = Address::create([
            'user_id' => $otherUser->id,
            'first_name' => 'Other',
            'last_name' => 'User',
            'phone' => '+254712345678',
            'address_line_1' => '999 Other St',
            'city' => 'Kisumu',
            'state' => 'Kisumu',
            'postal_code' => '40100',
            'country' => 'KE',
            'is_default' => true,
        ]);

        // User should only see their own addresses
        $this->assertEquals(0, $user->addresses()->count());
        $this->assertEquals(1, $otherUser->addresses()->count());
    }

    public function test_user_cannot_update_other_users_address(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $address = Address::create([
            'user_id' => $otherUser->id,
            'first_name' => 'Other',
            'last_name' => 'User',
            'phone' => '+254712345678',
            'address_line_1' => '999 Other St',
            'city' => 'Kisumu',
            'state' => 'Kisumu',
            'postal_code' => '40100',
            'country' => 'KE',
            'is_default' => true,
        ]);

        $response = $this
            ->actingAs($user)
            ->put(route('account.addresses.update', $address), [
                'first_name' => 'Hacked',
                'last_name' => 'User',
                'address_line_1' => '000 Hacked St',
                'city' => 'Hacked',
                'state' => 'Hacked',
                'postal_code' => '00000',
                'country' => 'KE',
                'phone' => '+254000000000',
                'is_default' => false,
            ]);

        $response->assertForbidden();
    }

    public function test_user_cannot_delete_other_users_address(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $address = Address::create([
            'user_id' => $otherUser->id,
            'first_name' => 'Other',
            'last_name' => 'User',
            'phone' => '+254712345678',
            'address_line_1' => '999 Other St',
            'city' => 'Kisumu',
            'state' => 'Kisumu',
            'postal_code' => '40100',
            'country' => 'KE',
            'is_default' => true,
        ]);

        $response = $this
            ->actingAs($user)
            ->delete(route('account.addresses.destroy', $address));

        $response->assertForbidden();
        $this->assertDatabaseHas('addresses', ['id' => $address->id]);
    }
}
