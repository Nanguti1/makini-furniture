import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2, BookOpen } from 'lucide-react';
import admin from '@/routes/admin';
import { useState } from 'react';

interface LookbookEditProps {
    lookbook: {
        id: number;
        title: string;
        slug: string;
        description: string | null;
        hero_image: string | null;
        status: string;
        published_at: string | null;
        items?: Array<{
            id: number;
            product_id: number;
            sort_order: number;
            product?: {
                id: number;
                name: string;
                slug: string;
            };
        }>;
    };
    products?: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
}

export default function LookbookEdit({ lookbook, products = [] }: LookbookEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: lookbook.title,
        slug: lookbook.slug,
        description: lookbook.description || '',
        hero_image: lookbook.hero_image || '',
        status: lookbook.status,
    });

    const [newItemProductId, setNewItemProductId] = useState('');

    const breadcrumbs = [
        { title: 'Lookbooks', href: admin.lookbooks.index.url() },
        { title: 'Edit', href: admin.lookbooks.edit.url({ id: lookbook.id }) },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.lookbooks.update.url({ id: lookbook.id }));
    };

    const handleAddItem = () => {
        if (newItemProductId) {
            router.post('/admin/lookbooks/items', {
                lookbook_id: lookbook.id,
                product_id: parseInt(newItemProductId),
                sort_order: (lookbook.items?.length || 0) + 1,
            }, {
                onSuccess: () => {
                    setNewItemProductId('');
                }
            });
        }
    };

    const handleRemoveItem = (itemId: number) => {
        router.delete(`/admin/lookbooks/items/${itemId}`);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Lookbook</h1>
                        <p className="text-muted-foreground mt-2">
                            Update lookbook information and items
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={admin.lookbooks.index.url()}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Lookbooks
                            </Button>
                        </Link>
                    </div>
                </div>

                <Tabs defaultValue="details" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="items">Items</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details">
                        <form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lookbook Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Lookbook title"
                                            required
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-destructive">{errors.title}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            placeholder="lookbook-slug"
                                        />
                                        {errors.slug && (
                                            <p className="text-sm text-destructive">{errors.slug}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Lookbook description"
                                            rows={4}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-destructive">{errors.description}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="hero_image">Hero Image URL</Label>
                                        <Input
                                            id="hero_image"
                                            value={data.hero_image}
                                            onChange={(e) => setData('hero_image', e.target.value)}
                                            placeholder="https://example.com/hero-image.jpg"
                                        />
                                        {errors.hero_image && (
                                            <p className="text-sm text-destructive">{errors.hero_image}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                        {errors.status && (
                                            <p className="text-sm text-destructive">{errors.status}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 pt-4">
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Updating...' : 'Update Lookbook'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </form>
                    </TabsContent>

                    <TabsContent value="items">
                        <Card>
                            <CardHeader>
                                <CardTitle>Lookbook Items</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <select
                                        value={newItemProductId}
                                        onChange={(e) => setNewItemProductId(e.target.value)}
                                        className="flex-1 rounded-md border border-input bg-background px-3 py-2"
                                    >
                                        <option value="">Select a product to add</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                    <Button onClick={handleAddItem} disabled={!newItemProductId}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Item
                                    </Button>
                                </div>

                                {lookbook.items && lookbook.items.length > 0 ? (
                                    <div className="space-y-4">
                                        {lookbook.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                                <div className="flex-1">
                                                    <div className="font-medium">{item.product?.name || 'Unknown'}</div>
                                                    <div className="text-sm text-muted-foreground">{item.product?.slug || '-'}</div>
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    Order: {item.sort_order}
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No items added yet</p>
                                        <p className="text-sm mt-2">Add products to this lookbook</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}