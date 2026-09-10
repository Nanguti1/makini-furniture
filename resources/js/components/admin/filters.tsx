import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X, Filter } from 'lucide-react';
import { useState } from 'react';

export interface FilterOption {
    value: string;
    label: string;
}

export interface FilterField {
    name: string;
    label: string;
    type: 'text' | 'select';
    options?: FilterOption[];
    placeholder?: string;
}

interface FiltersProps {
    fields: FilterField[];
    values: Record<string, string>;
    onChange: (values: Record<string, string>) => void;
    onClear?: () => void;
}

export function Filters({ fields, values, onChange, onClear }: FiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleChange = (name: string, value: string) => {
        onChange({ ...values, [name]: value });
    };

    const handleClear = () => {
        const clearedValues = fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {} as Record<string, string>);
        onChange(clearedValues);
        onClear?.();
    };

    const hasActiveFilters = Object.values(values).some(value => value !== '');

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="gap-2"
                >
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                            {Object.values(values).filter(v => v !== '').length}
                        </span>
                    )}
                </Button>
                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={handleClear}>
                        <X className="h-4 w-4 mr-2" />
                        Clear all
                    </Button>
                )}
            </div>

            {isExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
                    {fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                            <Label htmlFor={field.name}>{field.label}</Label>
                            {field.type === 'select' ? (
                                <Select
                                    value={values[field.name] || ''}
                                    onValueChange={(value) => handleChange(field.name, value)}
                                >
                                    <SelectTrigger id={field.name}>
                                        <SelectValue placeholder={field.placeholder || 'Select...'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options?.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Input
                                    id={field.name}
                                    type="text"
                                    placeholder={field.placeholder}
                                    value={values[field.name] || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}