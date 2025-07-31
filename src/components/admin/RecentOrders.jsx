"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDateTime, getStatusColor } from "@/lib/utils-admin";
import { ExternalLink } from "lucide-react";

export function RecentOrders({ orders = [] }) {
  if (!orders.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No recent orders found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/orders">
            View All
            <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{order.orderNumber}</span>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {order.customer?.name || "Guest"} •{" "}
                {formatDateTime(order.createdAt)}
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">{formatPrice(order.total)}</div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/admin/orders/${order._id}`}>View</Link>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
