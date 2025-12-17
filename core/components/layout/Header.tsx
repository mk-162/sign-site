'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Shield,
  ShoppingCart,
  Search,
  Menu,
  Package,
  FileText,
  CheckCircle2,
  Truck,
  Clock,
  Settings,
  Phone,
  Mail,
  User,
  ChevronRight,
  ChevronDown,
  LogOut,
  Heart,
  ClipboardList,
  UserCircle,
  X,
  Stethoscope,
  HardHat,
  Warehouse,
  Factory,
  Building2,
  GraduationCap,
  Hotel,
  Landmark,
  UtensilsCrossed,
  Anchor,
  LucideIcon,
  PoundSterling,
  Wrench,
  Tag,
  Pencil,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Badge } from '~/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { CartSheet, CartSheetItem } from '~/components/cart/cart-sheet';
import { updateCartItemQuantity, removeCartItem } from '~/components/cart/cart-sheet-actions';
import type { NavGroup, CategoryTreeItem } from '~/components/layout/header-data';
import { DEPARTMENT_GROUPS } from '~/components/layout/header-config';

// Industry icon mapping
const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  'Healthcare & Medical': Stethoscope,
  'Construction Sites': HardHat,
  'Warehouses & Distribution': Warehouse,
  'Manufacturing & Industrial': Factory,
  'Offices & Corporate': Building2,
  'Education & Schools': GraduationCap,
  'Hospitality & Retail': Hotel,
  'Public Buildings': Landmark,
  'Food & Catering': UtensilsCrossed,
  'Marine & Offshore': Anchor,
};

export interface HeaderProps {
  categories?: CategoryTreeItem[];
  navGroups?: NavGroup[];
  isLoggedIn?: boolean;
  customerName?: string;
  customerEmail?: string;
  cartItems?: CartSheetItem[];
  cartItemCount?: number;
  cartSubtotal?: string;
}

