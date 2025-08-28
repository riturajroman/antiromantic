import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import ProfileModal from "./ProfileModal";

function AuthSection({ textColor = "#F7F5EB", isScrolled = false }) {
  const { user, loading, isAuthenticated } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>
    );
  }

  // Authenticated user
  if (isAuthenticated) {
    return (
      <ProfileModal textColor={textColor}>
        <button
          className={`text-[${
            isScrolled ? "#F7F5EB" : textColor
          }] text-[12px] md:text-lg cursor-pointer hover:opacity-70 transition-opacity`}
        >
          Profile
        </button>
      </ProfileModal>
    );
  }

  // Not authenticated
  return (
    <Link href="/login">
      <button
        className={`text-[${
          isScrolled ? "#F7F5EB" : textColor
        }] text-[12px] md:text-lg cursor-pointer hover:opacity-70 transition-opacity`}
      >
        Log in
      </button>
    </Link>
  );
}

export default AuthSection;
