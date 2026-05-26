import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";

export function ApiGuidePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const codeExamples = {
    getAdditives: `fetch('/api/additives?page=1&limit=20')
  .then(res => res.json())
  .then(data => console.log(data));`,
    getAdditiveDetail: `fetch('/api/additives/1')
  .then(res => res.json())
  .then(data => console.log(data));`,
    searchProducts: `fetch('/api/products?search=coca&page=1')
  .then(res => res.json())
  .then(data => console.log(data));`,
    getStats: `fetch('/api/stats/overview')
  .then(res => res.json())
  .then(data => console.log(data));`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-8 pb-16 max-w-5xl mx-auto"
    >
      {/* Breadcrumb */}
      <nav className="py-4 flex items-center gap-2 text-[#6d7a72] text-sm mb-6">
        <Link href="/">
          <span className="hover:text-[#006948] cursor-pointer">Anasayfa</span>
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link href="/blog">
          <span className="hover:text-[#006948] cursor-pointer">Blog</span>
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-[#121c28] font-semibold">API Rehberi</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-4xl text-[#006948]">api</span>
          <h1 className="text-headline-lg text-[#121c28]">Geliştirici API Rehberi</h1>
        </div>
        <p className="text-body-lg text-[#3d4a42] max-w-3xl">
          PureFood Trace API'sini kullanarak gıda katkı maddeleri ve ürünler hakkında 
          kapsamlı verilere erişin. Bu rehber başlangıçtan ileri kullanıma kadar 
          tüm bilgileri içerir.
        </p>
      </div>

      {/* Quick Start */}
      <section className="mb-12 bg-[#eef4ff] rounded-xl p-6 border border-[#bccac0]">
        <h2 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006948]">rocket_launch</span>
          Hızlı Başlangıç
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white rounded-lg p-4 border border-[#bccac0]">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#006948] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <h4 className="font-semibold text-[#121c28]">Base URL</h4>
            </div>
            <code className="text-sm bg-[#f8f9ff] px-2 py-1 rounded text-[#006948] block">
              http://localhost:5004/api
            </code>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-[#bccac0]">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#006948] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <h4 className="font-semibold text-[#121c28]">Format</h4>
            </div>
            <p className="text-sm text-[#3d4a42]">
              Tüm yanıtlar JSON formatındadır. Content-Type: application/json
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-[#bccac0]">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#006948] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <h4 className="font-semibold text-[#121c28]">CORS</h4>
            </div>
            <p className="text-sm text-[#3d4a42]">
              API CORS desteklidir. Frontend uygulamalarından doğrudan erişim mümkündür.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-[#bccac0] pb-4">
        {[
          { id: "overview", label: "Genel Bakış", icon: "overview" },
          { id: "additives", label: "Katkı Maddeleri", icon: "science" },
          { id: "products", label: "Ürünler", icon: "shopping_basket" },
          { id: "stats", label: "İstatistikler", icon: "monitoring" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[#006948] text-white"
                : "bg-white text-[#3d4a42] hover:bg-[#d9e3f4] border border-[#bccac0]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === "overview" && (
        <section className="space-y-8">
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4">API Endpoint'leri</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#eef4ff]">
                  <tr>
                    <th className="px-4 py-3 text-[#121c28] font-semibold rounded-tl-lg">Metod</th>
                    <th className="px-4 py-3 text-[#121c28] font-semibold">Endpoint</th>
                    <th className="px-4 py-3 text-[#121c28] font-semibold rounded-tr-lg">Açıklama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bccac0]">
                  <tr>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/api/additives</td>
                    <td className="px-4 py-3 text-[#3d4a42]">Katkı maddeleri listesi (sayfalama + filtreleme)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/api/additives/{'{id}'}</td>
                    <td className="px-4 py-3 text-[#3d4a42]">Katkı maddesi detayı</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/api/products</td>
                    <td className="px-4 py-3 text-[#3d4a42]">Ürünler listesi (sayfalama + arama)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/api/products/{'{id}'}</td>
                    <td className="px-4 py-3 text-[#3d4a42]">Ürün detayı (katkı maddeleri ile)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/api/categories</td>
                    <td className="px-4 py-3 text-[#3d4a42]">Kategoriler listesi</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/api/stats/overview</td>
                    <td className="px-4 py-3 text-[#3d4a42]">Genel istatistikler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4">Yanıt Formatı</h3>
            <p className="text-body-md text-[#3d4a42] mb-4">
              Tüm liste endpoint'leri standart bir yanıt formatı kullanır:
            </p>
            <pre className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`{
  "data": [
    { ... },
    { ... }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}`}
            </pre>
          </div>
        </section>
      )}

      {activeTab === "additives" && (
        <section className="space-y-8">
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006948]">science</span>
              Katkı Maddeleri API
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#121c28] mb-2">Listeleme (GET /api/additives)</h4>
                <p className="text-sm text-[#3d4a42] mb-3">
                  Tüm katkı maddelerini sayfalı olarak listeler. Filtreleme ve sıralama desteklenir.
                </p>
                
                <div className="bg-[#f8f9ff] rounded-lg p-4 border border-[#bccac0] mb-3">
                  <p className="text-xs text-[#6d7a72] mb-2">Query Parameters:</p>
                  <ul className="text-sm text-[#3d4a42] space-y-1 font-mono">
                    <li><span className="text-[#006948]">page</span> (number) - Sayfa numarası (varsayılan: 1)</li>
                    <li><span className="text-[#006948]">limit</span> (number) - Sayfa başına öğe (varsayılan: 20)</li>
                    <li><span className="text-[#006948]">search</span> (string) - İsim veya E-kodu ara</li>
                    <li><span className="text-[#006948]">riskLevel</span> (enum) - safe, low, moderate, high, banned</li>
                    <li><span className="text-[#006948]">categoryId</span> (number) - Kategori ID'sine göre filtrele</li>
                  </ul>
                </div>
                
                <div className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto">
                  <p className="text-xs text-[#6d7a72] mb-2">JavaScript Örneği:</p>
                  <pre className="text-sm font-mono">{codeExamples.getAdditives}</pre>
                </div>
              </div>

              <div className="border-t border-[#bccac0] pt-6">
                <h4 className="font-semibold text-[#121c28] mb-2">Detay (GET /api/additives/{'{id}'})</h4>
                <p className="text-sm text-[#3d4a42] mb-3">
                  Belirli bir katkı maddesinin detaylarını getirir. Kategori ve bilimsel referanslar dahildir.
                </p>
                
                <div className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono">{codeExamples.getAdditiveDetail}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#eef4ff] rounded-xl p-6 border border-[#bccac0]">
            <h4 className="font-semibold text-[#121c28] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fe932c]">lightbulb</span>
              İpucu: E-Kodu Arama
            </h4>
            <p className="text-sm text-[#3d4a42]">
              E-kod ile arama yapmak için <code className="bg-white px-2 py-1 rounded">search</code> parametresini 
              kullanabilirsiniz. Örneğin: <code className="bg-white px-2 py-1 rounded">?search=E102</code>
            </p>
          </div>
        </section>
      )}

      {activeTab === "products" && (
        <section className="space-y-8">
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006948]">shopping_basket</span>
              Ürünler API
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#121c28] mb-2">Listeleme (GET /api/products)</h4>
                <p className="text-sm text-[#3d4a42] mb-3">
                  Ürünleri arama ve filtreleme ile listeler.
                </p>
                
                <div className="bg-[#f8f9ff] rounded-lg p-4 border border-[#bccac0] mb-3">
                  <p className="text-xs text-[#6d7a72] mb-2">Query Parameters:</p>
                  <ul className="text-sm text-[#3d4a42] space-y-1 font-mono">
                    <li><span className="text-[#006948]">search</span> (string) - Ürün adı veya marka ara</li>
                    <li><span className="text-[#006948]">productCategory</span> (string) - Kategori filtresi</li>
                    <li><span className="text-[#006948]">page</span>, <span className="text-[#006948]">limit</span> - Sayfalama</li>
                  </ul>
                </div>
                
                <div className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono">{codeExamples.searchProducts}</pre>
                </div>
              </div>

              <div className="border-t border-[#bccac0] pt-6">
                <h4 className="font-semibold text-[#121c28] mb-2">Ürün Detayı (GET /api/products/{'{id}'})</h4>
                <p className="text-sm text-[#3d4a42] mb-3">
                  Ürün bilgileri ve içerdiği katkı maddelerinin listesi.
                </p>
                
                <div className="bg-[#f8f9ff] rounded-lg p-4 border border-[#bccac0]">
                  <p className="text-xs text-[#6d7a72] mb-2">Yanıt içeriği:</p>
                  <ul className="text-sm text-[#3d4a42] space-y-1 font-mono">
                    <li>id, name, brand, productCategory, barcode</li>
                    <li>additives[] - İçerdiği katkı maddeleri</li>
                    <li>Her katkı: id, eCode, name, riskLevel, function</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "stats" && (
        <section className="space-y-8">
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006948]">monitoring</span>
              İstatistikler API
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#121c28] mb-2">Genel Bakış (GET /api/stats/overview)</h4>
                <p className="text-sm text-[#3d4a42] mb-3">
                  Veritabanı genelinde istatistikler: toplam katkı maddesi, ürün, kategori ve risk dağılımı.
                </p>
                
                <div className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto mb-3">
                  <pre className="text-sm font-mono">{codeExamples.getStats}</pre>
                </div>
                
                <div className="bg-[#f8f9ff] rounded-lg p-4 border border-[#bccac0]">
                  <p className="text-xs text-[#6d7a72] mb-2">Yanıt formatı:</p>
                  <pre className="text-sm font-mono text-[#3d4a42]">{`{
  "totalAdditives": 150,
  "totalCategories": 7,
  "totalReferences": 45,
  "totalProducts": 29,
  "byRiskLevel": {
    "safe": 80,
    "low": 40,
    "moderate": 20,
    "high": 8,
    "banned": 2
  },
  "lastUpdated": "2026-05-26T12:00:00Z"
}`}</pre>
                </div>
              </div>

              <div className="border-t border-[#bccac0] pt-6">
                <h4 className="font-semibold text-[#121c28] mb-2">Risk Dağılımı (GET /api/stats/risk-distribution)</h4>
                <p className="text-sm text-[#3d4a42] mb-3">
                  Risk seviyelerine göre katkı maddesi dağılımı ve yüzdeleri.
                </p>
              </div>

              <div className="border-t border-[#bccac0] pt-6">
                <h4 className="font-semibold text-[#121c28] mb-2">Kategori Dağılımı (GET /api/stats/category-distribution)</h4>
                <p className="text-sm text-[#3d4a42] mb-3">
                  Her kategorideki katkı maddesi sayısı.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Health Check */}
      <section className="mt-12 bg-white rounded-xl p-6 border border-[#bccac0]">
        <h3 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006948]">health_and_safety</span>
          Sağlık Kontrolü
        </h3>
        <p className="text-body-md text-[#3d4a42] mb-4">
          API'nin çalışır durumda olup olmadığını kontrol etmek için:
        </p>
        <div className="bg-[#f8f9ff] rounded-lg p-4 border border-[#bccac0] font-mono text-sm text-[#006948]">
          GET /api/healthz
        </div>
        <p className="text-sm text-[#3d4a42] mt-3">
          Yanıt: <code className="bg-[#eef4ff] px-2 py-1 rounded">{'{ "status": "healthy" }'}</code>
        </p>
      </section>

      {/* Footer Note */}
      <div className="text-center text-sm text-[#6d7a72] pt-8 border-t border-[#bccac0] mt-12">
        <p>Bu API dokümantasyonu PureFood Trace için özel olarak hazırlanmıştır.</p>
        <p className="mt-2">
          Sorularınız için: <a href="mailto:dev@purefoodtrace.com" className="text-[#006948] hover:underline">dev@purefoodtrace.com</a>
        </p>
      </div>
    </motion.div>
  );
}
