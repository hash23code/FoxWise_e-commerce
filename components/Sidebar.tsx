"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Search,
  Globe,
  Calculator,
  Warehouse,
  Target,
  TrendingUp,
  Plug,
  Settings,
  Menu,
  X,
  ShoppingCart,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Listings",
      href: "/listings",
      icon: ShoppingCart,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      name: "Research",
      href: "/research",
      icon: Search,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Sourcing",
      href: "/sourcing",
      icon: Globe,
      gradient: "from-orange-500 to-red-600"
    },
    {
      name: "Profit Calc",
      href: "/profit-calculator",
      icon: Calculator,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      name: "Inventory",
      href: "/inventory",
      icon: Warehouse,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      name: "Niches",
      href: "/niches",
      icon: Target,
      gradient: "from-pink-500 to-rose-600"
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: TrendingUp,
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      name: "Platforms",
      href: "/platforms",
      icon: Plug,
      gradient: "from-amber-500 to-orange-600"
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      gradient: "from-gray-500 to-slate-600"
    },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <Link href="/" className="p-4 sm:p-6 border-b border-gray-800 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            FoxWise
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mt-1">E-Commerce</div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link href={item.href}>
                <div
                  className={`
                    flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{item.name}</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-3 sm:p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3">
          <UserButton afterSignOutUrl="/sign-in" />
          <span className="text-sm text-gray-400">My Account</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button - Fixed at top */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900 border border-gray-700 text-white hover:bg-gray-800 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Desktop Sidebar - Always visible on large screens */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-black border-r border-gray-800 flex-col"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar - Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-gray-900 via-gray-900 to-black border-r border-gray-700 flex flex-col z-50 shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
