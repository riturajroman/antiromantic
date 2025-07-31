import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectDB();

    // Fetch real data from database
    const [products, categories] = await Promise.all([
      Product.find({}),
      Category.find({}),
    ]);

    // Calculate product stats
    const activeProducts = products.filter((p) => p.status === "active").length;
    const lowStockProducts = products.filter((p) => {
      const totalStock =
        p.sizeStock?.reduce((sum, size) => sum + size.stock, 0) || 0;
      return totalStock > 0 && totalStock <= (p.lowStockThreshold || 5);
    }).length;
    const outOfStockProducts = products.filter((p) => {
      const totalStock =
        p.sizeStock?.reduce((sum, size) => sum + size.stock, 0) || 0;
      return totalStock === 0;
    }).length;

    // Get top products (mock data for now since we don't have orders)
    const topProducts = products.slice(0, 5).map((product) => ({
      _id: product._id,
      name: product.name,
      images: product.images,
      basePrice: product.price,
      salesCount: Math.floor(Math.random() * 50) + 1, // Mock sales count
    }));

    const stats = {
      overview: {
        totalProducts: products.length,
        totalOrders: 0, // Will be updated when orders are implemented
        totalUsers: 0, // Will be updated when users are implemented
        totalCategories: categories.length,
        thisMonthRevenue: 0, // Will be updated when orders are implemented
        averageOrderValue: 0, // Will be updated when orders are implemented
        orderGrowth: 0,
        revenueGrowth: 0,
      },
      products: {
        total: products.length,
        active: activeProducts,
        lowStock: lowStockProducts,
        outOfStock: outOfStockProducts,
      },
      orders: {
        total: 0,
        pending: 0,
        thisMonth: 0,
        thisWeek: 0,
        recent: [],
      },
      revenue: {
        thisMonth: 0,
        lastMonth: 0,
        growth: 0,
        averageOrderValue: 0,
      },
      charts: {
        salesByDay: [],
      },
      topProducts: topProducts,
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}
