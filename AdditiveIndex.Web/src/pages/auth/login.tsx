import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);
      toast({
        title: "Başarılı",
        description: "Giriş yapıldı. Hoş geldiniz!",
      });
      navigate("/");
    } catch (err: any) {
      toast({
        title: "Giriş Başarısız",
        description: err.message || "E-posta veya şifre hatalı",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[calc(100vh-300px)] flex items-center justify-center py-12 px-4"
    >
      <div className="w-full max-w-md">
        {/* Breadcrumb */}
        <nav className="py-4 flex items-center gap-2 text-[#6d7a72] text-sm mb-4">
          <Link href="/">
            <span className="hover:text-[#006948] cursor-pointer">Anasayfa</span>
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-[#121c28] font-semibold">Giriş Yap</span>
        </nav>

        <div className="bg-white rounded-2xl border border-[#bccac0] p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#eef4ff] rounded-full mb-4">
              <span className="material-symbols-outlined text-3xl text-[#006948]">login</span>
            </div>
            <h1 className="text-headline-md text-[#121c28] mb-2">Hoş Geldiniz</h1>
            <p className="text-body-md text-[#3d4a42]">
              Hesabınıza giriş yaparak devam edin
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#121c28] mb-2">
                E-posta
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a72]">
                  email
                </span>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  required
                  className="pl-10 bg-[#f8f9ff] border-[#bccac0] focus:border-[#006948] h-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#121c28] mb-2">
                Şifre
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a72]">
                  lock
                </span>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="pl-10 bg-[#f8f9ff] border-[#bccac0] focus:border-[#006948] h-12"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-[#ffdad6] border border-[#e02928] rounded-lg text-sm text-[#bb0112] flex items-center gap-2">
                <span className="material-symbols-outlined">error</span>
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#006948] hover:bg-[#005137] text-white font-semibold"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin mr-2">refresh</span>
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined mr-2">login</span>
                  Giriş Yap
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#bccac0] text-center">
            <p className="text-[#3d4a42] text-sm">
              Hesabınız yok mu?{" "}
              <Link href="/register">
                <span className="text-[#006948] font-semibold hover:underline cursor-pointer">
                  Kayıt Ol
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
