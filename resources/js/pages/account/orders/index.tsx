import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import EmptyState from '@/components/ui/empty-state';
import { ShoppingBag, Package, Eye, ChevronRight } from 'lucide-react';
import Pagination from '@/components/ui/pagination';

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
    shipping_first_name?: string;
    shipping_last_name?: string;
}

interface PaginatedOrders {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface OrdersIndexProps {
    orders: PaginatedOrders;
}

export default function AccountOrdersIndexPage({ orders }: OrdersIndexProps) {
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

    if (orders.data.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold mb-8">My Orders</h1>
                    <EmptyState
                        icon="shopping-cart"
                        title="No orders yet"
                        description="You haven't placed any orders yet. Start shopping to see your order history here."
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
                <h1 className="text-2xl md:text-3xl font-bold mb-2">My Orders</h1>
                <p className="text-muted-foreground">
                    {orders.total} {orders.total === 1 ? 'order' : 'orders'}
                </p>
            </div>

            <div className="space-y-4">
                {orders.data.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Package className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Order #{order.order_number}</CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            {formatDate(order.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <Badge className={getOrderStatusColor(order.status)}>
                                    {getOrderStatusLabel(order.status)}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Order Items Preview */}
                            {order.items && order.items.length > 0 && (
                                <div className="space-y-2">
                                    {order.items.slice(0, 2).map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                {item.product_name}
                                                {item.variant_name && ` (${item.variant_name})`}
                                                <span className="ml-2">x{item.quantity}</span>
                                            </span>
                                            <span className="font-medium">{formatPrice(item.total)}</span>
                                        </div>
                                    ))}
                                    {order.items.length > 2 && (
                                        <p className="text-sm text-muted-foreground">
                                            +{order.items.length - 2} more items
                                        </p>
                                    )}
                                </div>
                            )}

                            <Separator />

                            {/* Order Totals */}
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-muted-foreground">
                                    Total
                                </div>
                                <div className="text-lg font-bold">
                                    {formatPrice(order.grand_total)}
                                </div>
                            </div>

                            {/* View Details Button */}
                            <div className="flex justify-end">
                                <Button variant="outline" asChild>
                                    <a href={`/account/orders/${order.id}`}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                        <ChevronRight className="h-4 w-4 ml-2" />
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {orders.last_page > 1 && (
                <div className="flex justify-center mt-8">
                    <Pagination
                        currentPage={orders.current_page}
                        totalPages={orders.last_page}
                        hrefBuilder={(page) => {
                            return `/account/orders?page=${page}`;
                        }}
                    />
                </div>
            )}
        </div>
    );
}
