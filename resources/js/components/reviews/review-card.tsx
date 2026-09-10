import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RatingDisplay } from '@/components/ui/rating';
import { Pencil, Trash2, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
    id: number;
    rating: number;
    title: string;
    body: string;
    status: string;
    verified_purchase: boolean;
    created_at: string;
    user?: {
        id: number;
        name: string;
    };
    product?: {
        id: number;
        name: string;
        slug: string;
        images?: Array<{
            id: number;
            url: string;
        }>;
    };
}

interface ReviewCardProps {
    review: Review;
    canEdit?: boolean;
    canDelete?: boolean;
    onEdit?: (review: Review) => void;
    onDelete?: (reviewId: number) => void;
    isDeleting?: boolean;
    isLoading?: boolean;
}

export default function ReviewCard({ 
    review, 
    canEdit = false, 
    canDelete = false,
    onEdit,
    onDelete,
    isDeleting = false,
    isLoading = false
}: ReviewCardProps) {
    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approved
                    </Badge>
                );
            case 'pending':
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                    </Badge>
                );
            case 'rejected':
                return (
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                        <XCircle className="h-3 w-3 mr-1" />
                        Rejected
                    </Badge>
                );
            default:
                return <Badge>{status}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const reviewBody = review.body || review.comment || '';

    if (isLoading) {
        return (
            <Card>
                <CardContent className="py-8">
                    <div className="flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <RatingDisplay rating={review.rating} size="sm" />
                            {getStatusBadge(review.status)}
                            {review.verified_purchase && (
                                <Badge variant="outline" className="text-xs">
                                    Verified Purchase
                                </Badge>
                            )}
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{review.title}</h3>
                        <p className="text-sm text-muted-foreground">
                            {review.user?.name || 'Anonymous'} • {formatDate(review.created_at)}
                        </p>
                    </div>
                    {(canEdit || canDelete) && (
                        <div className="flex gap-2">
                            {canEdit && review.status !== 'approved' && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onEdit?.(review)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            )}
                            {canDelete && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onDelete?.(review.id)}
                                    disabled={isDeleting}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    {isDeleting ? (
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">{reviewBody}</p>
                
                {review.product && (
                    <>
                        <Separator className="my-4" />
                        <div className="flex items-center gap-3">
                            {review.product.images && review.product.images.length > 0 && (
                                <img
                                    src={review.product.images[0].url}
                                    alt={review.product.name}
                                    className="w-12 h-12 rounded-md object-cover"
                                />
                            )}
                            <div>
                                <p className="text-sm font-medium">{review.product.name}</p>
                                <a
                                    href={`/products/${review.product.slug}`}
                                    className="text-xs text-muted-foreground hover:text-foreground"
                                >
                                    View Product
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}