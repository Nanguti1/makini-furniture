import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, MapPin, CreditCard, Truck, Clock, ShoppingBag, Home, DollarSign } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface OrderItem {
    id: number;
    product_name: string;
    variant_name?: string;
    quantity: number;
    unit_price: number;
    total: number;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    currency: string;
    subtotal: number;
    discount_total: number;
    shipping_total: number;
    tax_total: number;
    grand_total: number;
    created_at: string;
    items?: OrderItem[];
    billing_first_name?: string;
    billing_last_name?: string;
    billing_company?: string;
    billing_phone?: string;
    billing_address_line_1?: string;
    billing_address_line_2?: string;
    billing_city?: string;
    billing_state?: string;
    billing_postal_code?: string;
    billing_country?: string;
    shipping_first_name?: string;
    shipping_last_name?: string;
    shipping_company?: string;
    shipping_phone?: string;
    shipping_address_line_1?: string;
    shipping_address_line_2?: string;
    shipping_city?: string;
    shipping_state?: string;
    shipping_postal_code?: string;
    shipping_country?: string;
    metadata?: {
        payment_method?: string;
    };
}

interface OrderShowProps {
    order: Order;
}

export default function OrderShowPage({ order }: OrderShowProps) {
    const { props } = usePage();
    const successMessage = (props as any).flash?.success;

    const getOrderStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'refunded':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getOrderStatusLabel = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Success Message */}
            {successMessage && (
                <Card className="mb-6 border-green-200 bg-green-50">
                    <CardContent className="py-4">
                        <div className="flex items-center gap-2 text-green-800">
                            <CheckCircle className="h-5 w-5" />
                            <p className="text-sm font-medium">{successMessage}</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-1">Order Confirmed!</h1>
                        <p className="text-muted-foreground">
                            Thank you for your purchase. Your order has been received.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-muted-foreground">
                        Order #{order.order_number} • {formatDate(order.created_at)}
                    </p>
                    <Badge className={getOrderStatusColor(order.status)}>
                        {getOrderStatusLabel(order.status)}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Order Items
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {order.items && order.items.length > 0 ? (
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0">
                                            <div className="flex-1">
                                                <h3 className="font-semibold mb-1">
                                                    {item.product_name}
                                                </h3>
                                                {item.variant_name && (
                                                    <p className="text-sm text-muted-foreground mb-1">
                                                        {item.variant_name}
                                                    </p>
                                                )}
                                                <p className="text-sm text-muted-foreground">
                                                    Qty: {item.quantity} × {formatPrice(item.unit_price)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">{formatPrice(item.total)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No items in this order.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Order Totals */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Order Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>{formatPrice(order.subtotal)}</span>
                            </div>
                            {order.discount_total > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Discount</span>
                                    <span className="text-green-600">-{formatPrice(order.discount_total)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{formatPrice(order.shipping_total)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tax</span>
                                <span>{formatPrice(order.tax_total)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>{formatPrice(order.grand_total)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Shipping & Billing */}
                <div className="space-y-6">
                    {/* Shipping Address */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck className="h-5 w-5" />
                                Shipping Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1 text-sm">
                                <p className="font-semibold">
                                    {order.shipping_first_name} {order.shipping_last_name}
                                </p>
                                {order.shipping_company && <p>{order.shipping_company}</p>}
                                <p>{order.shipping_address_line_1}</p>
                                {order.shipping_address_line_2 && <p>{order.shipping_address_line_2}</p>}
                                <p>
                                    {order.shipping_city}, {order.shipping_state} {order.shipping_postal_code}
                                </p>
                                <p>{order.shipping_country}</p>
                                {order.shipping_phone && <p>{order.shipping_phone}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Billing Address */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Billing Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1 text-sm">
                                <p className="font-semibold">
                                    {order.billing_first_name} {order.billing_last_name}
                                </p>
                                {order.billing_company && <p>{order.billing_company}</p>}
                                <p>{order.billing_address_line_1}</p>
                                {order.billing_address_line_2 && <p>{order.billing_address_line_2}</p>}
                                <p>
                                    {order.billing_city}, {order.billing_state} {order.billing_postal_code}
                                </p>
                                <p>{order.billing_country}</p>
                                {order.billing_phone && <p>{order.billing_phone}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Method */}
                    {order.metadata?.payment_method && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1 text-sm">
                                    <p className="font-medium capitalize">
                                        {order.metadata.payment_method === 'manual' ? 'Manual Payment' : 
                                         order.metadata.payment_method === 'card' ? 'Credit/Debit Card' : 
                                         order.metadata.payment_method === 'paypal' ? 'PayPal' : 
                                         order.metadata.payment_method}
                                    </p>
                                    {order.metadata.payment_method === 'manual' && (
                                        <p className="text-muted-foreground">
                                            Payment instructions will be sent to your email.
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Order Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Order Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span className="text-sm">Order Placed</span>
                                    <span className="text-xs text-muted-foreground ml-auto">
                                        {formatDate(order.created_at)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`h-2 w-2 rounded-full ${['processing', 'shipped', 'delivered'].includes(order.status.toLowerCase()) ? 'bg-primary' : 'bg-muted'}`} />
                                    <span className="text-sm">Processing</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`h-2 w-2 rounded-full ${['shipped', 'delivered'].includes(order.status.toLowerCase()) ? 'bg-primary' : 'bg-muted'}`} />
                                    <span className="text-sm">Shipped</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`h-2 w-2 rounded-full ${order.status.toLowerCase() === 'delivered' ? 'bg-primary' : 'bg-muted'}`} />
                                    <span className="text-sm">Delivered</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Button asChild className="w-full">
                            <a href="/catalog">
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                Continue Shopping
                            </a>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                            <a href="/account/orders">
                                <Home className="h-4 w-4 mr-2" />
                                View All Orders
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
