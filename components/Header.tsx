"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";
import { fetchUserInfo } from "@/lib/api";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [user, setUser] = useState<{ uname: string } | null>(null);
  const [withdrawableUsdt, setWithdrawableUsdt] = useState("0.00");

  const parseNumber = (value: unknown): number | null => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) return null;
      const parsed = Number(trimmed);
      if (Number.isFinite(parsed)) return parsed;
    }
    return null;
  };

  const formatUsdt = (value: number) =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const refreshUserState = () => {
    const token = localStorage.getItem("token");
    const uname = localStorage.getItem("uname");
    if (!token) {
      setUser(null);
      setWithdrawableUsdt("0.00");
      return;
    }
    if (uname) {
      setUser({ uname });
    }

    fetchUserInfo(token)
      .then((response) => {
        const payload = response.data;
        if (payload.code !== 1 || !payload.data) return;
        localStorage.setItem("token", payload.data.token || token);
        if (payload.data.jwt) {
          localStorage.setItem("jwt", payload.data.jwt);
        }
        const displayName = payload.data.unick || payload.data.uname || uname;
        if (displayName) {
          setUser({ uname: displayName });
          localStorage.setItem("uname", displayName);
        }
        const gameCoinValue = payload.data.uchip ?? payload.data.balance;
        const gameCoins = parseNumber(gameCoinValue);
        if (gameCoins !== null) {
          setWithdrawableUsdt(formatUsdt(gameCoins / 100));
        }
      })
      .catch(() => undefined);
  };

  // 页面加载时检查是否已登录
  useEffect(() => {
    refreshUserState();
  }, []);

  const openLogin = () => {
    setLoginOpen(true);
    setSignupOpen(false);
  };

  const openSignup = () => {
    setSignupOpen(true);
    setLoginOpen(false);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    refreshUserState();
  };

  const handleSignupClose = () => {
    setSignupOpen(false);
    refreshUserState();
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenLoginModal = () => {
      setLoginOpen(true);
      setSignupOpen(false);
    };
    window.addEventListener("open-login-modal", handleOpenLoginModal);
    return () => {
      window.removeEventListener("open-login-modal", handleOpenLoginModal);
    };
  }, []);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("uname");
    localStorage.removeItem("jwt");
    setUser(null);
    setWithdrawableUsdt("0.00");
    setDropdownOpen(false);
    router.push("/");
  };

  const userMenuItems = [
    {
      label: "Profile",
      action: () => {
        setDropdownOpen(false);
        router.push("/account");
      },
    },
    { label: "Log out", action: handleLogout },
  ];

  const navLinks = [
    { name: "Home", href: "/", comingSoon: false },
    { name: "Games", href: "#", comingSoon: true },
    { name: "Promotions", href: "#", comingSoon: true },
    { name: "Provably Fair Explained", href: "/provably-fair-explained" },
    { name: "Worth Reading", href: "/worth-reading" },
  ];

  const handleComingSoon = () => {
    toast("Coming soon");
  };

  const isLinkActive = (href: string) => {
    if (!href || href === "#") return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-[var(--border)]">
      <nav className="container-custom">
        <div className="flex flex-col gap-2 py-4 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-[72px] w-auto"
                />
              </a>
            </div>

            {/* Right Side - Buttons */}
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  {/* Cashier / Balance */}
                  <button className="hidden md:inline-flex header-button-cashier text-sm md:w-auto">
                    ${withdrawableUsdt}
                  </button>

                  {/* User Info + Dropdown */}
                  <div className="relative hidden md:block" ref={dropdownRef}>
                    <button
                      className="inline-flex header-button-logged text-sm w-auto gap-2"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                      <svg
                        className="w-5 h-5 text-[#e9eaed]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                      {user.uname}
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-52 rounded-md border border-[#d0d0d0] bg-[#e9eaed] shadow-[0_8px_24px_rgba(0,0,0,0.3)] z-50">
                        {/* 小三角箭头 */}
                        <div className="absolute -top-2 right-6 h-0 w-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#e9eaed]" />
                        <div className="py-2">
                          {userMenuItems.map((item) => (
                            <button
                              key={item.label}
                              type="button"
                              className="block w-full px-5 py-3 text-left text-[16px] font-semibold text-[#5a5a5a] hover:bg-[#d9dadb] transition-colors"
                              onClick={item.action}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Log in Button */}
                  <button
                    className="hidden md:inline-flex header-button-login text-sm md:w-auto"
                    onClick={openLogin}
                  >
                    Log in
                  </button>

                  {/* Sign up Button */}
                  <button
                    className="hidden md:inline-flex header-button-signup text-sm md:w-auto"
                    onClick={openSignup}
                  >
                    Sign up
                  </button>
                </>
              )}

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
                const isActive = isLinkActive(link.href);
                const className = `text-base font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? "text-sky-400 hover:text-sky-300"
                    : "text-[#818283] hover:text-[var(--foreground)]"
                }`;
                if (link.comingSoon) {
                  return (
                    <button
                      key={link.name}
                      type="button"
                      className={className}
                      onClick={handleComingSoon}
                    >
                      {link.name}
                    </button>
                  );
                }
                return (
                  <a key={link.name} href={link.href} className={className}>
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Support Button */}
            <button
              className="hidden lg:inline-flex items-center gap-2 text-[#818283] hover:text-[#57caff] transition-colors duration-200"
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
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              const className = `block px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive
                  ? "text-sky-400 bg-[var(--background-card)]"
                  : "text-[var(--foreground-muted)] hover:text-[var(--primary)] hover:bg-[var(--background-card)]"
              }`;
              if (link.comingSoon) {
                return (
                  <button
                    key={link.name}
                    type="button"
                    className={className}
                    onClick={() => {
                      handleComingSoon();
                      setMobileMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </button>
                );
              }
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={className}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="px-4 pt-2 space-y-2">
              {user ? (
                <>
                  <button className="w-full header-button-cashier">
                    ${withdrawableUsdt}
                  </button>
                  <button className="w-full header-button-logged gap-2">
                    <svg
                      className="w-5 h-5 text-[#e9eaed]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                    {user.uname}
                  </button>
                  <div className="mt-2 space-y-1">
                    {userMenuItems.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        className="block w-full rounded-md px-4 py-2 text-left text-[var(--foreground-muted)] hover:text-[var(--primary)] hover:bg-[var(--background-card)] transition-colors duration-200"
                        onClick={() => {
                          item.action();
                          setMobileMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="w-full header-button-login"
                    onClick={openLogin}
                  >
                    Log in
                  </button>
                  <button
                    className="w-full header-button-signup"
                    onClick={openSignup}
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {loginOpen && (
          <LoginModal onClose={handleLoginClose} onSwitchToSignup={openSignup} />
        )}
        {signupOpen && (
          <SignupModal
            onClose={() => setSignupOpen(false)}
            onSwitchToLogin={openLogin}
            onRegisterSuccess={handleSignupClose}
          />
        )}
      </nav>
    </header>
  );
}
