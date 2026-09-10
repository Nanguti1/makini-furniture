import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import admin from '@/routes/admin';

interface BrandEditProps {
    brand: {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        short_description: string | null;
        logo: string | null;
        cover_image: string | null;
        website_url: string | null;
        is_active: boolean;
        sort_order: number;
    };
}

export default function BrandEdit({ brand }: BrandEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: brand.name,
        slug: brand.slug,
        description: brand.description || '',
        short_description: brand.short_description || '',
        logo: brand.logo || '',
        cover_image: brand.cover_image || '',
        website_url: brand.website_url || '',
        is_active: brand.is_active,
        sort_order: brand.sort_order,
    });

    const breadcrumbs = [
        { title: 'Catalog', href: '#' },
        { title: 'Brands', href: admin.brands.index.url() },
        { title: 'Edit', href: admin.brands.edit.url({ brand: brand.id }) },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.brands.update.url({ brand: brand.id }));
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Brand</h1>
                        <p className="text-muted-foreground mt-2">
                            Update brand information
                        </p>
                    </div>
                    <Link href={admin.brands.index.url()}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Brands
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Brand Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Brand name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="brand-slug"
                                    />
                                    {errors.slug && (
                                        <p className="text-sm text-destructive">{errors.slug}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="short_description">Short Description</Label>
                                <Textarea
                                    id="short_description"
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    placeholder="Brief brand description"
                                    rows={2}
                                />
                                {errors.short_description && (
                                    <p className="text-sm text-destructive">{errors.short_description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Detailed brand description"
                                    rows={4}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="logo">Logo URL</Label>
                                    <Input
                                        id="logo"
                                        value={data.logo}
                                        onChange={(e) => setData('logo', e.target.value)}
                                        placeholder="https://example.com/logo.jpg"
                                    />
                                    {errors.logo && (
                                        <p className="text-sm text-destructive">{errors.logo}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cover_image">Cover Image URL</Label>
                                    <Input
                                        id="cover_image"
                                        value={data.cover_image}
                                        onChange={(e) => setData('cover_image', e.target.value)}
                                        placeholder="https://example.com/cover.jpg"
                                    />
                                    {errors.cover_image && (
                                        <p className="text-sm text-destructive">{errors.cover_image}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website_url">Website URL</Label>
                                <Input
                                    id="website_url"
                                    value={data.website_url}
                                    onChange={(e) => setData('website_url', e.target.value)}
                                    placeholder="https://brandwebsite.com"
                                />
                                {errors.website_url && (
                                    <p className="text-sm text-destructive">{errors.website_url}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
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

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-4">
                                <Link href={admin.brands.index.url()}>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Brand'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}