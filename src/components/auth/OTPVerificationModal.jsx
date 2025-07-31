"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { ButtonLoading } from "@/components/application/ButtonLoading";

export function OTPVerificationModal({ isOpen, onOpenChange, email }) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsVerifying(true);
      const response = await axios.post("/api/verify-otp", {
        email,
        otp,
      });

      if (response.data.success) {
        toast.success("Email verified successfully!");
        onOpenChange(false);
        // Redirect to login page
        router.push("/login");
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "OTP verification failed");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsResending(true);
      const response = await axios.post("/api/resend-otp", {
        email,
      });

      if (response.data.success) {
        toast.success("New OTP sent to your email!");
        setOtp(""); // Clear current OTP
      } else {
        toast.error(response.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Failed to resend OTP");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/70 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-text text-2xl font-semibold">
            Verify Your Email
          </DialogTitle>
          <DialogDescription className="text-center text-text text-base">
            We've sent a 6-digit verification code to{" "}
            <span className="stext-text font-bold">{email}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="flex flex-col items-center space-y-2">
            <label className="text-base font-medium text-text">
              Enter verification code
            </label>
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex flex-col space-y-3 w-full">
            <ButtonLoading
              onClick={handleVerifyOTP}
              loading={isVerifying}
              disabled={otp.length !== 6}
              text="Verify Email"
              className="bg-transparent text-center lumin text-text text-3xl shadow-none border-0 hover:bg-transparent hover:shadow-none focus-visible:outline-ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent p-0 leading-0 h-0 cursor-pointer mt-2 hover:text-black hover:scale-110 transition-all duration-300 ease-in-out mb-10"
            />

            <div className="text-center">
              <span className="text-base text-[#A19888]">
                Didn't receive the code?{" "}
              </span>
              <Button
                variant="link"
                onClick={handleResendOTP}
                disabled={isResending}
                className="p-0 h-auto text-text text-base hover:underline"
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </Button>
            </div>
          </div>

          <div className="text-base text-text text-center">
            The verification code will expire in 10 minutes
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
