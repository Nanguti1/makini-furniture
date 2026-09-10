import AdminLayout from '@/layouts/admin-layout';
import { StatCard } from '@/components/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Package, 
    ShoppingCart, 
    Users, 
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
                    {stats.map((stat) => (
                        <StatCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                            change={stat.change}
                            icon={stat.icon}
                        />
                    ))}
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