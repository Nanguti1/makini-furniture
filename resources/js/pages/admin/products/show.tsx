import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Edit, 
    Star,
    Package,
    Tag,
    Building2,
    FolderTree,
    Layers,
    Settings,
    Check,
    X
} from 'lucide-react';
import admin from '@/routes/admin';

interface ProductShowProps {
    product: {
        id: number;
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
        created_at: string;
        updated_at: string;
        brand?: {
            id: number;
            name: string;
        };
        category?: {
            id: number;
            name: string;
        };
        collection?: {
            id: number;
            name: string;
        };
        productFamily?: {
            id: number;
            name: string;
        };
        categories?: Array<{
            id: number;
            name: string;
        }>;
        collections?: Array<{
            id: number;
            name: string;
        }>;
        materials?: Array<{
            id: number;
            name: string;
        }>;
        finishes?: Array<{
            id: number;
            name: string;
        }>;
        colors?: Array<{
            id: number;
            name: string;
        }>;
        tags?: Array<{
            id: number;
            name: string;
        }>;
        features?: Array<{
            id: number;
            name: string;
        }>;
        rooms?: Array<{
            id: number;
            name: string;
        }>;
        variants?: Array<{
            id: number;
            name: string;
            sku: string;
            price: number;
        }>;
        images?: Array<{
            id: number;
            url: string;
            is_featured: boolean;
        }>;
    };
}

export default function ProductShow({ product }: ProductShowProps) {
    const breadcrumbs = [
        { title: 'Catalog', href: '#' },
        { title: 'Products', href: admin.products.index.url() },
        { title: product.name, href: admin.products.show.url({ product: product.slug }) },
    ];

    const parseJson = (jsonString: string | null) => {
        if (!jsonString) return null;
        try {
            return JSON.parse(jsonString);
        } catch {
            return null;
        }
    };

    const specifications = parseJson(product.specifications);

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                        <p className="text-muted-foreground mt-2">
                            {product.sku && `SKU: ${product.sku}`}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={admin.products.index.url()}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Products
                            </Button>
                        </Link>
                        <Link href={admin.products.edit.url({ product: product.slug })}>
                            <Button>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Product
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {product.status}
                    </Badge>
                    {product.is_featured && <Star className="h-4 w-4 text-yellow-500" />}
                    {product.is_new && <Badge variant="outline">New</Badge>}
                    {product.is_bestseller && <Badge variant="outline">Bestseller</Badge>}
                    {product.is_customizable && <Badge variant="outline">Customizable</Badge>}
                    {product.is_active ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-gray-400" />}
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="organization">Organization</TabsTrigger>
                        <TabsTrigger value="attributes">Attributes</TabsTrigger>
                        <TabsTrigger value="variants">Variants</TabsTrigger>
                        <TabsTrigger value="media">Media</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Name</p>
                                        <p className="font-medium">{product.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Slug</p>
                                        <p className="font-medium">{product.slug}</p>
                                    </div>
                                    {product.sku && (
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">SKU</p>
                                            <p className="font-medium">{product.sku}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Product Type</p>
                                        <p className="font-medium capitalize">{product.product_type}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Short Description</p>
                                        <p className="text-sm">{product.short_description || '-'}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Status & Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                                            {product.status}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Active</p>
                                        {product.is_active ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-gray-400" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Featured</p>
                                        {product.is_featured ? <Star className="h-4 w-4 text-yellow-500" /> : <X className="h-4 w-4 text-gray-400" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Sort Order</p>
                                        <p className="font-medium">{product.sort_order}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {product.description && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="whitespace-pre-wrap">{product.description}</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="details">
                        <div className="grid gap-6 md:grid-cols-2">
                            {specifications && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Specifications</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <pre className="text-sm overflow-auto bg-muted p-4 rounded-md">
                                            {JSON.stringify(specifications, null, 2)}
                                        </pre>
                                    </CardContent>
                                </Card>
                            )}

                            {product.care_instructions && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Care Instructions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-wrap">{product.care_instructions}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {product.assembly_information && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Assembly Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-wrap">{product.assembly_information}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {product.warranty_information && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Warranty Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-wrap">{product.warranty_information}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="organization">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4" />
                                        Brand
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {product.brand ? (
                                        <p className="font-medium">{product.brand.name}</p>
                                    ) : (
                                        <p className="text-muted-foreground">No brand assigned</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FolderTree className="h-4 w-4" />
                                        Category
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {product.category ? (
                                        <p className="font-medium">{product.category.name}</p>
                                    ) : (
                                        <p className="text-muted-foreground">No category assigned</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Layers className="h-4 w-4" />
                                        Collection
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {product.collection ? (
                                        <p className="font-medium">{product.collection.name}</p>
                                    ) : (
                                        <p className="text-muted-foreground">No collection assigned</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-4 w-4" />
                                        Product Family
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {product.productFamily ? (
                                        <p className="font-medium">{product.productFamily.name}</p>
                                    ) : (
                                        <p className="text-muted-foreground">No product family assigned</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {(product.categories && product.categories.length > 0) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Additional Categories</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {product.categories.map((category) => (
                                            <Badge key={category.id} variant="outline">
                                                {category.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {(product.collections && product.collections.length > 0) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Additional Collections</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {product.collections.map((collection) => (
                                            <Badge key={collection.id} variant="outline">
                                                {collection.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="attributes">
                        <div className="grid gap-6 md:grid-cols-2">
                            {product.materials && product.materials.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Materials</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {product.materials.map((material) => (
                                                <Badge key={material.id} variant="outline">
                                                    {material.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {product.finishes && product.finishes.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Finishes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {product.finishes.map((finish) => (
                                                <Badge key={finish.id} variant="outline">
                                                    {finish.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {product.colors && product.colors.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Colors</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {product.colors.map((color) => (
                                                <Badge key={color.id} variant="outline">
                                                    {color.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {product.tags && product.tags.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Tag className="h-4 w-4" />
                                            Tags
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {product.tags.map((tag) => (
                                                <Badge key={tag.id} variant="outline">
                                                    {tag.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {product.features && product.features.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Features</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside space-y-1">
                                            {product.features.map((feature) => (
                                                <li key={feature.id}>{feature.name}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}

                            {product.rooms && product.rooms.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Rooms</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {product.rooms.map((room) => (
                                                <Badge key={room.id} variant="outline">
                                                    {room.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="variants">
                        {product.variants && product.variants.length > 0 ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Variants</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {product.variants.map((variant) => (
                                            <div key={variant.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <p className="font-medium">{variant.name}</p>
                                                    <p className="text-sm text-muted-foreground">SKU: {variant.sku}</p>
                                                </div>
                                                <p className="font-medium">${variant.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardContent className="py-8">
                                    <p className="text-center text-muted-foreground">No variants available</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="media">
                        {product.images && product.images.length > 0 ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Images</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {product.images.map((image) => (
                                            <div key={image.id} className="relative">
                                                <img
                                                    src={image.url}
                                                    alt={product.name}
                                                    className="w-full h-32 object-cover rounded-md"
                                                />
                                                {image.is_featured && (
                                                    <Badge className="absolute top-2 right-2">
                                                        Featured
                                                    </Badge>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardContent className="py-8">
                                    <p className="text-center text-muted-foreground">No images available</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>

                <Card>
                    <CardHeader>
                        <CardTitle>SEO Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Meta Title</p>
                            <p className="font-medium">{product.meta_title || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Meta Description</p>
                            <p className="text-sm">{product.meta_description || '-'}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Timestamps</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Created</p>
                            <p className="font-medium">{new Date(product.created_at).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                            <p className="font-medium">{new Date(product.updated_at).toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}