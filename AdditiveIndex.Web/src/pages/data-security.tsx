import { motion } from "framer-motion";
import { Link } from "wouter";

export function DataSecurityPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-8 pb-16 max-w-4xl mx-auto"
    >
      {/* Breadcrumb */}
      <nav className="py-4 flex items-center gap-2 text-[#6d7a72] text-sm mb-6">
        <Link href="/">
          <span className="hover:text-[#006948] cursor-pointer">Anasayfa</span>
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-[#121c28] font-semibold">Veri Güvenliği</span>
      </nav>

      <h1 className="text-headline-lg text-[#121c28] mb-8">Veri Güvenliği ve Etik İlkeler</h1>

      {/* Introduction */}
      <section className="mb-12 bg-[#eef4ff] rounded-xl p-6 border border-[#bccac0]">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-4xl text-[#006948]">security</span>
          <div>
            <h2 className="text-headline-md text-[#121c28] mb-2">Güvenilir Bilgi Kaynağı</h2>
            <p className="text-body-md text-[#3d4a42]">
              PureFood Trace olarak, kullanıcılarımıza şeffaf, doğrulanmış ve güvenilir gıda katkı maddesi 
              bilgileri sunmayı taahhüt ediyoruz. Tüm verilerimiz uluslararası otoritelerden alınmakta 
              ve düzenli olarak güncellenmektedir.
            </p>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="mb-12">
        <h2 className="text-headline-md text-[#121c28] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006948]">database</span>
          Veri Kaynaklarımız
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white border border-[#bccac0] rounded-xl p-5">
            <h3 className="font-semibold text-[#121c28] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fe932c]">public</span>
              Open Food Facts (OFF)
            </h3>
            <p className="text-body-md text-[#3d4a42] mb-3">
              Ürün bilgileri, barkod verileri ve içerik listeleri dünyanın en büyük açık gıda 
              veritabanından alınmaktadır.
            </p>
            <a href="https://world.openfoodfacts.org" target="_blank" rel="noopener noreferrer" 
               className="text-[#006948] text-sm hover:underline flex items-center gap-1">
              world.openfoodfacts.org
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>

          <div className="bg-white border border-[#bccac0] rounded-xl p-5">
            <h3 className="font-semibold text-[#121c28] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fe932c]">science</span>
              EFSA (Avrupa Gıda Güvenliği Otoritesi)
            </h3>
            <p className="text-body-md text-[#3d4a42] mb-3">
              Katkı maddesi risk değerlendirmeleri, ADI değerleri ve güvenlik raporları 
              EFSA veritabanından sağlanmaktadır.
            </p>
            <a href="https://www.efsa.europa.eu" target="_blank" rel="noopener noreferrer"
               className="text-[#006948] text-sm hover:underline flex items-center gap-1">
              efsa.europa.eu
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>

          <div className="bg-white border border-[#bccac0] rounded-xl p-5">
            <h3 className="font-semibold text-[#121c28] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fe932c]">menu_book</span>
              Codex Alimentarius (FAO/WHO)
            </h3>
            <p className="text-body-md text-[#3d4a42] mb-3">
              Uluslararası gıda standartları ve katkı maddesi sınıflandırmaları 
              FAO/WHO kaynaklarından derlenmektedir.
            </p>
            <a href="https://www.fao.org/fao-who-codexalimentarius" target="_blank" rel="noopener noreferrer"
               className="text-[#006948] text-sm hover:underline flex items-center gap-1">
              fao.org/codexalimentarius
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>

          <div className="bg-white border border-[#bccac0] rounded-xl p-5">
            <h3 className="font-semibold text-[#121c28] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fe932c]">verified</span>
              FDA GRAS Listesi
            </h3>
            <p className="text-body-md text-[#3d4a42] mb-3">
              ABD Gıda ve İlaç Dairesi'nin "Generally Recognized as Safe" listesi 
              güvenli katkı maddeleri için referans alınmaktadır.
            </p>
            <a href="https://www.fda.gov/food" target="_blank" rel="noopener noreferrer"
               className="text-[#006948] text-sm hover:underline flex items-center gap-1">
              fda.gov/food
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>
        </div>
      </section>

      {/* Risk Assessment */}
      <section className="mb-12">
        <h2 className="text-headline-md text-[#121c28] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006948]">monitoring</span>
          Risk Değerlendirme Metodolojisi
        </h2>
        
        <div className="bg-white border border-[#bccac0] rounded-xl p-6">
          <p className="text-body-md text-[#3d4a42] mb-6">
            Katkı maddelerinin risk seviyeleri aşağıdaki kriterlere göre belirlenmektedir:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-[#f5fff7] rounded-lg border border-[#00855d]/30">
              <span className="material-symbols-outlined text-2xl text-[#00855d]">check_circle</span>
              <div>
                <h4 className="font-semibold text-[#006948]">Güvenli (Safe)</h4>
                <p className="text-sm text-[#3d4a42]">
                  FDA GRAS listesinde veya EFSA onaylı, geniş çapta güvenli kabul edilen maddeler.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-[#fff8f0] rounded-lg border border-[#fe932c]/30">
              <span className="material-symbols-outlined text-2xl text-[#fe932c]">warning</span>
              <div>
                <h4 className="font-semibold text-[#904d00]">Düşük Risk (Low)</h4>
                <p className="text-sm text-[#3d4a42]">
                  Mevcut limitler içinde güvenli kabul edilen, aşırı tüketimde risk oluşturabilen maddeler.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-[#fff4e6] rounded-lg border border-[#fe932c]/50">
              <span className="material-symbols-outlined text-2xl text-[#fe932c]">error</span>
              <div>
                <h4 className="font-semibold text-[#904d00]">Orta Risk (Moderate)</h4>
                <p className="text-sm text-[#3d4a42]">
                  Hassas gruplar (çocuklar, hamileler) için dikkat gerektiren, ADI değerine yakın limitlerdeki maddeler.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-[#ffebee] rounded-lg border border-[#e02928]/30">
              <span className="material-symbols-outlined text-2xl text-[#e02928]">gpp_maybe</span>
              <div>
                <h4 className="font-semibold text-[#bb0112]">Yüksek Risk (High)</h4>
                <p className="text-sm text-[#3d4a42]">
                  Sağlık riskleri belgelenmiş, kısıtlı kullanım alanı olan veya bazı ülkelerde yasaklanan maddeler.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-[#ffdad6] rounded-lg border border-[#bb0112]/30">
              <span className="material-symbols-outlined text-2xl text-[#bb0112]">block</span>
              <div>
                <h4 className="font-semibold text-[#bb0112]">Yasaklı (Banned)</h4>
                <p className="text-sm text-[#3d4a42]">
                  AB, ABD veya Türkiye'de kullanımı yasaklanmış, kanıtlanmış sağlık riski taşıyan maddeler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Privacy */}
      <section className="mb-12">
        <h2 className="text-headline-md text-[#121c28] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006948]">privacy_tip</span>
          Kullanıcı Veri Güvenliği
        </h2>
        
        <div className="bg-white border border-[#bccac0] rounded-xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006948] mt-1">shield</span>
            <div>
              <h4 className="font-semibold text-[#121c28]">Veri Toplama</h4>
              <p className="text-sm text-[#3d4a42]">
                Kullanıcılarımız hakkında yalnızca uygulama kullanımını iyileştirmek için gerekli 
                anonim veriler topluyoruz. Kişisel bilgiler yalnızca gönüllü olarak verildiğinde saklanır.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006948] mt-1">encrypted</span>
            <div>
              <h4 className="font-semibold text-[#121c28]">Şifreleme</h4>
              <p className="text-sm text-[#3d4a42]">
                Tüm veri iletişimi SSL/TLS şifreleme ile korunmaktadır. Şifreler bcrypt ile hashlenir 
                ve asla düz metin olarak saklanmaz.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006948] mt-1">delete_forever</span>
            <div>
              <h4 className="font-semibold text-[#121c28]">Veri Silme Hakkı</h4>
              <p className="text-sm text-[#3d4a42]">
                Kullanıcılarımız hesaplarını ve tüm ilişkili verilerini istedikleri zaman 
                silebilirler. Bu işlem GDPR ve KVKK kapsamında gerçekleştirilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ethics */}
      <section className="mb-12">
        <h2 className="text-headline-md text-[#121c28] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006948]">balance</span>
          Etik İlkelerimiz
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-[#eef4ff] rounded-xl p-5 border border-[#bccac0]">
            <h4 className="font-semibold text-[#121c28] mb-2">Tarafsızlık</h4>
            <p className="text-sm text-[#3d4a42]">
              Tüm katkı maddesi değerlendirmelerimiz bilimsel verilere dayanır. 
              Hiçbir ticari çıkar bizi etkilemez.
            </p>
          </div>
          
          <div className="bg-[#eef4ff] rounded-xl p-5 border border-[#bccac0]">
            <h4 className="font-semibold text-[#121c28] mb-2">Şeffaflık</h4>
            <p className="text-sm text-[#3d4a42]">
              Tüm veri kaynaklarımız ve metodolojimiz açıkça belirtilmiştir. 
              Kaynak kodumuz açık kaynak olarak paylaşılmaktadır.
            </p>
          </div>
          
          <div className="bg-[#eef4ff] rounded-xl p-5 border border-[#bccac0]">
            <h4 className="font-semibold text-[#121c28] mb-2">Güncellik</h4>
            <p className="text-sm text-[#3d4a42]">
              Bilgilerimiz düzenli olarak güncellenir. Yeni bilimsel bulgular 
              derhal veritabanımıza yansıtılır.
            </p>
          </div>
          
          <div className="bg-[#eef4ff] rounded-xl p-5 border border-[#bccac0]">
            <h4 className="font-semibold text-[#121c28] mb-2">Erişilebilirlik</h4>
            <p className="text-sm text-[#3d4a42]">
              Temel bilgilere erişim her zaman ücretsizdir. 
              Sağlık bilgileri paywall arkasında kalmaz.
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <div className="text-center text-sm text-[#6d7a72] pt-8 border-t border-[#bccac0]">
        <p>Bu sayfa son güncelleme: 26 Mayıs 2026</p>
        <p className="mt-1">
          Sorularınız için: <a href="mailto:privacy@purefoodtrace.com" className="text-[#006948] hover:underline">privacy@purefoodtrace.com</a>
        </p>
      </div>
    </motion.div>
  );
}
