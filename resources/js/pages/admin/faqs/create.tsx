import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import admin from '@/routes/admin';

export default function FAQCreate() {
    const breadcrumbs = [
        { title: 'FAQs', href: admin.faqs.index.url() },
        { title: 'Create FAQ', href: admin.faqs.create.url() },
    ];

    const { data, setData, post, processing, errors } = useForm({
        question: '',
        answer: '',
        category: '',
        is_active: false,
        sort_order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.faqs.store.url());
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create FAQ</h1>
                        <p className="text-muted-foreground mt-2">
                            Create a new frequently asked question
                        </p>
                    </div>
                    <Link href={admin.faqs.index.url()}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to FAQs
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>FAQ Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="question">Question *</Label>
                                <Input
                                    id="question"
                                    value={data.question}
                                    onChange={(e) => setData('question', e.target.value)}
                                    placeholder="What is your question?"
                                />
                                {errors.question && <p className="text-sm text-destructive mt-1">{errors.question}</p>}
                            </div>

                            <div>
                                <Label htmlFor="answer">Answer *</Label>
                                <Textarea
                                    id="answer"
                                    value={data.answer}
                                    onChange={(e) => setData('answer', e.target.value)}
                                    placeholder="Provide a detailed answer"
                                    rows={6}
                                />
                                {errors.answer && <p className="text-sm text-destructive mt-1">{errors.answer}</p>}
                            </div>

                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    placeholder="FAQ category (optional)"
                                />
                                {errors.category && <p className="text-sm text-destructive mt-1">{errors.category}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>

                            <div>
                                <Label htmlFor="sort_order">Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                />
                                {errors.sort_order && <p className="text-sm text-destructive mt-1">{errors.sort_order}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-end gap-2">
                        <Link href={admin.faqs.index.url()}>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Create FAQ
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}