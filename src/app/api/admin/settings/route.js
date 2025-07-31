import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PersonalSettings from "@/models/PersonalSettings";
import StoreSettings from "@/models/StoreSettings";
import ShippingSettings from "@/models/ShippingSettings";
import GeneralSettings from "@/models/GeneralSettings";

// Validation helper functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[\d\s()-]{10,}$/;
  return phoneRegex.test(phone);
};

const validatePincode = (pincode) => {
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode);
};

const validateGST = (gst) => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst);
};

const validatePAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

const validateSettings = (data, section = "all") => {
  const errors = {};

  // Section-specific validation
  if (section === "all" || section === "personal") {
    // Required fields validation for personal section
    if (!data.adminName?.trim()) {
      errors.adminName = "Admin name is required";
    }

    if (!data.adminEmail?.trim()) {
      errors.adminEmail = "Admin email is required";
    } else if (!validateEmail(data.adminEmail)) {
      errors.adminEmail = "Please enter a valid admin email address";
    }

    if (!data.adminPhone?.trim()) {
      errors.adminPhone = "Admin phone is required";
    } else if (!validatePhone(data.adminPhone)) {
      errors.adminPhone = "Please enter a valid phone number";
    }

    if (data.adminState && !data.adminState.trim()) {
      errors.adminState = "State is required if provided";
    }
  }

  if (section === "all" || section === "store") {
    if (!data.storeName?.trim()) {
      errors.storeName = "Store name is required";
    }

    if (!data.storeEmail?.trim()) {
      errors.storeEmail = "Store email is required";
    } else if (!validateEmail(data.storeEmail)) {
      errors.storeEmail = "Please enter a valid store email address";
    }

    if (!data.storePhone?.trim()) {
      errors.storePhone = "Store phone is required";
    } else if (!validatePhone(data.storePhone)) {
      errors.storePhone = "Please enter a valid phone number";
    }

    if (!data.storeAddress?.trim()) {
      errors.storeAddress = "Store address is required";
    }

    if (data.storePincode && !validatePincode(data.storePincode)) {
      errors.storePincode = "Please enter a valid 6-digit pincode";
    }

    if (data.gstNumber && !validateGST(data.gstNumber)) {
      errors.gstNumber = "Please enter a valid GST number";
    }

    if (data.panNumber && !validatePAN(data.panNumber)) {
      errors.panNumber = "Please enter a valid PAN number";
    }

    if (data.storeState && !data.storeState.trim()) {
      errors.storeState = "State is required if provided";
    }
  }

  if (section === "all" || section === "shipping") {
    if (
      data.freeShippingEnabled &&
      (!data.freeShippingThreshold || data.freeShippingThreshold <= 0)
    ) {
      errors.freeShippingThreshold =
        "Free shipping threshold must be greater than 0";
    }

    if (data.shippingCost !== undefined && data.shippingCost < 0) {
      errors.shippingCost = "Shipping cost cannot be negative";
    }
  }

  return errors;
};

