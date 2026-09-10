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

interface CollectionCreateProps {
    brands?: Array<{
        id: number;
        name: string;
    }>;
}

export default function CollectionCreate({ brands = [] }: CollectionCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        brand_id: '',
        name: '',
        slug: '',
        description: '',
        short_description: '',
        hero_image: '',
        banner_image: '',
        is_featured: false,
        is_active: true,
        sort_order: 0,
    });

    const breadcrumbs = [
        { title: 'Collections', href: admin.collections.index.url() },
        { title: 'Create', href: admin.collections.create.url() },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.collections.store.url());
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Collection</h1>
                        <p className="text-muted-foreground mt-2">
                            Add a new collection to your catalog
                        </p>
                    </div>
                    <Link href={admin.collections.index.url()}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Collections
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Collection Details</CardTitle>
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
                                        placeholder="Collection name"
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
                                        placeholder="collection-slug"
                                    />
                                    {errors.slug && (
                                        <p className="text-sm text-destructive">{errors.slug}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="brand_id">Brand</Label>
                                <select
                                    id="brand_id"
                                    value={data.brand_id}
                                    onChange={(e) => setData('brand_id', e.target.value)}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                                >
                                    <option value="">No brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.brand_id && (
                                    <p className="text-sm text-destructive">{errors.brand_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="short_description">Short Description</Label>
                                <Textarea
                                    id="short_description"
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    placeholder="Brief collection description"
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
                                    placeholder="Detailed collection description"
                                    rows={4}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="hero_image">Hero Image URL</Label>
                                    <Input
                                        id="hero_image"
                                        value={data.hero_image}
                                        onChange={(e) => setData('hero_image', e.target.value)}
                                        placeholder="https://example.com/hero.jpg"
                                    />
                                    {errors.hero_image && (
                                        <p className="text-sm text-destructive">{errors.hero_image}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="banner_image">Banner Image URL</Label>
                                    <Input
                                        id="banner_image"
                                        value={data.banner_image}
                                        onChange={(e) => setData('banner_image', e.target.value)}
                                        placeholder="https://example.com/banner.jpg"
                                    />
                                    {errors.banner_image && (
                                        <p className="text-sm text-destructive">{errors.banner_image}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
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
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onCheckedChange={(checked) => setData('is_featured', checked as boolean)}
                                    />
                                    <Label htmlFor="is_featured">Featured</Label>
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
                                <Link href={admin.collections.index.url()}>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Collection'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}