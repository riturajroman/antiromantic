"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  Save,
  Globe,
  Package,
  User,
  Lock,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Edit3,
  X,
  Settings,
  Shield,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Admin Profile Info
    adminName: "Admin User",
    adminEmail: "admin@antiromantic.com",
    adminPhone: "+91 98765 43210",
    adminJoinDate: "",
    adminAddress: "",
    adminCity: "",
    adminState: "",
    adminPincode: "",
    adminEmergencyContact: "",
    adminBio: "",

    // Store Info
    storeName: "AntiRomantic",
    storeEmail: "support@antiromantic.com",
    storePhone: "+91 98765 43210",
    storeAddress: "123 Fashion Street, Mumbai, Maharashtra, India",
    storeCity: "Mumbai",
    storeState: "Maharashtra",
    storePincode: "400001",
    defaultCountry: "India",
    storeDescription: "",
    gstNumber: "",
    panNumber: "",

    // Password Change
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",

    // Shipping
    freeShippingEnabled: true,
    freeShippingThreshold: 2000,
    shippingCost: 199,

    // General
    allowGuestCheckout: true,
    orderNotifications: true,
  });

  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setErrors({});
        const response = await fetch("/api/admin/settings");
        const data = await response.json();

        if (data.success && data.data) {
          setSettings((prev) => ({ ...prev, ...data.data }));
        } else {
          setErrors({ general: data.error || "Failed to load settings" });
        }
      } catch (error) {
        console.error("Error loading settings:", error);
        setErrors({ general: "Network error while loading settings" });
      }
    };

    loadSettings();
  }, []);

  // Clear messages after timeout
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case "adminEmail":
      case "storeEmail":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[field] = "Please enter a valid email address";
        } else {
          delete newErrors[field];
        }
        break;
      case "adminPhone":
      case "storePhone":
        if (value && !/^[+]?[\d\s()-]{10,}$/.test(value)) {
          newErrors[field] = "Please enter a valid phone number";
        } else {
          delete newErrors[field];
        }
        break;
      case "adminPincode":
      case "storePincode":
        if (value && !/^\d{6}$/.test(value)) {
          newErrors[field] = "Please enter a valid 6-digit pincode";
        } else {
          delete newErrors[field];
        }
        break;
      case "gstNumber":
        if (
          value &&
          !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
            value
          )
        ) {
          newErrors[field] = "Please enter a valid GST number";
        } else {
          delete newErrors[field];
        }
        break;
      case "panNumber":
        if (value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
          newErrors[field] = "Please enter a valid PAN number";
        } else {
          delete newErrors[field];
        }
        break;
      default:
        if (typeof value === "string" && value.trim() === "") {
          newErrors[field] = "This field cannot be empty";
        } else {
          delete newErrors[field];
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveSection = async (section) => {
    // Validate section-specific fields
    let fieldsToValidate = [];

    switch (section) {
      case "personal":
        fieldsToValidate = ["adminName", "adminEmail", "adminPhone"];
        break;
      case "store":
        fieldsToValidate = [
          "storeName",
          "storeEmail",
          "storePhone",
          "storeAddress",
        ];
        break;
      case "shipping":
        // No validation needed for shipping settings
        break;
      case "general":
        // No validation needed for general settings
        break;
    }

    let hasErrors = false;
    fieldsToValidate.forEach((field) => {
      if (!validateField(field, settings[field])) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors((prev) => ({
        ...prev,
        general: "Please fix the errors above before saving",
      }));
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data: settings }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage(
          `${
            section.charAt(0).toUpperCase() + section.slice(1)
          } settings saved successfully!`
        );
        setIsModified(false);
        setEditingSection(null);
      } else {
        throw new Error(result.error || "Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      setErrors({ general: "Failed to save settings. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSection = (section) => {
    setEditingSection(section);
    setErrors({});
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setErrors({});
    // Reset form to original values if needed
  };

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setIsModified(true);

    // Clear previous error for this field
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }

    // Validate on change for better UX
    setTimeout(() => validateField(field, value), 500);
  };

  const handlePasswordChange = async () => {
    const passwordErrors = {};

    if (!settings.currentPassword) {
      passwordErrors.currentPassword = "Current password is required";
    }

    if (!settings.newPassword) {
      passwordErrors.newPassword = "New password is required";
    } else if (settings.newPassword.length < 8) {
      passwordErrors.newPassword =
        "New password must be at least 8 characters long";
    }

    if (!settings.confirmPassword) {
      passwordErrors.confirmPassword = "Please confirm your new password";
    } else if (settings.newPassword !== settings.confirmPassword) {
      passwordErrors.confirmPassword = "New passwords do not match";
    }

    if (Object.keys(passwordErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...passwordErrors }));
      return;
    }

    setPasswordLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/admin/settings/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: settings.currentPassword,
          newPassword: settings.newPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Password changed successfully!");
        setSettings((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        setErrors({ password: result.error || "Failed to change password" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrors({ password: "Network error while changing password" });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      try {
        // Clear any stored authentication data
        localStorage.removeItem("adminToken");
        sessionStorage.clear();

        setSuccessMessage("Logged out successfully!");

        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 1000);
      } catch (error) {
        console.error("Error during logout:", error);
        setErrors({ logout: "Error during logout process" });
      }
    }
  };

  const renderFieldError = (fieldName) => {
    if (errors[fieldName]) {
      return (
        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          {errors[fieldName]}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 p-3 md:p-6 lg:p-8">
      <div className="space-y-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-xs md:text-sm lg:text-base">
          Configure your store settings and admin preferences
        </p>
      </div>

      {/* Global Messages */}
      {errors.general && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="border-slate-500 text-slate-700 bg-slate-50">
          <CheckCircle className="h-4 w-4 text-slate-600" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile-first responsive tabs */}
        <div className="mb-6">
          {/* Mobile: Dropdown selector */}
          <div className="block md:hidden">
            <div className="space-y-4">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full h-12 bg-muted border-slate-300">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      {activeTab === "personal" && (
                        <>
                          <User className="h-4 w-4" />
                          Personal Information
                        </>
                      )}
                      {activeTab === "store" && (
                        <>
                          <Store className="h-4 w-4" />
                          Store Information
                        </>
                      )}
                      {activeTab === "shipping" && (
                        <>
                          <Package className="h-4 w-4" />
                          Shipping Settings
                        </>
                      )}
                      {activeTab === "general" && (
                        <>
                          <Globe className="h-4 w-4" />
                          General Settings
                        </>
                      )}
                      {activeTab === "password" && (
                        <>
                          <Lock className="h-4 w-4" />
                          Change Password
                        </>
                      )}
                      {activeTab === "account" && (
                        <>
                          <Shield className="h-4 w-4" />
                          Account Actions
                        </>
                      )}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Personal Information
                    </div>
                  </SelectItem>
                  <SelectItem value="store">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      Store Information
                    </div>
                  </SelectItem>
                  <SelectItem value="shipping">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Shipping Settings
                    </div>
                  </SelectItem>
                  <SelectItem value="general">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      General Settings
                    </div>
                  </SelectItem>
                  <SelectItem value="password">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Change Password
                    </div>
                  </SelectItem>
                  <SelectItem value="account">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Account Actions
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tablet: 2x3 grid */}
          <div className="hidden md:block lg:hidden">
            <TabsList className="grid w-full grid-cols-2 gap-2 h-auto p-2 bg-muted rounded-lg">
              <TabsTrigger
                value="personal"
                className="flex items-center gap-2 py-3 text-sm"
              >
                <User className="h-4 w-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger
                value="store"
                className="flex items-center gap-2 py-3 text-sm"
              >
                <Store className="h-4 w-4" />
                Store
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="flex items-center gap-2 py-3 text-sm"
              >
                <Package className="h-4 w-4" />
                Shipping
              </TabsTrigger>
              <TabsTrigger
                value="general"
                className="flex items-center gap-2 py-3 text-sm"
              >
                <Globe className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="flex items-center gap-2 py-3 text-sm"
              >
                <Lock className="h-4 w-4" />
                Password
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="flex items-center gap-2 py-3 text-sm"
              >
                <Shield className="h-4 w-4" />
                Account
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Desktop: Single row */}
          <div className="hidden lg:block">
            <TabsList className="grid w-full grid-cols-6 h-auto p-2 bg-muted rounded-lg">
              <TabsTrigger
                value="personal"
                className="flex items-center gap-2 py-3"
              >
                <User className="h-4 w-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger
                value="store"
                className="flex items-center gap-2 py-3"
              >
                <Store className="h-4 w-4" />
                Store
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="flex items-center gap-2 py-3"
              >
                <Package className="h-4 w-4" />
                Shipping
              </TabsTrigger>
              <TabsTrigger
                value="general"
                className="flex items-center gap-2 py-3"
              >
                <Globe className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="flex items-center gap-2 py-3"
              >
                <Lock className="h-4 w-4" />
                Password
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="flex items-center gap-2 py-3"
              >
                <Shield className="h-4 w-4" />
                Account
              </TabsTrigger>
            </TabsList>
          </div>
        </div>{" "}
        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pb-4">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-3 text-slate-800 text-lg md:text-xl">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <User className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
                  </div>
                  Personal Information
                </CardTitle>
                <p className="text-slate-600 text-sm">
                  Manage your personal details and contact information
                </p>
              </div>
              {editingSection !== "personal" && (
                <Button
                  onClick={() => handleEditSection("personal")}
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 w-full sm:w-auto"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              {editingSection === "personal" ? (
                // Edit Mode
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="adminName"
                        className="text-sm font-medium"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="adminName"
                        value={settings.adminName}
                        onChange={(e) =>
                          handleInputChange("adminName", e.target.value)
                        }
                        placeholder="Enter your full name"
                        className={errors.adminName ? "border-red-500" : ""}
                      />
                      {renderFieldError("adminName")}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="adminEmail"
                        className="text-sm font-medium"
                      >
                        Email Address *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="adminEmail"
                          type="email"
                          value={settings.adminEmail}
                          onChange={(e) =>
                            handleInputChange("adminEmail", e.target.value)
                          }
                          placeholder="admin@antiromantic.com"
                          className={`pl-10 ${
                            errors.adminEmail ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {renderFieldError("adminEmail")}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="adminPhone"
                        className="text-sm font-medium"
                      >
                        Phone Number *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="adminPhone"
                          value={settings.adminPhone}
                          onChange={(e) =>
                            handleInputChange("adminPhone", e.target.value)
                          }
                          placeholder="+91 98765 43210"
                          className={`pl-10 ${
                            errors.adminPhone ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {renderFieldError("adminPhone")}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="adminJoinDate"
                        className="text-sm font-medium"
                      >
                        Join Date
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="adminJoinDate"
                          type="date"
                          value={settings.adminJoinDate}
                          onChange={(e) =>
                            handleInputChange("adminJoinDate", e.target.value)
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="adminEmergencyContact"
                        className="text-sm font-medium"
                      >
                        Emergency Contact
                      </Label>
                      <Input
                        id="adminEmergencyContact"
                        value={settings.adminEmergencyContact}
                        onChange={(e) =>
                          handleInputChange(
                            "adminEmergencyContact",
                            e.target.value
                          )
                        }
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Address Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <Label
                          htmlFor="adminAddress"
                          className="text-sm font-medium"
                        >
                          Address
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="adminAddress"
                            value={settings.adminAddress}
                            onChange={(e) =>
                              handleInputChange("adminAddress", e.target.value)
                            }
                            placeholder="Enter complete address"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="adminCity"
                          className="text-sm font-medium"
                        >
                          City
                        </Label>
                        <Input
                          id="adminCity"
                          value={settings.adminCity}
                          onChange={(e) =>
                            handleInputChange("adminCity", e.target.value)
                          }
                          placeholder="Enter city"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="adminState"
                          className="text-sm font-medium"
                        >
                          State
                        </Label>
                        <Input
                          id="adminState"
                          value={settings.adminState}
                          onChange={(e) =>
                            handleInputChange("adminState", e.target.value)
                          }
                          placeholder="Enter state"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="adminPincode"
                          className="text-sm font-medium"
                        >
                          Pincode
                        </Label>
                        <Input
                          id="adminPincode"
                          value={settings.adminPincode}
                          onChange={(e) =>
                            handleInputChange("adminPincode", e.target.value)
                          }
                          placeholder="400001"
                          maxLength={6}
                          className={
                            errors.adminPincode ? "border-red-500" : ""
                          }
                        />
                        {renderFieldError("adminPincode")}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="adminBio" className="text-sm font-medium">
                      Bio/Notes
                    </Label>
                    <Textarea
                      id="adminBio"
                      value={settings.adminBio}
                      onChange={(e) =>
                        handleInputChange("adminBio", e.target.value)
                      }
                      placeholder="Brief description about yourself or any important notes..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      onClick={() => handleSaveSection("personal")}
                      disabled={loading}
                      className="bg-slate-600 hover:bg-slate-700 w-full sm:w-auto"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="border-gray-300 w-full sm:w-auto"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                // View Mode
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Full Name
                      </Label>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-600" />
                        <span className="text-gray-900 font-medium">
                          {settings.adminName || "Not set"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Email Address
                      </Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-600" />
                        <span className="text-gray-900 font-medium">
                          {settings.adminEmail || "Not set"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Phone Number
                      </Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-600" />
                        <span className="text-gray-900 font-medium">
                          {settings.adminPhone || "Not set"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Join Date
                      </Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-600" />
                        <span className="text-gray-900 font-medium">
                          {settings.adminJoinDate || "Not set"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Emergency Contact
                      </Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-600" />
                        <span className="text-gray-900 font-medium">
                          {settings.adminEmergencyContact || "Not set"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {(settings.adminAddress ||
                    settings.adminCity ||
                    settings.adminState ||
                    settings.adminPincode) && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-gray-600">
                        Address Information
                      </h4>
                      <div className="bg-white p-4 rounded-lg border border-blue-100">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-slate-600 mt-1" />
                          <div>
                            <p className="text-gray-900 font-medium">
                              {settings.adminAddress}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {[
                                settings.adminCity,
                                settings.adminState,
                                settings.adminPincode,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {settings.adminBio && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Bio/Notes
                      </Label>
                      <div className="bg-white p-4 rounded-lg border border-blue-100">
                        <p className="text-gray-900">{settings.adminBio}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* Store Information Tab */}
        <TabsContent value="store">
          <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pb-4">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-3 text-slate-800 text-lg md:text-xl">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Store className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
                  </div>
                  Store Information
                </CardTitle>
                <p className="text-slate-600 text-sm">
                  Manage your store details and business information
                </p>
              </div>
              {editingSection !== "store" && (
                <Button
                  onClick={() => handleEditSection("store")}
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 w-full sm:w-auto"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              {editingSection === "store" ? (
                // Edit Mode
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="storeName"
                        className="text-sm font-medium"
                      >
                        Store Name *
                      </Label>
                      <Input
                        id="storeName"
                        value={settings.storeName}
                        onChange={(e) =>
                          handleInputChange("storeName", e.target.value)
                        }
                        placeholder="Enter store name"
                        className={errors.storeName ? "border-red-500" : ""}
                      />
                      {renderFieldError("storeName")}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="storeEmail"
                        className="text-sm font-medium"
                      >
                        Store Email *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="storeEmail"
                          type="email"
                          value={settings.storeEmail}
                          onChange={(e) =>
                            handleInputChange("storeEmail", e.target.value)
                          }
                          placeholder="support@antiromantic.com"
                          className={`pl-10 ${
                            errors.storeEmail ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {renderFieldError("storeEmail")}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="storePhone"
                        className="text-sm font-medium"
                      >
                        Phone Number *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="storePhone"
                          value={settings.storePhone}
                          onChange={(e) =>
                            handleInputChange("storePhone", e.target.value)
                          }
                          placeholder="+91 98765 43210"
                          className={`pl-10 ${
                            errors.storePhone ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {renderFieldError("storePhone")}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="defaultCountry"
                        className="text-sm font-medium"
                      >
                        Default Country
                      </Label>
                      <Select
                        value={settings.defaultCountry}
                        onValueChange={(value) =>
                          handleInputChange("defaultCountry", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="USA">United States</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="gstNumber"
                        className="text-sm font-medium"
                      >
                        GST Number
                      </Label>
                      <Input
                        id="gstNumber"
                        value={settings.gstNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "gstNumber",
                            e.target.value.toUpperCase()
                          )
                        }
                        placeholder="22AAAAA0000A1Z5"
                        className={errors.gstNumber ? "border-red-500" : ""}
                      />
                      {renderFieldError("gstNumber")}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="panNumber"
                        className="text-sm font-medium"
                      >
                        PAN Number
                      </Label>
                      <Input
                        id="panNumber"
                        value={settings.panNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "panNumber",
                            e.target.value.toUpperCase()
                          )
                        }
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        className={errors.panNumber ? "border-red-500" : ""}
                      />
                      {renderFieldError("panNumber")}
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Store Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <Label
                          htmlFor="storeAddress"
                          className="text-sm font-medium"
                        >
                          Complete Address *
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="storeAddress"
                            value={settings.storeAddress}
                            onChange={(e) =>
                              handleInputChange("storeAddress", e.target.value)
                            }
                            placeholder="Enter complete store address"
                            className={`pl-10 ${
                              errors.storeAddress ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {renderFieldError("storeAddress")}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="storeCity"
                          className="text-sm font-medium"
                        >
                          City
                        </Label>
                        <Input
                          id="storeCity"
                          value={settings.storeCity}
                          onChange={(e) =>
                            handleInputChange("storeCity", e.target.value)
                          }
                          placeholder="Mumbai"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="storeState"
                          className="text-sm font-medium"
                        >
                          State
                        </Label>
                        <Input
                          id="storeState"
                          value={settings.storeState}
                          onChange={(e) =>
                            handleInputChange("storeState", e.target.value)
                          }
                          placeholder="Enter state"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="storePincode"
                          className="text-sm font-medium"
                        >
                          Pincode
                        </Label>
                        <Input
                          id="storePincode"
                          value={settings.storePincode}
                          onChange={(e) =>
                            handleInputChange("storePincode", e.target.value)
                          }
                          placeholder="400001"
                          maxLength={6}
                          className={
                            errors.storePincode ? "border-red-500" : ""
                          }
                        />
                        {renderFieldError("storePincode")}
                      </div>
                    </div>
                  </div>

                  {/* Store Description */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="storeDescription"
                      className="text-sm font-medium"
                    >
                      Store Description
                    </Label>
                    <Textarea
                      id="storeDescription"
                      value={settings.storeDescription}
                      onChange={(e) =>
                        handleInputChange("storeDescription", e.target.value)
                      }
                      placeholder="Brief description about your store..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      onClick={() => handleSaveSection("store")}
                      disabled={loading}
                      className="bg-slate-600 hover:bg-slate-700 w-full sm:w-auto"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="border-gray-300 w-full sm:w-auto"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                // View Mode
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Store Name
                      </Label>
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-slate-600" />
                        <span className="text-gray-900 font-medium">
                          {settings.storeName}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Store Email
                      </Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-600" />
                        <span className="text-gray-900 font-medium">
                          {settings.storeEmail}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Phone Number
                      </Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-600" />
                        <span className="text-gray-900 font-medium">
                          {settings.storePhone}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Default Country
                      </Label>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-slate-600" />
                        <span className="text-gray-900 font-medium">
                          {settings.defaultCountry}
                        </span>
                      </div>
                    </div>

                    {settings.gstNumber && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">
                          GST Number
                        </Label>
                        <Badge
                          variant="outline"
                          className="text-slate-700 border-slate-300"
                        >
                          {settings.gstNumber}
                        </Badge>
                      </div>
                    )}

                    {settings.panNumber && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">
                          PAN Number
                        </Label>
                        <Badge
                          variant="outline"
                          className="text-slate-700 border-slate-300"
                        >
                          {settings.panNumber}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-600">
                      Store Address
                    </h4>
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-slate-600 mt-1" />
                        <div>
                          <p className="text-gray-900 font-medium">
                            {settings.storeAddress}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {[
                              settings.storeCity,
                              settings.storeState,
                              settings.storePincode,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {settings.storeDescription && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Store Description
                      </Label>
                      <div className="bg-white p-4 rounded-lg border border-green-100">
                        <p className="text-gray-900">
                          {settings.storeDescription}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* Shipping Settings Tab */}
        <TabsContent value="shipping">
          <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pb-4">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-3 text-slate-800 text-lg md:text-xl">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Package className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
                  </div>
                  Shipping Settings
                </CardTitle>
                <p className="text-slate-600 text-sm">
                  Configure shipping rates and delivery options
                </p>
              </div>
              {editingSection !== "shipping" && (
                <Button
                  onClick={() => handleEditSection("shipping")}
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 w-full sm:w-auto"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Settings
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              {editingSection === "shipping" ? (
                // Edit Mode
                <>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">
                        Free Shipping
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Offer free shipping above threshold
                      </p>
                    </div>
                    <Switch
                      checked={settings.freeShippingEnabled}
                      onCheckedChange={(checked) =>
                        handleInputChange("freeShippingEnabled", checked)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {settings.freeShippingEnabled && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="freeShippingThreshold"
                          className="text-sm font-medium"
                        >
                          Free Shipping Threshold (₹)
                        </Label>
                        <Input
                          id="freeShippingThreshold"
                          type="number"
                          value={settings.freeShippingThreshold}
                          onChange={(e) =>
                            handleInputChange(
                              "freeShippingThreshold",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          placeholder="2000"
                          min="0"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label
                        htmlFor="shippingCost"
                        className="text-sm font-medium"
                      >
                        Standard Shipping Cost (₹)
                      </Label>
                      <Input
                        id="shippingCost"
                        type="number"
                        step="0.01"
                        value={settings.shippingCost}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingCost",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        placeholder="199"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      onClick={() => handleSaveSection("shipping")}
                      disabled={loading}
                      className="bg-slate-600 hover:bg-slate-700 w-full sm:w-auto"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="border-gray-300 w-full sm:w-auto"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                // View Mode
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Free Shipping
                      </Label>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-slate-600" />
                        <Badge
                          variant={
                            settings.freeShippingEnabled
                              ? "default"
                              : "secondary"
                          }
                        >
                          {settings.freeShippingEnabled
                            ? "Enabled"
                            : "Disabled"}
                        </Badge>
                      </div>
                    </div>

                    {settings.freeShippingEnabled && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">
                          Free Shipping Threshold
                        </Label>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 font-bold text-lg">
                            ₹{settings.freeShippingThreshold}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Standard Shipping Cost
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600 font-bold text-lg">
                          ₹{settings.shippingCost}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pb-4">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-3 text-slate-800 text-lg md:text-xl">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Globe className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
                  </div>
                  General Settings
                </CardTitle>
                <p className="text-slate-600 text-sm">
                  Configure global application preferences
                </p>
              </div>
              {editingSection !== "general" && (
                <Button
                  onClick={() => handleEditSection("general")}
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 w-full sm:w-auto"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Settings
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              {editingSection === "general" ? (
                // Edit Mode
                <>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">
                          Guest Checkout
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Allow customers to checkout without creating an
                          account
                        </p>
                      </div>
                      <Switch
                        checked={settings.allowGuestCheckout}
                        onCheckedChange={(checked) =>
                          handleInputChange("allowGuestCheckout", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">
                          Order Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Send email notifications for new orders
                        </p>
                      </div>
                      <Switch
                        checked={settings.orderNotifications}
                        onCheckedChange={(checked) =>
                          handleInputChange("orderNotifications", checked)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      onClick={() => handleSaveSection("general")}
                      disabled={loading}
                      className="bg-slate-600 hover:bg-slate-700 w-full sm:w-auto"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="border-gray-300 w-full sm:w-auto"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                // View Mode
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Guest Checkout
                      </Label>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-slate-600" />
                        <Badge
                          variant={
                            settings.allowGuestCheckout
                              ? "default"
                              : "secondary"
                          }
                        >
                          {settings.allowGuestCheckout ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">
                        Order Notifications
                      </Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-600" />
                        <Badge
                          variant={
                            settings.orderNotifications
                              ? "default"
                              : "secondary"
                          }
                        >
                          {settings.orderNotifications ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* Password Change Tab */}
        <TabsContent value="password">
          <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-slate-800 text-lg md:text-xl">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Lock className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
                </div>
                Change Password
              </CardTitle>
              <p className="text-slate-600 text-sm">
                Update your account password for security
              </p>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              {errors.password && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{errors.password}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="currentPassword"
                    className="text-sm font-medium"
                  >
                    Current Password *
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={settings.currentPassword}
                    onChange={(e) =>
                      handleInputChange("currentPassword", e.target.value)
                    }
                    placeholder="Enter current password"
                    className={errors.currentPassword ? "border-red-500" : ""}
                  />
                  {renderFieldError("currentPassword")}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-medium">
                    New Password *
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={settings.newPassword}
                    onChange={(e) =>
                      handleInputChange("newPassword", e.target.value)
                    }
                    placeholder="Enter new password"
                    className={errors.newPassword ? "border-red-500" : ""}
                  />
                  {renderFieldError("newPassword")}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm New Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={settings.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    placeholder="Confirm new password"
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {renderFieldError("confirmPassword")}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handlePasswordChange}
                  disabled={passwordLoading}
                  className="bg-slate-600 hover:bg-slate-700"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {passwordLoading ? "Changing..." : "Change Password"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Account Actions Tab */}
        <TabsContent value="account">
          <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-gray-800 text-lg md:text-xl">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                </div>
                Account Actions
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Manage your account security and access
              </p>
            </CardHeader>
            <CardContent>
              {errors.logout && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{errors.logout}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="space-y-2">
                  <Label className="text-lg font-medium text-slate-800">
                    Logout
                  </Label>
                  <p className="text-sm text-slate-600">
                    Sign out of your admin account securely
                  </p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  size="lg"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
