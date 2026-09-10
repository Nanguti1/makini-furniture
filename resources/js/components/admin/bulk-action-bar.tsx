import { Button } from '@/components/ui/button';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export interface BulkAction {
    label: string;
    value: string;
    icon?: React.ReactNode;
    destructive?: boolean;
}

interface BulkActionBarProps {
    selectedCount: number;
    actions: BulkAction[];
    onAction: (action: string) => void;
    onClearSelection: () => void;
}

export function BulkActionBar({ 
    selectedCount, 
    actions, 
    onAction, 
    onClearSelection 
}: BulkActionBarProps) {
    if (selectedCount === 0) {
        return null;
    }

    const primaryActions = actions.slice(0, 2);
    const secondaryActions = actions.slice(2);

    return (
        <div className="flex items-center justify-between p-4 bg-muted/50 border-b">
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                    {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
                </span>
                <Button variant="ghost" size="sm" onClick={onClearSelection}>
                    Clear selection
                </Button>
            </div>

            <div className="flex items-center gap-2">
                {primaryActions.map((action) => (
                    <Button
                        key={action.value}
                        variant={action.destructive ? 'destructive' : 'default'}
                        size="sm"
                        onClick={() => onAction(action.value)}
                        className="gap-2"
                    >
                        {action.icon}
                        {action.label}
                    </Button>
                ))}
                
                {secondaryActions.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>More actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {secondaryActions.map((action) => (
                                <DropdownMenuItem
                                    key={action.value}
                                    onClick={() => onAction(action.value)}
                                    className={action.destructive ? 'text-destructive' : ''}
                                >
                                    {action.icon}
                                    {action.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
}