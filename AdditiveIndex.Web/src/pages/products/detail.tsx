import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { RiskBadge, RiskDot } from "@/components/risk-badge-new";
import { motion } from "framer-motion";

interface Additive {
  id: number;
  eCode: string;
  name: string;
  riskLevel: "safe" | "low" | "moderate" | "high" | "banned";
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

const RISK_SUMMARY: Record<string, { label: string; color: string; icon: string }> = {
  banned: { label: "Yasaklı madde içeriyor", color: "bg-[#bb0112]", icon: "close" },
  high: { label: "Yüksek riskli madde içeriyor", color: "bg-[#e02928]", icon: "warning" },
  moderate: { label: "Orta riskli madde içeriyor", color: "bg-[#fe932c]", icon: "warning" },
  safe: { label: "Tüm maddeler güvenli sınıfta", color: "bg-[#00855d]", icon: "check_circle" },
};

function getProductRisk(additives: Additive[]): string {
  if (additives.length === 0) return "safe";
  const sorted = [...additives].sort(
    (a, b) => (RISK_ORDER[a.riskLevel] ?? 99) - (RISK_ORDER[b.riskLevel] ?? 99)
  );
  return sorted[0].riskLevel;
}

function getRiskCounts(additives: Additive[]) {
  return {
    safe: additives.filter(a => a.riskLevel === "safe" || a.riskLevel === "low").length,
    moderate: additives.filter(a => a.riskLevel === "moderate").length,
    high: additives.filter(a => a.riskLevel === "high" || a.riskLevel === "banned").length,
  };
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
      <div className="space-y-6 pt-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-20">
        <span className="material-symbols-outlined text-6xl text-[#6d7a72]/50">shopping_bag</span>
        <h2 className="text-xl font-bold text-[#121c28] mt-4">Ürün bulunamadı</h2>
        <Link href="/products">
          <a className="text-[#006948] text-sm mt-2 inline-block hover:underline">
            ← Ürünlere dön
          </a>
        </Link>
      </div>
    );
  }

  const worstRisk = getProductRisk(product.additives);
  const summary = RISK_SUMMARY[worstRisk] ?? RISK_SUMMARY.safe;
  const riskCounts = getRiskCounts(product.additives);

  const sortedAdditives = [...product.additives].sort(
    (a, b) => (RISK_ORDER[a.riskLevel] ?? 99) - (RISK_ORDER[b.riskLevel] ?? 99)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-8 pb-16"
    >
      {/* Breadcrumb */}
      <nav className="py-4 flex items-center gap-2 text-[#6d7a72] text-sm mb-6">
        <Link href="/">
          <a className="hover:text-[#006948]">Anasayfa</a>
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link href="/products">
          <a className="hover:text-[#006948]">Ürünler</a>
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-[#121c28] font-semibold">{product.name}</span>
      </nav>

      {/* Product Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Left: Product Image */}
        <div className="md:col-span-5">
          <div className="bg-white border border-[#bccac0] rounded-xl overflow-hidden aspect-square flex items-center justify-center p-12">
            <span className="material-symbols-outlined text-9xl text-[#006948]/20">inventory_2</span>
          </div>
        </div>

        {/* Right: Product Info & Risk Summary */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div>
            <h1 className="text-headline-lg text-[#121c28] mb-2">{product.name}</h1>
            <p className="text-body-md text-[#3d4a42]">{product.brand}{product.description ? ` — ${product.description}` : ""}</p>
            {product.barcode && (
              <p className="text-sm text-[#6d7a72] mt-1 font-mono">Barkod: {product.barcode}</p>
            )}
          </div>

          {/* Risk Summary Card */}
          <div className="bg-[#eef4ff] border border-[#bccac0] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-headline-md text-[#121c28]">Risk Özeti</h2>
              <span className={`flex items-center gap-2 ${summary.color.replace('bg-', 'bg-opacity-20 bg-')} text-white px-4 py-1.5 rounded-full font-medium text-sm`}>
                <span className="material-symbols-outlined text-[18px]">{summary.icon}</span>
                {product.additives.length > 0 ? (
                  worstRisk === "banned" || worstRisk === "high" ? "Yüksek Risk" :
                  worstRisk === "moderate" ? "Orta Derece Risk" : "Düşük Risk"
                ) : "Katkısız"}
              </span>
            </div>

            {product.additives.length > 0 ? (
              <>
                <p className="text-body-md text-[#3d4a42]">
                  Bu ürün toplam <strong className="text-[#121c28]">{product.additives.length} katkı maddesi</strong> içermektedir.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-[#bccac0]">
                    <span className="text-[#006948] font-bold text-headline-md">{riskCounts.safe}</span>
                    <span className="text-label-sm text-[#3d4a42]">Güvenli</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-[#bccac0]">
                    <span className="text-[#fe932c] font-bold text-headline-md">{riskCounts.moderate}</span>
                    <span className="text-label-sm text-[#3d4a42]">Dikkat</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-[#bccac0]">
                    <span className="text-[#bb0112] font-bold text-headline-md">{riskCounts.high}</span>
                    <span className="text-label-sm text-[#3d4a42]">Zararlı</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-body-md text-[#3d4a42]">
                Bu ürün için katkı maddesi kaydı bulunmuyor.
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <button className="bg-[#006948] text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <span className="material-symbols-outlined">share</span>
              Paylaş
            </button>
            <button className="border border-[#6d7a72] text-[#3d4a42] px-8 py-3 rounded-full font-medium hover:bg-[#d9e3f4] transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined">picture_as_pdf</span>
              Raporu İndir
            </button>
          </div>
        </div>
      </section>

      {/* Additives List Section */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-headline-lg text-[#121c28]">Katkı Maddesi Analizi</h2>
        </div>

        {product.additives.length === 0 ? (
          <div className="bg-[#eef4ff] border border-[#bccac0] rounded-xl p-8 text-center">
            <span className="material-symbols-outlined text-6xl text-[#006948]/50">verified</span>
            <p className="text-[#3d4a42] mt-4">Bu ürün için katkı maddesi kaydı bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAdditives.map((additive) => (
              <Link key={additive.id} href={`/additives/${additive.id}`}>
                <a className="group bg-white border border-[#bccac0] rounded-xl p-6 clinical-shadow hover:shadow-lg transition-all duration-300 cursor-pointer block">
                  <div className="flex justify-between items-start mb-4">
                    <RiskBadge level={additive.riskLevel} size="sm" />
                    <span className="text-[#6d7a72] font-bold text-sm">{additive.eCode}</span>
                  </div>
                  <h3 className="text-headline-md text-[#121c28] mb-2 group-hover:text-[#006948] transition-colors">{additive.name}</h3>
                  <p className="text-body-md text-[#3d4a42] line-clamp-2">
                    {additive.function || additive.description || "Açıklama bulunmuyor."}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#bccac0] flex items-center text-[#006948] text-sm font-medium">
                    Detaylı İncele
                    <span className="material-symbols-outlined ml-auto group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Scientific References Section */}
      <section className="mt-16 p-8 bg-[#eef4ff] rounded-2xl border border-[#bccac0]">
        <h2 className="text-headline-md text-[#121c28] mb-6">Bilimsel Dayanaklar</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-[#006948] mt-1">description</span>
            <div>
              <p className="text-body-md text-[#121c28] font-semibold">EFSA (European Food Safety Authority) Raporları</p>
              <p className="text-label-sm text-[#3d4a42]">Gıda katkı maddelerinin güvenlik değerlendirmeleri ve ADI değerleri.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-[#006948] mt-1">description</span>
            <div>
              <p className="text-body-md text-[#121c28] font-semibold">WHO Gıda Katkı Maddeleri El Kitabı 2024</p>
              <p className="text-label-sm text-[#3d4a42]">Uluslararası güvenlik standartları ve toksisite çalışmaları.</p>
            </div>
          </li>
        </ul>
      </section>
    </motion.div>
  );
}
