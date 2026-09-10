import { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';

interface FilterDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    filters: Record<string, any>;
    onFiltersChange: (filters: Record<string, any>) => void;
    onApplyFilters: () => void;
    onClearFilters: () => void;
}

export default function FilterDrawer({
    open,
    onOpenChange,
    filters,
    onFiltersChange,
    onApplyFilters,
    onClearFilters,
}: FilterDrawerProps) {
    const updateFilter = (key: string, value: any) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const removeFilter = (key: string) => {
        const newFilters = { ...filters };
        delete newFilters[key];
        onFiltersChange(newFilters);
    };

    const activeFilterCount = Object.keys(filters).filter(
        key => filters[key] !== undefined && filters[key] !== '' && filters[key] !== null
    ).length;

    return (
        <Drawer open={open} onOpenChange={onOpenChange} side="left">
            <DrawerHeader>
                <div className="flex items-center justify-between">
                    <DrawerTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="text-sm font-normal text-muted-foreground">
                                ({activeFilterCount})
                            </span>
                        )}
                    </DrawerTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onOpenChange(false)}
                        aria-label="Close filters"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </DrawerHeader>

            <DrawerBody className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <Input
                        id="search"
                        placeholder="Search products..."
                        value={filters.search || ''}
                        onChange={(e) => updateFilter('search', e.target.value)}
                    />
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                        value={filters.category || ''}
                        onValueChange={(value) => updateFilter('category', value || undefined)}
                    >
                        <SelectTrigger id="category" className="w-full">
                            <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All categories</SelectItem>
                            <SelectItem value="sofas">Sofas</SelectItem>
                            <SelectItem value="tables">Tables</SelectItem>
                            <SelectItem value="chairs">Chairs</SelectItem>
                            <SelectItem value="bedroom">Bedroom</SelectItem>
                            <SelectItem value="living">Living Room</SelectItem>
                            <SelectItem value="dining">Dining Room</SelectItem>
                            <SelectItem value="office">Office</SelectItem>
                            <SelectItem value="outdoor">Outdoor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                    <Label>Price Range</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={filters.min_price || ''}
                            onChange={(e) => updateFilter('min_price', e.target.value || undefined)}
                            min="0"
                            step="0.01"
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                            type="number"
                            placeholder="Max"
                            value={filters.max_price || ''}
                            onChange={(e) => updateFilter('max_price', e.target.value || undefined)}
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>

                {/* Material */}
                <div className="space-y-2">
                    <Label htmlFor="material">Material</Label>
                    <Select
                        value={filters.material || ''}
                        onValueChange={(value) => updateFilter('material', value || undefined)}
                    >
                        <SelectTrigger id="material" className="w-full">
                            <SelectValue placeholder="All materials" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All materials</SelectItem>
                            <SelectItem value="wood">Wood</SelectItem>
                            <SelectItem value="metal">Metal</SelectItem>
                            <SelectItem value="fabric">Fabric</SelectItem>
                            <SelectItem value="leather">Leather</SelectItem>
                            <SelectItem value="glass">Glass</SelectItem>
                            <SelectItem value="marble">Marble</SelectItem>
                            <SelectItem value="rattan">Rattan</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Color */}
                <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Select
                        value={filters.color || ''}
                        onValueChange={(value) => updateFilter('color', value || undefined)}
                    >
                        <SelectTrigger id="color" className="w-full">
                            <SelectValue placeholder="All colors" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All colors</SelectItem>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="brown">Brown</SelectItem>
                            <SelectItem value="gray">Gray</SelectItem>
                            <SelectItem value="beige">Beige</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Room */}
                <div className="space-y-2">
                    <Label htmlFor="room">Room</Label>
                    <Select
                        value={filters.room || ''}
                        onValueChange={(value) => updateFilter('room', value || undefined)}
                    >
                        <SelectTrigger id="room" className="w-full">
                            <SelectValue placeholder="All rooms" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All rooms</SelectItem>
                            <SelectItem value="living-room">Living Room</SelectItem>
                            <SelectItem value="dining-room">Dining Room</SelectItem>
                            <SelectItem value="bedroom">Bedroom</SelectItem>
                            <SelectItem value="office">Office</SelectItem>
                            <SelectItem value="outdoor">Outdoor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Available Only */}
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="available"
                        checked={filters.available === true}
                        onCheckedChange={(checked) => updateFilter('available', checked)}
                    />
                    <Label htmlFor="available" className="cursor-pointer">
                        In stock only
                    </Label>
                </div>
            </DrawerBody>

            <DrawerFooter className="flex-col sm:flex-row gap-2">
                <Button
                    variant="outline"
                    onClick={onClearFilters}
                    disabled={activeFilterCount === 0}
                    className="w-full sm:w-auto"
                >
                    Clear All
                </Button>
                <Button onClick={onApplyFilters} className="w-full sm:w-auto">
                    Apply Filters
                </Button>
            </DrawerFooter>
        </Drawer>
    );
}
