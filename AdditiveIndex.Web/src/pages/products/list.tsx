import { useState } from "react";
import { Link } from "wouter";
import { Search, ShoppingBag, ChevronRight, AlertTriangle, Ban, ShieldCheck, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  brand: string;
  productCategory: string | null;
  barcode: string | null;
  description: string | null;
}

interface ProductsResponse {
  data: Product[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

const PRODUCT_CATEGORIES = [
  "Bisküvi & Gofret",
  "Meşrubat",
  "Meyve Suyu",
  "Hazır Gıda",
  "Konserve & Salça",
  "Çikolata & Şekerleme",
  "Süt Ürünleri",
  "Cips & Atıştırmalık",
  "İçecek Tozu",
];

export function ProductsList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    clearTimeout((window as any)._searchTimer);
    (window as any)._searchTimer = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 350);
  };

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", "20");
  if (debouncedSearch) params.set("search", debouncedSearch);
  if (category !== "all") params.set("productCategory", category);

  const { data: response, isLoading, isError } = useQuery<ProductsResponse>({
    queryKey: ["products", page, debouncedSearch, category],
    queryFn: async () => {
      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("API error");
      return res.json();
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ürünler</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Türkiye piyasasındaki ürünlerin içerik listesini keşfedin.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-card p-4 rounded-xl border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Ürün veya marka ara..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={category} onValueChange={(val) => { setCategory(val); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-[210px]">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Kategoriler</SelectItem>
            {PRODUCT_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-muted-foreground">
          <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-destructive opacity-60" />
          Ürünler yüklenirken hata oluştu.
        </div>
      ) : response?.data.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30" />
          Aramanızla eşleşen ürün bulunamadı.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {response?.data.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="group flex items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer h-full">
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                    {product.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{product.brand}</div>
                  {product.productCategory && (
                    <Badge variant="secondary" className="mt-2 text-[10px] h-4 px-1.5 font-normal">
                      {product.productCategory}
                    </Badge>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 ml-2 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {response && response.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            Toplam {response.pagination.total} ürün
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              Önceki
            </Button>
            <span className="text-sm px-2">{page} / {response.pagination.totalPages}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(response.pagination.totalPages, p + 1))}
              disabled={page === response.pagination.totalPages}
            >
              Sonraki
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
