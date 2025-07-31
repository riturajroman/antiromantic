import mongoose from "mongoose";

const SizeStockSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    shortDescription: {
      type: String,
      maxlength: [500, "Short description cannot exceed 500 characters"],
    },

    // Category - updated to use predefined categories
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["all", "tops", "bottoms", "dresses", "sets"],
      default: "all",
    },

    // Images
    images: [
      {
        url: {
          type: String,
          required: false,
        },
        publicId: {
          type: String,
          required: false,
        },
        alt: {
          type: String,
          default: "",
        },
      },
    ],

    // Single color for the product
    colorName: {
      type: String,
      required: [true, "Color name is required"],
      trim: true,
    },

    // Pricing
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    comparePrice: {
      type: Number,
      min: 0,
    },

    // Size-wise stock
    sizeStock: [SizeStockSchema],

    // Material and care
    material: {
      type: String,
      required: true,
    },
    careInstructions: {
      type: String,
    },

    // Inventory - calculated from sizeStock
    totalStock: {
      type: Number,
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
    },

    // SEO
    metaTitle: {
      type: String,
      maxlength: [60, "Meta title cannot exceed 60 characters"],
    },
    metaDescription: {
      type: String,
      maxlength: [160, "Meta description cannot exceed 160 characters"],
    },

    // Product status
    status: {
      type: String,
      enum: ["draft", "active", "inactive", "out_of_stock"],
      default: "draft",
    },

    // Featured product
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Shipping Information
    weight: {
      type: Number,
      min: 0,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    shippingClass: {
      type: String,
      enum: ["standard", "express", "fragile", "special"],
      default: "standard",
    },
    requiresSpecialHandling: {
      type: Boolean,
      default: false,
    },
    estimatedDeliveryDays: {
      type: Number,
      min: 1,
      default: 7,
    },

    // Customer Assistance
    sizeGuide: {
      type: String,
      maxlength: [1000, "Size guide cannot exceed 1000 characters"],
    },
    faqSection: {
      type: String,
      maxlength: [2000, "FAQ section cannot exceed 2000 characters"],
    },
    customerSupportNotes: {
      type: String,
      maxlength: [500, "Customer support notes cannot exceed 500 characters"],
    },

    // Reviews
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },

    // Sales data
    salesCount: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to calculate total stock
ProductSchema.pre("save", function (next) {
  this.totalStock = this.sizeStock.reduce(
    (total, size) => total + size.stock,
    0
  );
  next();
});

// Indexes for better performance
ProductSchema.index({ name: "text", description: "text" });
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ status: 1, isFeatured: 1 });
// Note: slug index is already created by unique: true in schema definition

// Virtual for calculating discount percentage
ProductSchema.virtual("discountPercentage").get(function () {
  if (this.comparePrice && this.price < this.comparePrice) {
    return Math.round(
      ((this.comparePrice - this.price) / this.comparePrice) * 100
    );
  }
  return 0;
});

// Virtual for checking if product is in stock
ProductSchema.virtual("inStock").get(function () {
  return this.totalStock > 0;
});

// Virtual for checking if product is low in stock
ProductSchema.virtual("lowStock").get(function () {
  return this.totalStock <= this.lowStockThreshold && this.totalStock > 0;
});

ProductSchema.set("toJSON", { virtuals: true });
ProductSchema.set("toObject", { virtuals: true });

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
