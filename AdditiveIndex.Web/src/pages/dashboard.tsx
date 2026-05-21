import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, FlaskConical, ShoppingBag, FileText, ShieldCheck, AlertTriangle, Ban, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStatsOverview, useGetRiskDistribution, useGetCategoryDistribution } from "@/api";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const RISK_COLORS = {
  safe: "hsl(142 70% 45%)",
  low: "hsl(220 70% 50%)",
  moderate: "hsl(40 90% 50%)",
  high: "hsl(20 90% 50%)",
  banned: "hsl(0 80% 50%)",
};

const RISK_TR: Record<string, string> = {
  safe: "Güvenli",
  low: "Düşük Risk",
  moderate: "Orta Risk",
  high: "Yüksek Risk",
  banned: "Yasaklı",
};

export function Dashboard() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");

  const { data: stats, isLoading: statsLoading } = useGetStatsOverview();
  const { data: riskDist, isLoading: riskLoading } = useGetRiskDistribution();
  const { data: categoryDist, isLoading: categoryLoading } = useGetCategoryDistribution();

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
      className="space-y-8"
    >
      {/* Hero */}
      <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Yediğinizin içinde ne var?
        </h1>
        <p className="text-muted-foreground mb-6 max-w-xl">
          Türkiye piyasasındaki ürünlerde kullanılan E kodlu katkı maddelerini araştırın. Hangi madde ne işe yarar, ne kadar güvenli?
        </p>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
          <Input
            placeholder="E kodu veya isim ara — örn: E621, tartrazin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/80"
          />
          <Button type="submit">
            <Search className="w-4 h-4 mr-2" />
            Ara
          </Button>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/additives">
          <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Katkı Maddesi</CardTitle>
              <FlaskConical className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{stats?.totalAdditives}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">E kodu kayıtlı</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/products">
          <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ürün</CardTitle>
              <ShoppingBag className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">30</div>
              <p className="text-xs text-muted-foreground mt-1">Türkiye piyasasından</p>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Araştırma</CardTitle>
            <FileText className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-3xl font-bold">{stats?.totalReferences}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">EFSA, WHO, PubMed</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Hızlı Erişim</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <Link href="/additives?riskLevel=banned">
            <div className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:border-red-300 hover:bg-red-50/50 transition-all cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <Ban className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-sm group-hover:text-red-700">Yasaklı Maddeler</div>
                <div className="text-xs text-muted-foreground">AB/Türkiye'de</div>
              </div>
            </div>
          </Link>
          <Link href="/additives?riskLevel=high">
            <div className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:border-orange-300 hover:bg-orange-50/50 transition-all cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <div className="font-medium text-sm group-hover:text-orange-700">Yüksek Riskli</div>
                <div className="text-xs text-muted-foreground">Dikkat gerektirir</div>
              </div>
            </div>
          </Link>
          <Link href="/additives?riskLevel=safe">
            <div className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:border-green-300 hover:bg-green-50/50 transition-all cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-sm group-hover:text-green-700">Güvenli Maddeler</div>
                <div className="text-xs text-muted-foreground">GRAS listesinde</div>
              </div>
            </div>
          </Link>
          <Link href="/products">
            <div className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-sm group-hover:text-blue-700">Ürün Sorgula</div>
                <div className="text-xs text-muted-foreground">İçeriği öğren</div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk Dağılımı</CardTitle>
            <CardDescription>Katkı maddelerinin güvenlik sınıflandırması</CardDescription>
          </CardHeader>
          <CardContent>
            {riskLoading ? (
              <div className="h-[260px] flex items-center justify-center">
                <Skeleton className="w-48 h-48 rounded-full" />
              </div>
            ) : Array.isArray(riskDist) && riskDist.length > 0 ? (
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDist}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={2}
                      dataKey="count"
                      nameKey="riskLevel"
                    >
                      {riskDist?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={RISK_COLORS[entry.riskLevel as keyof typeof RISK_COLORS] || RISK_COLORS.safe}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: number, name: string) => [
                        value + " adet",
                        RISK_TR[name] ?? name,
                      ]}
                      contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-3 flex-wrap">
                  {riskDist?.map((item) => (
                    <div key={item.riskLevel} className="flex items-center gap-1 text-xs">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: RISK_COLORS[item.riskLevel as keyof typeof RISK_COLORS] }}
                      />
                      <span>{RISK_TR[item.riskLevel] ?? item.riskLevel} ({item.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">En Çok Kullanılan Kategoriler</CardTitle>
            <CardDescription>Fonksiyona göre katkı maddesi dağılımı</CardDescription>
          </CardHeader>
          <CardContent>
            {categoryLoading ? (
              <Skeleton className="w-full h-[260px]" />
            ) : categoryDist && categoryDist.length > 0 ? (
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryDist.slice(0, 6)} layout="vertical" margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="categoryName" type="category" tick={{ fontSize: 11 }} width={95} />
                    <RechartsTooltip
                      cursor={{ fill: "rgba(0,0,0,0.04)" }}
                      formatter={(value: number) => [value + " adet", "Katkı"]}
                      contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="bg-blue-50/50 border-blue-100">
        <CardContent className="flex gap-3 p-4">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Bu site hakkında:</strong> E-Katkı, gıda etiketlerini anlamanıza yardımcı olmak için hazırlanmış bağımsız bir referans kaynağıdır. Tıbbi tavsiye niteliği taşımaz. Veriler EFSA, WHO/IARC ve Codex Alimentarius kaynaklarına dayanmaktadır.
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
