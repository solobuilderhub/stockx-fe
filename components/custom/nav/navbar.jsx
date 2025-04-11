"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavbarIcons } from "./navbar-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import SearchBar from "./SearchBar";
import MobileSearch from "./mobile-search";


export function Navbar({ user, token, isSeller, isAdmin }) {
  const isMobile = useIsMobile();

  // Simplified version for mobile with pixel art styling
  function MobileNavbarIcons({ user, cartCount = 0, isSeller, isAdmin }) {
    return (
      <div className="flex items-center">

        {isMobile && (
          <MobileNav
            user={user}
            cartCount={0}
            isSeller={isSeller}
            isAdmin={isAdmin}
          />
        )}
      </div>
    );
  }

  return (
    <>
      {/* Fixed main navbar only */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-black border-b border-gray-200">
        <nav className="h-16">
          <div className="lg:container mx-auto px-4 h-full flex items-center justify-between">
            {/* Left section: Logo and Location */}
            <div className="flex items-center gap-3 flex-shrink-0 min-w-[140px]">
              <Logo />
     
            </div>

            {/* Middle section: Search */}
            <div className="hidden md:block flex-1 px-6 max-w-[650px]">
              <SearchBar className="w-full" />
            </div>

            {/* Right section: Cart, User and Menu */}
            <div className="flex items-center justify-end gap-1 flex-shrink-0 min-w-[140px]">
              {isMobile ? (
                <MobileNavbarIcons
                  user={user}
                  cartCount={0}
                  isSeller={isSeller}
                  isAdmin={isAdmin}
                />
              ) : (
                <>
                  <NavbarIcons
                    user={user}
                    cartCount={0}
                    isLoading={false}
                    isSeller={isSeller}
                    isAdmin={isAdmin}
                  />
                  <div className="ml-2 border-l pl-2">
                    <MobileNav
                      user={user}
                      cartCount={0}
                      isSeller={isSeller}
                      isAdmin={isAdmin}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
     
        </nav>
      </header>

      {/* Spacer to account for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Mobile search bar - only in mobile view */}
      {isMobile && (
        <MobileSearch className="w-full" />
      )}

      {/* Categories section - scrolls with page in both desktop and mobile */}
      
    </>
  );
}
