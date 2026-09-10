import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Heart, ShoppingCart, Minus, Plus, Share2, Truck, Shield, RotateCcw, Star, ChevronLeft, ChevronRight, Loader2, Check } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import ProductCard from '@/components/catalog/product-card';

interface ProductImage {
    id: number;
    url: string;
    alt?: string;
    is_primary: boolean;
}

interface ProductVariant {
    id: number;
    sku: string;
    price: number;
    compare_at_price?: number;
    stock: number;
    is_active: boolean;
    images?: ProductImage[];
    optionValues?: Array<{
        id: number;
        value: string;
        option: {
            id: number;
            name: string;
        };
    }>;
}

interface ProductBrand {
    id: number;
    name: string;
    slug: string;
}

interface ProductCategory {
    id: number;
    name: string;
    slug: string;
}

interface ProductCollection {
    id: number;
    name: string;
    slug: string;
}

interface ProductMaterial {
    id: number;
    name: string;
}

interface ProductColor {
    id: number;
    name: string;
    hex_code?: string;
}

interface ProductReview {
    id: number;
    rating: number;
    title: string;
    comment: string;
    user: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    short_description?: string;
    description?: string;
    specifications?: Record<string, any>;
    care_instructions?: string;
    assembly_information?: string;
    warranty_information?: string;
    is_new: boolean;
    is_featured: boolean;
    is_bestseller: boolean;
    is_customizable: boolean;
    brand?: ProductBrand;
    category?: ProductCategory;
    collection?: ProductCollection;
    images?: ProductImage[];
    variants?: ProductVariant[];
    materials?: ProductMaterial[];
    colors?: ProductColor[];
    relatedProducts?: Product[];
    reviews?: ProductReview[];
}

interface ProductShowProps {
    product: Product;
    effectivePrices: Record<number, number>;
    productPrice: number;
}

