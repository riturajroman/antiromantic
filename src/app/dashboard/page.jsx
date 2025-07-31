"use client";

import { useAuth, withAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome to Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                  Hello, {user?.username}! Your email is verified.
                </p>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  User Info
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p>
                    <span className="font-medium">Username:</span>{" "}
                    {user?.username}
                  </p>
                  <p>
                    <span className="font-medium">Verified:</span>
                    <span className="text-green-600 ml-1">
                      {user?.isEmailVerified ? "✓ Yes" : "✗ No"}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Role:</span>{" "}
                    {user?.role || "user"}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Authentication
                </h3>
                <p className="text-sm text-green-700">
                  Your session is secure with JWT authentication and HTTP-only
                  cookies.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  Protected Route
                </h3>
                <p className="text-sm text-purple-700">
                  This page is only accessible to authenticated users.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Authentication Features Implemented:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Modal-based OTP verification
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  JWT token generation and validation
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  HTTP-only cookies for secure token storage
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Protected routes with authentication middleware
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  User context management with React hooks
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Secure logout functionality
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
