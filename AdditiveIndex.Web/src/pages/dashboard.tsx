import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useGetStatsOverview } from "@/api";
import { RiskBadge } from "@/components/risk-badge-new";
import { motion } from "framer-motion";

const POPULAR_ADDITIVES = [
  { eCode: "E120", name: "Karmine" },
  { eCode: "E951", name: "Aspartam" },
  { eCode: "E322", name: "Lesitin" },
  { eCode: "E621", name: "MSG" },
];

const HAZARDOUS_ADDITIVES = [
  { eCode: "E102", name: "Tartrazin", risk: "high" as const },
  { eCode: "E171", name: "Titanyum Dioksit", risk: "banned" as const },
  { eCode: "E133", name: "Brilliant Blue", risk: "high" as const },
  { eCode: "E211", name: "Sodyum Benzoat", risk: "high" as const },
];

export function Dashboard() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");

  const { data: stats, isLoading: statsLoading } = useGetStatsOverview();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setLocation(`/additives?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-16"
    >
      {/* Hero Search Section */}
      <section className="py-16 flex flex-col items-center text-center">
        <h1 className="text-display-lg text-[#121c28] mb-6">
          Ne Yediğinizi Keşfedin
        </h1>
        <p className="text-body-lg text-[#3d4a42] max-w-2xl mb-10">
          Gıda ürünlerini veya E-kodlarını aratarak klinik verilere dayalı güvenlik analizlerine anında ulaşın.
        </p>

        {/* Search Box */}
        <div className="w-full max-w-2xl relative group">
          <form onSubmit={handleSearch}>
            <div className="flex items-center bg-white border border-[#bccac0] p-2 rounded-xl focus-within:border-[#00855d] focus-within:ring-2 focus-within:ring-[#00855d]/20 transition-all clinical-shadow">
              <span className="material-symbols-outlined px-4 text-[#6d7a72]">search</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ürün adı veya E-kodu girin (örn: E102)..."
                className="w-full bg-transparent border-none focus:ring-0 text-base py-3 outline-none"
              />
              <button
                type="submit"
                className="bg-[#006948] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#005137] transition-colors active:scale-95"
              >
                Ara
              </button>
            </div>
          </form>
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <span className="text-sm text-[#3d4a42] flex items-center gap-1">Popüler:</span>
          {POPULAR_ADDITIVES.map((item) => (
            <button
              key={item.eCode}
              onClick={() => setLocation(`/additives?search=${item.eCode}`)}
              className="px-4 py-1.5 bg-[#dfe9fa] rounded-full text-sm font-medium hover:bg-[#006948] hover:text-white transition-colors"
            >
              {item.eCode}
            </button>
          ))}
        </div>
      </section>

      {/* Quick Look Section - Bento Style */}
      <section className="py-16 border-t border-[#bccac0]">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-headline-lg text-[#121c28]">Hızlı Bakış</h2>
            <p className="text-body-md text-[#3d4a42] mt-1">Son taranan ve popüler ürünler</p>
          </div>
          <Link href="/products">
            <span className="text-[#006948] font-medium hover:underline cursor-pointer">Tümünü Gör</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Large Card */}
          <div className="lg:col-span-8 bg-white border border-[#bccac0] rounded-xl p-6 md:p-8 clinical-shadow hover:shadow-lg transition-shadow overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="bg-[#00855d] text-white px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 whitespace-nowrap">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    GÜVENLİ
                  </span>
                  <span className="text-[#6d7a72] text-sm">Güncelleme: 2 gün önce</span>
                </div>
                <h3 className="text-headline-md text-[#121c28] mb-3">Organik Tam Tahıl Ezmesi</h3>
                <p className="text-body-md text-[#3d4a42] mb-6 leading-relaxed">
                  Sıfır yapay tatlandırıcı ve koruyucu içerir. Tamamen doğal fermantasyon süreçleri ile üretilmiştir.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Link href="/products">
                    <span className="inline-block bg-[#006948] text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer">
                      Detaylar
                    </span>
                  </Link>
                  <button className="border border-[#6d7a72] text-[#3d4a42] px-6 py-2.5 rounded-lg font-medium hover:bg-[#d9e3f4] transition-colors">
                    Favorilere Ekle
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 min-h-[200px] rounded-xl overflow-hidden bg-gradient-to-br from-[#eef4ff] to-[#dfe9fa] flex items-center justify-center">
                <span className="material-symbols-outlined text-8xl text-[#006948]/20">breakfast_dining</span>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
            {statsLoading ? (
              <>
                <div className="bg-white border border-[#bccac0] rounded-xl p-6 flex-1 min-h-[120px] animate-pulse" />
                <div className="bg-white border border-[#bccac0] rounded-xl p-6 flex-1 min-h-[120px] animate-pulse" />
              </>
            ) : (
              <>
                <Link href="/additives?riskLevel=safe">
                  <div className="bg-white border border-[#bccac0] rounded-xl p-6 clinical-shadow hover:shadow-md transition-shadow cursor-pointer h-full">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-sm text-[#3d4a42] block mb-1">Katkı Maddeleri</span>
                        <h4 className="text-headline-md text-[#121c28]">{stats?.totalAdditives || 31}</h4>
                      </div>
                      <span className="bg-[#00855d] text-white w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">check</span>
                      </span>
                    </div>
                    <p className="text-body-md text-[#3d4a42]">E-kodu kayıtlı</p>
                  </div>
                </Link>

                <Link href="/products">
                  <div className="bg-white border border-[#bccac0] rounded-xl p-6 clinical-shadow hover:shadow-md transition-shadow cursor-pointer h-full">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-sm text-[#3d4a42] block mb-1">Ürünler</span>
                        <h4 className="text-headline-md text-[#121c28]">{stats?.totalProducts || 29}</h4>
                      </div>
                      <span className="bg-[#fe932c] text-[#663500] w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">warning</span>
                      </span>
                    </div>
                    <p className="text-body-md text-[#3d4a42]">Türkiye piyasasından</p>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Hazardous Additives Section */}
      <section className="py-16 border-t border-[#bccac0]">
        <div className="bg-[#ffdad6]/30 rounded-2xl p-10 border border-[#e02928]/20">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <div className="inline-flex items-center gap-2 text-[#bb0112] font-bold text-sm mb-4">
                <span className="material-symbols-outlined">report</span>
                AYIN RİSKLİ MADDELERİ
              </div>
              <h2 className="text-headline-lg text-[#121c28] mb-4">Dikkat Etmeniz Gerekenler</h2>
              <p className="text-body-md text-[#3d4a42] leading-relaxed">
                Bu ayki güncellemelerde, EU standartlarına göre kısıtlanan veya yüksek risk grubuna alınan gıda katkı maddeleri listelenmiştir.
              </p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {HAZARDOUS_ADDITIVES.map((additive) => (
                <Link key={additive.eCode} href={`/additives?search=${additive.eCode}`}>
                  <a className="bg-white border border-[#bccac0] p-4 rounded-xl flex items-center justify-between hover:border-[#bb0112] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#e02928] flex items-center justify-center text-white font-bold text-sm">
                        {additive.eCode}
                      </div>
                      <div>
                        <h5 className="font-medium text-[#121c28]">{additive.name}</h5>
                        <RiskBadge level={additive.risk} size="sm" />
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#6d7a72] group-hover:text-[#bb0112]">chevron_right</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
