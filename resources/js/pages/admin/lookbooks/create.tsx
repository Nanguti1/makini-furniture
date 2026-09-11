import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import admin from '@/routes/admin';

export default function LookbookCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        description: '',
        hero_image: '',
        status: 'draft',
    });

    const breadcrumbs = [
        { title: 'Lookbooks', href: admin.lookbooks.index.url() },
        { title: 'Create', href: admin.lookbooks.create.url() },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.lookbooks.store.url());
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Lookbook</h1>
                        <p className="text-muted-foreground mt-2">
                            Create a new curated product collection
                        </p>
                    </div>
                    <Link href={admin.lookbooks.index.url()}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Lookbooks
                        </Button>
                    </Link>
                </div>

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
                                    {processing ? 'Creating...' : 'Create Lookbook'}
                                </Button>
                                <Link href={admin.lookbooks.index.url()}>
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