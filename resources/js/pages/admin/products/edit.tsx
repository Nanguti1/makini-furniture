import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import admin from '@/routes/admin';

interface ProductEditProps {
    product: {
        id: number;
        brand_id: number | null;
        category_id: number | null;
        collection_id: number | null;
        product_family_id: number | null;
        name: string;
        slug: string;
        sku: string | null;
        short_description: string | null;
        description: string | null;
        specifications: string | null;
        care_instructions: string | null;
        assembly_information: string | null;
        warranty_information: string | null;
        status: string;
        product_type: string;
        is_featured: boolean;
        is_new: boolean;
        is_bestseller: boolean;
        is_customizable: boolean;
        is_active: boolean;
        sort_order: number;
        meta_title: string | null;
        meta_description: string | null;
    };
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

export default function ProductEdit({ product, brands = [], categories = [], collections = [], productFamilies = [] }: ProductEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        brand_id: product.brand_id || '',
        category_id: product.category_id || '',
        collection_id: product.collection_id || '',
        product_family_id: product.product_family_id || '',
        name: product.name,
        slug: product.slug,
        sku: product.sku || '',
        short_description: product.short_description || '',
        description: product.description || '',
        specifications: product.specifications || '',
        care_instructions: product.care_instructions || '',
        assembly_information: product.assembly_information || '',
        warranty_information: product.warranty_information || '',
        status: product.status,
        product_type: product.product_type,
        is_featured: product.is_featured,
        is_new: product.is_new,
        is_bestseller: product.is_bestseller,
        is_customizable: product.is_customizable,
        is_active: product.is_active,
        sort_order: product.sort_order,
        meta_title: product.meta_title || '',
        meta_description: product.meta_description || '',
    });

    const breadcrumbs = [
        { title: 'Catalog', href: '#' },
        { title: 'Products', href: admin.products.index.url() },
        { title: 'Edit', href: admin.products.edit.url({ product: product.slug }) },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.products.update.url({ product: product.slug }));
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
                        <p className="text-muted-foreground mt-2">
                            Update product information
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
                            {processing ? 'Updating...' : 'Update Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}