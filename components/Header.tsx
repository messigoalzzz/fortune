"use client";

import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Games", href: "#games" },
    { name: "Promotions", href: "#promotions" },
    { name: "Provably Fair Explained", href: "#provably-fair" },
    { name: "Worth Reading", href: "#articles" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--background)] border-b border-[var(--border)]">
      <nav className="container-custom">
        <div className="flex flex-col gap-2 py-4 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-[72px] w-auto"
                />
              </a>
            </div>

            {/* Right Side - Buttons */}
            <div className="flex items-center space-x-3">
              {/* Log in Button */}
              <button className="hidden md:inline-flex items-center px-6 py-2 border border-[var(--primary)] text-white rounded-lg hover:text-[var(--primary)] hover:border-[var(--primary-light)] hover:bg-[rgba(245,158,11,0.2)] transition-colors duration-200 font-semibold text-sm">
                Log in
              </button>

              {/* Sign up Button */}
              <button className="hidden md:inline-flex items-center px-6 py-2 border border-[var(--primary)] text-white rounded-lg hover:bg-[rgba(245,158,11,0.2)] transition-colors duration-200 font-semibold text-sm shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                Sign up
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-md text-[var(--foreground)] hover:bg-[var(--background-card)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Desktop Navigation - Bottom Row */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = link.name === "Home";
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-base font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? "text-sky-400 hover:text-sky-300"
                        : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Support Button */}
            <button
              className="hidden lg:inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[#57caff] transition-colors duration-200"
              aria-label="Support"
            >
              <span className="text-base font-semibold">Support</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-3 border-t border-[var(--border)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-[var(--foreground-muted)] hover:text-[var(--primary)] hover:bg-[var(--background-card)] rounded-md transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="px-4 pt-2 space-y-2">
              <button className="w-full px-6 py-2.5 border border-[var(--primary)] text-white rounded-lg hover:text-[var(--primary)] hover:border-[var(--primary-light)] transition-colors duration-200 font-semibold">
                Log in
              </button>
              <button className="w-full px-6 py-2.5 border border-[var(--primary)] bg-[rgba(245,158,11,0.12)] text-white rounded-lg hover:bg-[rgba(245,158,11,0.2)] transition-colors duration-200 font-semibold">
                Sign up
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
