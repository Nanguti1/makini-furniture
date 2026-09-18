import { StatCard } from '@/components/admin';
import { DataTable } from '@/components/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { 
    Package, 
    ShoppingCart, 
    Users, 
    DollarSign,
    AlertTriangle,
    Plus,
    ArrowRight,
    Image
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { formatCurrency, formatDate } from '@/lib/admin-utils';

interface DashboardProps {
    stats: {
        total_revenue: number;
        total_orders: number;
        total_products: number;
        total_customers: number;
        pending_orders: number;
        active_products: number;
    };
    recentOrders: Array<{
        id: number;
        order_number: string;
        status: string;
        grand_total: number;
        created_at: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }>;
    recentCustomers: Array<{
        id: number;
        name: string;
        email: string;
        created_at: string;
    }>;
    lowStockProducts: Array<{
        id: number;
        name: string;
        slug: string;
        variants: Array<{
            stock_quantity: number;
        }>;
    }>;
}

interface StatCardItem {
    title: string;
    value: string;
    icon: any;
    permission?: string;
}

interface QuickActionItem {
    title: string;
    description: string;
    icon: any;
    href: string;
    permission?: string;
}

export default function AdminDashboard() {
    const { props } = usePage() as unknown as { props: DashboardProps };
    const { stats, recentOrders, recentCustomers, lowStockProducts } = props;
    const { auth } = usePage().props;
    const permissions = auth?.permissions || [];
    
    const hasPermission = (permission: string) => permissions.includes(permission);

    const statCards: StatCardItem[] = [
        {
            title: 'Total Revenue',
            value: formatCurrency(stats.total_revenue),
            icon: DollarSign,
            permission: 'view orders',
        },
        {
            title: 'Total Orders',
            value: stats.total_orders.toString(),
            icon: ShoppingCart,
            permission: 'view orders',
        },
        {
            title: 'Total Products',
            value: stats.total_products.toString(),
            icon: Package,
            permission: 'view products',
        },
        {
            title: 'Total Customers',
            value: stats.total_customers.toString(),
            icon: Users,
            permission: 'view customers',
        },
    ];

    // Social Media Manager specific stats
    const merchandisingStats: StatCardItem[] = [
        {
            title: 'Active Banners',
            value: stats.active_products.toString(), // This would need to be changed to actual banner count
            icon: Image,
            permission: 'view banners',
        },
        {
            title: 'Published Lookbooks',
            value: '0', // This would need to be changed to actual lookbook count
            icon: Image,
            permission: 'view lookbooks',
        },
    ];

    const quickActions: QuickActionItem[] = [
        {
            title: 'Add New Product',
            description: 'Create a new product in your catalog',
            icon: Plus,
            href: '/admin/products/create',
            permission: 'create products',
        },
        {
            title: 'View Orders',
            description: 'Manage and process customer orders',
            icon: ShoppingCart,
            href: '/admin/orders',
            permission: 'view orders',
        },
        {
            title: 'Create Banner',
            description: 'Add a new promotional banner',
            icon: Image,
            href: '/admin/banners/create',
            permission: 'create banners',
        },
        {
            title: 'Create Lookbook',
            description: 'Add a new lookbook collection',
            icon: Image,
            href: '/admin/lookbooks/create',
            permission: 'create lookbooks',
        },
    ];

    const orderColumns = [
        {
            key: 'order_number',
            header: 'Order #',
            cell: (row: any) => (
                <span className="font-medium">{row.order_number}</span>
            ),
        },
        {
            key: 'customer',
            header: 'Customer',
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.user.name}</div>
                    <div className="text-sm text-muted-foreground">{row.user.email}</div>
                </div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            cell: (row: any) => (
                <Badge variant="outline">{row.status}</Badge>
            ),
        },
        {
            key: 'total',
            header: 'Total',
            cell: (row: any) => formatCurrency(row.grand_total),
        },
        {
            key: 'date',
            header: 'Date',
            cell: (row: any) => formatDate(row.created_at),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Welcome to the Makini Queens Furniture admin panel
                </p>
            </div>

            {/* Stats Grid */}
            {(() => {
                const visibleStats = statCards.filter(stat => !stat.permission || hasPermission(stat.permission));
                const visibleMerchandisingStats = merchandisingStats.filter(stat => !stat.permission || hasPermission(stat.permission));
                const allVisibleStats = [...visibleStats, ...visibleMerchandisingStats];
                return allVisibleStats.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {allVisibleStats.map((stat) => (
                            <StatCard
                                key={stat.title}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                            />
                        ))}
                    </div>
                );
            })()}

            {/* Quick Actions */}
            {(() => {
                const visibleActions = quickActions.filter(action => !action.permission || hasPermission(action.permission));
                return visibleActions.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {visibleActions.map((action) => {
                                    const Icon = action.icon;
                                    return (
                                        <Link
                                            key={action.title}
                                            href={action.href}
                                            className="block"
                                        >
                                            <Button
                                                variant="outline"
                                                className="h-auto w-full flex-col items-start gap-2 p-4"
                                            >
                                                <div className="flex items-center gap-2 w-full">
                                                    <Icon className="h-5 w-5" />
                                                    <span className="font-medium">{action.title}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground text-left">
                                                    {action.description}
                                                </p>
                                                <ArrowRight className="h-4 w-4 ml-auto" />
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                );
            })()}

            {/* Additional Stats */}
            {(hasPermission('view orders') || hasPermission('view products')) && (
                <div className="grid gap-4 md:grid-cols-2">
                    {hasPermission('view orders') && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stats.pending_orders}</div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Orders awaiting processing
                                </p>
                            </CardContent>
                        </Card>
                    )}
                    {hasPermission('view products') && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Products</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stats.active_products}</div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Products currently available
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* Recent Orders */}
            {hasPermission('view orders') && (
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentOrders.length > 0 ? (
                            <DataTable
                                data={recentOrders}
                                columns={orderColumns}
                                emptyMessage="No recent orders"
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-8">
                                No recent orders found
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Recent Customers & Low Stock */}
            {(hasPermission('view customers') || hasPermission('view products')) && (
                <div className="grid gap-4 md:grid-cols-2">
                    {hasPermission('view customers') && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Customers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {recentCustomers.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentCustomers.map((customer) => (
                                            <div key={customer.id} className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium">{customer.name}</div>
                                                    <div className="text-sm text-muted-foreground">{customer.email}</div>
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {formatDate(customer.created_at)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-8">
                                        No recent customers found
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {hasPermission('view products') && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-primary" />
                                    Low Stock Alert
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {lowStockProducts.length > 0 ? (
                                    <div className="space-y-4">
                                        {lowStockProducts.map((product) => (
                                            <div key={product.id} className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium">{product.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {product.variants.length} variant(s) low on stock
                                                    </div>
                                                </div>
                                                <Badge variant="destructive">Low Stock</Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-8">
                                        No products with low stock
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* Welcome message for users with limited permissions */}
            {(() => {
                const visibleStats = statCards.filter(stat => !stat.permission || hasPermission(stat.permission));
                const visibleActions = quickActions.filter(action => !action.permission || hasPermission(action.permission));
                return visibleStats.length === 0 && visibleActions.length === 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to the Admin Panel</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                You have limited access to the admin panel. Use the sidebar navigation to access the features available to your role.
                            </p>
                        </CardContent>
                    </Card>
                );
            })()}
        </div>
    );
}