export function Header({
  categories = [],
  navGroups = [],
  isLoggedIn = false,
  customerName,
  customerEmail,
  cartItems = [],
  cartItemCount = 0,
  cartSubtotal = '£0.00',
}: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?term=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionKey)
        ? prev.filter((k) => k !== sectionKey)
        : [...prev, sectionKey]
    );
  };

  const toggleSubSection = (parentKey: string, childKey: string) => {
    const key = `${parentKey}-${childKey}`;
    setExpandedSections((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  return (
    <>
      {/* Top Bar - Dark Navy */}
      <div className="bg-[#0f172a] text-slate-300 text-xs py-2 px-4 border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center font-medium">
          <div className="flex gap-6 w-full sm:w-auto justify-between sm:justify-start">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <Phone className="h-3 w-3 text-orange-500" />
              <span className="text-orange-500 font-bold">Speak to a Human:</span>
              <span className="text-white font-bold tracking-wide">01246 386 126</span>
            </span>
            <a href="mailto:sales@safetysignhub.co.uk" className="flex items-center gap-1.5 hover:text-white transition-colors hidden sm:flex">
              <Mail className="h-3 w-3 text-orange-500" />
              sales@safetysignhub.co.uk
            </a>
          </div>
          <div className="hidden sm:flex gap-6">
            <a
              href="/trade-enquiries"
              className="hover:text-white cursor-pointer transition-colors flex items-center gap-1"
            >
              <FileText className="h-3 w-3" /> Request Quote
            </a>
            <Link
              href="/trade-enquiries"
              className="hover:text-white cursor-pointer transition-colors flex items-center gap-1"
            >
              <User className="h-3 w-3" /> Trade Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header - Deep Navy with White Text */}
      <header className="bg-[#1e293b] text-white sticky top-0 z-50 shadow-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
            {/* Top Row on Mobile: Logo + Actions */}
            <div className="flex items-center justify-between w-full lg:w-auto">
              {/* Logo Area */}
              <div className="flex flex-col shrink-0">
                <Link href="/">
                  <img
                    src="/images/ss-logo.svg"
                    alt="SafetySignHub - GTSE Brand"
                    className="h-10 md:h-14 w-auto"
                  />
                </Link>
              </div>

              {/* Mobile Actions: Cart + Menu */}
              <div className="flex items-center gap-4 lg:hidden">
                <CartSheet
                  items={cartItems}
                  itemCount={cartItemCount}
                  subtotal={cartSubtotal}
                  updateQuantityAction={updateCartItemQuantity}
                  removeItemAction={removeCartItem}
                >
                  <button className="relative p-1">
                    <ShoppingCart className="h-6 w-6 text-white" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full border-2 border-[#1e293b]">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </button>
                </CartSheet>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-slate-800"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>

            {/* Search - High Prominence Center */}
            <form onSubmit={handleSearch} className="flex-1 max-w-full lg:max-w-3xl order-last lg:order-none">
              <div className="flex w-full shadow-lg shadow-black/20 rounded-md overflow-hidden group focus-within:ring-2 focus-within:ring-orange-500 transition-all">
                <Input
                  name="term"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search over 10,000 safety products..."
                  className="w-full pl-5 pr-4 h-12 border-0 rounded-none focus-visible:ring-0 text-slate-900 bg-white placeholder:text-slate-400 text-base"
                />
                <button
                  type="submit"
                  className="bg-orange-500 h-12 px-4 flex items-center justify-center border-l border-orange-600 hover:bg-orange-600 transition-colors"
                >
                  <Search className="h-5 w-5 text-white" />
                </button>
              </div>
            </form>

            {/* Desktop Account & Cart */}
            <div className="hidden lg:flex items-center gap-6 shrink-0">
              {/* Account Dropdown */}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 cursor-pointer group focus:outline-none">
                      <div className="bg-orange-500 p-2 rounded-full group-hover:bg-orange-400 transition-colors">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex flex-col text-sm hidden xl:flex">
                        <span className="text-slate-400 text-xs">Welcome back</span>
                        <span className="font-bold text-white flex items-center gap-1">
                          {customerName || 'My Account'}
                          <ChevronDown className="h-3 w-3 text-slate-400" />
                        </span>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-[#1e293b] border-slate-700 text-white">
                    <DropdownMenuLabel className="font-normal border-b border-slate-700 pb-3 mb-1">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none text-white">{customerName}</p>
                        {customerEmail && (
                          <p className="text-xs leading-none text-slate-400">{customerEmail}</p>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href="/account/settings" className="flex items-center gap-2 cursor-pointer text-slate-200 hover:text-white focus:bg-slate-700 focus:text-white">
                        <UserCircle className="h-4 w-4 text-orange-500" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/account/orders"
                        className="flex items-center gap-2 cursor-pointer text-slate-200 hover:text-white focus:bg-slate-700 focus:text-white"
                      >
                        <ClipboardList className="h-4 w-4 text-orange-500" />
                        Order History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/account/wishlists"
                        className="flex items-center gap-2 cursor-pointer text-slate-200 hover:text-white focus:bg-slate-700 focus:text-white"
                      >
                        <Heart className="h-4 w-4 text-orange-500" />
                        Wishlists
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/account/settings"
                        className="flex items-center gap-2 cursor-pointer text-slate-200 hover:text-white focus:bg-slate-700 focus:text-white"
                      >
                        <Settings className="h-4 w-4 text-orange-500" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/logout"
                        className="flex items-center gap-2 cursor-pointer text-red-400 hover:text-red-300 focus:bg-red-900/30 focus:text-red-300"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="bg-slate-700/50 p-2 rounded-full group-hover:bg-slate-700 transition-colors">
                      <User className="h-6 w-6 text-slate-200" />
                    </div>
                    <div className="flex flex-col text-sm hidden xl:flex">
                      <span className="text-slate-400 text-xs">Welcome</span>
                      <span className="font-bold text-white">Sign In / Register</span>
                    </div>
                  </div>
                </Link>
              )}

              <div className="h-8 w-px bg-white/10 hidden lg:block" />

              {/* Cart with Sheet */}
              <CartSheet
                items={cartItems}
                itemCount={cartItemCount}
                subtotal={cartSubtotal}
                updateQuantityAction={updateCartItemQuantity}
                removeItemAction={removeCartItem}
              >
                <button className="flex items-center gap-3 cursor-pointer group focus:outline-none">
                  <div className="relative bg-orange-500 p-2 rounded-full shadow-lg shadow-orange-500/20 group-hover:bg-orange-400 transition-colors">
                    <ShoppingCart className="h-6 w-6 text-white" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full border-2 border-[#1e293b]">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col text-sm hidden xl:flex">
                    <span className="text-slate-400 text-xs">Basket</span>
                    <span className="font-bold text-white">{cartSubtotal}</span>
                  </div>
                </button>
              </CartSheet>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Orange High Vis */}
        <div className="bg-orange-500 shadow-md hidden lg:block relative z-40">
          <div className="container mx-auto px-4">
            <nav className="flex items-center text-sm font-bold text-white">
              <div className="flex-1 flex no-scrollbar">
                {/* Dynamic Nav Groups with Mega Menu Dropdowns */}
                {navGroups.map((group) => (
                  <div
                    key={group.key}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(group.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === group.key ? null : group.key)}
                      className={`px-5 py-3 hover:bg-orange-400 transition-colors whitespace-nowrap border-r border-orange-400/30 first:border-l flex items-center gap-1 ${activeDropdown === group.key ? 'bg-orange-400' : ''}`}
                    >
                      {group.label}
                      <ChevronDown className={`h-3 w-3 opacity-70 transition-transform ${activeDropdown === group.key ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mega Menu Dropdown for this group */}
                    {activeDropdown === group.key && (
                      <div className={`absolute top-full left-0 bg-white text-slate-900 shadow-2xl rounded-b-lg border-t-4 border-slate-900 z-[100] ${group.isDepartments ? 'min-w-[900px]' : 'min-w-[600px]'}`}>
                        {group.isIndustry ? (
                          /* Industry Icon Grid */
                          <div className="p-6">
                            <h3 className="text-lg font-black text-slate-900 mb-4 border-b border-slate-200 pb-2">
                              Shop by Industry
                            </h3>
                            <div className="grid grid-cols-5 gap-4">
                              {group.categories[0]?.children.map((industry) => {
                                const IconComponent = INDUSTRY_ICONS[industry.name] || Building2;
                                return (
                                  <Link
                                    key={industry.name}
                                    href={industry.path}
                                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-orange-50 transition-colors"
                                  >
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-orange-500 transition-colors group">
                                      <IconComponent className="h-5 w-5 text-orange-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-medium text-slate-600 text-center hover:text-orange-600">
                                      {industry.name}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ) : group.isDepartments ? (
                          /* Grouped Departments Mega Menu */
                          <div className="p-6">
                            <div className="grid grid-cols-4 gap-6">
                              {DEPARTMENT_GROUPS.map((deptGroup) => {
                                const GroupIcon = deptGroup.icon;
                                // Find matching categories from the nav group
                                const matchingCategories = group.categories.filter((cat: CategoryTreeItem) =>
                                  deptGroup.categoryNames.some(
                                    (name) => name.toLowerCase().trim() === cat.name.toLowerCase().trim()
                                  )
                                );

                                if (matchingCategories.length === 0) return null;

                                return (
                                  <div key={deptGroup.key} className="space-y-3">
                                    {/* Group Header */}
                                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                                        <GroupIcon className="h-4 w-4 text-orange-600" />
                                      </div>
                                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                                        {deptGroup.label}
                                      </h3>
                                    </div>

                                    {/* Categories in this group */}
                                    <div className="space-y-3">
                                      {matchingCategories.map((category: CategoryTreeItem) => (
                                        <div key={category.name}>
                                          <Link
                                            href={category.path}
                                            className="text-sm font-semibold text-slate-800 hover:text-orange-600 block"
                                          >
                                            {category.name}
                                          </Link>
                                          {/* Subcategories */}
                                          {category.children.length > 0 && (
                                            <div className="mt-1 space-y-1 pl-2 border-l-2 border-slate-100">
                                              {category.children.slice(0, 4).map((child: CategoryTreeItem) => (
                                                <Link
                                                  key={child.name}
                                                  href={child.path}
                                                  className="text-xs text-slate-500 hover:text-orange-600 block py-0.5"
                                                >
                                                  {child.name}
                                                </Link>
                                              ))}
                                              {category.children.length > 4 && (
                                                <Link
                                                  href={category.path}
                                                  className="text-xs text-orange-600 font-medium block py-0.5"
                                                >
                                                  View all →
                                                </Link>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          /* Standard Category Grid (Shop by Sign Type) */
                          <div className="flex">
                            {group.categories.map((parentCat: CategoryTreeItem) =>
                              parentCat.children.slice(0, 5).map((category, index) => (
                                <div
                                  key={category.name}
                                  className={`flex-1 p-6 min-w-[180px] ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
                                >
                                  <h3 className="text-sm font-black text-slate-900 mb-3 border-b border-slate-200 pb-2">
                                    <Link href={category.path} className="hover:text-orange-600">
                                      {category.name}
                                    </Link>
                                  </h3>
                                  <div className="space-y-1">
                                    {category.children.slice(0, 6).map((child) => (
                                      <Link
                                        key={child.name}
                                        href={child.path}
                                        className="text-sm text-slate-500 hover:text-orange-600 block py-1"
                                      >
                                        {child.name}
                                      </Link>
                                    ))}
                                    {category.children.length > 6 && (
                                      <Link
                                        href={category.path}
                                        className="text-xs text-orange-600 font-medium block pt-2"
                                      >
                                        View all →
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}



                {/* Knowledge Link */}
                <Link
                  href="/kb"
                  className="px-5 py-3 hover:bg-orange-400 transition-colors whitespace-nowrap border-r border-orange-400/30 cursor-pointer flex items-center gap-1 bg-orange-600/20"
                >
                  <Shield className="h-4 w-4" /> Knowledge
                </Link>

                <Link
                  href="/blog"
                  className="px-5 py-3 hover:bg-orange-400 transition-colors whitespace-nowrap border-r border-orange-400/30 cursor-pointer flex items-center gap-1 bg-orange-600/20"
                >
                  <FileText className="h-4 w-4" /> Blog
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Accordion Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1e293b] border-t border-slate-700 max-h-[70vh] overflow-y-auto">
            <nav className="text-white">
              {/* Category Accordion */}
              {navGroups.map((group) => (
                <div key={group.key} className="border-b border-slate-700">
                  <button
                    onClick={() => toggleSection(group.key)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold hover:bg-slate-700/50 transition-colors"
                  >
                    <span>{group.label}</span>
                    {expandedSections.includes(group.key) ? (
                      <ChevronDown className="h-4 w-4 text-orange-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                  </button>

                  {/* Expanded Content */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ${expandedSections.includes(group.key) ? 'max-h-[2000px]' : 'max-h-0'
                      }`}
                  >
                    {group.isIndustry ? (
                      /* Industry Grid for Mobile */
                      <div className="grid grid-cols-2 gap-2 p-4 bg-slate-800/50">
                        {group.categories[0]?.children.map((industry) => {
                          const IconComponent = INDUSTRY_ICONS[industry.name] || Building2;
                          return (
                            <Link
                              key={industry.name}
                              href={industry.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700 transition-colors"
                            >
                              <IconComponent className="h-4 w-4 text-orange-500" />
                              <span className="text-sm text-slate-300">{industry.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    ) : group.isDepartments ? (
                      /* Grouped Departments for Mobile */
                      <div className="bg-slate-800/50 py-2">
                        {DEPARTMENT_GROUPS.map((deptGroup) => {
                          const GroupIcon = deptGroup.icon;
                          // Find matching categories from the nav group
                          const matchingCategories = group.categories.filter((cat: CategoryTreeItem) =>
                            deptGroup.categoryNames.some(
                              (name) => name.toLowerCase().trim() === cat.name.toLowerCase().trim()
                            )
                          );

                          if (matchingCategories.length === 0) return null;

                          return (
                            <div key={deptGroup.key} className="mb-2">
                              {/* Group Header */}
                              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/30">
                                <GroupIcon className="h-4 w-4 text-orange-500" />
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                  {deptGroup.label}
                                </span>
                              </div>

                              {/* Categories in this group */}
                              {matchingCategories.map((category: CategoryTreeItem) => (
                                <div key={category.name}>
                                  <button
                                    onClick={() => toggleSubSection(group.key, category.name)}
                                    className="w-full px-6 py-2.5 flex items-center justify-between text-left text-sm hover:bg-slate-700/50 transition-colors"
                                  >
                                    <span className="text-slate-300">{category.name}</span>
                                    {category.children.length > 0 && (
                                      expandedSections.includes(`${group.key}-${category.name}`) ? (
                                        <ChevronDown className="h-3 w-3 text-orange-500" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3 text-slate-500" />
                                      )
                                    )}
                                  </button>

                                  {/* Subcategories */}
                                  {category.children.length > 0 && (
                                    <div
                                      className={`overflow-hidden transition-all duration-200 ${expandedSections.includes(`${group.key}-${category.name}`)
                                        ? 'max-h-[1000px]'
                                        : 'max-h-0'
                                        }`}
                                    >
                                      <div className="bg-slate-900/50 py-1">
                                        {category.children.map((child) => (
                                          <Link
                                            key={child.name}
                                            href={child.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-8 py-2 text-xs text-slate-400 hover:text-orange-400 hover:bg-slate-800/50 transition-colors"
                                          >
                                            {child.name}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Standard Category Accordion (Shop by Sign Type) */
                      <div className="bg-slate-800/50">
                        {group.categories.map((parentCat: CategoryTreeItem) =>
                          parentCat.children.map((category) => (
                            <div key={category.name}>
                              <div className="flex items-center justify-between px-6 py-2.5 hover:bg-slate-700/50 transition-colors">
                                <Link
                                  href={category.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex-1 text-sm text-slate-300 hover:text-orange-400"
                                >
                                  {category.name}
                                </Link>
                                {category.children.length > 0 && (
                                  <button
                                    onClick={() => toggleSubSection(group.key, category.name)}
                                    className="p-1 hover:bg-slate-600 rounded"
                                  >
                                    {expandedSections.includes(`${group.key}-${category.name}`) ? (
                                      <ChevronDown className="h-3 w-3 text-orange-500" />
                                    ) : (
                                      <ChevronRight className="h-3 w-3 text-slate-500" />
                                    )}
                                  </button>
                                )}
                              </div>

                              {/* Third level items */}
                              {category.children.length > 0 && (
                                <div
                                  className={`overflow-hidden transition-all duration-200 ${expandedSections.includes(`${group.key}-${category.name}`)
                                    ? 'max-h-[1000px]'
                                    : 'max-h-0'
                                    }`}
                                >
                                  <div className="bg-slate-900/50 py-1">
                                    {category.children.map((child) => (
                                      <Link
                                        key={child.name}
                                        href={child.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-8 py-2 text-xs text-slate-400 hover:text-orange-400 hover:bg-slate-800/50 transition-colors"
                                      >
                                        {child.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Static Links */}

              <Link
                href="/kb"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
              >
                <Shield className="h-4 w-4 text-orange-500" />
                <span className="font-semibold">Knowledge Base</span>
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
              >
                <FileText className="h-4 w-4 text-orange-500" />
                <span className="font-semibold">Blog</span>
              </Link>

              {/* Account Links for Mobile */}
              {isLoggedIn ? (
                <div className="border-t border-slate-600 mt-2 pt-2">
                  <Link
                    href="/account/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-slate-700/50 transition-colors"
                  >
                    <UserCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">My Account</span>
                  </Link>
                  <Link
                    href="/account/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-slate-700/50 transition-colors"
                  >
                    <ClipboardList className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Order History</span>
                  </Link>
                  <Link
                    href="/logout"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Sign Out</span>
                  </Link>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 border-t border-slate-600 mt-2 hover:bg-slate-700/50 transition-colors"
                >
                  <User className="h-4 w-4 text-orange-500" />
                  <span className="font-semibold">Sign In / Register</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Trust Bar - hidden on mobile */}
      <div className="hidden md:block bg-white border-b border-slate-200 shadow-sm py-3">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-orange-500" />
            <span>HSE & BSI Compliant</span>
          </div>
          <div className="flex items-center justify-center gap-3 border-l border-slate-100">
            <Truck className="h-5 w-5 text-orange-500" />
            <span>Free Delivery over £50 ex. VAT</span>
          </div>
          <div className="flex items-center justify-center gap-3 border-l border-slate-100">
            <Settings className="h-5 w-5 text-orange-500" />
            <span>Custom Signs Available</span>
          </div>
          <div className="flex items-center justify-center gap-3 border-l border-slate-100">
            <Factory className="h-5 w-5 text-orange-500" />
            <span>UK Made (Standard Signs)</span>
          </div>
          <div className="flex items-center justify-center gap-3 border-l border-slate-100">
            <div className="flex items-center justify-center h-5 w-5 rounded-full border-2 border-orange-500">
              <PoundSterling className="h-3 w-3 text-orange-500" />
            </div>
            <span>Bulk pricing</span>
          </div>
        </div>
      </div>
    </>
  );
}