export default function ProductShowPage({ product, effectivePrices, productPrice }: ProductShowProps) {
    const { props } = usePage();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
        product.variants && product.variants.length > 0 ? product.variants[0] : null
    );
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [addToCartSuccess, setAddToCartSuccess] = useState(false);

    const images = product.images || [];
    const selectedImage = images[selectedImageIndex];
    const currentPrice = selectedVariant ? effectivePrices[selectedVariant.id] : productPrice;
    const comparePrice = selectedVariant?.compare_at_price;

    const handlePreviousImage = () => {
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    const handleQuantityChange = (value: number) => {
        if (value >= 1 && value <= (selectedVariant?.stock || 99)) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        if (!stockStatus.available) return;

        setIsAddingToCart(true);
        setAddToCartSuccess(false);

        const formData = {
            product_id: product.id,
            quantity,
        };

        if (selectedVariant) {
            formData.product_variant_id = selectedVariant.id;
        }

        // Get cart ID from page props or use a default
        // In production, this should come from the current user's cart or session
        const cartId = (props as any).cart?.id || 1;

        router.post(
            `/carts/${cartId}/items`,
            formData,
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsAddingToCart(false);
                    setAddToCartSuccess(true);
                    setTimeout(() => setAddToCartSuccess(false), 3000);
                },
                onError: (errors) => {
                    setIsAddingToCart(false);
                    console.error('Add to cart error:', errors);
                },
            }
        );
    };

    const handleWishlistToggle = () => {
        // TODO: Implement wishlist functionality when wishlist is ready
        setIsWishlisted(!isWishlisted);
        console.log('Toggle wishlist:', { product_id: product.id, isWishlisted: !isWishlisted });
        alert('Wishlist functionality will be implemented in prompt 8');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const getStockStatus = () => {
        if (!selectedVariant) return { text: 'Out of Stock', available: false };
        if (selectedVariant.stock > 10) return { text: 'In Stock', available: true };
        if (selectedVariant.stock > 0) return { text: `Only ${selectedVariant.stock} left`, available: true };
        return { text: 'Out of Stock', available: false };
    };

    const stockStatus = getStockStatus();
    const averageRating = product.reviews && product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
                <a href="/" className="hover:text-foreground">Home</a>
                <span>/</span>
                <a href="/catalog" className="hover:text-foreground">Catalog</a>
                {product.category && (
                    <>
                        <span>/</span>
                        <a href={`/catalog?category=${product.category.slug}`} className="hover:text-foreground">
                            {product.category.name}
                        </a>
                    </>
                )}
                <span>/</span>
                <span className="text-foreground font-medium">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square bg-muted/30 rounded-lg overflow-hidden">
                        {selectedImage ? (
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.alt || product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                No image available
                            </div>
                        )}
                        
                        {/* Image Navigation */}
                        {images.length > 1 && (
                            <>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur"
                                    onClick={handlePreviousImage}
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur"
                                    onClick={handleNextImage}
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </>
                        )}

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {product.is_new && (
                                <Badge className="bg-primary text-primary-foreground">New</Badge>
                            )}
                            {product.is_featured && (
                                <Badge variant="secondary">Featured</Badge>
                            )}
                            {product.is_bestseller && (
                                <Badge variant="outline">Bestseller</Badge>
                            )}
                        </div>
                    </div>

                    {/* Thumbnail Gallery */}
                    {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                            {images.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                                        selectedImageIndex === index
                                            ? 'border-primary'
                                            : 'border-transparent hover:border-muted-foreground/50'
                                    }`}
                                    aria-label={`View image ${index + 1}`}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.alt || `${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Information */}
                <div className="space-y-6">
                    {/* Brand and Category */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {product.brand && (
                            <>
                                <a href={`/catalog?brand=${product.brand.slug}`} className="hover:text-foreground">
                                    {product.brand.name}
                                </a>
                                <span>•</span>
                            </>
                        )}
                        {product.category && (
                            <a href={`/catalog?category=${product.category.slug}`} className="hover:text-foreground">
                                {product.category.name}
                            </a>
                        )}
                    </div>

                    {/* Product Name */}
                    <h1 className="text-3xl font-bold">{product.name}</h1>

                    {/* SKU */}
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>

                    {/* Rating */}
                    {product.reviews && product.reviews.length > 0 && (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < Math.floor(averageRating)
                                                ? 'fill-primary text-primary'
                                                : 'fill-muted text-muted'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {averageRating.toFixed(1)} ({product.reviews.length} reviews)
                            </span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold">${currentPrice.toFixed(2)}</span>
                        {comparePrice && comparePrice > currentPrice && (
                            <span className="text-lg text-muted-foreground line-through">
                                ${comparePrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* Short Description */}
                    {product.short_description && (
                        <p className="text-muted-foreground">{product.short_description}</p>
                    )}

                    <Separator />

                    {/* Variant Selection */}
                    {product.variants && product.variants.length > 1 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold">Select Variant</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {product.variants.map((variant) => (
                                    <Button
                                        key={variant.id}
                                        variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                                        onClick={() => setSelectedVariant(variant)}
                                        disabled={!variant.is_active || variant.stock === 0}
                                        className="justify-start"
                                    >
                                        {variant.sku}
                                        {variant.stock === 0 && <span className="ml-auto text-xs">Out of stock</span>}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Materials */}
                    {product.materials && product.materials.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="font-semibold">Materials</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.materials.map((material) => (
                                    <Badge key={material.id} variant="secondary">
                                        {material.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Colors */}
                    {product.colors && product.colors.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="font-semibold">Colors</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((color) => (
                                    <div
                                        key={color.id}
                                        className="flex items-center gap-2 px-3 py-1 rounded-full border"
                                        title={color.name}
                                    >
                                        {color.hex_code && (
                                            <div
                                                className="w-4 h-4 rounded-full border"
                                                style={{ backgroundColor: color.hex_code }}
                                            />
                                        )}
                                        <span className="text-sm">{color.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* Quantity and Actions */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                    min="1"
                                    max={selectedVariant?.stock || 99}
                                    className="w-16 text-center border-0 focus-visible:ring-0"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={quantity >= (selectedVariant?.stock || 99)}
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex-1">
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={!stockStatus.available || isAddingToCart}
                                    className="w-full"
                                    size="lg"
                                >
                                    {isAddingToCart ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Adding...
                                        </>
                                    ) : addToCartSuccess ? (
                                        <>
                                            <Check className="h-4 w-4 mr-2" />
                                            Added to Cart
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

                        {/* Stock Status */}
                        <p className={`text-sm ${stockStatus.available ? 'text-green-600' : 'text-red-600'}`}>
                            {stockStatus.text}
                        </p>

                        {/* Secondary Actions */}
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={handleWishlistToggle}
                                className={isWishlisted ? 'text-red-500 border-red-500' : ''}
                            >
                                <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                            </Button>
                            <Button variant="outline" onClick={handleShare}>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                        <div className="flex items-center gap-2 text-sm">
                            <Truck className="h-5 w-5 text-muted-foreground" />
                            <span>Free shipping</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Shield className="h-5 w-5 text-muted-foreground" />
                            <span>2-year warranty</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <RotateCcw className="h-5 w-5 text-muted-foreground" />
                            <span>30-day returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mb-12">
                <div className="border-b">
                    <div className="flex gap-8">
                        <button className="pb-4 border-b-2 border-primary font-medium">Description</button>
                        <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
                            Specifications
                        </button>
                        <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
                            Care Instructions
                        </button>
                    </div>
                </div>

                <div className="py-6">
                    {product.description && (
                        <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            {product.relatedProducts && product.relatedProducts.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {product.relatedProducts.map((relatedProduct) => (
                            <ProductCard key={relatedProduct.id} product={relatedProduct} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
