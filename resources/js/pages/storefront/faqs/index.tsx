import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { router } from '@inertiajs/react';

interface FAQ {
    id: number;
    question: string;
    answer: string;
    category?: string;
    is_active: boolean;
    sort_order: number;
}

interface FAQsIndexProps {
    faqs: FAQ[];
    categories: string[];
    selectedCategory?: string;
}

export default function FaqsIndexPage({ faqs, categories, selectedCategory }: FAQsIndexProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
    const [localCategory, setLocalCategory] = useState(selectedCategory || '');

    const toggleExpand = (id: number) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    const handleCategoryChange = (category: string) => {
        const newCategory = category === localCategory ? '' : category;
        setLocalCategory(newCategory);
        router.get('/faqs', newCategory ? { category: newCategory } : {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const filteredFAQs = faqs.filter(faq => {
        const matchesCategory = !localCategory || faq.category === localCategory;
        const matchesSearch = !searchQuery ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const groupedFAQs = categories.reduce((acc, category) => {
        acc[category] = filteredFAQs.filter(faq => faq.category === category);
        return acc;
    }, {} as Record<string, FAQ[]>);

    const uncategorizedFAQs = filteredFAQs.filter(faq => !faq.category);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8 md:mb-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                    Find answers to common questions about our products, services, and policies.
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Category Filters */}
            {categories.length > 0 && (
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Button
                            variant={!localCategory ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleCategoryChange('')}
                        >
                            All
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={localCategory === category ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* FAQs Content */}
            <div className="max-w-4xl mx-auto">
                {filteredFAQs.length > 0 ? (
                    <div className="space-y-6">
                        {/* Display by category if categories exist and no specific category is selected */}
                        {categories.length > 0 && !localCategory && !searchQuery ? (
                            <>
                                {categories.map((category) => {
                                    const categoryFAQs = groupedFAQs[category];
                                    if (!categoryFAQs || categoryFAQs.length === 0) return null;

                                    return (
                                        <div key={category}>
                                            <h2 className="text-2xl font-bold mb-4">{category}</h2>
                                            <div className="space-y-4">
                                                {categoryFAQs.map((faq) => (
                                                    <FAQItem
                                                        key={faq.id}
                                                        faq={faq}
                                                        isExpanded={expandedItems.has(faq.id)}
                                                        onToggle={() => toggleExpand(faq.id)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Uncategorized FAQs */}
                                {uncategorizedFAQs.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">General</h2>
                                        <div className="space-y-4">
                                            {uncategorizedFAQs.map((faq) => (
                                                <FAQItem
                                                    key={faq.id}
                                                    faq={faq}
                                                    isExpanded={expandedItems.has(faq.id)}
                                                    onToggle={() => toggleExpand(faq.id)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* Display flat list when searching or specific category selected */
                            <div className="space-y-4">
                                {filteredFAQs.map((faq) => (
                                    <FAQItem
                                        key={faq.id}
                                        faq={faq}
                                        isExpanded={expandedItems.has(faq.id)}
                                        onToggle={() => toggleExpand(faq.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <HelpCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h2 className="text-2xl font-semibold mb-2">No FAQs found</h2>
                            <p className="text-muted-foreground">
                                {searchQuery
                                    ? 'Try adjusting your search terms.'
                                    : 'Check back soon for new FAQs.'}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

interface FAQItemProps {
    faq: FAQ;
    isExpanded: boolean;
    onToggle: () => void;
}

function FAQItem({ faq, isExpanded, onToggle }: FAQItemProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg font-semibold flex-1">{faq.question}</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggle}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? (
                            <ChevronUp className="h-5 w-5" />
                        ) : (
                            <ChevronDown className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </CardHeader>
            {isExpanded && (
                <CardContent>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                    {faq.category && (
                        <div className="mt-4">
                            <Badge variant="secondary">{faq.category}</Badge>
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    );
}
