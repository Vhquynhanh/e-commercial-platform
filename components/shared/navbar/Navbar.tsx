"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, History, Menu, ShoppingBag, X } from "lucide-react";
import { useProduct } from "@/contexts/ProductContext";
import Theme from "./Theme";
import { navbarLinks } from "@/constants";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites, viewHistory } = useProduct();

  const renderIcon = (value: string) => {
    switch (value) {
      case "home":
        return null;
      case "favourties":
        return <Heart className="w-4 h-4" />;
      case "history":
        return <History className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const renderCount = (value: string) => {
    if (value === "favourties") return ` (${favorites.length})`;
    if (value === "history") return ` (${viewHistory.length})`;
    return "";
  };
  return (
    <>
      <div className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-light-100" />
            </div>
            <h1 className="text-xl font-bold text-dark900_light100">
              EduMarket
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navbarLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => router.push(link.route)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === link.route
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                  : "text-dark700_light300 hover:text-primary-600 hover:dark:text-primary-300"
              }`}
            >
              {renderIcon(link.value)}
              <span>
                {link.label}
                {renderCount(link.value)}
              </span>
            </button>
          ))}
          <Theme />
        </nav>

        <div className="md:hidden flex items-center">
          <Theme className="mr-4" />
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-dark700_light300 hover:text-primary-600 dark:hover:text-primary-300"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t background_light100_dark100 py-4">
          <div className="flex flex-col space-y-2">
            {navbarLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  router.push(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-1 text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.route
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                    : "text-dark700_light300 hover:text-primary-600 hover:dark:text-primary-300"
                }`}
              >
                {renderIcon(link.value)}
                <span>
                  {link.label}
                  {renderCount(link.value)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
