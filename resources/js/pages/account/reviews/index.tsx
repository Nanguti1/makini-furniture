import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RatingDisplay } from '@/components/ui/rating';
import EmptyState from '@/components/ui/empty-state';
import ReviewCard from '@/components/reviews/review-card';
import ReviewForm from '@/components/reviews/review-form';
import { Star, Plus, ShoppingBag, AlertCircle } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    slug: string;
    images?: Array<{
        id: number;
        url: string;
    }>;
}

interface Review {
    id: number;
    rating: number;
    title: string;
    body: string;
    status: string;
    verified_purchase: boolean;
    created_at: string;
    product: Product;
}

interface AccountReviewsIndexProps {
    reviews: Review[];
    eligibleProducts: Product[];
}

export default function AccountReviewsIndexPage({ reviews, eligibleProducts }: AccountReviewsIndexProps) {
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [isDeleting, setIsDeleting] = useState<Record<number, boolean>>({});
    const [error, setError] = useState<string | null>(null);

    const handleAddReview = (product: Product) => {
        setSelectedProduct(product);
        setEditingReview(null);
        setShowForm(true);
    };

    const handleEditReview = (review: Review) => {
        setEditingReview(review);
        setSelectedProduct(review.product);
        setShowForm(true);
    };

    const handleDeleteReview = async (reviewId: number) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        setIsDeleting(prev => ({ ...prev, [reviewId]: true }));
        setError(null);

        try {
            await router.delete(`/account/reviews/${reviewId}`, {
                onError: (errors) => {
                    console.error('Delete review error:', errors);
                    setError('Failed to delete review. Please try again.');
                    setIsDeleting(prev => ({ ...prev, [reviewId]: false }));
                },
            });
        } catch (error) {
            console.error('Delete review error:', error);
            setError('Failed to delete review. Please try again.');
            setIsDeleting(prev => ({ ...prev, [reviewId]: false }));
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedProduct(null);
        setEditingReview(null);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedProduct(null);
        setEditingReview(null);
    };

    const pendingReviews = reviews.filter(r => r.status === 'pending');
    const approvedReviews = reviews.filter(r => r.status === 'approved');
    const rejectedReviews = reviews.filter(r => r.status === 'rejected');

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Reviews</h1>
                <p className="text-muted-foreground">
                    {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </p>
            </div>

            {/* Error State */}
            {error && (
                <Card className="mb-6 border-red-200 bg-red-50">
                    <CardContent className="py-4">
                        <div className="flex items-center gap-2 text-red-800">
                            <AlertCircle className="h-5 w-5" />
                            <p className="text-sm">{error}</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Review Form */}
            {showForm && selectedProduct && (
                <div className="mb-8">
                    <ReviewForm
                        productId={selectedProduct.id}
                        productSlug={selectedProduct.slug}
                        productName={selectedProduct.name}
                        productImage={selectedProduct.images?.[0]?.url}
                        existingReview={editingReview || undefined}
                        onSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                    />
                </div>
            )}

            {/* Eligible Products */}
            {eligibleProducts.length > 0 && !showForm && (
                <Card className="mb-8">
                    <CardContent className="py-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="font-semibold mb-1">Products to Review</h3>
                                <p className="text-sm text-muted-foreground">
                                    Share your experience with products you've purchased
                                </p>
                            </div>
                            <Badge variant="secondary">{eligibleProducts.length}</Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {eligibleProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    {product.images && product.images.length > 0 && (
                                        <img
                                            src={product.images[0].url}
                                            alt={product.name}
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{product.name}</p>
                                        <a
                                            href={`/products/${product.slug}`}
                                            className="text-xs text-muted-foreground hover:text-foreground"
                                        >
                                            View Product
                                        </a>
                                    </div>
                                    <Button
                                        size="sm"
                                        onClick={() => handleAddReview(product)}
                                    >
                                        <Star className="h-4 w-4 mr-1" />
                                        Review
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Reviews List */}
            {reviews.length === 0 ? (
                <EmptyState
                    icon="star"
                    title="No reviews yet"
                    description="You haven't written any reviews yet. Start reviewing products you've purchased!"
                    action={
                        eligibleProducts.length > 0 ? (
                            <Button onClick={() => eligibleProducts.length > 0 && handleAddReview(eligibleProducts[0])}>
                                <Plus className="h-4 w-4 mr-2" />
                                Write Your First Review
                            </Button>
                        ) : (
                            <Button asChild>
                                <a href="/catalog">
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    Start Shopping
                                </a>
                            </Button>
                        )
                    }
                />
            ) : (
                <div className="space-y-6">
                    {/* Pending Reviews */}
                    {pendingReviews.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Pending Reviews ({pendingReviews.length})</h2>
                            <div className="space-y-4">
                                {pendingReviews.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                        canEdit
                                        canDelete
                                        onEdit={handleEditReview}
                                        onDelete={handleDeleteReview}
                                        isDeleting={isDeleting[review.id]}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Approved Reviews */}
                    {approvedReviews.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Approved Reviews ({approvedReviews.length})</h2>
                            <div className="space-y-4">
                                {approvedReviews.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                        canDelete
                                        onDelete={handleDeleteReview}
                                        isDeleting={isDeleting[review.id]}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rejected Reviews */}
                    {rejectedReviews.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Rejected Reviews ({rejectedReviews.length})</h2>
                            <div className="space-y-4">
                                {rejectedReviews.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                        canEdit
                                        canDelete
                                        onEdit={handleEditReview}
                                        onDelete={handleDeleteReview}
                                        isDeleting={isDeleting[review.id]}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
