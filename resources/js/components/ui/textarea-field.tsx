import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';
import { useId } from 'react';

interface TextareaFieldProps {
    label?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
    className?: string;
    textareaClassName?: string;
}

export default function TextareaField({
    label,
    name,
    placeholder,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    rows = 3,
    className,
    textareaClassName,
}: TextareaFieldProps) {
    const id = useId();
    const fieldId = name || id;

    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <Label htmlFor={fieldId} className={cn(error && 'text-destructive')}>
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </Label>
            )}
            <Textarea
                id={fieldId}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                rows={rows}
                className={cn(error && 'border-destructive focus-visible:ring-destructive', textareaClassName)}
                aria-invalid={!!error}
            />
            <InputError message={error} />
        </div>
    );
}
