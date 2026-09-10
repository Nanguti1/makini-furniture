import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';
import { useId } from 'react';

interface SelectFieldProps {
    label?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    options: { value: string; label: string }[];
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    selectClassName?: string;
}

export default function SelectField({
    label,
    name,
    placeholder = 'Select an option',
    value,
    onValueChange,
    options,
    error,
    required = false,
    disabled = false,
    className,
    selectClassName,
}: SelectFieldProps) {
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
            <Select
                value={value}
                onValueChange={onValueChange}
                disabled={disabled}
            >
                <SelectTrigger
                    className={cn(error && 'border-destructive focus-visible:ring-destructive', selectClassName)}
                    aria-invalid={!!error}
                    id={fieldId}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <InputError message={error} />
        </div>
    );
}
