"use client";

import { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearch } from "@/contexts/SearchContext";

export function AdminHeader() {
  const [searchInput, setSearchInput] = useState("");
  const { handleGlobalSearch } = useSearch();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      handleGlobalSearch(searchInput.trim());
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <header
      className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b px-4 md:px-6"
      style={{ backgroundColor: "#efece3", borderColor: "#736c5f" }}
    >
      {/* Search - Hidden on mobile to prevent overlap with menu icon */}
      <div className="hidden md:flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form
          onSubmit={handleSearchSubmit}
          className="ml-auto flex-1 sm:flex-initial"
        >
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-600" />
            <Input
              type="search"
              placeholder="Search for Products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] border-gray-300 focus:border-gray-500"
            />
          </div>
        </form>
      </div>

      {/* Mobile spacer */}
      <div className="flex-1 md:hidden"></div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gray-200"
        >
          <Bell className="h-4 w-4 text-gray-700" />
          <span
            className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-[10px] font-medium text-white flex items-center justify-center"
            style={{ backgroundColor: "#736c5f" }}
          >
            3
          </span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full hover:bg-gray-200"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback
                  className="text-gray-700"
                  style={{ backgroundColor: "#736c5f", color: "white" }}
                >
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@antiromantic.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
