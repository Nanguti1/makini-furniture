import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/admin';
import { Link } from '@inertiajs/react';
import { Eye, Package, DollarSign, User, Check, X, AlertCircle } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import admin from '@/routes/admin';

interface OrderProps {
    orders: {
        data: Array<{
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
            user?: {
                id: number;
                name: string;
                email: string;
            };
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters?: {
        search?: string;
        status?: string;
    };
}

export default function OrderIndex() {
    const { props } = usePage() as unknown as { props: OrderProps };
    const { orders, filters } = props;
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');

    const breadcrumbs = [
        { title: 'Orders', href: admin.orders.index.url() },
    ];

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        router.get(admin.orders.index.url(), { 
            search: term, 
            status: statusFilter
        }, { 
            preserveState: true,
            replace: true 
        });
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        router.get(admin.orders.index.url(), { 
            search: searchTerm, 
            status
        }, { 
            preserveState: true,
            replace: true 
        });
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
                return <Check className="h-3 w-3" />;
            case 'cancelled':
                return <X className="h-3 w-3" />;
            case 'pending':
                return <AlertCircle className="h-3 w-3" />;
            default:
                return <Package className="h-3 w-3" />;
        }
    };

    const columns = [
        {
            key: 'order_number',
            header: 'Order',
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.order_number}</div>
                    <div className="text-sm text-muted-foreground">
                        {new Date(row.created_at).toLocaleDateString()}
                    </div>
                </div>
            ),
        },
        {
            key: 'customer',
            header: 'Customer',
            cell: (row: any) => (
                <div>
                    <div className="font-medium">{row.user?.name || 'Guest'}</div>
                    <div className="text-sm text-muted-foreground">{row.user?.email || '-'}</div>
                </div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            cell: (row: any) => (
                <Badge variant={getStatusColor(row.status)} className="flex items-center gap-1">
                    {getStatusIcon(row.status)}
                    {row.status}
                </Badge>
            ),
        },
        {
            key: 'total',
            header: 'Total',
            cell: (row: any) => (
                <div className="font-medium">
                    {row.currency} {row.grand_total.toFixed(2)}
                </div>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            cell: (row: any) => (
                <div className="flex items-center gap-2">
                    <Link href={admin.orders.show.url({ order: row.id })}>
                        <Button variant="ghost" size="sm" title="View">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage customer orders and fulfillments
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <SearchBar 
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => handleStatusFilter(e.target.value)}
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <DataTable
                    data={orders.data}
                    columns={columns}
                    pagination={orders.links}
                    emptyMessage="No orders found"
                />
            </div>
        </AdminLayout>
    );
}