import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface ProductImage {
    id: number;
    url: string;
    is_primary: boolean;
}

interface ProductBrand {
    id: number;
    name: string;
    slug: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price?: number;
    sku?: string;
    brand?: ProductBrand;
    images?: ProductImage[];
    is_new?: boolean;
    is_featured?: boolean;
    is_bestseller?: boolean;
}

interface ProductCardProps {
    product: Product;
    showWishlist?: boolean;
    showAddToCart?: boolean;
}

export default function ProductCard({
    product,
    showWishlist = true,
    showAddToCart = true,
}: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

    const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
    const imageUrl = primaryImage?.url || '/placeholder-product.jpg';

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsTogglingWishlist(true);

        const formData = {
            product_id: product.id,
        };

        if (isWishlisted) {
            router.post(
                '/account/wishlist/remove',
                formData,
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsWishlisted(false);
                        setIsTogglingWishlist(false);
                    },
                    onError: (errors) => {
                        setIsTogglingWishlist(false);
                        console.error('Remove from wishlist error:', errors);
                    },
                }
            );
        } else {
            router.post(
                '/account/wishlist/add',
                formData,
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsWishlisted(true);
                        setIsTogglingWishlist(false);
                    },
                    onError: (errors) => {
                        setIsTogglingWishlist(false);
                        console.error('Add to wishlist error:', errors);
                    },
                }
            );
        }
    };

    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
                <div className="relative aspect-square bg-muted/30 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                    {product.is_new && (
                        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                            New
                        </Badge>
                    )}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {showWishlist && (
                            <Button
                                size="icon"
                                variant="secondary"
                                className={`h-8 w-8 rounded-full bg-background/80 backdrop-blur ${isWishlisted ? 'text-red-500' : ''}`}
                                onClick={handleWishlistToggle}
                                disabled={isTogglingWishlist}
                                aria-label="Add to wishlist"
                            >
                                {isTogglingWishlist ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                                )}
                            </Button>
                        )}
                    </div>
                </div>
                <div className="p-4">
                    {product.brand && (
                        <p className="text-sm text-muted-foreground mb-1">{product.brand.name}</p>
                    )}
                    <h3 className="font-semibold mb-2 line-clamp-2">
                        <a 
                            href={product.slug ? `/products/${product.slug}` : '#'} 
                            className="hover:text-primary transition-colors"
                        >
                            {product.name}
                        </a>
                    </h3>
                    <div className="flex items-center justify-between">
                        {product.price !== undefined ? (
                            <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                        ) : (
                            <p className="font-bold text-lg">View Details</p>
                        )}
                        {showAddToCart && (
                            <Button size="sm" variant="outline" aria-label="Add to cart">
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
