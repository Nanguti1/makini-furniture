import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';
import { useId } from 'react';

interface FormFieldProps {
    label?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    inputClassName?: string;
}

export default function FormField({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    className,
    inputClassName,
}: FormFieldProps) {
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
            <Input
                id={fieldId}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={cn(error && 'border-destructive focus-visible:ring-destructive', inputClassName)}
                aria-invalid={!!error}
            />
            <InputError message={error} />
        </div>
    );
}
