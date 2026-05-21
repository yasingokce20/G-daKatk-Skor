import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { FlaskConical, Home, List, ShoppingBag, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navigation = [
    { name: "Ana Sayfa", href: "/", icon: Home },
    { name: "Katkı Maddeleri", href: "/additives", icon: FlaskConical },
    { name: "Ürünler", href: "/products", icon: ShoppingBag },
    { name: "API Docs", href: "/docs", icon: BookOpen },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="w-60 border-r bg-card flex flex-col">
        <div className="p-5 border-b">
          <div className="flex items-center gap-2 font-bold text-lg text-primary">
            <FlaskConical className="w-6 h-6" />
            <span>E-Katkı</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Gıda katkı maddeleri rehberi</p>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-3">
            {navigation.map((item) => {
              const isActive =
                location === item.href ||
                (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t text-xs text-muted-foreground">
          Türkiye piyasası verileri
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
