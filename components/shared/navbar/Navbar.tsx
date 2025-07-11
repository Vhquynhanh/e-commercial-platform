"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, History, Menu, ShoppingBag, X } from "lucide-react";
import { useProduct } from "@/contexts/ProductContext";
import Theme from "./Theme";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites, viewHistory } = useProduct();

  return (
    <>
      <div className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">EduMarket</h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Theme />
          <button
            onClick={() => router.push("/")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => router.push("/product/favourites")}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === "/product/favourites"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Yêu thích ({favorites.length})</span>
          </button>
          <button
            onClick={() => router.push("/product/history")}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === "/product/history"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            <History className="w-4 h-4" />
            <span>Lịch sử ({viewHistory.length})</span>
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white py-4">
          <div className="flex flex-col space-y-2">
            <Theme />
            <button
              onClick={() => {
                router.push("/");
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Trang chủ
            </button>
            <button
              onClick={() => {
                router.push("/product/favourites");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "favorites"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Yêu thích ({favorites.length})</span>
            </button>
            <button
              onClick={() => {
                router.push("/product/history");
                setMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "history"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <History className="w-4 h-4" />
              <span>Lịch sử ({viewHistory.length})</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
