import React from "react";
import { useAuth } from "@/contexts/AuthContext";
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

function ProfileModal({ children, textColor = "#F7F5EB" }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleAdminClick = () => {
    router.push("/admin");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
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
                  {user?.role === "admin" ? "Administrator" : "Customer"}
                </p>
              </div>
            </div>

            <div className="text-xs space-y-2" style={{ color: "#736c5f" }}>
              <h4 className="font-semibold text-gray-900 mb-2">Your Profile</h4>

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
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    user?.isEmailVerified ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span>
                  Email {user?.isEmailVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator style={{ backgroundColor: "#efece3" }} />

        {/* Orders */}
        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
          <ShoppingBag className="mr-2 h-4 w-4" style={{ color: "#736c5f" }} />
          <span>Orders</span>
        </DropdownMenuItem>

        {/* Admin Access - Only show if user is admin */}
        {user?.role === "admin" && (
          <>
            <DropdownMenuSeparator style={{ backgroundColor: "#efece3" }} />
            <DropdownMenuItem
              className="cursor-pointer hover:bg-gray-50"
              onClick={handleAdminClick}
            >
              <Shield className="mr-2 h-4 w-4" style={{ color: "#736c5f" }} />
              <span className="font-medium">Admin Dashboard</span>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator style={{ backgroundColor: "#efece3" }} />

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
  );
}

export default ProfileModal;
