import connectDB from "@/lib/connectDB";
import otpModel from "@/models/OTPModel";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();

    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required",
        },
        { status: 400 }
      );
    }

    // Find the OTP record
    const otpRecord = await otpModel.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() }, // Check if OTP is not expired
    });

    if (!otpRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired OTP",
        },
        { status: 400 }
      );
    }

    // Find the user and mark as verified
    const user = await UserModel.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Delete the used OTP
    await otpModel.deleteOne({ _id: otpRecord._id });

    // Generate JWT token
    const tokenPayload = {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      isEmailVerified: user.isEmailVerified,
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Create the response
    const response = NextResponse.json({
      success: true,
      message: "Email verified successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isEmailVerified: user.isEmailVerified,
      },
    });

    // Set HTTP-only cookie
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
