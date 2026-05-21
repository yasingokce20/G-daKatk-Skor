import { useParams, Link } from "wouter";
import { ArrowLeft, ShoppingBag, FlaskConical, AlertTriangle, ShieldCheck, Ban, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RiskBadge } from "@/components/risk-badge";
import { motion } from "framer-motion";

interface Additive {
  id: number;
  eCode: string;
  name: string;
  riskLevel: string;
  function: string | null;
  description: string | null;
  source: string | null;
  category: { id: number; name: string } | null;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  productCategory: string | null;
  barcode: string | null;
  description: string | null;
  additives: Additive[];
}

const RISK_ORDER: Record<string, number> = {
  banned: 0,
  high: 1,
  moderate: 2,
  low: 3,
  safe: 4,
};

const RISK_SUMMARY: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  banned: { label: "Yasaklı madde içeriyor", color: "text-red-600 bg-red-50 border-red-200", icon: Ban },
  high: { label: "Yüksek riskli madde içeriyor", color: "text-orange-600 bg-orange-50 border-orange-200", icon: AlertTriangle },
  moderate: { label: "Orta riskli madde içeriyor", color: "text-amber-600 bg-amber-50 border-amber-200", icon: Info },
  safe: { label: "Tüm maddeler güvenli sınıfta", color: "text-green-600 bg-green-50 border-green-200", icon: ShieldCheck },
};

function getProductRisk(additives: Additive[]): string {
  if (additives.length === 0) return "safe";
  const sorted = [...additives].sort(
    (a, b) => (RISK_ORDER[a.riskLevel] ?? 99) - (RISK_ORDER[b.riskLevel] ?? 99)
  );
  return sorted[0].riskLevel;
}

export function ProductDetail() {
  const { id } = useParams();
  const numericId = parseInt(id || "0", 10);

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", numericId],
    queryFn: async () => {
      const res = await fetch(`/api/products/${numericId}`);
      if (!res.ok) throw new Error("API error");
      return res.json();
    },
    enabled: !!numericId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-40" />
        <div className="grid gap-3 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
        <h2 className="text-xl font-bold">Ürün bulunamadı</h2>
        <Link href="/products" className="text-primary text-sm mt-2 inline-block hover:underline">
          ← Ürünlere dön
        </Link>
      </div>
    );
  }

  const worstRisk = getProductRisk(product.additives);
  const summary = RISK_SUMMARY[worstRisk] ?? RISK_SUMMARY.safe;
  const SummaryIcon = summary.icon;

  const sortedAdditives = [...product.additives].sort(
    (a, b) => (RISK_ORDER[a.riskLevel] ?? 99) - (RISK_ORDER[b.riskLevel] ?? 99)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Ürünlere dön
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {product.productCategory && (
            <Badge variant="secondary" className="text-xs">{product.productCategory}</Badge>
          )}
          {product.barcode && (
            <span className="text-xs text-muted-foreground font-mono">Barkod: {product.barcode}</span>
          )}
        </div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-muted-foreground text-sm">{product.brand}{product.description ? ` — ${product.description}` : ""}</p>
      </div>

      {/* Risk Summary Banner */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${summary.color}`}>
        <SummaryIcon className="w-5 h-5 flex-shrink-0" />
        <div>
          <div className="font-medium text-sm">{summary.label}</div>
          <div className="text-xs mt-0.5 opacity-80">
            {product.additives.length} katkı maddesi tespit edildi. Risk seviyesine göre sıralandı.
          </div>
        </div>
      </div>

      {/* Additives List */}
      <div>
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-primary" />
          İçerdiği Katkı Maddeleri
          <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {product.additives.length} adet
          </span>
        </h2>

        {product.additives.length === 0 ? (
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground text-sm">
              <ShieldCheck className="w-8 h-8 mb-2 text-green-500 opacity-60" />
              Bu ürün için katkı maddesi kaydı bulunmuyor.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {sortedAdditives.map((additive) => (
              <Link key={additive.id} href={`/additives/${additive.id}`}>
                <div className="group flex items-start justify-between p-4 rounded-xl border bg-card hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-semibold text-primary">{additive.eCode}</span>
                      <RiskBadge level={additive.riskLevel} />
                    </div>
                    <div className="font-medium text-sm truncate group-hover:text-primary transition-colors">{additive.name}</div>
                    {additive.function && (
                      <div className="text-xs text-muted-foreground mt-0.5">{additive.function}</div>
                    )}
                    {additive.category && (
                      <Badge variant="outline" className="mt-1.5 text-[10px] h-4 px-1.5 font-normal">
                        {additive.category.name}
                      </Badge>
                    )}
                  </div>
                  <ArrowLeft className="w-4 h-4 rotate-180 text-muted-foreground group-hover:text-primary flex-shrink-0 ml-2 mt-0.5 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
