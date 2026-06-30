import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

export function TopNavBar() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { name: "Katkı Maddeleri", href: "/additives", active: location.startsWith("/additives") },
    { name: "Ürünler", href: "/products", active: location.startsWith("/products") },
    { name: "Kategoriler", href: "/categories", active: location === "/categories" },
    { name: "Kaynaklar", href: "/docs", active: location === "/docs" },
  ];

  return (
    <header className="bg-white border-b border-[#bccac0] sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-4 md:px-6 max-w-[1120px] mx-auto h-20">
        {/* Logo */}
        <Link href="/">
          <div className="font-semibold text-2xl text-[#006948] tracking-tight cursor-pointer">
            GıdaKatkıRadarı
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
          <button 
            onClick={toggleTheme}
            className="material-symbols-outlined text-[#006948] hover:text-[#121c28] transition-colors active:scale-95"
            title={theme === "light" ? "Karanlık moda geç" : "Aydınlık moda geç"}
          >
            {theme === "light" ? "dark_mode" : "light_mode"}
          </button>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-[#006948] hover:text-[#121c28] transition-colors"
              >
                <span className="material-symbols-outlined">account_circle</span>
                <span className="hidden sm:block text-sm font-medium">{user?.username}</span>
                <span className="material-symbols-outlined text-[16px]">
                  {showUserMenu ? "expand_less" : "expand_more"}
                </span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#bccac0] rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#bccac0]">
                    <p className="text-sm font-semibold text-[#121c28]">{user?.username}</p>
                    <p className="text-xs text-[#6d7a72]">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-[#bb0112] hover:bg-[#ffdad6] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[#006948] hover:text-[#005137] hover:bg-[#d9e3f4]"
                >
                  Giriş
                </Button>
              </Link>
              <Link href="/register">
                <Button 
                  size="sm"
                  className="bg-[#006948] hover:bg-[#005137] text-white"
                >
                  Kayıt
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <button className="material-symbols-outlined text-[#121c28] md:hidden">
            menu
          </button>
        </div>
      </nav>
    </header>
  );
}
