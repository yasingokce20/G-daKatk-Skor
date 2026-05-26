import { useState } from "react";
import { Link } from "wouter";
import { Search, ShoppingBag, ChevronRight, AlertTriangle } from "lucide-react";
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
      className="pt-8 pb-16"
    >
      {/* Breadcrumb */}
      <nav className="py-4 flex items-center gap-2 text-[#6d7a72] text-sm mb-6">
        <Link href="/">
          <span className="hover:text-[#006948] cursor-pointer">Anasayfa</span>
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-[#121c28] font-semibold">Ürünler</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-headline-lg text-[#121c28] mb-2">Ürünler</h1>
        <p className="text-body-md text-[#3d4a42]">
          Türkiye piyasasındaki ürünlerin içerik listesini keşfedin.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-[#bccac0] mb-8">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a72]">search</span>
          <Input
            placeholder="Ürün veya marka ara..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 bg-[#f8f9ff] border-[#bccac0] focus:border-[#006948]"
          />
        </div>
        <Select value={category} onValueChange={(val) => { setCategory(val); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-[210px] bg-[#f8f9ff] border-[#bccac0]">
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-12 bg-[#ffdad6]/30 rounded-xl border border-[#e02928]/20">
          <span className="material-symbols-outlined text-4xl text-[#bb0112] mb-2 block">error</span>
          <p className="text-[#3d4a42]">Ürünler yüklenirken hata oluştu.</p>
        </div>
      ) : response?.data.length === 0 ? (
        <div className="text-center py-12 bg-[#eef4ff] rounded-xl border border-[#bccac0]">
          <span className="material-symbols-outlined text-4xl text-[#6d7a72] mb-2 block">shopping_bag</span>
          <p className="text-[#3d4a42]">Aramanızla eşleşen ürün bulunamadı.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {response?.data.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="group bg-white border border-[#bccac0] rounded-xl p-5 clinical-shadow hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className="material-symbols-outlined text-3xl text-[#006948]/60">inventory_2</span>
                  {product.productCategory && (
                    <Badge className="bg-[#d9e3f4] text-[#003921] hover:bg-[#d9e3f4] text-[10px]">
                      {product.productCategory}
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-[#121c28] mb-1 group-hover:text-[#006948] transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-[#6d7a72] mb-3">{product.brand}</p>
                {product.barcode && (
                  <p className="text-xs text-[#6d7a72] font-mono mt-auto pt-3 border-t border-[#bccac0]">
                    Barkod: {product.barcode}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {response && response.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#bccac0]">
          <div className="text-sm text-[#6d7a72]">
            Toplam <strong className="text-[#121c28]">{response.pagination.total}</strong> ürün
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage((p) => Math.max(1, p - 1))} 
              disabled={page === 1}
              className="border-[#bccac0] text-[#3d4a42] hover:bg-[#d9e3f4]"
            >
              <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
              Önceki
            </Button>
            <span className="text-sm px-3 py-1 bg-[#006948] text-white rounded-lg font-medium">
              {page} / {response.pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(response.pagination.totalPages, p + 1))}
              disabled={page === response.pagination.totalPages}
              className="border-[#bccac0] text-[#3d4a42] hover:bg-[#d9e3f4]"
            >
              Sonraki
              <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
