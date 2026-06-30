import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";

interface Discussion {
  id: number;
  title: string;
  author: string;
  date: string;
  replies: number;
  category: string;
  preview: string;
}

const MOCK_DISCUSSIONS: Discussion[] = [
  {
    id: 1,
    title: "E621 (MSG) gerçekten zararlı mı?",
    author: "GıdaMeraklısı",
    date: "2025-06-08",
    replies: 12,
    category: "Tartışma",
    preview: "Monosodyum glutamat hakkında birçok farklı görüş var. Bilimsel çalışmalar ne diyor?",
  },
  {
    id: 2,
    title: "Çocuklar için en riskli 5 katkı maddesi",
    author: "AnneDiyor",
    date: "2025-06-07",
    replies: 8,
    category: "Bilgi Paylaşımı",
    preview: "Çocuklarımızın sık tükettiği ürünlerdeki katkı maddelerini araştırdım.",
  },
  {
    id: 3,
    title: "Doğal renklendiriciler vs sentetik renklendiriciler",
    author: "GıdaMühendisi",
    date: "2025-06-05",
    replies: 15,
    category: "Tartışma",
    preview: "E100 (Kurkumin) gibi doğal kaynaklar ile E102 (Tartrazin) gibi sentetiklerin farkları...",
  },
  {
    id: 4,
    title: "Türkiye'de yasaklanan ama AB'de serbest olan maddeler",
    author: "RegülasyonTakip",
    date: "2025-06-03",
    replies: 6,
    category: "Mevzuat",
    preview: "Ülkeler arası mevzuat farklılıkları oldukça ilginç. İşte dikkat çeken örnekler...",
  },
  {
    id: 5,
    title: "Barkod tarayıcı ile günlük alışverişte katkı takibi",
    author: "BilinçliTüketici",
    date: "2025-06-01",
    replies: 20,
    category: "İpuçları",
    preview: "GıdaKatkıRadarı API'sini kullanarak basit bir mobil uygulama geliştirdim.",
  },
];

const CATEGORIES = ["Tümü", "Tartışma", "Bilgi Paylaşımı", "Mevzuat", "İpuçları"];

export function CommunityPage() {
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);

  const filteredDiscussions = selectedCategory === "Tümü"
    ? MOCK_DISCUSSIONS
    : MOCK_DISCUSSIONS.filter(d => d.category === selectedCategory);

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
        <span className="text-[#121c28] font-semibold">Topluluk</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-headline-lg text-[#121c28] flex items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-[#006948]">forum</span>
            Topluluk Tartışmaları
          </h1>
          <p className="text-body-md text-[#3d4a42] mt-2">
            Gıda katkı maddeleri hakkında bilgi paylaşın, sorular sorun ve tartışmalara katılın.
          </p>
        </div>
        {isAuthenticated ? (
          <button
            onClick={() => setShowNewTopicForm(!showNewTopicForm)}
            className="flex items-center gap-2 bg-[#006948] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#005137] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Yeni Konu Aç
          </button>
        ) : (
          <Link href="/login">
            <span className="flex items-center gap-2 bg-[#006948] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#005137] transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">login</span>
              Katılmak İçin Giriş Yap
            </span>
          </Link>
        )}
      </div>

      {/* New Topic Form */}
      {showNewTopicForm && isAuthenticated && (
        <div className="mb-8 bg-white rounded-xl p-6 border border-[#bccac0]">
          <h3 className="text-headline-md text-[#121c28] mb-4">Yeni Tartışma Konusu</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#121c28] mb-1">Başlık</label>
              <input
                type="text"
                placeholder="Tartışma konunuzu yazın..."
                className="w-full border border-[#bccac0] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#006948] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#121c28] mb-1">Kategori</label>
              <select className="border border-[#bccac0] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#006948] focus:outline-none">
                <option>Tartışma</option>
                <option>Bilgi Paylaşımı</option>
                <option>Mevzuat</option>
                <option>İpuçları</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#121c28] mb-1">İçerik</label>
              <textarea
                rows={4}
                placeholder="Düşüncelerinizi paylaşın..."
                className="w-full border border-[#bccac0] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#006948] focus:outline-none resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button className="bg-[#006948] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#005137] transition-colors">
                Paylaş
              </button>
              <button
                onClick={() => setShowNewTopicForm(false)}
                className="bg-[#eef4ff] text-[#3d4a42] px-5 py-2 rounded-lg font-medium hover:bg-[#d9e3f4] transition-colors"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedCategory === cat
                ? "bg-[#006948] text-white"
                : "bg-white text-[#3d4a42] border border-[#bccac0] hover:bg-[#d9e3f4]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => (
          <div
            key={discussion.id}
            className="bg-white rounded-xl p-5 border border-[#bccac0] hover:border-[#006948] transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#eef4ff] text-[#006948] text-xs font-medium px-2 py-0.5 rounded">
                    {discussion.category}
                  </span>
                </div>
                <h3 className="font-semibold text-[#121c28] text-lg mb-1">{discussion.title}</h3>
                <p className="text-sm text-[#3d4a42] mb-3">{discussion.preview}</p>
                <div className="flex items-center gap-4 text-xs text-[#6d7a72]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                    {discussion.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    {discussion.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                    {discussion.replies} yanıt
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#bccac0]">chevron_right</span>
            </div>
          </div>
        ))}
      </div>

      {/* Community Guidelines */}
      <section className="mt-12 bg-[#eef4ff] rounded-xl p-6 border border-[#bccac0]">
        <h3 className="text-headline-md text-[#121c28] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006948]">policy</span>
          Topluluk Kuralları
        </h3>
        <ul className="space-y-2 text-sm text-[#3d4a42]">
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#006948] text-[18px] mt-0.5">check</span>
            Bilimsel kaynaklara dayalı bilgi paylaşımını teşvik edin.
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#006948] text-[18px] mt-0.5">check</span>
            Saygılı ve yapıcı bir dil kullanın.
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#006948] text-[18px] mt-0.5">check</span>
            Tıbbi tavsiye vermeyin; sağlık endişeleri için profesyonellere yönlendirin.
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#bb0112] text-[18px] mt-0.5">close</span>
            Reklam, spam veya ticari tanıtım yapmayın.
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#bb0112] text-[18px] mt-0.5">close</span>
            Yanıltıcı veya yanlış bilgi paylaşmayın.
          </li>
        </ul>
      </section>

      {/* Info Note */}
      <div className="mt-6 text-center text-sm text-[#6d7a72]">
        <p>Topluluk içerikleri kullanıcılar tarafından oluşturulur. GıdaKatkıRadarı ekibi içerik doğruluğunu garanti etmez.</p>
      </div>
    </motion.div>
  );
}
