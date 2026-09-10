import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Image as ImageIcon, Package, Trash2, ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';
import admin from '@/routes/admin';
import { useState } from 'react';

interface ProductCreateProps {
    brands?: Array<{
        id: number;
        name: string;
    }>;
    categories?: Array<{
        id: number;
        name: string;
    }>;
    collections?: Array<{
        id: number;
        name: string;
    }>;
    productFamilies?: Array<{
        id: number;
        name: string;
    }>;
}

export default function ProductCreate({ brands = [], categories = [], collections = [], productFamilies = [] }: ProductCreateProps) {
    const [variants, setVariants] = useState<any[]>([]);
    const [images, setImages] = useState<any[]>([]);
    const [inventoryLevels, setInventoryLevels] = useState<{ variantId: number; quantity: number; reorderLevel: number }[]>([]);

    const { data, setData, post, processing, errors } = useForm({
        brand_id: '',
        category_id: '',
        collection_id: '',
        product_family_id: '',
        name: '',
        slug: '',
        sku: '',
        short_description: '',
        description: '',
        specifications: '',
        care_instructions: '',
        assembly_information: '',
        warranty_information: '',
        status: 'draft',
        product_type: 'standard',
        is_featured: false,
        is_new: false,
        is_bestseller: false,
        is_customizable: false,
        is_active: true,
        sort_order: 0,
        meta_title: '',
        meta_description: '',
    });

    const breadcrumbs = [
        { title: 'Products', href: admin.products.index.url() },
        { title: 'Create', href: admin.products.create.url() },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.products.store.url());
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
                        <p className="text-muted-foreground mt-2">
                            Add a new product to your catalog
                        </p>
                    </div>
                    <Link href={admin.products.index.url()}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Products
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <Tabs defaultValue="basic" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="organization">Organization</TabsTrigger>
                            <TabsTrigger value="variants">Variants</TabsTrigger>
                            <TabsTrigger value="inventory">Inventory</TabsTrigger>
                            <TabsTrigger value="media">Media</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="seo">SEO</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name *</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Product name"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-destructive">{errors.name}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="slug">Slug</Label>
                                            <Input
                                                id="slug"
                                                value={data.slug}
                                                onChange={(e) => setData('slug', e.target.value)}
                                                placeholder="product-slug"
                                            />
                                            {errors.slug && (
                                                <p className="text-sm text-destructive">{errors.slug}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="sku">SKU</Label>
                                            <Input
                                                id="sku"
                                                value={data.sku}
                                                onChange={(e) => setData('sku', e.target.value)}
                                                placeholder="SKU-001"
                                            />
                                            {errors.sku && (
                                                <p className="text-sm text-destructive">{errors.sku}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="product_type">Product Type</Label>
                                            <select
                                                id="product_type"
                                                value={data.product_type}
                                                onChange={(e) => setData('product_type', e.target.value)}
                                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                            >
                                                <option value="standard">Standard</option>
                                                <option value="bundle">Bundle</option>
                                                <option value="configurable">Configurable</option>
                                                <option value="digital">Digital</option>
                                            </select>
                                            {errors.product_type && (
                                                <p className="text-sm text-destructive">{errors.product_type}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="short_description">Short Description</Label>
                                        <Textarea
                                            id="short_description"
                                            value={data.short_description}
                                            onChange={(e) => setData('short_description', e.target.value)}
                                            placeholder="Brief product description"
                                            rows={3}
                                        />
                                        {errors.short_description && (
                                            <p className="text-sm text-destructive">{errors.short_description}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Detailed product description"
                                            rows={6}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-destructive">{errors.description}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="details">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="specifications">Specifications (JSON)</Label>
                                        <Textarea
                                            id="specifications"
                                            value={data.specifications}
                                            onChange={(e) => setData('specifications', e.target.value)}
                                            placeholder='{"material": "wood", "dimensions": "100x50x75"}'
                                            rows={4}
                                        />
                                        {errors.specifications && (
                                            <p className="text-sm text-destructive">{errors.specifications}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="care_instructions">Care Instructions</Label>
                                        <Textarea
                                            id="care_instructions"
                                            value={data.care_instructions}
                                            onChange={(e) => setData('care_instructions', e.target.value)}
                                            placeholder="How to care for this product"
                                            rows={3}
                                        />
                                        {errors.care_instructions && (
                                            <p className="text-sm text-destructive">{errors.care_instructions}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="assembly_information">Assembly Information</Label>
                                        <Textarea
                                            id="assembly_information"
                                            value={data.assembly_information}
                                            onChange={(e) => setData('assembly_information', e.target.value)}
                                            placeholder="Assembly instructions"
                                            rows={3}
                                        />
                                        {errors.assembly_information && (
                                            <p className="text-sm text-destructive">{errors.assembly_information}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="warranty_information">Warranty Information</Label>
                                        <Textarea
                                            id="warranty_information"
                                            value={data.warranty_information}
                                            onChange={(e) => setData('warranty_information', e.target.value)}
                                            placeholder="Warranty details"
                                            rows={3}
                                        />
                                        {errors.warranty_information && (
                                            <p className="text-sm text-destructive">{errors.warranty_information}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="organization">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Organization</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="brand_id">Brand</Label>
                                            <select
                                                id="brand_id"
                                                value={data.brand_id}
                                                onChange={(e) => setData('brand_id', e.target.value)}
                                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                            >
                                                <option value="">No brand</option>
                                                {brands.map((brand) => (
                                                    <option key={brand.id} value={brand.id}>
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.brand_id && (
                                                <p className="text-sm text-destructive">{errors.brand_id}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="category_id">Category</Label>
                                            <select
                                                id="category_id"
                                                value={data.category_id}
                                                onChange={(e) => setData('category_id', e.target.value)}
                                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                            >
                                                <option value="">No category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category_id && (
                                                <p className="text-sm text-destructive">{errors.category_id}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="collection_id">Collection</Label>
                                            <select
                                                id="collection_id"
                                                value={data.collection_id}
                                                onChange={(e) => setData('collection_id', e.target.value)}
                                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                            >
                                                <option value="">No collection</option>
                                                {collections.map((collection) => (
                                                    <option key={collection.id} value={collection.id}>
                                                        {collection.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.collection_id && (
                                                <p className="text-sm text-destructive">{errors.collection_id}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="product_family_id">Product Family</Label>
                                            <select
                                                id="product_family_id"
                                                value={data.product_family_id}
                                                onChange={(e) => setData('product_family_id', e.target.value)}
                                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                            >
                                                <option value="">No product family</option>
                                                {productFamilies.map((productFamily) => (
                                                    <option key={productFamily.id} value={productFamily.id}>
                                                        {productFamily.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.product_family_id && (
                                                <p className="text-sm text-destructive">{errors.product_family_id}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sort_order">Sort Order</Label>
                                        <Input
                                            id="sort_order"
                                            type="number"
                                            value={data.sort_order}
                                            onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                            min="0"
                                        />
                                        {errors.sort_order && (
                                            <p className="text-sm text-destructive">{errors.sort_order}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="variants">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Product Variants</CardTitle>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => {
                                                const newVariant = {
                                                    id: Date.now(),
                                                    name: '',
                                                    sku: '',
                                                    price_override: 0,
                                                    is_default: false,
                                                    is_active: true,
                                                    isNew: true
                                                };
                                                setVariants([...variants, newVariant]);
                                            }}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Variant
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {variants.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <p>No variants added yet</p>
                                            <p className="text-sm mt-2">Add variants to manage different sizes, colors, or configurations</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {variants.map((variant, index) => (
                                                <div key={variant.id} className="p-4 border rounded-lg space-y-4">
                                                    <div className="grid gap-4 md:grid-cols-3">
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`variant-name-${variant.id}`}>Variant Name *</Label>
                                                            <Input
                                                                id={`variant-name-${variant.id}`}
                                                                value={variant.name}
                                                                onChange={(e) => {
                                                                    const updated = [...variants];
                                                                    updated[index].name = e.target.value;
                                                                    setVariants(updated);
                                                                }}
                                                                placeholder="e.g., Red, Large, Oak"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`variant-sku-${variant.id}`}>SKU</Label>
                                                            <Input
                                                                id={`variant-sku-${variant.id}`}
                                                                value={variant.sku}
                                                                onChange={(e) => {
                                                                    const updated = [...variants];
                                                                    updated[index].sku = e.target.value;
                                                                    setVariants(updated);
                                                                }}
                                                                placeholder="Variant SKU"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`variant-price-${variant.id}`}>Price Override</Label>
                                                            <Input
                                                                id={`variant-price-${variant.id}`}
                                                                type="number"
                                                                step="0.01"
                                                                value={variant.price_override}
                                                                onChange={(e) => {
                                                                    const updated = [...variants];
                                                                    updated[index].price_override = parseFloat(e.target.value) || 0;
                                                                    setVariants(updated);
                                                                }}
                                                                placeholder="0.00"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                id={`variant-default-${variant.id}`}
                                                                checked={variant.is_default}
                                                                onCheckedChange={(checked) => {
                                                                    const updated = [...variants];
                                                                    updated[index].is_default = checked as boolean;
                                                                    setVariants(updated);
                                                                }}
                                                            />
                                                            <Label htmlFor={`variant-default-${variant.id}`}>Default Variant</Label>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                id={`variant-active-${variant.id}`}
                                                                checked={variant.is_active}
                                                                onCheckedChange={(checked) => {
                                                                    const updated = [...variants];
                                                                    updated[index].is_active = checked as boolean;
                                                                    setVariants(updated);
                                                                }}
                                                            />
                                                            <Label htmlFor={`variant-active-${variant.id}`}>Active</Label>
                                                        </div>
                                                        <div className="ml-auto flex items-center gap-2">
                                                            {variant.isNew && (
                                                                <Badge variant="outline">New</Badge>
                                                            )}
                                                            <Button 
                                                                variant="ghost" 
                                                                size="sm"
                                                                onClick={() => {
                                                                    const updated = variants.filter((_, i) => i !== index);
                                                                    setVariants(updated);
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="inventory">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Inventory Management</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {variants.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <p>Add product variants first to manage inventory</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {variants.map((variant, index) => {
                                                const inventory = inventoryLevels.find(i => i.variantId === variant.id);
                                                const quantity = inventory?.quantity ?? 0;
                                                const reorderLevel = inventory?.reorderLevel ?? 5;
                                                const isLowStock = quantity <= reorderLevel;
                                                
                                                return (
                                                    <div key={variant.id} className="p-4 border rounded-lg space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <div className="font-medium">{variant.name}</div>
                                                                <div className="text-sm text-muted-foreground">SKU: {variant.sku}</div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="font-medium">{quantity} in stock</div>
                                                                {isLowStock && (
                                                                    <div className="flex items-center gap-1 text-sm text-destructive">
                                                                        <AlertTriangle className="h-3 w-3" />
                                                                        Low stock
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="grid gap-4 md:grid-cols-3">
                                                            <div className="space-y-2">
                                                                <Label htmlFor={`inventory-qty-${variant.id}`}>Quantity</Label>
                                                                <Input
                                                                    id={`inventory-qty-${variant.id}`}
                                                                    type="number"
                                                                    value={quantity}
                                                                    onChange={(e) => {
                                                                        const updated = [...inventoryLevels];
                                                                        const existingIndex = updated.findIndex(i => i.variantId === variant.id);
                                                                        if (existingIndex >= 0) {
                                                                            updated[existingIndex].quantity = parseInt(e.target.value) || 0;
                                                                        } else {
                                                                            updated.push({
                                                                                variantId: variant.id,
                                                                                quantity: parseInt(e.target.value) || 0,
                                                                                reorderLevel: 5
                                                                            });
                                                                        }
                                                                        setInventoryLevels(updated);
                                                                    }}
                                                                    min="0"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor={`inventory-reorder-${variant.id}`}>Reorder Level</Label>
                                                                <Input
                                                                    id={`inventory-reorder-${variant.id}`}
                                                                    type="number"
                                                                    value={reorderLevel}
                                                                    onChange={(e) => {
                                                                        const updated = [...inventoryLevels];
                                                                        const existingIndex = updated.findIndex(i => i.variantId === variant.id);
                                                                        if (existingIndex >= 0) {
                                                                            updated[existingIndex].reorderLevel = parseInt(e.target.value) || 5;
                                                                        } else {
                                                                            updated.push({
                                                                                variantId: variant.id,
                                                                                quantity: 0,
                                                                                reorderLevel: parseInt(e.target.value) || 5
                                                                            });
                                                                        }
                                                                        setInventoryLevels(updated);
                                                                    }}
                                                                    min="0"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor={`inventory-status-${variant.id}`}>Status</Label>
                                                                <div className="flex items-center gap-2">
                                                                    {isLowStock ? (
                                                                        <Badge variant="destructive">Low Stock</Badge>
                                                                    ) : quantity === 0 ? (
                                                                        <Badge variant="secondary">Out of Stock</Badge>
                                                                    ) : (
                                                                        <Badge variant="default">In Stock</Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="media">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Media Gallery</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="file"
                                                id="image-upload"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files || []);
                                                    files.forEach(file => {
                                                        const reader = new FileReader();
                                                        reader.onload = (event) => {
                                                            const newImage = {
                                                                id: Date.now() + Math.random(),
                                                                path: event.target?.result as string,
                                                                alt_text: file.name.split('.')[0],
                                                                is_primary: images.length === 0,
                                                                sort_order: images.length,
                                                                isNew: true
                                                            };
                                                            setImages([...images, newImage]);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    });
                                                }}
                                            />
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => document.getElementById('image-upload')?.click()}
                                            >
                                                <ImageIcon className="h-4 w-4 mr-2" />
                                                Upload Images
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {images.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <p>No images uploaded yet</p>
                                            <p className="text-sm mt-2">Upload images to showcase your product</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {images.map((image, index) => (
                                                <div key={image.id} className="relative group">
                                                    <img
                                                        src={image.path}
                                                        alt={image.alt_text || 'Product image'}
                                                        className="w-full h-32 object-cover rounded-md border"
                                                    />
                                                    {image.is_primary && (
                                                        <Badge className="absolute top-2 right-2">
                                                            Featured
                                                        </Badge>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-2">
                                                        <Button 
                                                            variant="secondary" 
                                                            size="sm"
                                                            onClick={() => {
                                                                setImages(images.map(img => 
                                                                    img.id === image.id 
                                                                        ? { ...img, is_primary: true }
                                                                        : { ...img, is_primary: false }
                                                                ));
                                                            }}
                                                        >
                                                            Set Featured
                                                        </Button>
                                                        {!image.is_primary && (
                                                            <Button 
                                                                variant="secondary" 
                                                                size="sm"
                                                                onClick={() => {
                                                                    if (index > 0) {
                                                                        const updated = [...images];
                                                                        [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
                                                                        setImages(updated);
                                                                    }
                                                                }}
                                                            >
                                                                <ChevronUp className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        {index < images.length - 1 && (
                                                            <Button 
                                                                variant="secondary" 
                                                                size="sm"
                                                                onClick={() => {
                                                                    const updated = [...images];
                                                                    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
                                                                    setImages(updated);
                                                                }}
                                                            >
                                                                <ChevronDown className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        <Button 
                                                            variant="destructive" 
                                                            size="sm"
                                                            onClick={() => {
                                                                setImages(images.filter(img => img.id !== image.id));
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="settings">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        {errors.status && (
                                            <p className="text-sm text-destructive">{errors.status}</p>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="is_featured"
                                                checked={data.is_featured}
                                                onCheckedChange={(checked) => setData('is_featured', checked as boolean)}
                                            />
                                            <Label htmlFor="is_featured">Featured Product</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="is_new"
                                                checked={data.is_new}
                                                onCheckedChange={(checked) => setData('is_new', checked as boolean)}
                                            />
                                            <Label htmlFor="is_new">New Product</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="is_bestseller"
                                                checked={data.is_bestseller}
                                                onCheckedChange={(checked) => setData('is_bestseller', checked as boolean)}
                                            />
                                            <Label htmlFor="is_bestseller">Bestseller</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="is_customizable"
                                                checked={data.is_customizable}
                                                onCheckedChange={(checked) => setData('is_customizable', checked as boolean)}
                                            />
                                            <Label htmlFor="is_customizable">Customizable</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="is_active"
                                                checked={data.is_active}
                                                onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                            />
                                            <Label htmlFor="is_active">Active</Label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="seo">
                            <Card>
                                <CardHeader>
                                    <CardTitle>SEO Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="meta_title">Meta Title</Label>
                                        <Input
                                            id="meta_title"
                                            value={data.meta_title}
                                            onChange={(e) => setData('meta_title', e.target.value)}
                                            placeholder="SEO title"
                                        />
                                        {errors.meta_title && (
                                            <p className="text-sm text-destructive">{errors.meta_title}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="meta_description">Meta Description</Label>
                                        <Textarea
                                            id="meta_description"
                                            value={data.meta_description}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            placeholder="SEO description"
                                            rows={3}
                                        />
                                        {errors.meta_description && (
                                            <p className="text-sm text-destructive">{errors.meta_description}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="flex items-center justify-end gap-4 mt-6">
                        <Link href={admin.products.index.url()}>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}