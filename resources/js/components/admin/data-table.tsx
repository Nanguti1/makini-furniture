import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Column<T> {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    cell?: (row: T) => React.ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selected?: Set<string>;
    onSelectChange?: (selected: Set<string>) => void;
    onSort?: (column: string, direction: 'asc' | 'desc') => void;
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
    data,
    columns,
    loading = false,
    selected = new Set(),
    onSelectChange,
    onSort,
    sortColumn,
    sortDirection,
    emptyMessage = 'No data available',
}: DataTableProps<T>) {
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            onSelectChange?.(new Set(data.map((row) => row.id?.toString() || JSON.stringify(row))));
        } else {
            onSelectChange?.(new Set());
        }
    };

    const handleSelectRow = (id: string, checked: boolean) => {
        const newSelected = new Set(selected);
        if (checked) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        onSelectChange?.(newSelected);
    };

    const handleSort = (column: string) => {
        if (!onSort) return;
        
        if (sortColumn === column) {
            onSort(column, sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            onSort(column, 'asc');
        }
    };

    const getSortIcon = (column: string) => {
        if (sortColumn !== column) {
            return <ChevronsUpDown className="ml-2 h-4 w-4" />;
        }
        return sortDirection === 'asc' ? (
            <ChevronUp className="ml-2 h-4 w-4" />
        ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
        );
    };

    const allSelected = data.length > 0 && selected.size === data.length;
    const someSelected = selected.size > 0 && selected.size < data.length;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">{emptyMessage}</div>
            </div>
        );
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {onSelectChange && (
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={allSelected}
                                    indeterminate={someSelected}
                                    onCheckedChange={handleSelectAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                        )}
                        {columns.map((column) => (
                            <TableHead
                                key={column.key as string}
                                className={cn(
                                    column.sortable && 'cursor-pointer hover:bg-muted/50',
                                    column.className
                                )}
                                onClick={() => column.sortable && handleSort(column.key as string)}
                            >
                                <div className="flex items-center">
                                    {column.header}
                                    {column.sortable && getSortIcon(column.key as string)}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => {
                        const rowId = row.id?.toString() || JSON.stringify(row);
                        return (
                            <TableRow key={rowId}>
                                {onSelectChange && (
                                    <TableCell>
                                        <Checkbox
                                            checked={selected.has(rowId)}
                                            onCheckedChange={(checked) =>
                                                handleSelectRow(rowId, checked as boolean)
                                            }
                                            aria-label="Select row"
                                        />
                                    </TableCell>
                                )}
                                {columns.map((column) => (
                                    <TableCell key={column.key as string} className={column.className}>
                                        {column.cell ? column.cell(row) : row[column.key as keyof T]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}