"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils-admin";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard/stats");
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to fetch dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="space-y-6 p-6"
        style={{ backgroundColor: "#efece3", minHeight: "100vh" }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome to your AntiRomantic admin dashboard
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="space-y-6 p-6"
        style={{ backgroundColor: "#efece3", minHeight: "100vh" }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <Card
          className="border border-gray-200"
          style={{ backgroundColor: "#efece3" }}
        >
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <AlertTriangle
                className="h-12 w-12 mx-auto mb-4"
                style={{ color: "#736c5f" }}
              />
              <h3 className="text-lg font-medium mb-2 text-gray-900">
                Error loading dashboard
              </h3>
              <p className="text-gray-600">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="space-y-6 p-6"
      style={{ backgroundColor: "#efece3", minHeight: "100vh" }}
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your AntiRomantic admin dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={formatPrice(stats.overview.thisMonthRevenue)}
          description="This month"
          icon={DollarSign}
          trendValue={stats.overview.revenueGrowth}
        />
        <StatsCard
          title="Orders"
          value={stats.overview.totalOrders.toLocaleString()}
          description={`${stats.orders.thisMonth} this month`}
          icon={ShoppingCart}
          trendValue={stats.overview.orderGrowth}
        />
        <StatsCard
          title="Products"
          value={stats.overview.totalProducts.toLocaleString()}
          description={`${stats.products.active} active`}
          icon={Package}
        />
        <StatsCard
          title="Customers"
          value={stats.overview.totalUsers.toLocaleString()}
          description="Total registered"
          icon={Users}
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Pending Orders
              </span>
              <Badge variant="secondary">{stats.orders.pending}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Low Stock Products
              </span>
              <Badge variant="destructive">{stats.products.lowStock}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Out of Stock
              </span>
              <Badge variant="destructive">{stats.products.outOfStock}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Average Order Value
              </span>
              <span className="font-medium">
                {formatPrice(stats.overview.averageOrderValue)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.topProducts.length > 0 ? (
              stats.topProducts.map((product) => (
                <div key={product._id} className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                    {product.images?.[0]?.url ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-muted rounded-md" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.salesCount} sold •{" "}
                      {formatPrice(product.basePrice)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No sales data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <RecentOrders orders={stats.orders.recent} />
    </div>
  );
}
