import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Save, Check, X, Plus, Trash2 } from 'lucide-react';
import admin from '@/routes/admin';

interface PageEditProps {
    page: {
        id: number;
        title: string;
        slug: string;
        content: string | null;
        meta_title: string | null;
        meta_description: string | null;
        status: string;
        published_at: string | null;
        created_at: string;
        updated_at: string;
        sections: Array<{
            id: number;
            type: string;
            content: string | null;
            sort_order: number;
        }>;
    };
}

export default function PageEdit({ page }: PageEditProps) {
    const breadcrumbs = [
        { title: 'Pages', href: admin.pages.index.url() },
        { title: page.title, href: admin.pages.edit.url({ page: page.id }) },
    ];

    const { data, setData, put, processing, errors } = useForm({
        title: page.title,
        slug: page.slug,
        content: page.content || '',
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        status: page.status,
        published_at: page.published_at || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.pages.update.url({ page: page.id }));
    };

    const handlePublish = () => {
        router.post(admin.pages.publish.url({ page: page.id }));
    };

    const handleUnpublish = () => {
        router.post(admin.pages.unpublish.url({ page: page.id }));
    };

    const handleAddSection = () => {
        // This would need to be implemented with proper section management
        // For now, we'll show a placeholder
        alert('Section management would be implemented here');
    };

    const handleDeleteSection = (sectionId: number) => {
        if (confirm('Are you sure you want to delete this section?')) {
            // This would need the proper route implementation
            // For now, we'll use a placeholder
            console.log('Delete section:', sectionId);
        }
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Page</h1>
                        <p className="text-muted-foreground mt-2">
                            {page.title}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={admin.pages.index.url()}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Pages
                            </Button>
                        </Link>
                        {page.status === 'draft' ? (
                            <Button onClick={handlePublish}>
                                <Check className="h-4 w-4 mr-2" />
                                Publish
                            </Button>
                        ) : (
                            <Button variant="outline" onClick={handleUnpublish}>
                                <X className="h-4 w-4 mr-2" />
                                Unpublish
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant={page.status === 'published' ? 'default' : 'outline'}>
                        {page.status}
                    </Badge>
                    {page.published_at && (
                        <span className="text-sm text-muted-foreground">
                            Published {new Date(page.published_at).toLocaleDateString()}
                        </span>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Page Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Page title"
                                />
                                {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="page-slug"
                                />
                                {errors.slug && <p className="text-sm text-destructive mt-1">{errors.slug}</p>}
                            </div>

                            <div>
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Page content"
                                    rows={10}
                                />
                                {errors.content && <p className="text-sm text-destructive mt-1">{errors.content}</p>}
                            </div>

                            <div>
                                <Label htmlFor="meta_title">Meta Title</Label>
                                <Input
                                    id="meta_title"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    placeholder="SEO title"
                                />
                                {errors.meta_title && <p className="text-sm text-destructive mt-1">{errors.meta_title}</p>}
                            </div>

                            <div>
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <Textarea
                                    id="meta_description"
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    placeholder="SEO description"
                                    rows={3}
                                />
                                {errors.meta_description && <p className="text-sm text-destructive mt-1">{errors.meta_description}</p>}
                            </div>

                            <div>
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="published_at">Published At</Label>
                                <Input
                                    id="published_at"
                                    type="datetime-local"
                                    value={data.published_at}
                                    onChange={(e) => setData('published_at', e.target.value)}
                                />
                                {errors.published_at && <p className="text-sm text-destructive mt-1">{errors.published_at}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Page Sections ({page.sections.length})</CardTitle>
                                <Button onClick={handleAddSection} size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Section
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {page.sections.length > 0 ? (
                                <div className="space-y-4">
                                    {page.sections.map((section) => (
                                        <div key={section.id} className="flex items-start justify-between p-4 border rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline">{section.type}</Badge>
                                                    <span className="text-sm text-muted-foreground">
                                                        Order: {section.sort_order}
                                                    </span>
                                                </div>
                                                {section.content && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {section.content.substring(0, 100)}...
                                                    </p>
                                                )}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteSection(section.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No sections added yet.</p>
                            )}
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-end gap-2">
                        <Link href={admin.pages.index.url()}>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            Update Page
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}