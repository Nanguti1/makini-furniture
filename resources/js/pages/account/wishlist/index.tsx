import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import EmptyState from '@/components/ui/empty-state';
import { Heart, Trash2, ShoppingCart, Loader2, ShoppingBag } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';

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
    price?: number;
}

interface ProductVariant {
    id: number;
    sku: string;
    price?: number;
    compare_at_price?: number;
}

interface WishlistItem {
    id: number;
    product: Product;
    variant?: ProductVariant;
}

interface Wishlist {
    id: number;
    name: string;
    items: WishlistItem[];
}

interface WishlistIndexProps {
    wishlist: Wishlist;
}

export default function AccountWishlistIndexPage({ wishlist }: WishlistIndexProps) {
    const { props } = usePage();
    const [removingItems, setRemovingItems] = useState<Record<number, boolean>>({});
    const [addingToCart, setAddingToCart] = useState<Record<number, boolean>>({});

    const wishlistItems = wishlist?.items || [];
    const isEmpty = wishlistItems.length === 0;

    const handleRemoveItem = (itemId: number, productId: number, variantId?: number) => {
        if (!confirm('Are you sure you want to remove this item from your wishlist?')) return;

        setRemovingItems(prev => ({ ...prev, [itemId]: true }));

        router.post(
            '/account/wishlist/remove',
            {
                product_id: productId,
                variant_id: variantId,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setRemovingItems(prev => ({ ...prev, [itemId]: false }));
                },
                onError: (errors) => {
                    setRemovingItems(prev => ({ ...prev, [itemId]: false }));
                    console.error('Remove from wishlist error:', errors);
                },
            }
        );
    };

    const handleAddToCart = (itemId: number, productId: number, variantId?: number) => {
        setAddingToCart(prev => ({ ...prev, [itemId]: true }));

        // Get cart ID from page props or use a default
        const cartId = (props as any).cart?.id || 1;

        const formData: any = {
            product_id: productId,
            quantity: 1,
        };

        if (variantId) {
            formData.product_variant_id = variantId;
        }

        router.post(
            `/carts/${cartId}/items`,
            formData,
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setAddingToCart(prev => ({ ...prev, [itemId]: false }));
                    // Optionally remove from wishlist after adding to cart
                    // handleRemoveItem(itemId, productId, variantId);
                },
                onError: (errors) => {
                    setAddingToCart(prev => ({ ...prev, [itemId]: false }));
                    console.error('Add to cart error:', errors);
                },
            }
        );
    };

    const getProductPrice = (item: WishlistItem) => {
        return item.variant?.price || item.product.price;
    };

    if (isEmpty) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold mb-8">My Wishlist</h1>
                    <EmptyState
                        icon="inbox"
                        title="Your wishlist is empty"
                        description="Save your favorite items by clicking the heart icon on any product."
                        action={
                            <a href="/catalog" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                Start Shopping
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
                <h1 className="text-2xl md:text-3xl font-bold mb-2">My Wishlist</h1>
                <p className="text-muted-foreground">
                    {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {wishlistItems.map((item) => {
                    const productPrice = getProductPrice(item);
                    const isRemoving = removingItems[item.id];
                    const isAddingToCart = addingToCart[item.id];

                    return (
                        <Card key={item.id} className="overflow-hidden group">
                            <CardContent className="p-0">
                                <div className="relative">
                                    {/* Product Image */}
                                    <div className="aspect-square bg-muted/30">
                                        {item.product.images && item.product.images.length > 0 ? (
                                            <img
                                                src={item.product.images.find(img => img.is_primary)?.url || item.product.images[0].url}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                No image
                                            </div>
                                        )}
                                    </div>

                                    {/* Remove Button */}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 bg-background/80 backdrop-blur hover:bg-background"
                                        onClick={() => handleRemoveItem(item.id, item.product.id, item.variant?.id)}
                                        disabled={isRemoving}
                                        aria-label="Remove from wishlist"
                                    >
                                        {isRemoving ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>

                                <div className="p-4">
                                    {/* Product Name */}
                                    <h3 className="font-semibold mb-2 line-clamp-2">
                                        <a
                                            href={`/products/${item.product.slug}`}
                                            className="hover:text-primary transition-colors"
                                        >
                                            {item.product.name}
                                        </a>
                                    </h3>

                                    {/* SKU */}
                                    <p className="text-sm text-muted-foreground mb-2">
                                        SKU: {item.variant?.sku || item.product.sku}
                                    </p>

                                    {/* Price */}
                                    {productPrice && (
                                        <p className="font-bold text-lg mb-4">
                                            ${productPrice.toFixed(2)}
                                        </p>
                                    )}

                                    {/* Actions */}
                                    <div className="space-y-2">
                                        <Button
                                            onClick={() => handleAddToCart(item.id, item.product.id, item.variant?.id)}
                                            disabled={isAddingToCart}
                                            className="w-full"
                                        >
                                            {isAddingToCart ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Adding...
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                    Add to Cart
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
