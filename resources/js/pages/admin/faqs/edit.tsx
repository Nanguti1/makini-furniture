import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Save, Check, X, Loader2 } from 'lucide-react';
import admin from '@/routes/admin';

interface FAQEditProps {
    faq: {
        id: number;
        question: string;
        answer: string;
        category: string | null;
        is_active: boolean;
        sort_order: number;
        created_at: string;
        updated_at: string;
    };
}

export default function FAQEdit({ faq }: FAQEditProps) {
    const breadcrumbs = [
        { title: 'FAQs', href: admin.faqs.index.url() },
        { title: faq.question.substring(0, 30) + '...', href: admin.faqs.edit.url({ faq: faq.id }) },
    ];

    const { data, setData, put, processing, errors } = useForm({
        question: faq.question,
        answer: faq.answer,
        category: faq.category || '',
        is_active: faq.is_active,
        sort_order: faq.sort_order,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.faqs.update.url({ faq: faq.id }));
    };

    const handleActivate = () => {
        router.post(admin.faqs.activate.url({ faq: faq.id }));
    };

    const handleDeactivate = () => {
        router.post(admin.faqs.deactivate.url({ faq: faq.id }));
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit FAQ</h1>
                        <p className="text-muted-foreground mt-2">
                            {faq.question}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={admin.faqs.index.url()}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to FAQs
                            </Button>
                        </Link>
                        {faq.is_active ? (
                            <Button variant="outline" onClick={handleDeactivate}>
                                <X className="h-4 w-4 mr-2" />
                                Deactivate
                            </Button>
                        ) : (
                            <Button onClick={handleActivate}>
                                <Check className="h-4 w-4 mr-2" />
                                Activate
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant={faq.is_active ? 'default' : 'outline'}>
                        {faq.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    {faq.category && (
                        <Badge variant="outline">{faq.category}</Badge>
                    )}
                    <span className="text-sm text-muted-foreground">
                        Order: {faq.sort_order}
                    </span>
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
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Update FAQ
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}