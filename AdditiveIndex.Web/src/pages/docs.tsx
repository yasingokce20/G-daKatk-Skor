import { Terminal, Code, BookOpen, ExternalLink, Globe, Database, ShieldCheck, FlaskConical, ShoppingBag, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-blue-100 text-blue-700 border-blue-200",
  POST: "bg-green-100 text-green-700 border-green-200",
  PUT: "bg-amber-100 text-amber-700 border-amber-200",
  DELETE: "bg-red-100 text-red-700 border-red-200",
};

function EndpointRow({ method, path, desc }: { method: string; path: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b last:border-0">
      <span className={`text-xs font-bold px-2 py-0.5 rounded border font-mono flex-shrink-0 mt-0.5 ${METHOD_COLORS[method]}`}>
        {method}
      </span>
      <div className="min-w-0">
        <code className="text-sm font-mono text-foreground">{path}</code>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

const DATA_SOURCES = [
  {
    name: "EFSA (European Food Safety Authority)",
    url: "https://www.efsa.europa.eu/",
    desc: "Katkı maddelerinin ADI değerleri, güvenlik değerlendirmeleri ve yeniden inceleme raporları.",
    badge: "AB Düzenleyici",
  },
  {
    name: "Codex Alimentarius (FAO/WHO)",
    url: "https://www.fao.org/fao-who-codexalimentarius/",
    desc: "Gıda katkı maddeleri için uluslararası standartlar ve E kodu sınıflandırması.",
    badge: "Uluslararası Standart",
  },
  {
    name: "FDA GRAS (Generally Recognized As Safe)",
    url: "https://www.fda.gov/food/food-ingredients-packaging/generally-recognized-safe-gras",
    desc: "ABD'de güvenli kabul edilen maddelerin listesi ve değerlendirme kriterleri.",
    badge: "ABD Düzenleyici",
  },
  {
    name: "IARC Monographs (WHO)",
    url: "https://monographs.iarc.who.int/",
    desc: "Kanser riski değerlendirmeleri; E250 (nitrit) ve E951 (aspartam) gibi tartışmalı maddeler için.",
    badge: "Kanser Araştırma",
  },
  {
    name: "PubMed / NCBI",
    url: "https://pubmed.ncbi.nlm.nih.gov/",
    desc: "Hakemli bilimsel araştırma makaleleri ve meta-analizler.",
    badge: "Akademik",
  },
  {
    name: "Türk Gıda Kodeksi (TKGM)",
    url: "https://www.tarimorman.gov.tr/",
    desc: "Türkiye'de katkı maddelerinin izin durumu ve yasal sınır değerleri.",
    badge: "Türkiye Mevzuatı",
  },
];

export function Docs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-4xl"
    >
      <div>
        <h1 className="text-2xl font-bold">API Dokümantasyonu</h1>
        <p className="text-muted-foreground text-sm mt-1">
          E-Katkı verilerini kendi uygulamanıza entegre edin. Tüm endpoint'ler JSON döndürür ve kimlik doğrulaması gerektirmez.
        </p>
      </div>

      {/* Swagger Banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              İnteraktif API Dokümantasyonu (Swagger UI)
            </h3>
            <p className="text-sm text-muted-foreground">
              Tüm endpoint'leri doğrudan tarayıcıdan test edin. JSON şemaları, örnek yanıtlar ve parametre açıklamaları mevcut.
            </p>
          </div>
          <Button asChild className="flex-shrink-0">
            <a href="http://localhost:5004/swagger" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Swagger UI'ı Aç
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Base URL */}
      <div>
        <h2 className="text-base font-semibold mb-2">Base URL</h2>
        <div className="bg-zinc-950 text-zinc-100 px-4 py-3 rounded-lg font-mono text-sm">
          https://[domain]<span className="text-green-400">/api</span>
        </div>
      </div>

      {/* Endpoints */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold">Endpoint'ler</h2>

        {/* Additives */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-primary" />
              Katkı Maddeleri <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">/additives</code>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <EndpointRow method="GET" path="/additives" desc="Katkı maddelerini listeler. Arama (search), risk seviyesi (riskLevel), kategori (categoryId), sayfalama (page, limit) parametreleri desteklenir." />
            <EndpointRow method="GET" path="/additives/:id" desc="Tekil katkı maddesini ID ile getirir. Kategori ve referans bilgileri dahildir." />
            <EndpointRow method="GET" path="/additives/by-ecode/:eCode" desc="E koduna göre katkı maddesi getirir. Örn: /additives/by-ecode/E621" />
            <EndpointRow method="GET" path="/additives/:id/products" desc="Belirtilen katkı maddesini içeren ürünleri listeler." />
            <EndpointRow method="POST" path="/additives" desc="Yeni katkı maddesi ekler. JSON body gerektirir." />
            <EndpointRow method="PUT" path="/additives/:id" desc="Var olan katkı maddesini günceller." />
            <EndpointRow method="DELETE" path="/additives/:id" desc="Katkı maddesini ve ilişkili referansları siler." />
          </CardContent>
        </Card>

        {/* Products */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary" />
              Ürünler <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">/products</code>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <EndpointRow method="GET" path="/products" desc="Ürün listesi. Arama (search), kategori (productCategory), marka (brand), sayfalama desteklenir." />
            <EndpointRow method="GET" path="/products/:id" desc="Ürün detayı — içerdiği tüm katkı maddeleri ve kategorileri ile birlikte döner." />
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Kategoriler & Referanslar
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <EndpointRow method="GET" path="/categories" desc="Tüm katkı maddesi kategorilerini listeler (Renklendiriciler, Koruyucular, vb.)." />
            <EndpointRow method="GET" path="/references" desc="Araştırma referanslarını listeler. additiveId parametresiyle belirli bir maddeye ait referanslar filtrelenebilir." />
            <EndpointRow method="POST" path="/references" desc="Yeni araştırma referansı ekler." />
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              İstatistikler <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">/stats</code>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <EndpointRow method="GET" path="/stats/overview" desc="Toplam katkı maddesi, kategori ve referans sayılarını döner." />
            <EndpointRow method="GET" path="/stats/risk-distribution" desc="Risk seviyelerine göre katkı maddesi dağılımını döner." />
            <EndpointRow method="GET" path="/stats/category-distribution" desc="Kategorilere göre katkı maddesi sayısını döner." />
          </CardContent>
        </Card>

        {/* Health */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Diğer
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <EndpointRow method="GET" path="/healthz" desc="Sunucu sağlık kontrolü. {status: 'ok'} döner." />
            <EndpointRow method="GET" path="/docs/spec.json" desc="OpenAPI 3.1 spesifikasyonunu JSON formatında döner." />
          </CardContent>
        </Card>
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold">Örnek Kullanım</h2>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">E Koduna Göre Katkı Maddesi Sorgulama</CardTitle>
            <CardDescription className="text-xs">GET /additives/by-ecode/:eCode</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="curl">
              <TabsList className="mb-3 h-8">
                <TabsTrigger value="curl" className="text-xs flex items-center gap-1.5 h-7">
                  <Terminal className="w-3 h-3" /> cURL
                </TabsTrigger>
                <TabsTrigger value="js" className="text-xs flex items-center gap-1.5 h-7">
                  <Code className="w-3 h-3" /> JavaScript
                </TabsTrigger>
                <TabsTrigger value="py" className="text-xs flex items-center gap-1.5 h-7">
                  <Code className="w-3 h-3" /> Python
                </TabsTrigger>
              </TabsList>
              <TabsContent value="curl">
                <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
{`curl "https://[domain]/api/additives/by-ecode/E621"`}
                </pre>
              </TabsContent>
              <TabsContent value="js">
                <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
{`const res = await fetch("/api/additives/by-ecode/E621");
const data = await res.json();
console.log(data.name);        // "Monosodyum Glutamat"
console.log(data.riskLevel);   // "moderate"
console.log(data.references);  // [{ title, authors, year, url }]`}
                </pre>
              </TabsContent>
              <TabsContent value="py">
                <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
{`import requests

r = requests.get("https://[domain]/api/additives/by-ecode/E621")
data = r.json()
print(data["name"])       # Monosodyum Glutamat
print(data["riskLevel"])  # moderate`}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Yasaklı Maddeleri Filtreleme</CardTitle>
            <CardDescription className="text-xs">GET /additives?riskLevel=banned</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
{`curl "https://[domain]/api/additives?riskLevel=banned&limit=20"

// Yanıt:
// {
//   "data": [ { "eCode": "E123", "name": "Amarant", ... } ],
//   "pagination": { "total": 2, "page": 1, "totalPages": 1 }
// }`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ürün İçeriği Sorgulama</CardTitle>
            <CardDescription className="text-xs">GET /products/:id</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
{`curl "https://[domain]/api/products/6"

// Yanıt: Coca-Cola Şekersiz
// {
//   "name": "Coca-Cola Şekersiz",
//   "brand": "Coca-Cola",
//   "additives": [
//     { "eCode": "E211", "name": "Sodyum Benzoat", "riskLevel": "moderate" },
//     { "eCode": "E951", "name": "Aspartam", "riskLevel": "moderate" },
//     ...
//   ]
// }`}
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Data Sources */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-semibold">Veri Kaynakları</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Tüm katkı maddesi verileri aşağıdaki resmi ve akademik kaynaklardan derlenerek veritabanına işlenmiştir.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {DATA_SOURCES.map((src) => (
            <a
              key={src.name}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 p-4 rounded-xl border bg-card hover:border-primary/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium text-sm group-hover:text-primary transition-colors leading-snug">{src.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
              </div>
              <Badge variant="secondary" className="text-[10px] h-4 px-1.5 w-fit font-normal">{src.badge}</Badge>
              <p className="text-xs text-muted-foreground leading-relaxed">{src.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
