import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, MapPin, CreditCard, ArrowRight, ShoppingBag, Calendar } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Order {
    id: number;
    order_number: string;
    status: string;
    currency: string;
    grand_total: number;
    created_at: string;
    items_count?: number;
}

interface OrdersIndexProps {
    orders: {
        data: Order[];
        links: any[];
        meta: any;
    };
}

export default function OrdersIndexPage({ orders }: OrdersIndexProps) {
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

    const orderList = orders.data || [];

    if (orderList.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h1 className="text-3xl font-bold mb-2">No orders yet</h1>
                    <p className="text-muted-foreground mb-6">
                        You haven't placed any orders yet. Start shopping to see your order history here.
                    </p>
                    <Button asChild>
                        <Link href="/catalog">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Start Shopping
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Orders</h1>
                <p className="text-muted-foreground">
                    View and track your order history
                </p>
            </div>

            <div className="space-y-4">
                {orderList.map((order) => (
                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-lg">
                                            Order #{order.order_number}
                                        </h3>
                                        <Badge className={getOrderStatusColor(order.status)}>
                                            {getOrderStatusLabel(order.status)}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(order.created_at)}
                                        </div>
                                        {order.items_count && (
                                            <div className="flex items-center gap-1">
                                                <Package className="h-4 w-4" />
                                                {order.items_count} {order.items_count === 1 ? 'item' : 'items'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-2xl font-bold">{formatPrice(order.grand_total)}</p>
                                    </div>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/orders/${order.id}`}>
                                            View Details
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {orders.links && orders.links.length > 3 && (
                <div className="mt-8 flex justify-center gap-2">
                    {orders.links.map((link, index) => (
                        <Button
                            key={index}
                            asChild={link.url !== null}
                            variant={link.active ? 'default' : 'outline'}
                            size="sm"
                            disabled={!link.url}
                            className={!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                        >
                            {link.url ? (
                                <Link
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            )}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}
