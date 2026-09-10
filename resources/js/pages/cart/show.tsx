import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import EmptyState from '@/components/ui/empty-state';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { router } from '@inertiajs/react';

interface ProductImage {
    id: number;
    url: string;
    alt?: string;
    is_primary: boolean;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    short_description?: string;
    images?: ProductImage[];
}

interface ProductVariant {
    id: number;
    sku: string;
    price?: number;
    compare_at_price?: number;
}

interface CartItem {
    id: number;
    quantity: number;
    unit_price: number;
    product: Product;
    variant?: ProductVariant;
}

interface Cart {
    id: number;
    items: CartItem[];
}

interface CartShowProps {
    cart: Cart;
}

export default function CartShowPage({ cart }: CartShowProps) {
    const [updatingQuantities, setUpdatingQuantities] = useState<Record<number, boolean>>({});
    const [removingItems, setRemovingItems] = useState<Record<number, boolean>>({});

    const cartItems = cart.items || [];
    const isEmpty = cartItems.length === 0;

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal(); // Add shipping, tax, etc. when available
    };

    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1 || newQuantity > 99) return;

        setUpdatingQuantities(prev => ({ ...prev, [itemId]: true }));

        router.patch(
            `/cart-items/${itemId}`,
            { quantity: newQuantity },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setUpdatingQuantities(prev => ({ ...prev, [itemId]: false }));
                },
                onError: () => {
                    setUpdatingQuantities(prev => ({ ...prev, [itemId]: false }));
                },
            }
        );
    };

    const handleRemoveItem = (itemId: number) => {
        if (!confirm('Are you sure you want to remove this item from your cart?')) return;

        setRemovingItems(prev => ({ ...prev, [itemId]: true }));

        router.delete(
            `/cart-items/${itemId}`,
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setRemovingItems(prev => ({ ...prev, [itemId]: false }));
                },
                onError: () => {
                    setRemovingItems(prev => ({ ...prev, [itemId]: false }));
                },
            }
        );
    };

    const getProductImage = (item: CartItem) => {
        if (item.variant?.images && item.variant.images.length > 0) {
            const primaryImage = item.variant.images.find(img => img.is_primary) || item.variant.images[0];
            return primaryImage?.url;
        }
        if (item.product.images && item.product.images.length > 0) {
            const primaryImage = item.product.images.find(img => img.is_primary) || item.product.images[0];
            return primaryImage?.url;
        }
        return '/placeholder-product.jpg';
    };

    const getProductPrice = (item: CartItem) => {
        return item.unit_price;
    };

    const getItemTotal = (item: CartItem) => {
        return item.unit_price * item.quantity;
    };

    if (isEmpty) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>
                    <EmptyState
                        icon="shopping-cart"
                        title="Your cart is empty"
                        description="Looks like you haven't added any items to your cart yet."
                        action={
                            <a href="/catalog" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                Continue Shopping
                            </a>
                        }
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Shopping Cart</h1>
                <p className="text-muted-foreground">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => {
                        const productImage = getProductImage(item);
                        const productPrice = getProductPrice(item);
                        const itemTotal = getItemTotal(item);
                        const isUpdating = updatingQuantities[item.id];
                        const isRemoving = removingItems[item.id];

                        return (
                            <Card key={item.id} className="overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex flex-col sm:flex-row">
                                        {/* Product Image */}
                                        <div className="sm:w-32 sm:h-32 aspect-square bg-muted/30">
                                            <img
                                                src={productImage}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 p-4 flex flex-col justify-between">
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold mb-1">
                                                            <a
                                                                href={`/products/${item.product.slug}`}
                                                                className="hover:text-primary transition-colors"
                                                            >
                                                                {item.product.name}
                                                            </a>
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            SKU: {item.variant?.sku || item.product.sku}
                                                        </p>
                                                        {item.product.short_description && (
                                                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                                                {item.product.short_description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        disabled={isRemoving}
                                                        aria-label="Remove item"
                                                    >
                                                        {isRemoving ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    {/* Quantity Control */}
                                                    <div className="flex items-center border rounded-md">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1 || isUpdating}
                                                            aria-label="Decrease quantity"
                                                        >
                                                            {isUpdating ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <Minus className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => {
                                                                const value = parseInt(e.target.value) || 1;
                                                                if (value !== item.quantity && value >= 1 && value <= 99) {
                                                                    handleQuantityChange(item.id, value);
                                                                }
                                                            }}
                                                            min="1"
                                                            max="99"
                                                            className="w-16 text-center border-0 focus-visible:ring-0"
                                                            disabled={isUpdating}
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            disabled={item.quantity >= 99 || isUpdating}
                                                            aria-label="Increase quantity"
                                                        >
                                                            {isUpdating ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <Plus className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="text-right">
                                                        <p className="font-bold">${productPrice.toFixed(2)}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            ${itemTotal.toFixed(2)} total
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-4">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-lg font-semibold">Order Summary</h2>
                            
                            <Separator />

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-medium">Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span className="font-medium">Calculated at checkout</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between">
                                <span className="font-semibold">Total</span>
                                <span className="font-bold text-lg">${calculateTotal().toFixed(2)}</span>
                            </div>

                            <div className="space-y-2 pt-2">
                                <Button className="w-full" size="lg" asChild>
                                    <a href="/checkout">
                                        <ArrowRight className="h-4 w-4 mr-2" />
                                        Proceed to Checkout
                                    </a>
                                </Button>
                            </div>

                            <Separator />

                            <a
                                href="/catalog"
                                className="block text-center text-sm text-primary hover:underline"
                            >
                                <ShoppingBag className="h-4 w-4 inline mr-1" />
                                Continue Shopping
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
