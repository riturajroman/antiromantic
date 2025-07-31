"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, Plus, Trash2, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { slugify } from "@/lib/utils-admin";

const sizeStockSchema = z.object({
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  stock: z.number().min(0, "Stock must be positive"),
});

const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().optional(),
  category: z.enum(["all", "tops", "bottoms", "dresses", "sets"], {
    required_error: "Please select a category",
  }),
  colorName: z.string().min(1, "Color name is required"),
  material: z.string().min(1, "Material is required"),
  careInstructions: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  comparePrice: z.number().min(0, "Compare price must be positive").optional(),
  sizeStock: z.array(sizeStockSchema).min(1, "At least one size must be added"),
  lowStockThreshold: z
    .number()
    .min(0, "Low stock threshold must be positive")
    .default(5),
  status: z
    .enum(["draft", "active", "inactive", "out_of_stock"])
    .default("draft"),
  isFeatured: z.boolean().default(false),
  weight: z.number().min(0, "Weight must be positive").optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const categories = [
  { value: "all", label: "All" },
  { value: "tops", label: "Tops" },
  { value: "bottoms", label: "Bottoms" },
  { value: "dresses", label: "Dresses" },
  { value: "sets", label: "Sets" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export function ProductForm({ product, isEdit = false }) {
  const router = useRouter();
  const [images, setImages] = useState(product?.images || []);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      shortDescription: product?.shortDescription || "",
      category: product?.category || "all",
      colorName: product?.colorName || "",
      material: product?.material || "",
      careInstructions: product?.careInstructions || "",
      price: product?.price || 0,
      comparePrice: product?.comparePrice || 0,
      sizeStock: product?.sizeStock || [],
      lowStockThreshold: product?.lowStockThreshold || 5,
      status: product?.status || "draft",
      isFeatured: product?.isFeatured || false,
      weight: product?.weight || 0,
      metaTitle: product?.metaTitle || "",
      metaDescription: product?.metaDescription || "",
      tags: product?.tags || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sizeStock",
  });

  // Watch name field to auto-generate slug
  const watchName = form.watch("name");
  useEffect(() => {
    if (watchName && !isEdit) {
      form.setValue("slug", slugify(watchName));
    }
  }, [watchName, form, isEdit]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "products");

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          setImages((prev) => [
            ...prev,
            {
              url: data.data.secure_url,
              publicId: data.data.public_id,
              alt: "",
            },
          ]);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleImageDelete = async (publicId, index) => {
    try {
      const response = await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (response.ok) {
        setImages((prev) => prev.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const addSizeStock = () => {
    append({ size: "S", stock: 0 });
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      const productData = {
        ...data,
        images,
      };

      const url = isEdit
        ? `/api/admin/products/${product._id}`
        : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        alert(result.message || "Error saving product");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container mx-auto p-6 max-w-4xl"
      style={{ backgroundColor: "#efece3" }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isEdit ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-gray-600">
          {isEdit
            ? "Update product information"
            : "Create a new product for your store"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Product Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product name"
                          {...field}
                          className="border-gray-300 focus:border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Slug
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="product-slug"
                          {...field}
                          className="border-gray-300 focus:border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Description *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed product description"
                        rows={4}
                        {...field}
                        className="border-gray-300 focus:border-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Short Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief product summary"
                        rows={2}
                        {...field}
                        className="border-gray-300 focus:border-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Category & Color */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">
                Category & Color
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Category *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-gray-500">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="colorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Color Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Light Beige, Solid Color"
                          {...field}
                          className="border-gray-300 focus:border-gray-500"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        As shown in the product image (e.g., "light beige, solid
                        color")
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="text-sm text-gray-600 mb-4">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-gray-700 font-medium">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, WEBP up to 10MB
                  </p>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleImageDelete(image.publicId, index)
                          }
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Size & Stock */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">
                Size & Stock
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    Add available sizes and their stock quantities
                  </p>
                  <Button
                    type="button"
                    onClick={addSizeStock}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Size
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <FormField
                      control={form.control}
                      name={`sizeStock.${index}.size`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-gray-700 font-medium">
                            Size
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-300 focus:border-gray-500">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`sizeStock.${index}.stock`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-gray-700 font-medium">
                            Stock
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                              className="border-gray-300 focus:border-gray-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                      className="mt-6 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Price (INR) *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="2,999"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            className="pl-10 border-gray-300 focus:border-gray-500"
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Inclusive of all taxes
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comparePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Compare at Price (INR)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="3,999"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            className="pl-10 border-gray-300 focus:border-gray-500"
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Original price before discount (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Material & Care */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">
                Material & Care
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Material *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 100% Cotton, Linen"
                          {...field}
                          className="border-gray-300 focus:border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Weight (grams)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="250"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                          className="border-gray-300 focus:border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="careInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Care Instructions
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Machine wash cold, tumble dry low, do not bleach"
                        rows={3}
                        {...field}
                        className="border-gray-300 focus:border-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* SEO & Settings */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg text-gray-900">
                SEO & Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:border-gray-500">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="out_of_stock">
                            Out of Stock
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lowStockThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Low Stock Threshold
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="5"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                          className="border-gray-300 focus:border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-gray-300"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-gray-700 font-medium">
                        Featured Product
                      </FormLabel>
                      <FormDescription className="text-gray-500">
                        Show this product in featured sections
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Meta Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="SEO friendly title"
                          {...field}
                          className="border-gray-300 focus:border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Meta Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="SEO friendly description"
                          rows={2}
                          {...field}
                          className="border-gray-300 focus:border-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || uploading}
              className="bg-gray-900 hover:bg-gray-800 text-white"
              style={{ backgroundColor: "#736c5f" }}
            >
              {loading
                ? "Saving..."
                : isEdit
                ? "Update Product"
                : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
