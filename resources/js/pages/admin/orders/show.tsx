import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link, useForm } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Package,
    User,
    MapPin,
    CreditCard,
    Truck,
    Clock,
    AlertCircle,
    Check,
    X,
    FileText
} from 'lucide-react';
import admin from '@/routes/admin';

interface OrderShowProps {
    order: {
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
        updated_at: string;
        metadata?: {
            payment_method?: string;
        };
        user?: {
            id: number;
            name: string;
            email: string;
        };
        items: Array<{
            id: number;
            product_id: number;
            product_name: string;
            variant_name: string | null;
            sku: string | null;
            quantity: number;
            unit_price: number;
            discount_amount: number;
            total: number;
            product?: {
                id: number;
                name: string;
                slug: string;
                price: number;
            };
            variant?: {
                id: number;
                name: string;
                sku: string;
            };
        }>;
        billing_first_name: string;
        billing_last_name: string;
        billing_company: string | null;
        billing_phone: string | null;
        billing_address_line_1: string;
        billing_address_line_2: string | null;
        billing_city: string;
        billing_state: string;
        billing_postal_code: string;
        billing_country: string;
        shipping_first_name: string;
        shipping_last_name: string;
        shipping_company: string | null;
        shipping_phone: string | null;
        shipping_address_line_1: string;
        shipping_address_line_2: string | null;
        shipping_city: string;
        shipping_state: string;
        shipping_postal_code: string;
        shipping_country: string;
    };
}

