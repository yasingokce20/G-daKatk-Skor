import { useParams, Link } from "wouter";
import {
  useGetAdditive,
  getGetAdditiveQueryKey,
  useListReferences,
  useListCategories,
} from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { RiskBadge } from "@/components/risk-badge-new";
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

  const { data: categories } = useListCategories();

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
      <div className="space-y-6 pt-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-12 w-2/3" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !additive) {
    return (
      <div className="text-center py-20">
        <span className="material-symbols-outlined text-6xl text-[#bb0112]/50">error</span>
        <h2 className="text-xl font-bold text-[#121c28] mt-4">Katkı maddesi bulunamadı</h2>
        <p className="text-[#3d4a42] text-sm mt-2 mb-5">
          İstenen katkı maddesi bulunamadı veya bir hata oluştu.
        </p>
        <Link href="/additives">
          <a className="inline-flex items-center text-[#006948] hover:underline">
            <span className="material-symbols-outlined mr-1">arrow_back</span>
            Listeye dön
          </a>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-8 pb-16"
    >
      {/* Hero Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Main Title & E-Code */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <RiskBadge level={additive.riskLevel} />
            <span className="text-[#6d7a72] text-sm font-medium">Gıda Katkı Maddesi Profili</span>
          </div>
          <h1 className="text-display-lg text-[#121c28] mb-2">
            {additive.name} ({additive.eCode})
          </h1>
          <p className="text-body-lg text-[#3d4a42] max-w-2xl">
            {additive.description || "Açıklama bulunmuyor."}
          </p>
          {additive.alternativeNames && (
            <p className="text-sm text-[#6d7a72] mt-2">
              Diğer adlar: {additive.alternativeNames}
            </p>
          )}
        </div>

        {/* Profile Summary Card */}
        <div className="bg-[#dfe9fa] p-6 rounded-xl border border-[#bccac0] flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-[#bccac0] pb-3">
            <span className="text-[#3d4a42] text-sm font-medium">E-Kodu</span>
            <span className="text-headline-md text-[#006948] font-semibold">{additive.eCode}</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#bccac0] pb-3">
            <span className="text-[#3d4a42] text-sm font-medium">Kaynak</span>
            <span className="text-sm font-medium text-[#121c28]">
              {additive.source === "natural" ? "Doğal" : additive.source === "synthetic" ? "Sentetik" : additive.source || "Bilinmiyor"}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-[#bccac0] pb-3">
            <span className="text-[#3d4a42] text-sm font-medium">Güvenlik Durumu</span>
            <span className={`font-bold text-sm uppercase ${
              additive.riskLevel === "safe" || additive.riskLevel === "low"
                ? "text-[#006948]"
                : additive.riskLevel === "moderate"
                ? "text-[#904d00]"
                : "text-[#bb0112]"
            }`}>
              {additive.riskLevel === "safe" && "Güvenli"}
              {additive.riskLevel === "low" && "Düşük Risk"}
              {additive.riskLevel === "moderate" && "Orta Risk"}
              {additive.riskLevel === "high" && "Yüksek Risk"}
              {additive.riskLevel === "banned" && "Yasaklı"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#3d4a42] text-sm font-medium">Kategori</span>
            <span className="text-sm font-medium text-[#121c28]">
              {additive.category?.name || "Belirtilmemiş"}
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* Function Card */}
        <div className="lg:col-span-2 bg-white border border-[#bccac0] p-8 rounded-xl clinical-shadow">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-[#006948]">science</span>
            <h3 className="text-headline-md text-[#121c28]">İşlev ve Kullanım</h3>
          </div>
          <div className="space-y-4">
            <div>
              <span className="font-bold block text-[#121c28] text-sm mb-1">Teknolojik İşlev</span>
              <span className="text-[#3d4a42] text-sm">{additive.function || "Belirtilmemiş"}</span>
            </div>
            {additive.sourceDetails && (
              <div>
                <span className="font-bold block text-[#121c28] text-sm mb-1">Kaynak Detayları</span>
                <span className="text-[#3d4a42] text-sm">{additive.sourceDetails}</span>
              </div>
            )}
          </div>
        </div>

        {/* Safety Card */}
        <div className="lg:col-span-2 bg-white border border-[#bccac0] p-8 rounded-xl clinical-shadow">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-[#006948]">verified</span>
            <h3 className="text-headline-md text-[#121c28]">Güvenlik Bilgisi</h3>
          </div>
          <div className="space-y-4">
            <div>
              <span className="font-bold block text-[#121c28] text-sm mb-1">ADI (Günlük Alım Limiti)</span>
              <span className="text-[#3d4a42] text-sm">{additive.adiBySafety || "Belirtilmemiş / Sınırsız"}</span>
            </div>
            <div>
              <span className="font-bold block text-[#121c28] text-sm mb-1">Mevzuat Durumu</span>
              <span className="text-[#3d4a42] text-sm">{additive.regulatoryStatus || "Durum bilgisi mevcut değil"}</span>
            </div>
          </div>
        </div>

        {/* Clinical Data Summary */}
        <div className="lg:col-span-4 bg-white border border-[#bccac0] p-8 rounded-xl clinical-shadow">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006948]">analytics</span>
              <h3 className="text-headline-md text-[#121c28]">Klinik Veri Özeti</h3>
            </div>
          </div>

          {productsLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : products && products.length > 0 ? (
            <div>
              <p className="text-[#3d4a42] mb-4">
                Bu katkı maddesi <strong className="text-[#121c28]">{products.length} üründe</strong> kullanılmaktadır.
              </p>
              <div className="flex flex-wrap gap-2">
                {products.slice(0, 5).map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <a className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#eef4ff] rounded-full text-sm hover:bg-[#006948] hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      {product.name}
                    </a>
                  </Link>
                ))}
                {products.length > 5 && (
                  <span className="inline-flex items-center px-3 py-1.5 bg-[#dfe9fa] rounded-full text-sm text-[#3d4a42]">
                    +{products.length - 5} daha
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-[#3d4a42]">Bu katkı maddesi için ürün kaydı bulunmuyor.</p>
          )}
        </div>
      </div>

      {/* References Section */}
      <section className="border-t border-[#bccac0] pt-12">
        <h2 className="text-headline-md text-[#121c28] mb-6">Bilimsel Atıflar ve Kaynakça</h2>

        {refsLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : references && references.length > 0 ? (
          <div className="space-y-4">
            {references.map((ref, index) => (
              <div key={ref.id} className="flex gap-4 text-sm text-[#3d4a42] italic border-l-4 border-[#006948] pl-4">
                <span className="flex-shrink-0 text-[#006948] font-bold">[{index + 1}]</span>
                <div>
                  <p className="text-[#121c28] not-italic font-medium">{ref.title}</p>
                  <p>{ref.authors} {ref.year && `(${ref.year})`} {ref.journal && `— ${ref.journal}`}</p>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#006948] hover:underline inline-flex items-center gap-1 mt-1 not-italic"
                    >
                      Kaynağa git
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#3d4a42]">Bu katkı maddesi için kaynak bilgisi bulunmuyor.</p>
        )}
      </section>
    </motion.div>
  );
}
