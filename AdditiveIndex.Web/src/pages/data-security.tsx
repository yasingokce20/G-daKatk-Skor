import { motion } from "framer-motion";
import { Link } from "wouter";

export function DataSecurityPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-8 pb-16 max-w-4xl mx-auto px-4"
    >
      {/* Breadcrumb */}
      <nav className="py-4 flex items-center gap-2 text-[#6d7a72] text-sm mb-6">
        <Link href="/">
          <span className="hover:text-[#006948] cursor-pointer">Anasayfa</span>
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-[#121c28] font-semibold">Veri Güvenliği ve Etik</span>
      </nav>

      <h1 className="text-headline-lg text-[#121c28] mb-8">Veri Güvenliği, Etik İlkeler ve Hukuki Sorumluluk</h1>

      {/* LEGAL DISCLAIMER - PROMINENT */}
      <section className="mb-12 bg-[#ffdad6] rounded-xl p-6 border-2 border-[#bb0112]">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-4xl text-[#bb0112]">gavel</span>
          <div>
            <h2 className="text-headline-md text-[#bb0112] mb-3">Hukuki Sorumluluk Reddi (Yasal Uyarı)</h2>
            <div className="space-y-3 text-[#3d4a42]">
              <p className="font-semibold text-[#121c28]">
                GıdaKatkıRadarı yalnızca bilgilendirme amaçlı bir akademik projedir. Bu platform bir tıbbi danışmanlık 
                hizmeti, sağlık tavsiye sistemi veya klinik karar destek aracı DEĞİLDİR.
              </p>
              <p>
                Platformda sunulan katkı maddesi risk seviyeleri, sınıflandırmalar ve açıklamalar genel bilgi amaçlıdır. 
                Bu bilgiler hiçbir koşulda doktor, diyetisyen veya sağlık profesyoneli görüşünün yerine geçmez.
              </p>
              <p>
                GıdaKatkıRadarı ekibi, bu platformdaki verilere dayanarak alınan kararlardan, oluşabilecek sağlık 
                sorunlarından veya herhangi bir doğrudan/dolaylı zarardan <strong>hiçbir hukuki sorumluluk kabul etmez.</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>Alerjik reaksiyonlar, gıda intoleransları veya sağlık durumlarınız için mutlaka bir sağlık profesyoneline danışın.</li>
                <li>Platformdaki risk sınıflandırmaları resmi bir düzenleyici kurum onayı taşımaz.</li>
                <li>Veriler gecikmiş, eksik veya hatalı olabilir; güncellik garantisi verilmez.</li>
                <li>Bu platform Sakarya Üniversitesi Bilgisayar Mühendisliği bitirme çalışması kapsamında geliştirilmiştir.</li>
              </ul>
              <p className="text-xs text-[#6d7a72] mt-3 italic">
                Bu platformu kullanarak yukarıdaki koşulları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş sayılırsınız.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mb-12 bg-[#eef4ff] rounded-xl p-6 border border-[#bccac0]">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-4xl text-[#006948]">security</span>
          <div>
            <h2 className="text-headline-md text-[#121c28] mb-2">Güvenilir Bilgi Kaynağı</h2>
            <p className="text-body-md text-[#3d4a42]">
              GıdaKatkıRadarı olarak, kullanıcılarımıza şeffaf, doğrulanmış ve güvenilir gıda katkı maddesi 
              bilgileri sunmayı hedefliyoruz. Tüm verilerimiz uluslararası otoritelerden derlenmekte 
              ve düzenli olarak güncellenmektedir. Ancak bu verilerin doğruluğu ve güncelliği konusunda 
              mutlak garanti verilmez; veriler yalnızca bilgilendirme amacı taşır.
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
        
        <p className="text-body-md text-[#3d4a42] mb-4">
          Sistemdeki katkı maddesi ve ürün verileri aşağıdaki uluslararası kaynaklardan derlenmektedir. 
          Her kaynağın güvenilirliği ve kapsamı farklıdır; veriler çapraz kontrol edilerek doğrulanmaya çalışılmıştır.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white border border-[#bccac0] rounded-xl p-5">
            <h3 className="font-semibold text-[#121c28] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fe932c]">public</span>
              Open Food Facts (OFF)
            </h3>
            <p className="text-body-md text-[#3d4a42] mb-2">
              Ürün bilgileri, barkod verileri ve içerik listeleri dünyanın en büyük açık gıda 
              veritabanından alınmaktadır.
            </p>
            <p className="text-xs text-[#6d7a72] mb-2">
              Not: Topluluk tabanlı bir kaynak olduğu için bazı ürün bilgileri eksik veya güncel olmayabilir.
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
            <p className="text-body-md text-[#3d4a42] mb-2">
              Katkı maddesi risk değerlendirmeleri, kabul edilebilir günlük alım (ADI) değerleri ve güvenlik 
              raporları EFSA bilimsel görüşlerinden derlenmiştir.
            </p>
            <p className="text-xs text-[#6d7a72] mb-2">
              Bağımsız bilimsel kurul değerlendirmelerine dayalı, AB'nin resmi gıda güvenliği otoritesidir.
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
            <p className="text-body-md text-[#3d4a42] mb-2">
              Uluslararası gıda standartları ve katkı maddesi sınıflandırmaları 
              FAO/WHO ortak komisyonundan derlenmektedir.
            </p>
            <p className="text-xs text-[#6d7a72] mb-2">
              190+ ülke tarafından kabul edilen uluslararası gıda standart çerçevesidir.
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
            <p className="text-body-md text-[#3d4a42] mb-2">
              ABD Gıda ve İlaç Dairesi'nin "Generally Recognized as Safe" listesi 
              güvenli katkı maddeleri için referans alınmaktadır.
            </p>
            <p className="text-xs text-[#6d7a72] mb-2">
              ABD merkezli düzenleme; AB ve Türkiye mevzuatından farklılık gösterebilir.
            </p>
            <a href="https://www.fda.gov/food" target="_blank" rel="noopener noreferrer"
               className="text-[#006948] text-sm hover:underline flex items-center gap-1">
              fda.gov/food
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>

          <div className="bg-white border border-[#bccac0] rounded-xl p-5 md:col-span-2">
            <h3 className="font-semibold text-[#121c28] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fe932c]">apartment</span>
              Türk Gıda Kodeksi
            </h3>
            <p className="text-body-md text-[#3d4a42] mb-2">
              T.C. Tarım ve Orman Bakanlığı tarafından yayımlanan Türk Gıda Kodeksi Gıda Katkı Maddeleri 
              Yönetmeliği (Resmi Gazete: 30.06.2013, Sayı: 28693) ulusal düzeyde referans alınmıştır.
            </p>
            <p className="text-xs text-[#6d7a72]">
              Yönetmelik değişikliklerinin sisteme yansıma süresi farklılık gösterebilir.
            </p>
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
          <p className="text-body-md text-[#3d4a42] mb-4">
            Katkı maddelerinin risk seviyeleri aşağıdaki kriterlere göre belirlenmektedir. Bu sınıflandırma 
            yalnızca bilgilendirme amaçlıdır ve tıbbi bir değerlendirme niteliği taşımaz.
          </p>
          <p className="text-sm text-[#6d7a72] mb-6 bg-[#f8f9ff] p-3 rounded-lg border border-[#bccac0]">
            Sınıflandırma kriterleri: EFSA bilimsel görüşleri, FDA GRAS durumu, Codex Alimentarius kategorileri, 
            AB/ABD/TR'deki yasal durum, ADI (Acceptable Daily Intake) değerleri ve mevcut bilimsel literatür.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-[#f5fff7] rounded-lg border border-[#00855d]/30">
              <span className="material-symbols-outlined text-2xl text-[#00855d]">check_circle</span>
              <div>
                <h4 className="font-semibold text-[#006948]">Güvenli (Safe)</h4>
                <p className="text-sm text-[#3d4a42]">
                  FDA GRAS listesinde veya EFSA tarafından onaylı, geniş çapta güvenli kabul edilen maddeler. 
                  Normal tüketim koşullarında bilinen bir risk taşımaz.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-[#fff8f0] rounded-lg border border-[#fe932c]/30">
              <span className="material-symbols-outlined text-2xl text-[#fe932c]">warning</span>
              <div>
                <h4 className="font-semibold text-[#904d00]">Düşük Risk (Low)</h4>
                <p className="text-sm text-[#3d4a42]">
                  Mevcut ADI limitleri içinde güvenli kabul edilen, ancak aşırı veya uzun süreli tüketimde 
                  potansiyel risk oluşturabilen maddeler.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-[#fff4e6] rounded-lg border border-[#fe932c]/50">
              <span className="material-symbols-outlined text-2xl text-[#fe932c]">error</span>
              <div>
                <h4 className="font-semibold text-[#904d00]">Orta Risk (Moderate)</h4>
                <p className="text-sm text-[#3d4a42]">
                  Hassas gruplar (çocuklar, hamileler, alerjik bireyler) için dikkat gerektiren, 
                  ADI değerine yakın limitlerdeki veya tartışmalı bilimsel sonuçları olan maddeler.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-[#ffebee] rounded-lg border border-[#e02928]/30">
              <span className="material-symbols-outlined text-2xl text-[#e02928]">gpp_maybe</span>
              <div>
                <h4 className="font-semibold text-[#bb0112]">Yüksek Risk (High)</h4>
                <p className="text-sm text-[#3d4a42]">
                  Sağlık riskleri bilimsel çalışmalarla belgelenmiş, kısıtlı kullanım alanı olan veya 
                  bazı ülkelerde yasaklanan/kısıtlanan maddeler.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-[#ffdad6] rounded-lg border border-[#bb0112]/30">
              <span className="material-symbols-outlined text-2xl text-[#bb0112]">block</span>
              <div>
                <h4 className="font-semibold text-[#bb0112]">Yasaklı (Banned)</h4>
                <p className="text-sm text-[#3d4a42]">
                  AB, ABD veya Türkiye'de gıdalarda kullanımı yasaklanmış, kanıtlanmış sağlık 
                  riski taşıyan maddeler (örn: E123 Amaranth, E128 Red 2G).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Privacy & KVKK */}
      <section className="mb-12">
        <h2 className="text-headline-md text-[#121c28] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006948]">privacy_tip</span>
          Kullanıcı Veri Güvenliği ve KVKK Uyumluluğu
        </h2>
        
        <div className="bg-white border border-[#bccac0] rounded-xl p-6 space-y-5">
          <p className="text-body-md text-[#3d4a42]">
            6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma 
            Tüzüğü (GDPR) kapsamındaki yükümlülüklerimiz aşağıda açıklanmıştır.
          </p>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006948] mt-1">shield</span>
            <div>
              <h4 className="font-semibold text-[#121c28]">Toplanan Kişisel Veriler</h4>
              <p className="text-sm text-[#3d4a42]">
                Kayıt esnasında yalnızca e-posta adresi, kullanıcı adı ve şifre (hashlenmiş hali) toplanır.
                IP adresi, tarayıcı bilgisi veya konum verisi gibi ek kişisel veriler toplanmaz ve saklanmaz.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006948] mt-1">encrypted</span>
            <div>
              <h4 className="font-semibold text-[#121c28]">Veri Güvenliği Önlemleri</h4>
              <ul className="text-sm text-[#3d4a42] space-y-1 mt-1">
                <li>• Şifreler BCrypt algoritması ile tek yönlü hashlenmiştir (düz metin olarak ASLA saklanmaz)</li>
                <li>• API iletişimi HTTPS/TLS protokolü üzerinden şifrelenir</li>
                <li>• JWT tokenlar konfigüre edilmiş gizli anahtar ile imzalanır</li>
                <li>• SQL injection'a karşı Entity Framework Core parameterized queries kullanılır</li>
                <li>• XSS saldırılarına karşı React'in varsayılan output escaping mekanizması aktiftir</li>
                <li>• CORS politikası yalnızca bilinen originlere izin verecek şekilde yapılandırılmıştır</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006948] mt-1">folder_shared</span>
            <div>
              <h4 className="font-semibold text-[#121c28]">Veri İşleme Amaçları</h4>
              <p className="text-sm text-[#3d4a42]">
                Toplanan veriler yalnızca kullanıcı kimlik doğrulama ve oturum yönetimi amacıyla işlenir. 
                Veriler üçüncü taraflarla paylaşılmaz, reklam amacıyla kullanılmaz ve profilleme yapılmaz.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006948] mt-1">delete_forever</span>
            <div>
              <h4 className="font-semibold text-[#121c28]">Kullanıcı Hakları</h4>
              <ul className="text-sm text-[#3d4a42] space-y-1 mt-1">
                <li>• <strong>Erişim hakkı:</strong> Saklanan kişisel verilerinizi görüntüleme</li>
                <li>• <strong>Düzeltme hakkı:</strong> Yanlış veya eksik bilgilerin güncellenmesi</li>
                <li>• <strong>Silme hakkı:</strong> Hesap ve tüm ilişkili verilerin kalıcı olarak silinmesi</li>
                <li>• <strong>İtiraz hakkı:</strong> Veri işleme faaliyetlerine itiraz etme</li>
                <li>• <strong>Taşınabilirlik hakkı:</strong> Verilerinizin yapılandırılmış formatta alınması</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006948] mt-1">timer</span>
            <div>
              <h4 className="font-semibold text-[#121c28]">Veri Saklama Süresi</h4>
              <p className="text-sm text-[#3d4a42]">
                Kullanıcı hesap bilgileri, hesap aktif olduğu sürece saklanır. Hesap silme talebi alındığında 
                tüm kişisel veriler 30 gün içerisinde kalıcı olarak silinir.
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
            <h4 className="font-semibold text-[#121c28] mb-2">Bilimsel Tarafsızlık</h4>
            <p className="text-sm text-[#3d4a42]">
              Tüm katkı maddesi değerlendirmelerimiz bilimsel verilere ve resmi kurum raporlarına dayanır. 
              Hiçbir ticari çıkar, marka veya üretici risk sınıflandırmamızı etkilemez. Veriler sponsor 
              içermez ve reklam tabanlı değildir.
            </p>
          </div>
          
          <div className="bg-[#eef4ff] rounded-xl p-5 border border-[#bccac0]">
            <h4 className="font-semibold text-[#121c28] mb-2">Kaynak Şeffaflığı</h4>
            <p className="text-sm text-[#3d4a42]">
              Tüm veri kaynaklarımız ve risk değerlendirme metodolojimiz açıkça belirtilmiştir. 
              Her katkı maddesi kaydında referans bilgisi sunulmaktadır. Proje kaynak kodu 
              açık olarak paylaşılmaktadır.
            </p>
          </div>
          
          <div className="bg-[#eef4ff] rounded-xl p-5 border border-[#bccac0]">
            <h4 className="font-semibold text-[#121c28] mb-2">Güncellik ve Doğruluk</h4>
            <p className="text-sm text-[#3d4a42]">
              Bilgilerimiz düzenli olarak güncellenir. Ancak bilimsel bilginin sürekli değiştiği bilinmelidir; 
              bugün güvenli kabul edilen bir madde gelecekte farklı değerlendirilebilir. Güncellik garantisi 
              verilememektedir.
            </p>
          </div>
          
          <div className="bg-[#eef4ff] rounded-xl p-5 border border-[#bccac0]">
            <h4 className="font-semibold text-[#121c28] mb-2">Ücretsiz Erişim</h4>
            <p className="text-sm text-[#3d4a42]">
              Temel katkı maddesi bilgilerine ve API'ye erişim her zaman ücretsizdir. 
              Sağlık ve güvenlik bilgileri ödeme duvarı arkasında tutulmaz. Proje akademik 
              amaçlı geliştirilmiştir.
            </p>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="mb-12">
        <h2 className="text-headline-md text-[#121c28] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#fe932c]">info</span>
          Sistemin Sınırlılıkları
        </h2>
        
        <div className="bg-white border border-[#bccac0] rounded-xl p-6">
          <ul className="space-y-3 text-[#3d4a42]">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#fe932c] mt-0.5 text-[20px]">warning</span>
              <span className="text-sm">Sistem bir <strong>tıbbi cihaz</strong> veya <strong>sağlık uygulaması</strong> değildir. Alerjik reaksiyonlar için doktorunuza başvurun.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#fe932c] mt-0.5 text-[20px]">warning</span>
              <span className="text-sm">Open Food Facts topluluk tabanlıdır; bazı ürün bilgileri eksik, güncel olmayan veya hatalı olabilir.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#fe932c] mt-0.5 text-[20px]">warning</span>
              <span className="text-sm">Risk sınıflandırmaları sübjektif yorumlar içerebilir ve farklı kurumların değerlendirmeleri arasında tutarsızlıklar olabilir.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#fe932c] mt-0.5 text-[20px]">warning</span>
              <span className="text-sm">Sistem Türkiye, AB ve ABD mevzuatını temel alır; diğer ülkelerdeki yasal durumlar farklılık gösterebilir.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#fe932c] mt-0.5 text-[20px]">warning</span>
              <span className="text-sm">Katkı maddelerinin bireysel etkileri kişiden kişiye, doz ve tüketim süresine göre farklılık gösterir.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Contact & Reporting */}
      <section className="mb-8">
        <h2 className="text-headline-md text-[#121c28] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006948]">contact_support</span>
          İletişim ve Hata Bildirimi
        </h2>
        
        <div className="bg-white border border-[#bccac0] rounded-xl p-6">
          <p className="text-body-md text-[#3d4a42] mb-4">
            Yanlış veya güncel olmayan bilgi tespit ederseniz, veri güvenliğiyle ilgili bir endişeniz varsa 
            veya KVKK kapsamındaki haklarınızı kullanmak istiyorsanız bizimle iletişime geçebilirsiniz.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="bg-[#f8f9ff] rounded-lg p-3 border border-[#bccac0]">
              <p className="text-sm text-[#3d4a42]"><strong>Genel Sorular:</strong></p>
              <a href="mailto:info@gidakatkiradar.com" className="text-[#006948] text-sm hover:underline">info@gidakatkiradar.com</a>
            </div>
            <div className="bg-[#f8f9ff] rounded-lg p-3 border border-[#bccac0]">
              <p className="text-sm text-[#3d4a42]"><strong>Hata Bildirimi:</strong></p>
              <a href="mailto:info@gidakatkiradar.com" className="text-[#006948] text-sm hover:underline">info@gidakatkiradar.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <div className="text-center text-sm text-[#6d7a72] pt-8 border-t border-[#bccac0]">
        <p>Bu sayfa son güncelleme: Haziran 2025</p>
        <p className="mt-1 text-xs">
          Sakarya Üniversitesi - Bilgisayar ve Bilişim Bilimleri Fakültesi - BSM498 Bitirme Çalışması
        </p>
      </div>
    </motion.div>
  );
}
