"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  Tag,
  Palette,
  Ruler,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice, formatDate } from "@/lib/utils-admin";

export default function ProductViewPage({ params }) {
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await params;
        setProductId(id);
        const response = await fetch(`/api/admin/products/${id}`);
        const result = await response.json();

        if (result.success) {
          setProduct(result.data);
        } else {
          console.error("Failed to fetch product:", result.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { id } = await params;
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/products");
      } else {
        alert(result.message || "Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Product not found</div>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto p-6 max-w-6xl"
      style={{ backgroundColor: "#efece3" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600">Product Details</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link href={`/admin/products/${productId}/edit`}>
            <Button style={{ backgroundColor: "#736c5f", color: "white" }}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Product
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Images */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      {image && image.url ? (
                        <Image
                          src={image.url}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="h-12 w-12 text-gray-400" />
                          <span className="text-sm text-gray-500 mt-2">
                            No image
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="h-12 w-12 text-gray-400" />
                    <span className="text-sm text-gray-500 mt-2">
                      No images uploaded
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Name
                  </label>
                  <p className="text-lg font-semibold">{product.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    SKU
                  </label>
                  <p className="text-lg">{product.sku}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Category
                  </label>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Status
                  </label>
                  <Badge
                    variant={
                      product.status === "active" ? "default" : "secondary"
                    }
                  >
                    {product.status}
                  </Badge>
                </div>
              </div>

              {product.description && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Description
                  </label>
                  <p className="text-gray-800 mt-1">{product.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <IndianRupee className="h-5 w-5 mr-2" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Price
                  </label>
                  <p className="text-2xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </p>
                </div>
                {product.comparePrice && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Compare Price
                    </label>
                    <p className="text-lg text-gray-500 line-through">
                      {formatPrice(product.comparePrice)}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Total Stock
                  </label>
                  <p className="text-lg font-semibold">{product.totalStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color & Size Stock */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Color & Size Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Color
                </label>
                <p className="text-lg font-semibold">{product.colorName}</p>
              </div>

              {product.sizeStock && product.sizeStock.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">
                    Size Stock
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {product.sizeStock.map((item) => (
                      <div
                        key={item.size}
                        className="border rounded-lg p-3 text-center"
                      >
                        <div className="font-semibold">{item.size}</div>
                        <div className="text-sm text-gray-600">
                          {item.stock} units
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Material & Care */}
          {(product.material || product.careInstructions) && (
            <Card>
              <CardHeader>
                <CardTitle>Material & Care</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {product.material && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Material
                    </label>
                    <p className="text-gray-800">{product.material}</p>
                  </div>
                )}
                {product.careInstructions && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Care Instructions
                    </label>
                    <p className="text-gray-800">{product.careInstructions}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* SEO */}
          {(product.metaTitle || product.metaDescription) && (
            <Card>
              <CardHeader>
                <CardTitle>SEO Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {product.metaTitle && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Meta Title
                    </label>
                    <p className="text-gray-800">{product.metaTitle}</p>
                  </div>
                )}
                {product.metaDescription && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Meta Description
                    </label>
                    <p className="text-gray-800">{product.metaDescription}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle>Timestamps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Created
                  </label>
                  <p className="text-gray-800">
                    {formatDate(product.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Updated
                  </label>
                  <p className="text-gray-800">
                    {formatDate(product.updatedAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