export async function GET() {
  try {
    await connectDB();

    // Get settings from separate models
    const [personalSettings, storeSettings, shippingSettings, generalSettings] =
      await Promise.all([
        PersonalSettings.findOne(),
        StoreSettings.findOne(),
        ShippingSettings.findOne(),
        GeneralSettings.findOne(),
      ]);

    // Combine all settings or return defaults
    const combinedSettings = {
      // Personal Settings
      adminName: personalSettings?.adminName || "Admin User",
      adminEmail: personalSettings?.adminEmail || "admin@antiromantic.com",
      adminPhone: personalSettings?.adminPhone || "+91 98765 43210",
      adminJoinDate: personalSettings?.adminJoinDate || "",
      adminAddress: personalSettings?.adminAddress || "",
      adminCity: personalSettings?.adminCity || "",
      adminState: personalSettings?.adminState || "",
      adminPincode: personalSettings?.adminPincode || "",
      adminEmergencyContact: personalSettings?.adminEmergencyContact || "",
      adminBio: personalSettings?.adminBio || "",

      // Store Settings
      storeName: storeSettings?.storeName || "AntiRomantic",
      storeEmail: storeSettings?.storeEmail || "support@antiromantic.com",
      storePhone: storeSettings?.storePhone || "+91 98765 43210",
      storeAddress:
        storeSettings?.storeAddress || "123 Main Street, Business District",
      storeCity: storeSettings?.storeCity || "Mumbai",
      storeState: storeSettings?.storeState || "Maharashtra",
      storePincode: storeSettings?.storePincode || "400001",
      storeDescription:
        storeSettings?.storeDescription ||
        "Premium streetwear and lifestyle brand",
      gstNumber: storeSettings?.gstNumber || "",
      panNumber: storeSettings?.panNumber || "",
      defaultCountry: storeSettings?.defaultCountry || "India",

      // Shipping Settings
      freeShippingEnabled: shippingSettings?.freeShippingEnabled ?? true,
      freeShippingThreshold: shippingSettings?.freeShippingThreshold || 2000,
      shippingCost: shippingSettings?.shippingCost || 199,

      // General Settings
      allowGuestCheckout: generalSettings?.allowGuestCheckout ?? true,
      orderNotifications: generalSettings?.orderNotifications ?? true,
    };

    return NextResponse.json({
      success: true,
      data: combinedSettings,
    });
  } catch (error) {
    console.error("Settings fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch settings. Please try again.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { data, section } = body;

    if (!data || !section) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: data and section are required",
        },
        { status: 400 }
      );
    }

    // Validate the settings data based on section
    const validationErrors = validateSettings(data, section);
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          validationErrors,
        },
        { status: 400 }
      );
    }

    await connectDB();

    let updatedSettings;
    let message = "";

    // Save to appropriate model based on section
    switch (section) {
      case "personal":
        const personalData = {
          adminName: data.adminName,
          adminEmail: data.adminEmail,
          adminPhone: data.adminPhone,
          adminJoinDate: data.adminJoinDate || "",
          adminAddress: data.adminAddress || "",
          adminCity: data.adminCity || "",
          adminState: data.adminState || "",
          adminPincode: data.adminPincode || "",
          adminEmergencyContact: data.adminEmergencyContact || "",
          adminBio: data.adminBio || "",
        };
        updatedSettings = await PersonalSettings.findOneAndUpdate(
          {},
          personalData,
          { upsert: true, new: true, runValidators: true }
        );
        message = "Personal settings updated successfully";
        break;

      case "store":
        const storeData = {
          storeName: data.storeName,
          storeEmail: data.storeEmail,
          storePhone: data.storePhone,
          storeAddress: data.storeAddress,
          storeCity: data.storeCity || "",
          storeState: data.storeState || "",
          storePincode: data.storePincode || "",
          defaultCountry: data.defaultCountry || "India",
          storeDescription: data.storeDescription || "",
          gstNumber: data.gstNumber?.toUpperCase() || "",
          panNumber: data.panNumber?.toUpperCase() || "",
        };
        updatedSettings = await StoreSettings.findOneAndUpdate({}, storeData, {
          upsert: true,
          new: true,
          runValidators: true,
        });
        message = "Store settings updated successfully";
        break;

      case "shipping":
        const shippingData = {
          freeShippingEnabled: Boolean(data.freeShippingEnabled),
          freeShippingThreshold: parseFloat(data.freeShippingThreshold) || 0,
          shippingCost: parseFloat(data.shippingCost) || 0,
        };
        updatedSettings = await ShippingSettings.findOneAndUpdate(
          {},
          shippingData,
          { upsert: true, new: true, runValidators: true }
        );
        message = "Shipping settings updated successfully";
        break;

      case "general":
        const generalData = {
          allowGuestCheckout: Boolean(data.allowGuestCheckout),
          orderNotifications: Boolean(data.orderNotifications),
        };
        updatedSettings = await GeneralSettings.findOneAndUpdate(
          {},
          generalData,
          { upsert: true, new: true, runValidators: true }
        );
        message = "General settings updated successfully";
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid section specified",
          },
          { status: 400 }
        );
    }

    if (!updatedSettings) {
      throw new Error("Failed to update settings in database");
    }

    return NextResponse.json({
      success: true,
      message,
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Settings update error:", error);

    // Handle specific MongoDB errors
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: error.message,
        },
        { status: 400 }
      );
    }

    if (error.name === "CastError") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid data format",
          details: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update settings. Please try again.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