export default function OrderShow({ order }: OrderShowProps) {
    const breadcrumbs = [
        { title: 'Orders', href: admin.orders.index.url() },
        { title: order.order_number, href: admin.orders.show.url({ order: order.id }) },
    ];

    const { data, setData, put, processing } = useForm({
        status: order.status,
    });

    const updateStatus = (newStatus: string) => {
        setData('status', newStatus);
        put(admin.orders.status.url({ order: order.id }));
    };

    const cancelOrder = () => {
        if (confirm('Are you sure you want to cancel this order?')) {
            put(admin.orders.cancel.url({ order: order.id }));
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'default';
            case 'confirmed':
                return 'secondary';
            case 'processing':
                return 'secondary';
            case 'shipped':
                return 'secondary';
            case 'pending':
                return 'outline';
            case 'cancelled':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <Check className="h-4 w-4" />;
            case 'cancelled':
                return <X className="h-4 w-4" />;
            case 'pending':
                return <AlertCircle className="h-4 w-4" />;
            default:
                return <Package className="h-4 w-4" />;
        }
    };

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
    ];

    const timelineEvents = [
        {
            status: 'pending',
            label: 'Order Placed',
            date: order.created_at,
            completed: true,
        },
        {
            status: 'confirmed',
            label: 'Order Confirmed',
            date: order.status === 'confirmed' || order.status === 'processing' || order.status === 'shipped' || order.status === 'completed' ? order.updated_at : null,
            completed: ['confirmed', 'processing', 'shipped', 'completed'].includes(order.status),
        },
        {
            status: 'processing',
            label: 'Processing',
            date: order.status === 'processing' || order.status === 'shipped' || order.status === 'completed' ? order.updated_at : null,
            completed: ['processing', 'shipped', 'completed'].includes(order.status),
        },
        {
            status: 'shipped',
            label: 'Shipped',
            date: order.status === 'shipped' || order.status === 'completed' ? order.updated_at : null,
            completed: ['shipped', 'completed'].includes(order.status),
        },
        {
            status: 'completed',
            label: 'Completed',
            date: order.status === 'completed' ? order.updated_at : null,
            completed: order.status === 'completed',
        },
    ];

    const formatAddress = (prefix: string) => {
        const firstName = order[`${prefix}_first_name` as keyof typeof order] as string;
        const lastName = order[`${prefix}_last_name` as keyof typeof order] as string;
        const company = order[`${prefix}_company` as keyof typeof order] as string | null;
        const phone = order[`${prefix}_phone` as keyof typeof order] as string | null;
        const addressLine1 = order[`${prefix}_address_line_1` as keyof typeof order] as string;
        const addressLine2 = order[`${prefix}_address_line_2` as keyof typeof order] as string | null;
        const city = order[`${prefix}_city` as keyof typeof order] as string;
        const state = order[`${prefix}_state` as keyof typeof order] as string;
        const postalCode = order[`${prefix}_postal_code` as keyof typeof order] as string;
        const country = order[`${prefix}_country` as keyof typeof order] as string;

        return (
            <div className="space-y-1">
                <p className="font-medium">{firstName} {lastName}</p>
                {company && <p className="text-sm text-muted-foreground">{company}</p>}
                {phone && <p className="text-sm text-muted-foreground">{phone}</p>}
                <p className="text-sm">{addressLine1}</p>
                {addressLine2 && <p className="text-sm">{addressLine2}</p>}
                <p className="text-sm">{city}, {state} {postalCode}</p>
                <p className="text-sm">{country}</p>
            </div>
        );
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{order.order_number}</h1>
                        <p className="text-muted-foreground mt-2">
                            Placed on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={admin.orders.index.url()}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Orders
                            </Button>
                        </Link>
                        {order.status !== 'cancelled' && order.status !== 'completed' && (
                            <Button 
                                variant="destructive" 
                                onClick={cancelOrder}
                                disabled={processing}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancel Order
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1 text-sm px-3 py-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                    </Badge>
                    <select
                        value={order.status}
                        onChange={(e) => updateStatus(e.target.value)}
                        disabled={processing}
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="items">Items</TabsTrigger>
                        <TabsTrigger value="customer">Customer</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="grid gap-6 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-4 w-4" />
                                        Order Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">{order.currency} {order.subtotal.toFixed(2)}</span>
                                    </div>
                                    {order.discount_total > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span className="text-muted-foreground">Discount</span>
                                            <span className="font-medium">-{order.currency} {order.discount_total.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="font-medium">{order.currency} {order.shipping_total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span className="font-medium">{order.currency} {order.tax_total.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-bold text-lg">{order.currency} {order.grand_total.toFixed(2)}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Customer
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {order.user ? (
                                        <>
                                            <p className="font-medium">{order.user.name}</p>
                                            <p className="text-sm text-muted-foreground">{order.user.email}</p>
                                        </>
                                    ) : (
                                        <p className="text-muted-foreground">Guest checkout</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Order Dates
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Created</p>
                                        <p className="font-medium">{new Date(order.created_at).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Last Updated</p>
                                        <p className="font-medium">{new Date(order.updated_at).toLocaleString()}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Order Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Alert>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Notes functionality is not currently supported in the backend.
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="items">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    Order Items ({order.items.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium">{item.product_name}</p>
                                                    {item.variant_name && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {item.variant_name}
                                                        </Badge>
                                                    )}
                                                </div>
                                                {item.sku && (
                                                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                                                )}
                                                <div className="flex items-center gap-4 mt-2 text-sm">
                                                    <span className="text-muted-foreground">Qty: {item.quantity}</span>
                                                    <span className="text-muted-foreground">
                                                        {order.currency} {item.unit_price.toFixed(2)} each
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">
                                                    {order.currency} {item.total.toFixed(2)}
                                                </p>
                                                {item.discount_amount > 0 && (
                                                    <p className="text-sm text-green-600">
                                                        -{order.currency} {item.discount_amount.toFixed(2)} discount
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="customer">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Customer Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {order.user ? (
                                        <>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Name</p>
                                                <p className="font-medium">{order.user.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                                <p className="font-medium">{order.user.email}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-muted-foreground">Guest checkout</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Billing Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {formatAddress('billing')}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="shipping">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Truck className="h-4 w-4" />
                                    Shipping Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {formatAddress('shipping')}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="payments">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Payment Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                                        <p className="font-medium capitalize">
                                            {order.metadata?.payment_method || 'Manual'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                                        <p className="font-medium">{order.currency} {order.grand_total.toFixed(2)}</p>
                                    </div>
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Detailed payment transaction history is not currently supported in the backend.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="timeline">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Order Timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {timelineEvents.map((event, index) => (
                                        <div key={event.status} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                    event.completed 
                                                        ? 'bg-primary text-primary-foreground' 
                                                        : 'bg-muted text-muted-foreground'
                                                }`}>
                                                    {event.completed ? (
                                                        <Check className="h-4 w-4" />
                                                    ) : (
                                                        <div className="w-2 h-2 rounded-full bg-current" />
                                                    )}
                                                </div>
                                                {index < timelineEvents.length - 1 && (
                                                    <div className={`w-0.5 h-12 my-2 ${
                                                        event.completed ? 'bg-primary' : 'bg-muted'
                                                    }`} />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-6">
                                                <p className="font-medium">{event.label}</p>
                                                {event.date && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(event.date).toLocaleString()}
                                                    </p>
                                                )}
                                                {!event.completed && event.status === order.status && (
                                                    <Badge variant="outline" className="mt-2">
                                                        Current Status
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}