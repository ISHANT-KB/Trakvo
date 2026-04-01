"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="8" width="3" height="6" rx="1" fill="currentColor" />
        <rect x="6" y="5" width="3" height="9" rx="1" fill="currentColor" />
        <rect x="11" y="2" width="3" height="12" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    href: "/analytics",
    badge: "New",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <polyline
          points="1,12 5,7 8,9 11,4 14,6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M1 6h13" stroke="currentColor" strokeWidth="1.3" />
        <path d="M4 9.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

const LogoIcon = () => (
  <div className="w-8 h-8 bg-[#1a6b4a] rounded-lg flex items-center justify-center shrink-0">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <polyline
        points="2,13 6,8 9,10 13,5 16,7"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="7" r="1.5" fill="#fff" />
    </svg>
  </div>
);

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="flex flex-col justify-center gap-1.25 w-5 h-5">
    <span
      className={`block h-[1.5px] bg-current rounded-sm transition-all duration-250 origin-center ${
        open ? "translate-y-[6.5px] rotate-45" : ""
      }`}
    />
    <span
      className={`block h-[1.5px] bg-current rounded-sm transition-all duration-250 ${
        open ? "opacity-0 scale-x-0" : ""
      }`}
    />
    <span
      className={`block h-[1.5px] bg-current rounded-sm transition-all duration-250 origin-center ${
        open ? "-translate-y-[6.5px] -rotate-45" : ""
      }`}
    />
  </div>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="px-4 py-4 relative z-50">
      {/* Main Nav */}
      <nav className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-6 flex items-center justify-between h-15 relative">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline z-10">
          <LogoIcon />
          <span
            className="text-[18px] font-bold tracking-tight text-zinc-900 dark:text-white"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Track<span className="text-[#1a6b4a]">vo</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-lg no-underline transition-all duration-150
                  ${
                    isActive(link.href)
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                  }`}
              >
                <span className="opacity-70">{link.icon}</span>
                {link.label}
                {link.badge && (
                  <span className="text-[10px] font-semibold bg-[#e1f5ee] text-[#0f6e56] rounded px-1.5 py-0.5 ml-0.5">
                    {link.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-2.5 z-10">
          <button className="text-sm font-medium text-zinc-500 dark:text-zinc-400 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded-lg px-3.5 py-1.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Log in
          </button>
          <button className="text-sm font-semibold text-white bg-[#1a6b4a] border-none rounded-lg px-4 py-1.75 cursor-pointer hover:opacity-90 transition-opacity">
            Get started
          </button>
          <div className="w-7.5 h-7.5 rounded-full bg-[#e1f5ee] flex items-center justify-center text-xs font-semibold text-[#0f6e56] border border-zinc-200 dark:border-zinc-700 cursor-pointer shrink-0">
            AK
          </div>
        </div>

        {/* Hamburger Button (mobile) */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer text-zinc-700 dark:text-zinc-300 z-10"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={menuOpen} />
        </button>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden absolute top-17 left-0 right-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 z-50 transition-all duration-200
            ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
        >
          <ul className="list-none m-0 p-0 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 text-sm font-medium px-3.5 py-2.5 rounded-lg no-underline transition-all duration-150
                    ${
                      isActive(link.href)
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                >
                  <span className="opacity-70">{link.icon}</span>
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] font-semibold bg-[#e1f5ee] text-[#0f6e56] rounded px-1.5 py-0.5">
                      {link.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />

          {/* Mobile Actions */}
          <div className="flex gap-2 pt-1">
            <button className="flex-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded-lg py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              Log in
            </button>
            <button className="flex-1 text-sm font-semibold text-white bg-[#1a6b4a] border-none rounded-lg py-2 cursor-pointer hover:opacity-90 transition-opacity">
              Get started
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}