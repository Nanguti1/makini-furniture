import { Star } from 'lucide-react';

interface RatingDisplayProps {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
    count?: number;
}

export function RatingDisplay({ 
    rating, 
    maxRating = 5, 
    size = 'md',
    showValue = false,
    count 
}: RatingDisplayProps) {
    const sizeClasses = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center">
                {[...Array(maxRating)].map((_, i) => (
                    <Star
                        key={i}
                        className={`${sizeClasses[size]} ${
                            i < Math.floor(rating)
                                ? 'fill-primary text-primary'
                                : 'fill-muted text-muted'
                        }`}
                    />
                ))}
            </div>
            {showValue && (
                <span className="text-sm text-muted-foreground">
                    {rating.toFixed(1)}
                    {count !== undefined && ` (${count} ${count === 1 ? 'review' : 'reviews'})`}
                </span>
            )}
        </div>
    );
}

interface RatingInputProps {
    rating: number;
    onChange: (rating: number) => void;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

export function RatingInput({ 
    rating, 
    onChange, 
    maxRating = 5,
    size = 'md',
    disabled = false
}: RatingInputProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6'
    };

    return (
        <div className="flex items-center gap-1">
            {[...Array(maxRating)].map((_, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={() => onChange(i + 1)}
                    disabled={disabled}
                    className={`${sizeClasses[size]} transition-colors ${
                        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-primary/80'
                    }`}
                    aria-label={`Rate ${i + 1} stars`}
                >
                    <Star
                        className={`${sizeClasses[size]} ${
                            i < rating
                                ? 'fill-primary text-primary'
                                : 'fill-muted text-muted'
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}