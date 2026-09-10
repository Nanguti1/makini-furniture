import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RatingInput } from '@/components/ui/rating';
import { Loader2, X } from 'lucide-react';
import { router } from '@inertiajs/react';

interface ReviewFormProps {
    productId: number;
    productSlug: string;
    productName: string;
    productImage?: string;
    existingReview?: {
        id: number;
        rating: number;
        title: string;
        body?: string;
        comment?: string;
    };
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function ReviewForm({
    productId,
    productSlug,
    productName,
    productImage,
    existingReview,
    onSuccess,
    onCancel
}: ReviewFormProps) {
    const [rating, setRating] = useState(existingReview?.rating || 0);
    const [title, setTitle] = useState(existingReview?.title || '');
    const [body, setBody] = useState(existingReview?.body || existingReview?.comment || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const formData = {
            rating,
            title,
            body,
        };

        try {
            if (existingReview) {
                await router.put(`/account/reviews/${existingReview.id}`, formData, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsSubmitting(false);
                        onSuccess?.();
                    },
                    onError: (errors) => {
                        setIsSubmitting(false);
                        setErrors(errors);
                    },
                });
            } else {
                await router.post(`/account/reviews/products/${productId}`, formData, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsSubmitting(false);
                        setRating(0);
                        setTitle('');
                        setBody('');
                        onSuccess?.();
                    },
                    onError: (errors) => {
                        setIsSubmitting(false);
                        setErrors(errors);
                    },
                });
            }
        } catch (error) {
            setIsSubmitting(false);
            console.error('Review submission error:', error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>
                        {existingReview ? 'Edit Your Review' : 'Write a Review'}
                    </CardTitle>
                    {onCancel && (
                        <Button variant="ghost" size="icon" onClick={onCancel}>
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Product Info */}
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        {productImage && (
                            <img
                                src={productImage}
                                alt={productName}
                                className="w-12 h-12 rounded-md object-cover"
                            />
                        )}
                        <div>
                            <p className="font-medium text-sm">{productName}</p>
                            <a
                                href={`/products/${productSlug}`}
                                className="text-xs text-muted-foreground hover:text-foreground"
                            >
                                View Product
                            </a>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="space-y-2">
                        <Label>Rating *</Label>
                        <RatingInput
                            rating={rating}
                            onChange={setRating}
                            size="lg"
                        />
                        {errors.rating && (
                            <p className="text-sm text-red-500">{errors.rating}</p>
                        )}
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Review Title *</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Summarize your experience"
                            required
                            maxLength={255}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>

                    {/* Body */}
                    <div className="space-y-2">
                        <Label htmlFor="body">Your Review *</Label>
                        <Textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Share your thoughts about this product"
                            required
                            rows={4}
                            minLength={10}
                        />
                        {errors.body && (
                            <p className="text-sm text-red-500">{errors.body}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 justify-end flex-wrap sm:flex-nowrap">
                        {onCancel && (
                            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 sm:flex-none">
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" disabled={isSubmitting || rating === 0} className="flex-1 sm:flex-none">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    {existingReview ? 'Updating...' : 'Submitting...'}
                                </>
                            ) : (
                                existingReview ? 'Update Review' : 'Submit Review'
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}