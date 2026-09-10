import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from '@inertiajs/react';
import { 
    ArrowLeft, 
    User,
    MapPin,
    Package,
    Star,
    Heart,
    Calendar,
    Mail,
    Check,
    X,
    FileText
} from 'lucide-react';
import admin from '@/routes/admin';

interface CustomerShowProps {
    customer: {
        id: number;
        name: string;
        email: string;
        is_admin: boolean;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
        addresses: Array<{
            id: number;
            first_name: string;
            last_name: string;
            company: string | null;
            phone: string | null;
            address_line_1: string;
            address_line_2: string | null;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            is_default: boolean;
        }>;
        orders: Array<{
            id: number;
            order_number: string;
            status: string;
            currency: string;
            grand_total: number;
            created_at: string;
        }>;
        reviews: Array<{
            id: number;
            rating: number;
            title: string;
            body: string;
            status: string;
            verified_purchase: boolean;
            created_at: string;
            product?: {
                id: number;
                name: string;
                slug: string;
            };
        }>;
        wishlists: Array<{
            id: number;
            name: string;
            items: Array<{
                id: number;
                product?: {
                    id: number;
                    name: string;
                    slug: string;
                    price: number;
                };
            }>;
        }>;
    };
}

export default function CustomerShow({ customer }: CustomerShowProps) {
    const breadcrumbs = [
        { title: 'Customers', href: admin.customers.index.url() },
        { title: customer.name, href: admin.customers.show.url({ customer: customer.id }) },
    ];

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

    const renderAddress = (address: any) => (
        <div className="space-y-1 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
                <p className="font-medium">{address.first_name} {address.last_name}</p>
                {address.is_default && <Badge variant="default" className="text-xs">Default</Badge>}
            </div>
            {address.company && <p className="text-sm text-muted-foreground">{address.company}</p>}
            {address.phone && <p className="text-sm text-muted-foreground">{address.phone}</p>}
            <p className="text-sm">{address.address_line_1}</p>
            {address.address_line_2 && <p className="text-sm">{address.address_line_2}</p>}
            <p className="text-sm">{address.city}, {address.state} {address.postal_code}</p>
            <p className="text-sm">{address.country}</p>
        </div>
    );

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
                        <p className="text-muted-foreground mt-2">
                            Customer since {new Date(customer.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={admin.customers.index.url()}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Customers
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{customer.email}</span>
                    </div>
                    {customer.email_verified_at ? (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            Verified
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="flex items-center gap-1">
                            <X className="h-3 w-3" />
                            Unverified
                        </Badge>
                    )}
                    {customer.is_admin && (
                        <Badge variant="default">Admin</Badge>
                    )}
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="addresses">Addresses</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="grid gap-6 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Account Info
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Name</p>
                                        <p className="font-medium">{customer.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                                        <p className="font-medium">{customer.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                                        <Badge variant={customer.is_admin ? 'default' : 'outline'}>
                                            {customer.is_admin ? 'Admin' : 'Customer'}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Email Verified</p>
                                        {customer.email_verified_at ? (
                                            <div className="flex items-center gap-1 text-green-600">
                                                <Check className="h-4 w-4" />
                                                <span className="text-sm">Yes</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <X className="h-4 w-4" />
                                                <span className="text-sm">No</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-4 w-4" />
                                        Order Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                                        <p className="font-medium text-2xl">{customer.orders.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Addresses</p>
                                        <p className="font-medium text-2xl">{customer.addresses.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Reviews</p>
                                        <p className="font-medium text-2xl">{customer.reviews.length}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Account Activity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                                        <p className="font-medium">{new Date(customer.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                        <p className="font-medium">{new Date(customer.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="addresses">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Saved Addresses ({customer.addresses.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {customer.addresses.length > 0 ? (
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {customer.addresses.map((address) => (
                                            <div key={address.id}>
                                                {renderAddress(address)}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Alert>
                                        <FileText className="h-4 w-4" />
                                        <AlertDescription>
                                            No addresses saved for this customer.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="orders">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    Order History ({customer.orders.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {customer.orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {customer.orders.map((order) => (
                                            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <p className="font-medium">{order.order_number}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {new Date(order.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <Badge variant={getStatusColor(order.status)}>
                                                        {order.status}
                                                    </Badge>
                                                    <p className="font-medium">
                                                        {order.currency} {order.grand_total.toFixed(2)}
                                                    </p>
                                                    <Link href={admin.orders.show.url({ order: order.id })}>
                                                        <Button variant="ghost" size="sm">
                                                            View
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Alert>
                                        <FileText className="h-4 w-4" />
                                        <AlertDescription>
                                            No orders found for this customer.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Star className="h-4 w-4" />
                                    Product Reviews ({customer.reviews.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {customer.reviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {customer.reviews.map((review) => (
                                            <div key={review.id} className="p-4 border rounded-lg">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <div className="flex items-center">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`h-4 w-4 ${
                                                                            i < review.rating
                                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                                : 'text-gray-300'
                                                                        }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <Badge variant="outline" className="text-xs">
                                                                {review.status}
                                                            </Badge>
                                                            {review.verified_purchase && (
                                                                <Badge variant="secondary" className="text-xs">
                                                                    Verified Purchase
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="font-medium">{review.title}</p>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(review.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{review.body}</p>
                                                {review.product && (
                                                    <div className="mt-2">
                                                        <Link
                                                            href={`/products/${review.product.slug}`}
                                                            className="text-sm text-primary hover:underline"
                                                        >
                                                            {review.product.name}
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Alert>
                                        <FileText className="h-4 w-4" />
                                        <AlertDescription>
                                            No reviews found for this customer.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="wishlist">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Heart className="h-4 w-4" />
                                    Wishlist ({customer.wishlists.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {customer.wishlists.length > 0 ? (
                                    <div className="space-y-6">
                                        {customer.wishlists.map((wishlist) => (
                                            <div key={wishlist.id}>
                                                <h3 className="font-medium mb-3">{wishlist.name}</h3>
                                                {wishlist.items.length > 0 ? (
                                                    <div className="grid gap-3 md:grid-cols-2">
                                                        {wishlist.items.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="flex items-center gap-3 p-3 border rounded-lg"
                                                            >
                                                                {item.product && (
                                                                    <>
                                                                        <div className="flex-1">
                                                                            <p className="font-medium text-sm">
                                                                                {item.product.name}
                                                                            </p>
                                                                            <p className="text-sm text-muted-foreground">
                                                                                ${item.product.price.toFixed(2)}
                                                                            </p>
                                                                        </div>
                                                                        <Link
                                                                            href={`/products/${item.product.slug}`}
                                                                            target="_blank"
                                                                        >
                                                                            <Button variant="ghost" size="sm">
                                                                                View
                                                                            </Button>
                                                                        </Link>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">
                                                        No items in this wishlist.
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Alert>
                                        <FileText className="h-4 w-4" />
                                        <AlertDescription>
                                            No wishlists found for this customer.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}