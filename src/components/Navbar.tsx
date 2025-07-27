"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import { usePathname } from "next/navigation";
import {
  Menu,
  User,
  LogOut,
  Plus,
  ChevronDown,
  X,
  LayoutDashboard,
} from "lucide-react";
import { fetchUserByEmail } from "@/lib/api/user";
import { useDispatch } from "react-redux";
import { clearUserProfile, setUserProfile } from "@/store/userSlice/userSlice";
import { useSelector } from "react-redux";
import { persistor } from "@/store/store";

export default function Navbar({ isDashboard, isSidebarOpen, setSidebarOpen }) {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.profile);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleLogout = async () => {
    dispatch(clearUserProfile());
    await persistor.purge();
    await signOut({ callbackUrl: "/" });
  };

  const pathname = usePathname();
  const isInLogin =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !isDashboard) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDashboard]);

  if (isInLogin) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
  ];

  //? Fetch Data
  const loadAllData = async () => {
    try {
      const [userData] = await Promise.all([
        fetchUserByEmail(session.user.email),
      ]);
      dispatch(setUserProfile(userData));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);
  //? Fetch Data End

  return (
    <nav
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md py-2" : "py-3"
      }`}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 md:px-6 ">
        <div className="flex items-center">
          {/* Sidebar Toggle Button for Dashboard */}
          {isDashboard && (
            <button
              type="button"
              className="absolute left-[0px] items-center p-2 ml-5 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
          )}

          {/* Logo */}
          {!isDashboard && (
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/images/logo.png"
                alt="Nimbrunk Logo"
                width={130}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          )}
        </div>

        {/* Mobile Menu Button (for non-dashboard pages) */}
        {!isDashboard && (
          <button
            type="button"
            className="inline-flex items-center p-2 rounded-md text-gray-700 md:hidden hover:bg-gray-100 focus:outline-none transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col justify-center w-6 h-6 relative">
              <span
                className={`absolute h-0.5 w-6 bg-gray-700 transform transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-gray-700 transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-gray-700 transform transition-transform duration-300 ${
                  mobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                }`}
              ></span>
            </div>
          </button>
        )}

        {/* Desktop Navigation */}
        <div
          className={`items-center gap-1 lg:gap-2 ${
            !isDashboard ? "hidden md:flex" : ""
          }`}
        >
          {!isDashboard && (
            <div>
              <ul className="flex items-center space-x-1 lg:space-x-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#16a34a] rounded-md transition-colors relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16a34a] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="#contact"
                    className="ml-2 px-4 py-2 text-sm font-medium text-white bg-[#16a34a] hover:bg-green-500 rounded-md shadow-sm transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {session ? (
            <div className="relative ml-4" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <div className="flex-shrink-0">
                  <Avatar image={userProfile?.primg} />
                </div>
                <span className="hidden lg:block font-medium truncate max-w-[120px]">
                  {session.user?.email}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 ${
                  dropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="p-3 bg-[#16a34a] bg-opacity-10 border-b border-gray-100">
                  <p className="text-sm font-medium text-[#16a34a]">
                    Menu Options
                  </p>
                </div>
                <ul className="py-1">
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard
                        size={18}
                        className="mr-3 text-[#16a34a]"
                      />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} className="mr-3" />
                      <span className="font-medium">Sign out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-[#16a34a] bg-white border border-[#16a34a] rounded-md hover:bg-[#fff8f7] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-[#16a34a] rounded-md hover:bg-[#d43d2a] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (for non-dashboard pages) */}
      {!isDashboard && (
        <div>
          {/* Mobile Menu Overlay */}
          <div
            className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
              mobileMenuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background Overlay */}
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-50"
              onClick={toggleMobileMenu}
            />

            {/* Sliding Menu Panel */}
            <div
              className={`relative h-full w-4/5 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Image
                  src="/assets/images/logo.png"
                  alt="Nimbrunk Logo"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
                <button
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  <X size={24} />
                </button>
              </div>

              {/* User Profile Section */}
              {session && (
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar image={userProfile?.primg} />
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="py-2 flex-1 overflow-y-auto">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={toggleMobileMenu}
                    style={{
                      animationDelay: mobileMenuOpen
                        ? `${index * 50}ms`
                        : "0ms",
                    }}
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  href="#contact"
                  className="flex items-center px-4 py-3 text-[#16a34a] font-medium hover:bg-red-50 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  Contact Us
                </Link>

                {/* Authenticated User Actions */}
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      onClick={toggleMobileMenu}
                    >
                      <Plus size={18} className="mr-3 text-[#16a34a]" />
                      <span>Buat Kartu</span>
                    </Link>

                    <Link
                      href="#"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      onClick={toggleMobileMenu}
                    >
                      <User size={18} className="mr-3 text-[#16a34a]" />
                      <span>Atur Profil</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut size={18} className="mr-3" />
                      <span>Sign out</span>
                    </button>
                  </>
                ) : (
                  /* Authentication Buttons */
                  <div className="flex flex-col gap-2 p-4 mt-4">
                    <Link
                      href="/login"
                      className="w-full py-2 text-center text-sm font-medium text-[#16a34a] bg-white border border-[#16a34a] rounded-md hover:bg-red-50 transition-colors duration-200"
                      onClick={toggleMobileMenu}
                    >
                      Masuk
                    </Link>

                    <Link
                      href="/register"
                      className="w-full py-2 text-center text-sm font-medium text-white bg-[#16a34a] rounded-md hover:bg-red-600 transition-colors duration-200"
                      onClick={toggleMobileMenu}
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
