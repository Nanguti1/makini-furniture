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

interface BannerEditProps {
    banner: {
        id: number;
        title: string;
        subtitle: string | null;
        image: string | null;
        mobile_image: string | null;
        link: string | null;
        link_type: string | null;
        placement: string;
        starts_at: string | null;
        ends_at: string | null;
        is_active: boolean;
        sort_order: number;
    };
}

export default function BannerEdit({ banner }: BannerEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: banner.title,
        subtitle: banner.subtitle || '',
        image: banner.image || '',
        mobile_image: banner.mobile_image || '',
        link: banner.link || '',
        link_type: banner.link_type || 'url',
        placement: banner.placement,
        starts_at: banner.starts_at ? banner.starts_at.slice(0, 16) : '',
        ends_at: banner.ends_at ? banner.ends_at.slice(0, 16) : '',
        is_active: banner.is_active,
        sort_order: banner.sort_order,
    });

    const breadcrumbs = [
        { title: 'Merchandising', href: '#' },
        { title: 'Banners', href: admin.banners.index.url() },
        { title: 'Edit', href: admin.banners.edit.url({ id: banner.id }) },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.banners.update.url({ id: banner.id }));
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Banner</h1>
                        <p className="text-muted-foreground mt-2">
                            Update banner information
                        </p>
                    </div>
                    <Link href={admin.banners.index.url()}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Banners
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Banner Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Banner title"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Textarea
                                    id="subtitle"
                                    value={data.subtitle}
                                    onChange={(e) => setData('subtitle', e.target.value)}
                                    placeholder="Banner subtitle"
                                    rows={2}
                                />
                                {errors.subtitle && (
                                    <p className="text-sm text-destructive">{errors.subtitle}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="image">Desktop Image URL</Label>
                                    <Input
                                        id="image"
                                        value={data.image}
                                        onChange={(e) => setData('image', e.target.value)}
                                        placeholder="https://example.com/banner.jpg"
                                    />
                                    {errors.image && (
                                        <p className="text-sm text-destructive">{errors.image}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="mobile_image">Mobile Image URL</Label>
                                    <Input
                                        id="mobile_image"
                                        value={data.mobile_image}
                                        onChange={(e) => setData('mobile_image', e.target.value)}
                                        placeholder="https://example.com/banner-mobile.jpg"
                                    />
                                    {errors.mobile_image && (
                                        <p className="text-sm text-destructive">{errors.mobile_image}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="link">Link URL</Label>
                                    <Input
                                        id="link"
                                        value={data.link}
                                        onChange={(e) => setData('link', e.target.value)}
                                        placeholder="https://example.com/collection"
                                    />
                                    {errors.link && (
                                        <p className="text-sm text-destructive">{errors.link}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="link_type">Link Type</Label>
                                    <select
                                        id="link_type"
                                        value={data.link_type}
                                        onChange={(e) => setData('link_type', e.target.value)}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                                    >
                                        <option value="url">URL</option>
                                        <option value="product">Product</option>
                                        <option value="collection">Collection</option>
                                        <option value="category">Category</option>
                                    </select>
                                    {errors.link_type && (
                                        <p className="text-sm text-destructive">{errors.link_type}</p>
                                    )}
                                </div>
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
                                        <option value="product">Product Page</option>
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
                                    {processing ? 'Updating...' : 'Update Banner'}
                                </Button>
                                <Link href={admin.banners.index.url()}>
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