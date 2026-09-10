import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, Loader2, ShoppingBag, MapPin, CreditCard, ArrowRight } from 'lucide-react';
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
    images?: ProductImage[];
}

interface ProductVariant {
    id: number;
    sku: string;
    name?: string;
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

interface Address {
    id: number;
    first_name: string;
    last_name: string;
    company?: string;
    phone?: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
    is_default: boolean;
}

interface CheckoutCreateProps {
    cart: Cart;
    addresses: Address[];
    defaultCurrency: string;
}

export default function CheckoutCreatePage({ cart, addresses, defaultCurrency }: CheckoutCreateProps) {
    const { props } = usePage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [billingAddressId, setBillingAddressId] = useState<number | null>(
        addresses.find(a => a.is_default)?.id || (addresses.length > 0 ? addresses[0].id : null)
    );
    const [shippingAddressId, setShippingAddressId] = useState<number | null>(
        addresses.find(a => a.is_default)?.id || (addresses.length > 0 ? addresses[0].id : null)
    );
    const [useSameAddress, setUseSameAddress] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState<string>('manual');

    const cartItems = cart.items || [];
    const isEmpty = cartItems.length === 0;

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal(); // Backend will calculate shipping, tax, etc.
    };

    const formatAddress = (address: Address) => {
        const parts = [
            `${address.first_name} ${address.last_name}`,
            address.company,
            address.address_line_1,
            address.address_line_2,
            `${address.city}, ${address.state} ${address.postal_code}`,
            address.country,
        ].filter(Boolean);
        return parts.join(', ');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        if (!billingAddressId || !shippingAddressId) {
            setErrors({ address: 'Please select addresses for checkout' });
            setIsSubmitting(false);
            return;
        }

        if (!paymentMethod) {
            setErrors({ payment: 'Please select a payment method' });
            setIsSubmitting(false);
            return;
        }

        const formData = {
            cart_id: cart.id,
            billing_address_id: billingAddressId,
            shipping_address_id: shippingAddressId,
            payment_method: paymentMethod,
            currency: defaultCurrency,
        };

        try {
            await router.post('/orders', formData, {
                onSuccess: () => {
                    setIsSubmitting(false);
                },
                onError: (errors) => {
                    setIsSubmitting(false);
                    setErrors(errors);
                },
            });
        } catch (error) {
            setIsSubmitting(false);
            console.error('Checkout error:', error);
        }
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

    if (isEmpty) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-6">
                        Add some items to your cart before proceeding to checkout.
                    </p>
                    <Button asChild>
                        <a href="/catalog">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Continue Shopping
                        </a>
                    </Button>
                </div>
            </div>
        );
    }

    if (addresses.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardContent className="py-12 text-center">
                            <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h1 className="text-2xl font-bold mb-2">No addresses found</h1>
                            <p className="text-muted-foreground mb-6">
                                You need to add an address before you can complete your purchase.
                            </p>
                            <Button asChild>
                                <a href="/account/addresses">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Add Address
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Checkout</h1>
                <p className="text-muted-foreground">
                    Complete your order for {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Error State */}
                        {(errors.address || errors.payment) && (
                            <Card className="border-red-200 bg-red-50">
                                <CardContent className="py-4">
                                    <div className="flex items-center gap-2 text-red-800">
                                        <AlertCircle className="h-5 w-5" />
                                        <p className="text-sm">{errors.address || errors.payment}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Billing Address */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Billing Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {addresses.map((address) => (
                                        <label key={address.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                            <input
                                                type="radio"
                                                name="billing_address"
                                                value={address.id}
                                                checked={billingAddressId === address.id}
                                                onChange={(e) => setBillingAddressId(parseInt(e.target.value))}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium mb-1">
                                                    {address.first_name} {address.last_name}
                                                    {address.is_default && (
                                                        <Badge variant="secondary" className="ml-2">Default</Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{formatAddress(address)}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipping Address */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Shipping Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="same-address"
                                            checked={useSameAddress}
                                            onChange={(e) => {
                                                setUseSameAddress(e.target.checked);
                                                if (e.target.checked && billingAddressId) {
                                                    setShippingAddressId(billingAddressId);
                                                }
                                            }}
                                            className="rounded border-gray-300"
                                        />
                                        <Label htmlFor="same-address" className="cursor-pointer">
                                            Same as billing address
                                        </Label>
                                    </div>

                                    {!useSameAddress && (
                                        <div className="space-y-3">
                                            {addresses.map((address) => (
                                                <label key={address.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="shipping_address"
                                                        value={address.id}
                                                        checked={shippingAddressId === address.id}
                                                        onChange={(e) => setShippingAddressId(parseInt(e.target.value))}
                                                        className="mt-1"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="font-medium mb-1">
                                                            {address.first_name} {address.last_name}
                                                            {address.is_default && (
                                                                <Badge variant="secondary" className="ml-2">Default</Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{formatAddress(address)}</p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Method */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <label className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="manual"
                                            checked={paymentMethod === 'manual'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mt-1"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium mb-1">Manual Payment</div>
                                            <p className="text-sm text-muted-foreground">
                                                Pay via bank transfer or other manual methods. Instructions will be provided after order confirmation.
                                            </p>
                                        </div>
                                    </label>
                                    <label className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer opacity-50">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mt-1"
                                            disabled
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium mb-1">Credit/Debit Card</div>
                                            <p className="text-sm text-muted-foreground">
                                                Pay securely with your credit or debit card. (Coming soon)
                                            </p>
                                        </div>
                                    </label>
                                    <label className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer opacity-50">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mt-1"
                                            disabled
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium mb-1">PayPal</div>
                                            <p className="text-sm text-muted-foreground">
                                                Pay with your PayPal account. (Coming soon)
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Items */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingBag className="h-5 w-5" />
                                    Order Items
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {cartItems.map((item) => {
                                        const productImage = getProductImage(item);
                                        const itemTotal = item.unit_price * item.quantity;

                                        return (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="w-20 h-20 bg-muted/30 rounded-md overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={productImage}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold mb-1">
                                                        <a
                                                            href={`/products/${item.product.slug}`}
                                                            className="hover:text-primary transition-colors"
                                                        >
                                                            {item.product.name}
                                                        </a>
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        {item.variant?.name || item.product.sku}
                                                    </p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-muted-foreground">
                                                            Qty: {item.quantity} × ${item.unit_price.toFixed(2)}
                                                        </span>
                                                        <span className="font-semibold">${itemTotal.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Order Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
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

                                <Separator />

                                <div className="space-y-2">
                                    <Button 
                                        type="submit" 
                                        className="w-full" 
                                        size="lg"
                                        disabled={isSubmitting || !billingAddressId || !shippingAddressId}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <ArrowRight className="h-4 w-4 mr-2" />
                                                Place Order
                                            </>
                                        )}
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                        By placing this order, you agree to our terms and conditions.
                                    </p>
                                </div>

                                <Separator />

                                <a
                                    href="/cart"
                                    className="block text-center text-sm text-primary hover:underline"
                                >
                                    Return to Cart
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}