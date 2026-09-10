import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormActionsProps {
    onCancel?: () => void;
    cancelText?: string;
    onSubmit?: () => void;
    submitText?: string;
    submitDisabled?: boolean;
    isSubmitting?: boolean;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

export default function FormActions({
    onCancel,
    cancelText = 'Cancel',
    onSubmit,
    submitText = 'Submit',
    submitDisabled = false,
    isSubmitting = false,
    align = 'right',
    className,
}: FormActionsProps) {
    const alignmentClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
    };

    return (
        <div className={cn('flex gap-3 pt-4', alignmentClasses[align], className)}>
            {onCancel && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    {cancelText}
                </Button>
            )}
            {onSubmit && (
                <Button
                    type="submit"
                    onClick={onSubmit}
                    disabled={submitDisabled || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : submitText}
                </Button>
            )}
        </div>
    );
}
