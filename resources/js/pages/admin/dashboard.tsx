import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    LayoutDashboard, 
    Package, 
    ShoppingCart, 
    Users, 
    TrendingUp,
    DollarSign 
} from 'lucide-react';

export default function AdminDashboard() {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/admin/dashboard' },
    ];

    const stats = [
        {
            title: 'Total Revenue',
            value: '$45,231.89',
            change: '+20.1%',
            icon: DollarSign,
        },
        {
            title: 'Orders',
            value: '+12,234',
            change: '+15%',
            icon: ShoppingCart,
        },
        {
            title: 'Products',
            value: '+573',
            change: '+12%',
            icon: Package,
        },
        {
            title: 'Customers',
            value: '+2,345',
            change: '+8%',
            icon: Users,
        },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">
                        Welcome to the Makini Queens Furniture admin panel
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.title}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {stat.change} from last month
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Recent Activity */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Recent orders will be displayed here once implemented
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Recent activity will be displayed here once implemented
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}