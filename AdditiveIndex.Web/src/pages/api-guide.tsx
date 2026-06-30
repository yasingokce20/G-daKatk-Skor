import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";

export function ApiGuidePage() {
  const [activeTab, setActiveTab] = useState("start");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-8 pb-16 max-w-5xl mx-auto px-4"
    >
      {/* Breadcrumb */}
      <nav className="py-4 flex items-center gap-2 text-[#6d7a72] text-sm mb-6">
        <Link href="/">
          <span className="hover:text-[#006948] cursor-pointer">Anasayfa</span>
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
          GıdaKatkıRadarı API'si, gıda katkı maddeleri ve ürünler hakkında kapsamlı verilere erişmenizi sağlayan
          açık bir RESTful servistir. Bu rehber, hiç API kullanmamış bir geliştirici için bile anlaşılır olacak
          şekilde adım adım hazırlanmıştır.
        </p>
      </div>

      {/* What is this API */}
      <section className="mb-12 bg-[#eef4ff] rounded-xl p-6 border border-[#bccac0]">
        <h2 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006948]">help</span>
          Bu API Ne İşe Yarar?
        </h2>
        <div className="space-y-3 text-[#3d4a42]">
          <p>GıdaKatkıRadarı API'si size şu imkanları sunar:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li><strong>Katkı maddesi sorgulama:</strong> E-kodu veya isimle arama yaparak katkı maddelerinin risk seviyelerini, açıklamalarını ve kategorilerini öğrenebilirsiniz.</li>
            <li><strong>Ürün sorgulama:</strong> Ürün adı veya barkod ile arama yaparak bir üründe hangi katkı maddelerinin bulunduğunu görebilirsiniz.</li>
            <li><strong>İstatistik verisi:</strong> Sistemdeki toplam katkı maddesi, ürün sayısı ve risk dağılımı gibi özet verilere erişebilirsiniz.</li>
            <li><strong>Kategori listesi:</strong> Koruyucular, renklendiriciler, tatlandırıcılar gibi katkı maddesi sınıflarını listeleyebilirsiniz.</li>
          </ul>
          <p className="mt-3 text-sm bg-white p-3 rounded-lg border border-[#bccac0]">
            <strong>Kullanım Alanları:</strong> Mobil uygulamalar, barkod tarayıcı uygulamaları, diyet ve sağlık uygulamaları, 
            gıda analiz araçları, eğitim projeleri ve araştırma çalışmaları.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-[#bccac0] pb-4">
        {[
          { id: "start", label: "Başlarken", icon: "rocket_launch" },
          { id: "endpoints", label: "Endpoint'ler", icon: "list" },
          { id: "examples", label: "Kod Örnekleri", icon: "code" },
          { id: "errors", label: "Hatalar & Limitler", icon: "error" },
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

      {/* TAB: Başlarken */}
      {activeTab === "start" && (
        <section className="space-y-8">
          {/* Step by step */}
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-6">Adım Adım Bağlanma Rehberi</h3>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="bg-[#006948] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-[#121c28] mb-2">Base URL'i Belirleyin</h4>
                  <p className="text-sm text-[#3d4a42] mb-2">
                    Tüm API istekleriniz bu temel URL üzerinden yapılır. Geliştirme ortamında:
                  </p>
                  <code className="block bg-[#121c28] text-[#85f8c4] px-4 py-3 rounded-lg text-sm font-mono">
                    http://localhost:5004/api
                  </code>
                  <p className="text-xs text-[#6d7a72] mt-2">
                    Üretim ortamında bu URL değişecektir. Proje yöneticisinden güncel URL'yi alın.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="bg-[#006948] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-[#121c28] mb-2">İlk İsteğinizi Gönderin</h4>
                  <p className="text-sm text-[#3d4a42] mb-2">
                    Tarayıcınızın adres çubuğuna aşağıdaki URL'yi yazın veya Postman/curl kullanın:
                  </p>
                  <code className="block bg-[#121c28] text-[#85f8c4] px-4 py-3 rounded-lg text-sm font-mono">
                    GET http://localhost:5004/api/additives?page=1&limit=5
                  </code>
                  <p className="text-xs text-[#6d7a72] mt-2">
                    Bu istek size ilk 5 katkı maddesini JSON formatında döndürecektir.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="bg-[#006948] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-[#121c28] mb-2">Yanıtı Anlayın</h4>
                  <p className="text-sm text-[#3d4a42] mb-2">
                    API size JSON formatında yanıt döner. Her liste isteğinde şu yapı gelir:
                  </p>
                  <pre className="bg-[#121c28] text-[#f8f9ff] px-4 py-3 rounded-lg text-sm font-mono overflow-x-auto">
{`{
  "data": [
    {
      "id": 1,
      "eCode": "E100",
      "name": "Kurkumin",
      "riskLevel": "safe",
      "categoryId": 2,
      "categoryName": "Renklendiriciler"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 150,
    "totalPages": 30
  }
}`}
                  </pre>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="bg-[#006948] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-[#121c28] mb-2">Uygulamanıza Entegre Edin</h4>
                  <p className="text-sm text-[#3d4a42] mb-2">
                    API çağrılarını kendi uygulamanıza ekleyin. Herhangi bir programlama dilinden HTTP isteği yapabilirsiniz.
                    Kimlik doğrulama gerektiren endpointler için JWT token alıp Authorization header'ına eklemeniz yeterlidir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4">Teknik Gereksinimler</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-[#f8f9ff] rounded-lg p-4 border border-[#bccac0]">
                <h4 className="font-semibold text-[#121c28] mb-2">İstek Formatı</h4>
                <ul className="text-sm text-[#3d4a42] space-y-1">
                  <li>• Protokol: HTTP/HTTPS</li>
                  <li>• Content-Type: application/json</li>
                  <li>• Metod: GET (okuma), POST (yazma)</li>
                  <li>• Karakter kodlaması: UTF-8</li>
                </ul>
              </div>
              <div className="bg-[#f8f9ff] rounded-lg p-4 border border-[#bccac0]">
                <h4 className="font-semibold text-[#121c28] mb-2">Kimlik Doğrulama</h4>
                <ul className="text-sm text-[#3d4a42] space-y-1">
                  <li>• Açık endpointler: Token gerekmez</li>
                  <li>• Korumalı endpointler: JWT Bearer token</li>
                  <li>• Token formatı: Bearer {"<token>"}</li>
                  <li>• Header: Authorization</li>
                </ul>
              </div>
              <div className="bg-[#f8f9ff] rounded-lg p-4 border border-[#bccac0]">
                <h4 className="font-semibold text-[#121c28] mb-2">CORS Desteği</h4>
                <ul className="text-sm text-[#3d4a42] space-y-1">
                  <li>• Tüm originler kabul edilir (geliştirme)</li>
                  <li>• Preflight (OPTIONS) desteklenir</li>
                  <li>• Credentials: include ile kullanılabilir</li>
                </ul>
              </div>
              <div className="bg-[#f8f9ff] rounded-lg p-4 border border-[#bccac0]">
                <h4 className="font-semibold text-[#121c28] mb-2">Araçlar</h4>
                <ul className="text-sm text-[#3d4a42] space-y-1">
                  <li>• Postman, Insomnia veya curl</li>
                  <li>• Swagger UI: <code className="text-[#006948]">/swagger</code></li>
                  <li>• Tarayıcı (GET istekleri için)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: Endpoints */}
      {activeTab === "endpoints" && (
        <section className="space-y-8">
          {/* Full Endpoint Table */}
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4">Tüm API Endpoint'leri</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#eef4ff]">
                  <tr>
                    <th className="px-3 py-3 text-[#121c28] font-semibold">Metod</th>
                    <th className="px-3 py-3 text-[#121c28] font-semibold">Endpoint</th>
                    <th className="px-3 py-3 text-[#121c28] font-semibold">Açıklama</th>
                    <th className="px-3 py-3 text-[#121c28] font-semibold">Yetki</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bccac0]">
                  <tr>
                    <td className="px-3 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">GET</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/additives</td>
                    <td className="px-3 py-3 text-[#3d4a42]">Katkı maddesi listesi (sayfalama, filtreleme, arama)</td>
                    <td className="px-3 py-3"><span className="text-green-700 text-xs">Açık</span></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">GET</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/additives/{'{id}'}</td>
                    <td className="px-3 py-3 text-[#3d4a42]">Katkı maddesi detay bilgisi (kategori + referanslar dahil)</td>
                    <td className="px-3 py-3"><span className="text-green-700 text-xs">Açık</span></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">GET</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/products</td>
                    <td className="px-3 py-3 text-[#3d4a42]">Ürün listesi (sayfalama + arama + kategori filtre)</td>
                    <td className="px-3 py-3"><span className="text-green-700 text-xs">Açık</span></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">GET</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/products/{'{id}'}</td>
                    <td className="px-3 py-3 text-[#3d4a42]">Ürün detayı (içerdiği katkı maddeleri ile birlikte)</td>
                    <td className="px-3 py-3"><span className="text-green-700 text-xs">Açık</span></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">GET</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/categories</td>
                    <td className="px-3 py-3 text-[#3d4a42]">Katkı maddesi kategorileri listesi</td>
                    <td className="px-3 py-3"><span className="text-green-700 text-xs">Açık</span></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">GET</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/stats/overview</td>
                    <td className="px-3 py-3 text-[#3d4a42]">Genel istatistikler (toplam, risk dağılımı)</td>
                    <td className="px-3 py-3"><span className="text-green-700 text-xs">Açık</span></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">POST</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/auth/register</td>
                    <td className="px-3 py-3 text-[#3d4a42]">Yeni kullanıcı kaydı oluştur</td>
                    <td className="px-3 py-3"><span className="text-green-700 text-xs">Açık</span></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">POST</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/auth/login</td>
                    <td className="px-3 py-3 text-[#3d4a42]">Giriş yap ve JWT token al</td>
                    <td className="px-3 py-3"><span className="text-green-700 text-xs">Açık</span></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">POST</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/auth/logout</td>
                    <td className="px-3 py-3 text-[#3d4a42]">Oturumu sonlandır</td>
                    <td className="px-3 py-3"><span className="text-yellow-700 text-xs">Token</span></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">GET</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/auth/me</td>
                    <td className="px-3 py-3 text-[#3d4a42]">Oturum açmış kullanıcı bilgisi</td>
                    <td className="px-3 py-3"><span className="text-yellow-700 text-xs">Token</span></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">GET</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/references</td>
                    <td className="px-3 py-3 text-[#3d4a42]">Bilimsel ve resmi kaynaklar listesi</td>
                    <td className="px-3 py-3"><span className="text-green-700 text-xs">Açık</span></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">GET</span></td>
                    <td className="px-3 py-3 font-mono text-xs">/api/healthz</td>
                    <td className="px-3 py-3 text-[#3d4a42]">API sağlık kontrolü</td>
                    <td className="px-3 py-3"><span className="text-green-700 text-xs">Açık</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Query Parameters Detail */}
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4">Query Parametreleri Detay</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#121c28] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006948] text-[20px]">science</span>
                  /api/additives Parametreleri
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-[#bccac0] rounded-lg">
                    <thead className="bg-[#f8f9ff]">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">Parametre</th>
                        <th className="px-3 py-2 text-left font-medium">Tip</th>
                        <th className="px-3 py-2 text-left font-medium">Varsayılan</th>
                        <th className="px-3 py-2 text-left font-medium">Açıklama</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#bccac0]">
                      <tr><td className="px-3 py-2 font-mono text-[#006948]">page</td><td className="px-3 py-2">number</td><td className="px-3 py-2">1</td><td className="px-3 py-2 text-[#3d4a42]">Sayfa numarası</td></tr>
                      <tr><td className="px-3 py-2 font-mono text-[#006948]">limit</td><td className="px-3 py-2">number</td><td className="px-3 py-2">20</td><td className="px-3 py-2 text-[#3d4a42]">Sayfa başına kayıt (maks: 100)</td></tr>
                      <tr><td className="px-3 py-2 font-mono text-[#006948]">search</td><td className="px-3 py-2">string</td><td className="px-3 py-2">—</td><td className="px-3 py-2 text-[#3d4a42]">İsim veya E-kodu ile arama</td></tr>
                      <tr><td className="px-3 py-2 font-mono text-[#006948]">riskLevel</td><td className="px-3 py-2">enum</td><td className="px-3 py-2">—</td><td className="px-3 py-2 text-[#3d4a42]">safe | low | moderate | high | banned</td></tr>
                      <tr><td className="px-3 py-2 font-mono text-[#006948]">categoryId</td><td className="px-3 py-2">number</td><td className="px-3 py-2">—</td><td className="px-3 py-2 text-[#3d4a42]">Kategori ID filtresi</td></tr>
                      <tr><td className="px-3 py-2 font-mono text-[#006948]">sortBy</td><td className="px-3 py-2">string</td><td className="px-3 py-2">name</td><td className="px-3 py-2 text-[#3d4a42]">Sıralama alanı (name, eCode, riskLevel)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t border-[#bccac0] pt-6">
                <h4 className="font-semibold text-[#121c28] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006948] text-[20px]">shopping_basket</span>
                  /api/products Parametreleri
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-[#bccac0] rounded-lg">
                    <thead className="bg-[#f8f9ff]">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">Parametre</th>
                        <th className="px-3 py-2 text-left font-medium">Tip</th>
                        <th className="px-3 py-2 text-left font-medium">Varsayılan</th>
                        <th className="px-3 py-2 text-left font-medium">Açıklama</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#bccac0]">
                      <tr><td className="px-3 py-2 font-mono text-[#006948]">search</td><td className="px-3 py-2">string</td><td className="px-3 py-2">—</td><td className="px-3 py-2 text-[#3d4a42]">Ürün adı veya marka ile arama</td></tr>
                      <tr><td className="px-3 py-2 font-mono text-[#006948]">productCategory</td><td className="px-3 py-2">string</td><td className="px-3 py-2">—</td><td className="px-3 py-2 text-[#3d4a42]">Ürün kategorisi filtresi</td></tr>
                      <tr><td className="px-3 py-2 font-mono text-[#006948]">page</td><td className="px-3 py-2">number</td><td className="px-3 py-2">1</td><td className="px-3 py-2 text-[#3d4a42]">Sayfa numarası</td></tr>
                      <tr><td className="px-3 py-2 font-mono text-[#006948]">limit</td><td className="px-3 py-2">number</td><td className="px-3 py-2">20</td><td className="px-3 py-2 text-[#3d4a42]">Sayfa başına kayıt</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: Code Examples */}
      {activeTab === "examples" && (
        <section className="space-y-8">
          {/* JavaScript/Fetch */}
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006948]">javascript</span>
              JavaScript (fetch)
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#121c28] mb-2">Katkı Maddesi Listesi Al</h4>
                <pre className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`// Tüm katkı maddelerini listele (ilk sayfa, 10 kayıt)
const response = await fetch('http://localhost:5004/api/additives?page=1&limit=10');
const result = await response.json();

console.log(result.data);       // Katkı maddeleri dizisi
console.log(result.pagination); // { page, limit, total, totalPages }`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-[#121c28] mb-2">E-Kodu ile Arama</h4>
                <pre className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`// E102 (Tartrazin) hakkında bilgi al
const response = await fetch('http://localhost:5004/api/additives?search=E102');
const result = await response.json();

// Sonuç:
// { eCode: "E102", name: "Tartrazin", riskLevel: "high", ... }`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-[#121c28] mb-2">Ürün Sorgulama</h4>
                <pre className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`// Ürün adı ile arama
const response = await fetch('http://localhost:5004/api/products?search=cola');
const result = await response.json();

// Her ürünün detayında katkı maddeleri de gelir
const product = result.data[0];
console.log(product.name, product.brand);`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-[#121c28] mb-2">Kullanıcı Girişi ve Token Kullanımı</h4>
                <pre className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`// 1. Giriş yaparak token al
const loginRes = await fetch('http://localhost:5004/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', password: 'sifre123' })
});
const { token } = await loginRes.json();

// 2. Token ile korumalı endpoint'e istek at
const meRes = await fetch('http://localhost:5004/api/auth/me', {
  headers: { 'Authorization': \`Bearer \${token}\` }
});
const user = await meRes.json();
console.log(user.username, user.email);`}
                </pre>
              </div>
            </div>
          </div>

          {/* cURL */}
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006948]">terminal</span>
              cURL Örnekleri
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#3d4a42] mb-2">Katkı maddeleri listesi:</p>
                <pre className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`curl -X GET "http://localhost:5004/api/additives?page=1&limit=5&riskLevel=high"`}
                </pre>
              </div>
              <div>
                <p className="text-sm text-[#3d4a42] mb-2">Ürün detayı:</p>
                <pre className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`curl -X GET "http://localhost:5004/api/products/1"`}
                </pre>
              </div>
              <div>
                <p className="text-sm text-[#3d4a42] mb-2">Kayıt olma:</p>
                <pre className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`curl -X POST "http://localhost:5004/api/auth/register" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@ornek.com","username":"testuser","password":"Sifre123!"}'`}
                </pre>
              </div>
            </div>
          </div>

          {/* Python */}
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006948]">code</span>
              Python (requests)
            </h3>
            <pre className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`import requests

BASE_URL = "http://localhost:5004/api"

# Katkı maddelerini listele
response = requests.get(f"{BASE_URL}/additives", params={
    "page": 1,
    "limit": 10,
    "riskLevel": "high"
})
data = response.json()

for additive in data["data"]:
    print(f"{additive['eCode']} - {additive['name']} ({additive['riskLevel']})")

# İstatistikleri al
stats = requests.get(f"{BASE_URL}/stats/overview").json()
print(f"Toplam katkı maddesi: {stats['totalAdditives']}")
print(f"Toplam ürün: {stats['totalProducts']}")`}
            </pre>
          </div>
        </section>
      )}

      {/* TAB: Errors & Limits */}
      {activeTab === "errors" && (
        <section className="space-y-8">
          {/* Rate Limiting */}
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fe932c]">speed</span>
              Hız Sınırlaması (Rate Limiting)
            </h3>
            <div className="space-y-4">
              <p className="text-[#3d4a42]">
                API'nin aşırı kullanımını önlemek ve tüm kullanıcılara adil hizmet sağlamak için 
                istek sınırlamaları uygulanmaktadır:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-[#fff8f0] rounded-lg p-4 border border-[#fe932c]/30">
                  <h4 className="font-semibold text-[#904d00] mb-2">Anonim Kullanıcılar</h4>
                  <ul className="text-sm text-[#3d4a42] space-y-1">
                    <li>• <strong>60 istek / dakika</strong> (IP başına)</li>
                    <li>• <strong>1000 istek / saat</strong></li>
                    <li>• Limit aşımında: HTTP 429 yanıtı</li>
                  </ul>
                </div>
                <div className="bg-[#f5fff7] rounded-lg p-4 border border-[#006948]/30">
                  <h4 className="font-semibold text-[#006948] mb-2">Kayıtlı Kullanıcılar</h4>
                  <ul className="text-sm text-[#3d4a42] space-y-1">
                    <li>• <strong>120 istek / dakika</strong> (token başına)</li>
                    <li>• <strong>5000 istek / saat</strong></li>
                    <li>• Limit aşımında: HTTP 429 yanıtı</li>
                  </ul>
                </div>
              </div>
              <div className="bg-[#f8f9ff] rounded-lg p-4 border border-[#bccac0]">
                <p className="text-sm text-[#3d4a42]">
                  <strong>İpucu:</strong> Limit aşımında <code className="bg-white px-1 rounded">Retry-After</code> header'ını 
                  kontrol edin. Bu header, yeniden istek atabilmek için kaç saniye beklemeniz gerektiğini belirtir.
                </p>
              </div>
            </div>
          </div>

          {/* HTTP Error Codes */}
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#e02928]">error</span>
              HTTP Durum Kodları ve Hata Yanıtları
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#eef4ff]">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Kod</th>
                    <th className="px-3 py-2 text-left font-medium">Durum</th>
                    <th className="px-3 py-2 text-left font-medium">Açıklama</th>
                    <th className="px-3 py-2 text-left font-medium">Ne Yapmalısınız?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bccac0]">
                  <tr>
                    <td className="px-3 py-2"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-bold">200</span></td>
                    <td className="px-3 py-2 font-medium text-green-700">OK</td>
                    <td className="px-3 py-2 text-[#3d4a42]">İstek başarılı</td>
                    <td className="px-3 py-2 text-[#3d4a42]">Yanıtı işleyin</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2"><span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-bold">400</span></td>
                    <td className="px-3 py-2 font-medium text-yellow-700">Bad Request</td>
                    <td className="px-3 py-2 text-[#3d4a42]">Geçersiz parametre veya eksik alan</td>
                    <td className="px-3 py-2 text-[#3d4a42]">İstek parametrelerini kontrol edin</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2"><span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs font-bold">401</span></td>
                    <td className="px-3 py-2 font-medium text-orange-700">Unauthorized</td>
                    <td className="px-3 py-2 text-[#3d4a42]">Token eksik veya geçersiz</td>
                    <td className="px-3 py-2 text-[#3d4a42]">Giriş yapıp yeni token alın</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2"><span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-bold">404</span></td>
                    <td className="px-3 py-2 font-medium text-red-700">Not Found</td>
                    <td className="px-3 py-2 text-[#3d4a42]">Kayıt bulunamadı</td>
                    <td className="px-3 py-2 text-[#3d4a42]">ID veya endpoint URL'ini kontrol edin</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2"><span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-bold">429</span></td>
                    <td className="px-3 py-2 font-medium text-red-700">Too Many Requests</td>
                    <td className="px-3 py-2 text-[#3d4a42]">Hız limiti aşıldı</td>
                    <td className="px-3 py-2 text-[#3d4a42]">Retry-After header'ına göre bekleyin</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2"><span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-bold">500</span></td>
                    <td className="px-3 py-2 font-medium text-red-700">Server Error</td>
                    <td className="px-3 py-2 text-[#3d4a42]">Sunucu tarafında beklenmeyen hata</td>
                    <td className="px-3 py-2 text-[#3d4a42]">Birkaç saniye sonra tekrar deneyin</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-[#121c28] mb-2">Hata Yanıt Formatı</h4>
              <pre className="bg-[#121c28] text-[#f8f9ff] p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`{
  "error": "Validation failed",
  "message": "riskLevel parametresi geçersiz. Geçerli değerler: safe, low, moderate, high, banned",
  "statusCode": 400
}`}
              </pre>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-xl p-6 border border-[#bccac0]">
            <h3 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006948]">tips_and_updates</span>
              En İyi Uygulamalar
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006948] mt-0.5">check_circle</span>
                <div>
                  <h4 className="font-semibold text-[#121c28]">Sayfalama kullanın</h4>
                  <p className="text-sm text-[#3d4a42]">Tüm kayıtları tek seferde almak yerine <code className="bg-[#eef4ff] px-1 rounded">page</code> ve <code className="bg-[#eef4ff] px-1 rounded">limit</code> parametreleri ile sayfa sayfa alın. Maksimum limit 100'dür.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006948] mt-0.5">check_circle</span>
                <div>
                  <h4 className="font-semibold text-[#121c28]">Önbellek (Cache) yapın</h4>
                  <p className="text-sm text-[#3d4a42]">Katkı maddesi verileri sık değişmez. İstemci tarafında 5-15 dakikalık cache uygulamanız hız sınırı sorunlarını azaltır.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006948] mt-0.5">check_circle</span>
                <div>
                  <h4 className="font-semibold text-[#121c28]">Hata yönetimi ekleyin</h4>
                  <p className="text-sm text-[#3d4a42]">Her API çağrısında HTTP durum kodunu kontrol edin. 4xx ve 5xx yanıtlarını kullanıcıya anlamlı mesajlarla gösterin.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006948] mt-0.5">check_circle</span>
                <div>
                  <h4 className="font-semibold text-[#121c28]">Token'ı güvenli saklayın</h4>
                  <p className="text-sm text-[#3d4a42]">JWT token'ı localStorage yerine HttpOnly cookie veya memory'de saklayın. Token süresi dolduğunda kullanıcıyı tekrar giriş sayfasına yönlendirin.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006948] mt-0.5">check_circle</span>
                <div>
                  <h4 className="font-semibold text-[#121c28]">Swagger UI kullanın</h4>
                  <p className="text-sm text-[#3d4a42]">
                    <code className="bg-[#eef4ff] px-1 rounded">http://localhost:5004/swagger</code> adresinden tüm endpoint'leri interaktif olarak test edebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer Note */}
      <div className="text-center text-sm text-[#6d7a72] pt-8 border-t border-[#bccac0] mt-12">
        <p>Bu API dokümantasyonu GıdaKatkıRadarı projesi için hazırlanmıştır.</p>
        <p className="mt-1">Swagger UI: <a href="http://localhost:5004/swagger" target="_blank" className="text-[#006948] hover:underline">localhost:5004/swagger</a></p>
        <p className="mt-1">
          Sorularınız için: <a href="mailto:dev@gidakatkiradar.com" className="text-[#006948] hover:underline">dev@gidakatkiradar.com</a>
        </p>
      </div>
    </motion.div>
  );
}
