"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function HomePage() {
  const { user, loading, logout, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Anti-Romantic
          </h2>

          {isAuthenticated ? (
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Hello, {user.username}! 👋
                </h3>
                <p className="text-gray-600">
                  You are successfully logged in and authenticated.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">
                    Account Status
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p>
                      <span className="font-medium">Verified:</span>
                      <span className="text-green-600 ml-1">
                        {user.isEmailVerified ? "✓ Yes" : "✗ No"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">
                    Authentication
                  </h4>
                  <p className="text-sm text-green-700">
                    Your session is secured with JWT authentication.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/dashboard">
                  <Button className="mr-4">Go to Dashboard</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8">
              <p className="text-xl text-gray-600 mb-8">
                A unique platform for personalized experiences.
              </p>

              <div className="space-y-4">
                <p className="text-gray-500">
                  Get started by creating an account or logging in.
                </p>

                <div className="flex justify-center space-x-4">
                  <Link href="/sign-in">
                    <Button size="lg">Create Account</Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
