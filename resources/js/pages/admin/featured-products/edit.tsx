import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import admin from '@/routes/admin';

interface FeaturedProductEditProps {
    featuredProduct: {
        id: number;
        product_id: number;
        placement: string;
        sort_order: number;
        starts_at: string | null;
        ends_at: string | null;
        is_active: boolean;
        product?: {
            id: number;
            name: string;
            slug: string;
        };
    };
    products?: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
}

export default function FeaturedProductEdit({ featuredProduct, products = [] }: FeaturedProductEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        product_id: featuredProduct.product_id.toString(),
        placement: featuredProduct.placement,
        sort_order: featuredProduct.sort_order,
        starts_at: featuredProduct.starts_at ? featuredProduct.starts_at.slice(0, 16) : '',
        ends_at: featuredProduct.ends_at ? featuredProduct.ends_at.slice(0, 16) : '',
        is_active: featuredProduct.is_active,
    });

    const breadcrumbs = [
        { title: 'Featured Products', href: admin.featuredProducts.index.url() },
        { title: 'Edit', href: admin.featuredProducts.edit.url({ id: featuredProduct.id }) },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.featuredProducts.update.url({ id: featuredProduct.id }), ({
            ...data,
            product_id: parseInt(data.product_id) || featuredProduct.product_id,
        } as any));
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Featured Product</h1>
                        <p className="text-muted-foreground mt-2">
                            Update featured product settings
                        </p>
                    </div>
                    <Link href={admin.featuredProducts.index.url()}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Featured Products
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Featured Product Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="product_id">Product *</Label>
                                <select
                                    id="product_id"
                                    value={data.product_id}
                                    onChange={(e) => setData('product_id', e.target.value)}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                                    required
                                >
                                    <option value="">Select a product</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.product_id && (
                                    <p className="text-sm text-destructive">{errors.product_id}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="placement">Placement</Label>
                                    <select
                                        id="placement"
                                        value={data.placement}
                                        onChange={(e) => setData('placement', e.target.value)}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                                    >
                                        <option value="homepage">Homepage</option>
                                        <option value="category">Category Page</option>
                                        <option value="sidebar">Sidebar</option>
                                    </select>
                                    {errors.placement && (
                                        <p className="text-sm text-destructive">{errors.placement}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        min="0"
                                    />
                                    {errors.sort_order && (
                                        <p className="text-sm text-destructive">{errors.sort_order}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="starts_at">Start Date</Label>
                                    <Input
                                        id="starts_at"
                                        type="datetime-local"
                                        value={data.starts_at}
                                        onChange={(e) => setData('starts_at', e.target.value)}
                                    />
                                    {errors.starts_at && (
                                        <p className="text-sm text-destructive">{errors.starts_at}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ends_at">End Date</Label>
                                    <Input
                                        id="ends_at"
                                        type="datetime-local"
                                        value={data.ends_at}
                                        onChange={(e) => setData('ends_at', e.target.value)}
                                    />
                                    {errors.ends_at && (
                                        <p className="text-sm text-destructive">{errors.ends_at}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Featured Product'}
                                </Button>
                                <Link href={admin.featuredProducts.index.url()}>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}