"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  ShoppingBag,
  Settings,
  LogOut,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

export function Header() {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAdminClick = () => {
    router.push("/admin");
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <header
        className="bg-white shadow-sm border-b"
        style={{ borderColor: "#736c5f" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold" style={{ color: "#736c5f" }}>
              Anti-Romantic
            </h1>
            <div className="animate-pulse">
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className="bg-white shadow-sm border-b"
      style={{ borderColor: "#736c5f" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1
              className="text-2xl font-bold hover:opacity-80 transition-opacity cursor-pointer"
              style={{ color: "#736c5f" }}
            >
              Anti-Romantic
            </h1>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                      style={{ color: "#736c5f" }}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          className="text-white font-medium"
                          style={{ backgroundColor: "#736c5f" }}
                        >
                          {user?.username?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline font-medium">
                        Profile
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-80 bg-white border"
                    style={{ borderColor: "#736c5f" }}
                    align="end"
                    forceMount
                  >
                    {/* User Profile Section */}
                    <DropdownMenuLabel className="font-normal">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback
                              className="text-white font-medium text-lg"
                              style={{ backgroundColor: "#736c5f" }}
                            >
                              {user?.username?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {user?.username}
                            </p>
                            <p
                              className="text-xs leading-none"
                              style={{ color: "#736c5f" }}
                            >
                              {user?.role === "admin"
                                ? "Administrator"
                                : "Customer"}
                            </p>
                          </div>
                        </div>

                        <div
                          className="text-xs space-y-2"
                          style={{ color: "#736c5f" }}
                        >
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Your Profile
                          </h4>

                          <div className="flex items-center space-x-2">
                            <Mail className="h-3 w-3" />
                            <span>{user?.email}</span>
                          </div>

                          {user?.phone && (
                            <div className="flex items-center space-x-2">
                              <Phone className="h-3 w-3" />
                              <span>{user?.phone}</span>
                            </div>
                          )}

                          {user?.address && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{user?.address}</span>
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3" />
                            <span>
                              Joined{" "}
                              {new Date(
                                user?.createdAt || Date.now()
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                user?.isEmailVerified
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <span>
                              Email{" "}
                              {user?.isEmailVerified
                                ? "Verified"
                                : "Not Verified"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator
                      style={{ backgroundColor: "#efece3" }}
                    />

                    {/* Orders */}
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                      <ShoppingBag
                        className="mr-2 h-4 w-4"
                        style={{ color: "#736c5f" }}
                      />
                      <span>Orders</span>
                    </DropdownMenuItem>

                    {/* Admin Access - Only show if user is admin */}
                    {user?.role === "admin" && (
                      <>
                        <DropdownMenuSeparator
                          style={{ backgroundColor: "#efece3" }}
                        />
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={handleAdminClick}
                        >
                          <Shield
                            className="mr-2 h-4 w-4"
                            style={{ color: "#736c5f" }}
                          />
                          <span className="font-medium">Admin Dashboard</span>
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator
                      style={{ backgroundColor: "#efece3" }}
                    />

                    {/* Logout */}
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-red-50 text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  className="text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#736c5f" }}
                  asChild
                >
                  <Link href="/sign-in">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
