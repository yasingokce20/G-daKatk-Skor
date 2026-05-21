import { useState } from "react";
import { Link } from "wouter";
import { Search, FlaskConical, AlertCircle } from "lucide-react";
import { useListAdditives, useListCategories } from "@/api";
import type { RiskLevel } from "@/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/risk-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function AdditivesList() {
  const searchParams = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [riskLevel, setRiskLevel] = useState<RiskLevel | "all">(
    (searchParams.get("riskLevel") as RiskLevel) || "all"
  );
  const [categoryId, setCategoryId] = useState<string>("all");
  const [page, setPage] = useState(1);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    clearTimeout((window as any)._searchTimer);
    (window as any)._searchTimer = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 400);
  };

  const { data: categories } = useListCategories();

  const { data: response, isLoading, isError } = useListAdditives({
    page,
    limit: 20,
    search: debouncedSearch || undefined,
    riskLevel: riskLevel !== "all" ? riskLevel : undefined,
    categoryId: categoryId !== "all" ? Number(categoryId) : undefined,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold">Katkı Maddeleri</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Tüm E kodlarını arayın, filtreleyin ve detaylarını inceleyin.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-card p-4 rounded-xl border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="E kodu, isim veya diğer adları ara..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={riskLevel} onValueChange={(val) => { setRiskLevel(val as any); setPage(1); }}>
            <SelectTrigger className="w-[155px]">
              <SelectValue placeholder="Risk Seviyesi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Riskler</SelectItem>
              <SelectItem value="safe">Güvenli</SelectItem>
              <SelectItem value="low">Düşük Risk</SelectItem>
              <SelectItem value="moderate">Orta Risk</SelectItem>
              <SelectItem value="high">Yüksek Risk</SelectItem>
              <SelectItem value="banned">Yasaklı</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryId} onValueChange={(val) => { setCategoryId(val); setPage(1); }}>
            <SelectTrigger className="w-[165px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[90px]">E Kodu</TableHead>
              <TableHead>İsim</TableHead>
              <TableHead className="w-[130px]">Risk</TableHead>
              <TableHead>İşlev</TableHead>
              <TableHead className="w-[90px]">Kaynak</TableHead>
              <TableHead className="text-right w-[80px]">Detay</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  <AlertCircle className="w-7 h-7 mx-auto mb-2 opacity-40" />
                  Yüklenirken hata oluştu.
                </TableCell>
              </TableRow>
            ) : response?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  <FlaskConical className="w-7 h-7 mx-auto mb-2 opacity-30" />
                  Sonuç bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              response?.data.map((additive) => (
                <TableRow key={additive.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-mono font-semibold text-primary">{additive.eCode}</TableCell>
                  <TableCell className="font-medium">{additive.name}</TableCell>
                  <TableCell><RiskBadge level={additive.riskLevel} /></TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[180px] truncate" title={additive.function || ""}>
                    {additive.function || "—"}
                  </TableCell>
                  <TableCell>
                    {additive.source ? (
                      <Badge variant="secondary" className="capitalize font-normal text-xs">
                        {additive.source === "natural" ? "Doğal" : additive.source === "synthetic" ? "Sentetik" : additive.source}
                      </Badge>
                    ) : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild className="h-7 text-xs hover:bg-primary/10 hover:text-primary">
                      <Link href={`/additives/${additive.id}`}>İncele →</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {response && response.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t bg-muted/20 text-sm">
            <div className="text-muted-foreground">
              {response.pagination.total} sonuçtan {((page - 1) * 20) + 1}–{Math.min(page * 20, response.pagination.total)} gösteriliyor
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                Önceki
              </Button>
              <span className="px-1">{page} / {response.pagination.totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(response.pagination.totalPages, p + 1))} disabled={page === response.pagination.totalPages}>
                Sonraki
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
