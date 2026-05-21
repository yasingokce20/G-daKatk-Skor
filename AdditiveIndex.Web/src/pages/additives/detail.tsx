import { useParams, Link } from "wouter";
import { ArrowLeft, FlaskConical, ShieldAlert, FileText, Info, Building, ShoppingBag, ChevronRight } from "lucide-react";
import {
  useGetAdditive,
  getGetAdditiveQueryKey,
  useListReferences,
} from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RiskBadge } from "@/components/risk-badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  brand: string;
  productCategory: string | null;
}

export function AdditiveDetail() {
  const { id } = useParams();
  const numericId = parseInt(id || "0", 10);

  const { data: additive, isLoading, isError } = useGetAdditive(numericId, {
    query: {
      enabled: !!numericId,
      queryKey: getGetAdditiveQueryKey(numericId),
    },
  });

  const { data: references, isLoading: refsLoading } = useListReferences(
    { additiveId: numericId },
    { query: { enabled: !!numericId } }
  );

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["additive-products", numericId],
    queryFn: async () => {
      const res = await fetch(`/api/additives/${numericId}/products`);
      if (!res.ok) throw new Error("API error");
      return res.json();
    },
    enabled: !!numericId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-28 rounded-full" />
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Skeleton className="h-56" />
          <Skeleton className="h-56" />
        </div>
      </div>
    );
  }

  if (isError || !additive) {
    return (
      <div className="text-center py-20">
        <ShieldAlert className="w-12 h-12 text-destructive mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-bold">Katkı maddesi bulunamadı</h2>
        <p className="text-muted-foreground text-sm mt-2 mb-5">
          İstenen katkı maddesi bulunamadı veya bir hata oluştu.
        </p>
        <Button asChild variant="outline">
          <Link href="/additives">← Listeye dön</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Link
        href="/additives"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Katkı maddelerine dön
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="outline" className="font-mono text-base bg-card border-primary/20 text-primary px-3 py-1">
            {additive.eCode}
          </Badge>
          <RiskBadge level={additive.riskLevel} />
          {additive.category && (
            <Badge variant="secondary" className="text-xs">
              <FlaskConical className="w-3 h-3 mr-1" />
              {additive.category.name}
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{additive.name}</h1>
        {additive.alternativeNames && (
          <p className="text-muted-foreground text-sm mt-1">
            Diğer adları: {additive.alternativeNames}
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {/* Main Info */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3 border-b bg-muted/20">
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              Genel Bilgi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            {additive.description && (
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Açıklama</h3>
                <p className="text-sm leading-relaxed">{additive.description}</p>
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">İşlev</h3>
                <p className="font-medium">{additive.function || "Belirtilmemiş"}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Kaynak</h3>
                <p className="font-medium capitalize">
                  {additive.source === "natural" ? "Doğal" : additive.source === "synthetic" ? "Sentetik" : additive.source || "Bilinmiyor"}
                </p>
                {additive.sourceDetails && (
                  <p className="text-xs text-muted-foreground mt-1">{additive.sourceDetails}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety */}
        <Card className="bg-primary/5 border-primary/15">
          <CardHeader className="pb-3 border-b border-primary/10">
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-primary" />
              Güvenlik Bilgisi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Kabul Edilebilir Günlük Alım (ADI)
              </h3>
              <div className="bg-card p-3 rounded-lg border font-mono text-sm">
                {additive.adiBySafety || "Belirtilmemiş / Sınırsız"}
              </div>
            </div>
            <Separator className="bg-primary/10" />
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Mevzuat Durumu
              </h3>
              <div className="flex items-start gap-2">
                <Building className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  {additive.regulatoryStatus || "Durum bilgisi mevcut değil"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products containing this additive */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          Bu Maddeyi İçeren Ürünler
          {products && (
            <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {products.length} ürün
            </span>
          )}
        </h2>

        {productsLoading ? (
          <div className="grid gap-2 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="group flex items-center justify-between p-3 rounded-xl border bg-card hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer">
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate group-hover:text-primary transition-colors">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.brand}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 ml-2 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="bg-muted/20 border-dashed">
            <CardContent className="flex items-center justify-center py-8 text-muted-foreground text-sm text-center">
              Bu katkı maddesi için ürün kaydı bulunmuyor.
            </CardContent>
          </Card>
        )}
      </div>

      {/* References */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Bilimsel Kaynaklar
        </h2>

        {refsLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : references && references.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {references.map((ref) => (
              <Card key={ref.id} className="hover:shadow-sm transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm leading-snug">
                    {ref.url ? (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary hover:underline flex items-start gap-1.5"
                      >
                        {ref.title}
                        <ArrowLeft className="w-3 h-3 rotate-[135deg] flex-shrink-0 mt-0.5" />
                      </a>
                    ) : (
                      ref.title
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {ref.authors} {ref.year ? `(${ref.year})` : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {ref.journal && <span className="text-xs italic text-muted-foreground">{ref.journal}</span>}
                    {ref.source && (
                      <Badge variant="secondary" className="text-[10px] h-4 px-1">{ref.source}</Badge>
                    )}
                  </div>
                  {ref.summary && (
                    <p className="text-xs text-muted-foreground line-clamp-3">{ref.summary}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-muted/20 border-dashed">
            <CardContent className="flex items-center justify-center py-8 text-muted-foreground text-sm">
              Bu katkı maddesi için kaynak bilgisi bulunmuyor.
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
}
