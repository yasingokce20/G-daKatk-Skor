import { useState } from "react";
import { Link, useLocation } from "wouter";

export function TopNavBar() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { name: "Dictionary", href: "/additives", active: location.startsWith("/additives") },
    { name: "Blog", href: "/blog", active: location === "/blog" },
    { name: "Resources", href: "/docs", active: location === "/docs" },
    { name: "Safety Standards", href: "/categories", active: location === "/categories" },
  ];

  return (
    <header className="bg-white border-b border-[#bccac0] sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-4 md:px-6 max-w-[1120px] mx-auto h-20">
        {/* Logo */}
        <Link href="/">
          <div className="font-semibold text-2xl text-[#006948] tracking-tight cursor-pointer">
            PureFood Trace
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`font-medium text-sm transition-colors duration-200 ${
                  item.active
                    ? "text-[#006948] border-b-2 border-[#006948] pb-1"
                    : "text-[#3d4a42] hover:text-[#006948]"
                }`}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Katkı maddesi ara..."
              className="bg-[#eef4ff] border border-[#bccac0] rounded-full px-4 py-2 w-64 focus:ring-2 focus:ring-[#006948] focus:outline-none text-sm"
            />
            <span className="material-symbols-outlined absolute right-3 top-2 text-[#6d7a72]">
              search
            </span>
          </div>

          {/* Theme Toggle */}
          <button className="material-symbols-outlined text-[#006948] hover:text-[#121c28] transition-colors active:scale-95">
            contrast
          </button>

          {/* Account */}
          <button className="material-symbols-outlined text-[#006948] hover:text-[#121c28] transition-colors active:scale-95">
            account_circle
          </button>

          {/* Mobile Menu */}
          <button className="material-symbols-outlined text-[#121c28] md:hidden">
            menu
          </button>
        </div>
      </nav>
    </header>
  );
}
