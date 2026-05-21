using Microsoft.EntityFrameworkCore;
using AdditiveIndex.Api.Models.Entities;

namespace AdditiveIndex.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        await context.Database.MigrateAsync();

        if (await context.Additives.AnyAsync()) return;

        // ── Categories ──
        var categories = new List<Category>
        {
            new() { Name = "Renklendiriciler", Description = "Gıdalara renk veren maddeler", ECodeRange = "E100-E199" },
            new() { Name = "Koruyucular", Description = "Gıdaların bozulmasını önleyen maddeler", ECodeRange = "E200-E299" },
            new() { Name = "Antioksidanlar", Description = "Oksidasyon reaksiyonlarını yavaşlatan maddeler", ECodeRange = "E300-E399" },
            new() { Name = "Emülgatörler ve Stabilizörler", Description = "Karışımları kararlı tutan maddeler", ECodeRange = "E400-E499" },
            new() { Name = "Tatlandırıcılar", Description = "Tatlılık veren doğal ve yapay maddeler", ECodeRange = "E900-E999" },
            new() { Name = "Lezzet Arttırıcılar", Description = "Gıdaların lezzetini güçlendiren maddeler", ECodeRange = "E600-E699" },
            new() { Name = "Asitler ve Asit Düzenleyiciler", Description = "pH değerini kontrol eden maddeler", ECodeRange = "E500-E599" },
        };
        await context.Categories.AddRangeAsync(categories);
        await context.SaveChangesAsync();

        var catMap = categories.ToDictionary(c => c.Name, c => c.Id);

        // ── Additives ──
        var additives = new List<Additive>
        {
            // Renklendiriciler
            new() { ECode = "E100", Name = "Curcumin", AlternativeNames = "Zerdeçal sarısı", Description = "Zerdeçaldan elde edilen sarı renklendirici.", Function = "Renklendirici", RiskLevel = RiskLevel.Safe, Source = "Doğal", CategoryId = catMap["Renklendiriciler"] },
            new() { ECode = "E102", Name = "Tartrazin", AlternativeNames = "FD&C Yellow No.5", Description = "Sarı azo boyası. Bazı çocuklarda hiperaktiviteye yol açabilir.", Function = "Renklendirici", RiskLevel = RiskLevel.Moderate, Source = "Sentetik", CategoryId = catMap["Renklendiriciler"] },
            new() { ECode = "E110", Name = "Sarı FCF", AlternativeNames = "Günbatımı sarısı, FD&C Yellow No.6", Description = "Turuncu-sarı sentetik azo boyası.", Function = "Renklendirici", RiskLevel = RiskLevel.Moderate, Source = "Sentetik", CategoryId = catMap["Renklendiriciler"] },
            new() { ECode = "E120", Name = "Karmin", AlternativeNames = "Cochineal, Kırmızı E120", Description = "Koşineal böceğinden elde edilen kırmızı renklendirici. Vegan değil.", Function = "Renklendirici", RiskLevel = RiskLevel.Low, Source = "Doğal (hayvansal)", CategoryId = catMap["Renklendiriciler"] },
            new() { ECode = "E122", Name = "Azorubine", AlternativeNames = "Carmoisine", Description = "Kırmızı azo boyası.", Function = "Renklendirici", RiskLevel = RiskLevel.Moderate, Source = "Sentetik", CategoryId = catMap["Renklendiriciler"] },
            new() { ECode = "E123", Name = "Amarant", Description = "Bazı ülkelerde yasaklı kırmızı azo boyası. ABD'de yasak.", Function = "Renklendirici", RiskLevel = RiskLevel.Banned, Source = "Sentetik", CategoryId = catMap["Renklendiriciler"] },
            new() { ECode = "E129", Name = "Allura Kırmızısı", AlternativeNames = "FD&C Red No.40", Description = "Yaygın kullanılan kırmızı sentetik boya.", Function = "Renklendirici", RiskLevel = RiskLevel.Moderate, Source = "Sentetik", CategoryId = catMap["Renklendiriciler"] },
            new() { ECode = "E150a", Name = "Düz Karamel", Description = "Şekerin ısıtılmasıyla elde edilen kahverengi renklendirici.", Function = "Renklendirici", RiskLevel = RiskLevel.Safe, Source = "Doğal", CategoryId = catMap["Renklendiriciler"] },
            new() { ECode = "E171", Name = "Titanyum Dioksit", Description = "Beyaz renklendirici. AB'de gıdalarda kullanımı 2022'de yasaklandı.", Function = "Renklendirici", RiskLevel = RiskLevel.High, Source = "Mineral", CategoryId = catMap["Renklendiriciler"] },

            // Koruyucular
            new() { ECode = "E200", Name = "Sorbik Asit", Description = "Küf ve maya önleyici doğal koruyucu.", Function = "Koruyucu", RiskLevel = RiskLevel.Safe, Source = "Doğal/Sentetik", CategoryId = catMap["Koruyucular"] },
            new() { ECode = "E202", Name = "Potasyum Sorbat", Description = "Sorbik asidin tuzu. Yaygın kullanılan küf önleyici.", Function = "Koruyucu", RiskLevel = RiskLevel.Safe, Source = "Sentetik", CategoryId = catMap["Koruyucular"] },
            new() { ECode = "E210", Name = "Benzoik Asit", Description = "Geniş spektrumlu antimikrobiyal. E222 ile kombinasyonda dikkat.", Function = "Koruyucu", RiskLevel = RiskLevel.Moderate, Source = "Doğal/Sentetik", CategoryId = catMap["Koruyucular"] },
            new() { ECode = "E211", Name = "Sodyum Benzoat", Description = "Asitli ortamda benzoik aside dönüşür. C vitamini ile birlikte benzen oluşturabilir.", Function = "Koruyucu", RiskLevel = RiskLevel.Moderate, Source = "Sentetik", CategoryId = catMap["Koruyucular"] },
            new() { ECode = "E220", Name = "Kükürt Dioksit", Description = "Güçlü koruyucu ve antioksidan. Astım hastaları için tehlikeli olabilir.", Function = "Koruyucu/Antioksidan", RiskLevel = RiskLevel.Moderate, Source = "Sentetik", CategoryId = catMap["Koruyucular"] },
            new() { ECode = "E250", Name = "Sodyum Nitrit", Description = "Et ürünlerinde kullanılan renk sabitleme ve koruyucu. Yüksek dozda kanserojen.", Function = "Koruyucu", RiskLevel = RiskLevel.High, Source = "Sentetik", CategoryId = catMap["Koruyucular"] },
            new() { ECode = "E252", Name = "Potasyum Nitrat", Description = "Et ve peynirde kullanılan nitrat. Vücutta nitrite dönüşebilir.", Function = "Koruyucu", RiskLevel = RiskLevel.Moderate, Source = "Mineral", CategoryId = catMap["Koruyucular"] },

            // Antioksidanlar
            new() { ECode = "E300", Name = "Askorbik Asit", AlternativeNames = "C Vitamini", Description = "Doğal antioksidan. Besin değeri yüksek, güvenli.", Function = "Antioksidan", RiskLevel = RiskLevel.Safe, Source = "Doğal/Sentetik", CategoryId = catMap["Antioksidanlar"] },
            new() { ECode = "E306", Name = "Tokoferoller", AlternativeNames = "E Vitamini", Description = "Doğal E vitamini karışımı. Güçlü antioksidan.", Function = "Antioksidan", RiskLevel = RiskLevel.Safe, Source = "Doğal", CategoryId = catMap["Antioksidanlar"] },
            new() { ECode = "E320", Name = "BHA", AlternativeNames = "Bütillenmiş Hidroksianisol", Description = "Sentetik antioksidan. Potansiyel karsinojen olarak tartışmalı.", Function = "Antioksidan", RiskLevel = RiskLevel.Moderate, Source = "Sentetik", CategoryId = catMap["Antioksidanlar"] },
            new() { ECode = "E321", Name = "BHT", AlternativeNames = "Bütillenmiş Hidroksitoluen", Description = "Sentetik antioksidan. Bazı araştırmalarda endokrin bozucu etkisi inceleniyor.", Function = "Antioksidan", RiskLevel = RiskLevel.Moderate, Source = "Sentetik", CategoryId = catMap["Antioksidanlar"] },

            // Emülgatörler
            new() { ECode = "E322", Name = "Lesitin", Description = "Soya veya ayçiçeğinden elde edilen emülgatör. Çok yaygın ve güvenli.", Function = "Emülgatör", RiskLevel = RiskLevel.Safe, Source = "Doğal", CategoryId = catMap["Emülgatörler ve Stabilizörler"] },
            new() { ECode = "E415", Name = "Ksantan Sakızı", Description = "Bakteri fermantasyonuyla üretilen koyulaştırıcı. Glutensiz ürünlerde yaygın.", Function = "Koyulaştırıcı/Stabilizör", RiskLevel = RiskLevel.Safe, Source = "Fermentasyon", CategoryId = catMap["Emülgatörler ve Stabilizörler"] },
            new() { ECode = "E471", Name = "Mono ve Digliseritler", Description = "Yağ asitlerinden elde edilen emülgatör. Hayvansal veya bitkisel kaynaklı olabilir.", Function = "Emülgatör", RiskLevel = RiskLevel.Safe, Source = "Hayvansal/Bitkisel", CategoryId = catMap["Emülgatörler ve Stabilizörler"] },

            // Asitler
            new() { ECode = "E330", Name = "Sitrik Asit", Description = "Doğal meyve asidi. Çok yaygın ve güvenli.", Function = "Asitlik Düzenleyici", RiskLevel = RiskLevel.Safe, Source = "Doğal/Fermentasyon", CategoryId = catMap["Asitler ve Asit Düzenleyiciler"] },
            new() { ECode = "E450", Name = "Difosfatlar", Description = "Kabarma maddesi ve pH düzenleyici. Fazla tüketimde böbrek yükü.", Function = "Kabarma Maddesi", RiskLevel = RiskLevel.Low, Source = "Sentetik", CategoryId = catMap["Asitler ve Asit Düzenleyiciler"] },
            new() { ECode = "E500", Name = "Sodyum Karbonat", AlternativeNames = "Karbonat", Description = "Kabarma maddesi ve asitlik düzenleyici.", Function = "Kabarma Maddesi", RiskLevel = RiskLevel.Safe, Source = "Mineral", CategoryId = catMap["Asitler ve Asit Düzenleyiciler"] },

            // Lezzet Arttırıcılar
            new() { ECode = "E621", Name = "Monosodyum Glutamat", AlternativeNames = "MSG, Glutamat", Description = "Umami lezzet arttırıcı. 'Çin restoranı sendromu' iddiaları bilimsel olarak kanıtlanmamış.", Function = "Lezzet Arttırıcı", RiskLevel = RiskLevel.Moderate, Source = "Fermentasyon", CategoryId = catMap["Lezzet Arttırıcılar"] },
            new() { ECode = "E627", Name = "Disodyum Guanilat", Description = "MSG ile birlikte kullanılan nükleotid bazlı lezzet arttırıcı. Gut hastalarına uygun değil.", Function = "Lezzet Arttırıcı", RiskLevel = RiskLevel.Low, Source = "Sentetik/Doğal", CategoryId = catMap["Lezzet Arttırıcılar"] },

            // Tatlandırıcılar
            new() { ECode = "E951", Name = "Aspartam", AlternativeNames = "NutraSweet, Equal", Description = "Yapay tatlandırıcı. 2023'te IARC Grup 2B kanserojen olarak sınıflandırıldı (sınırlı kanıt).", Function = "Tatlandırıcı", RiskLevel = RiskLevel.Moderate, Source = "Sentetik", CategoryId = catMap["Tatlandırıcılar"] },
            new() { ECode = "E954", Name = "Sakkarin", Description = "En eski yapay tatlandırıcı. Eskiden kanserojen şüphesi vardı, sonraki çalışmalarda çürütüldü.", Function = "Tatlandırıcı", RiskLevel = RiskLevel.Low, Source = "Sentetik", CategoryId = catMap["Tatlandırıcılar"] },
            new() { ECode = "E960", Name = "Stevia Glikozitleri", AlternativeNames = "Stevia, Rebaudiozid A", Description = "Stevia bitkisinden elde edilen doğal tatlandırıcı. En güvenli tatlandırıcılardan biri.", Function = "Tatlandırıcı", RiskLevel = RiskLevel.Safe, Source = "Doğal", CategoryId = catMap["Tatlandırıcılar"] },
        };
        await context.Additives.AddRangeAsync(additives);
        await context.SaveChangesAsync();

        var additiveMap = additives.ToDictionary(a => a.ECode, a => a.Id);

        // ── References ──
        var references = new List<Reference>
        {
            new() { AdditiveId = additiveMap["E102"], Title = "Food colours and hyperactivity", Authors = "McCann D, et al.", Journal = "The Lancet", Year = 2007, Doi = "10.1016/S0140-6736(07)61306-3", Source = "PubMed", Summary = "Gıda boyalarının çocuklarda hiperaktiviteyi artırdığını gösteren öncü çalışma." },
            new() { AdditiveId = additiveMap["E211"], Title = "Benzene in beverages", Authors = "FDA", Journal = "FDA Report", Year = 2006, Url = "https://www.fda.gov", Source = "FDA", Summary = "E211 ve C vitamini birleşiminin sıcakta benzen ürettiğini belgeleyen FDA raporu." },
            new() { AdditiveId = additiveMap["E250"], Title = "Carcinogenicity of nitrate and nitrite", Authors = "IARC Working Group", Journal = "IARC Monographs", Year = 2010, Source = "IARC", Summary = "İşlenmiş et tüketiminde nitritler Grup 1 kanserojen olarak sınıflandırıldı." },
            new() { AdditiveId = additiveMap["E951"], Title = "Aspartame hazard and risk assessment", Authors = "IARC/JECFA", Journal = "WHO Report", Year = 2023, Url = "https://www.who.int", Source = "WHO/IARC", Summary = "IARC aspartamı 2B olası kanserojen olarak sınıflandırdı; JECFA günlük tüketim sınırını koruyucu buldu." },
            new() { AdditiveId = additiveMap["E171"], Title = "Titanium dioxide genotoxicity", Authors = "EFSA Panel", Journal = "EFSA Journal", Year = 2021, Source = "EFSA", Summary = "EFSA E171'in artık gıdalarda güvenli kabul edilemeyeceğine hükmetti." },
            new() { AdditiveId = additiveMap["E320"], Title = "BHA safety assessment", Authors = "EFSA ANS Panel", Journal = "EFSA Journal", Year = 2012, Source = "EFSA", Summary = "BHA'nın kabul edilebilir günlük alımı ve potansiyel riskleri değerlendirildi." },
            new() { AdditiveId = additiveMap["E621"], Title = "Monosodium glutamate safety review", Authors = "EFSA", Journal = "EFSA Journal", Year = 2017, Source = "EFSA", Summary = "EFSA MSG için günlük tolere edilebilir alım değeri belirledi." },
        };
        await context.References.AddRangeAsync(references);
        await context.SaveChangesAsync();

        // ── Products ──
        var products = new List<Product>
        {
            new() { Name = "Ülker Çikolatalı Gofret", Brand = "Ülker", ProductCategory = "Atıştırmalık", Barcode = "8690504001836", Description = "Çikolata kaplı gofret." },
            new() { Name = "Ülker Dankek Kek", Brand = "Ülker", ProductCategory = "Atıştırmalık", Barcode = "8690504010319" },
            new() { Name = "Ülker Bisküvi", Brand = "Ülker", ProductCategory = "Bisküvi", Barcode = "8690504012313" },
            new() { Name = "Ülker Kremolu", Brand = "Ülker", ProductCategory = "Bisküvi", Barcode = "8690504014027" },
            new() { Name = "Coca-Cola Klasik", Brand = "Coca-Cola", ProductCategory = "İçecek", Barcode = "5449000000996", Description = "Klasik kola içeceği." },
            new() { Name = "Coca-Cola Şekersiz", Brand = "Coca-Cola", ProductCategory = "İçecek", Barcode = "5449000131836", Description = "Şekersiz kola içeceği." },
            new() { Name = "Fanta Portakal", Brand = "Fanta", ProductCategory = "İçecek", Barcode = "5449000054227" },
            new() { Name = "Doritos Nacho Peynirli", Brand = "Doritos", ProductCategory = "Cips", Barcode = "8690632400014", Description = "Peynir aromalı mısır cipsi." },
            new() { Name = "Doritos Acı Biberli", Brand = "Doritos", ProductCategory = "Cips", Barcode = "8690632400021" },
            new() { Name = "Lay's Klasik", Brand = "Lay's", ProductCategory = "Cips", Barcode = "8690632500011" },
            new() { Name = "Lay's Ketchup", Brand = "Lay's", ProductCategory = "Cips", Barcode = "8690632500028" },
            new() { Name = "Pınar Sosis", Brand = "Pınar", ProductCategory = "Et Ürünü", Barcode = "8690041010014", Description = "Dana ve tavuk sosis." },
            new() { Name = "Pınar Sucuk", Brand = "Pınar", ProductCategory = "Et Ürünü", Barcode = "8690041020013" },
            new() { Name = "Pınar Tam Yağlı Süt", Brand = "Pınar", ProductCategory = "Süt Ürünü", Barcode = "8690041030012" },
            new() { Name = "Danone Aktivia Yoğurt", Brand = "Danone", ProductCategory = "Süt Ürünü", Barcode = "8690569001013" },
            new() { Name = "Danone Yoğurt", Brand = "Danone", ProductCategory = "Süt Ürünü", Barcode = "8690569001020" },
            new() { Name = "Eti Browni", Brand = "Eti", ProductCategory = "Atıştırmalık", Barcode = "8690526010116" },
            new() { Name = "Eti Puf", Brand = "Eti", ProductCategory = "Atıştırmalık", Barcode = "8690526010123" },
            new() { Name = "Eti Cin Bisküvi", Brand = "Eti", ProductCategory = "Bisküvi", Barcode = "8690526010130" },
            new() { Name = "Nestle KitKat", Brand = "Nestle", ProductCategory = "Çikolata", Barcode = "7613035995924" },
            new() { Name = "Nestle Nesquik", Brand = "Nestle", ProductCategory = "İçecek", Barcode = "7613033135330" },
            new() { Name = "Magnum Classic", Brand = "Algida", ProductCategory = "Dondurma", Barcode = "8690632600012" },
            new() { Name = "Algida Cornetto", Brand = "Algida", ProductCategory = "Dondurma", Barcode = "8690632600029" },
            new() { Name = "Haribo Goldbears", Brand = "Haribo", ProductCategory = "Şekerleme", Barcode = "4001686301004" },
            new() { Name = "Haribo Happy Cola", Brand = "Haribo", ProductCategory = "Şekerleme", Barcode = "4001686301011" },
            new() { Name = "Knorr Çorba", Brand = "Knorr", ProductCategory = "Hazır Yemek", Barcode = "8712566000011" },
            new() { Name = "Pınar Kaşar Peynir", Brand = "Pınar", ProductCategory = "Süt Ürünü", Barcode = "8690041040011" },
            new() { Name = "Ülker Hanımeller", Brand = "Ülker", ProductCategory = "Bisküvi", Barcode = "8690504020011" },
            new() { Name = "Tadım Antep Fıstığı", Brand = "Tadım", ProductCategory = "Kuruyemiş", Barcode = "8690515010013" },
        };
        await context.Products.AddRangeAsync(products);
        await context.SaveChangesAsync();

        var productMap = products.ToDictionary(p => p.Name, p => p.Id);

        // ── Product-Additive links ──
        var links = new (string Product, string ECode)[]
        {
            ("Ülker Çikolatalı Gofret", "E322"), ("Ülker Çikolatalı Gofret", "E471"), ("Ülker Çikolatalı Gofret", "E500"),
            ("Ülker Dankek Kek", "E322"), ("Ülker Dankek Kek", "E500"), ("Ülker Dankek Kek", "E471"),
            ("Ülker Bisküvi", "E322"), ("Ülker Bisküvi", "E500"),
            ("Ülker Kremolu", "E322"), ("Ülker Kremolu", "E471"), ("Ülker Kremolu", "E500"),
            ("Coca-Cola Klasik", "E150a"), ("Coca-Cola Klasik", "E330"),
            ("Coca-Cola Şekersiz", "E150a"), ("Coca-Cola Şekersiz", "E330"), ("Coca-Cola Şekersiz", "E951"), ("Coca-Cola Şekersiz", "E954"), ("Coca-Cola Şekersiz", "E211"),
            ("Fanta Portakal", "E110"), ("Fanta Portakal", "E330"), ("Fanta Portakal", "E211"),
            ("Doritos Nacho Peynirli", "E621"), ("Doritos Nacho Peynirli", "E627"), ("Doritos Nacho Peynirli", "E330"), ("Doritos Nacho Peynirli", "E322"),
            ("Doritos Acı Biberli", "E621"), ("Doritos Acı Biberli", "E627"), ("Doritos Acı Biberli", "E330"),
            ("Lay's Klasik", "E621"), ("Lay's Klasik", "E627"),
            ("Lay's Ketchup", "E621"), ("Lay's Ketchup", "E627"), ("Lay's Ketchup", "E129"),
            ("Pınar Sosis", "E250"), ("Pınar Sosis", "E252"), ("Pınar Sosis", "E621"),
            ("Pınar Sucuk", "E250"), ("Pınar Sucuk", "E252"),
            ("Danone Aktivia Yoğurt", "E415"),
            ("Danone Yoğurt", "E415"),
            ("Eti Browni", "E322"), ("Eti Browni", "E471"), ("Eti Browni", "E500"),
            ("Eti Puf", "E110"), ("Eti Puf", "E129"), ("Eti Puf", "E322"),
            ("Eti Cin Bisküvi", "E322"), ("Eti Cin Bisküvi", "E500"),
            ("Nestle KitKat", "E322"), ("Nestle KitKat", "E471"),
            ("Nestle Nesquik", "E322"),
            ("Magnum Classic", "E322"), ("Magnum Classic", "E471"),
            ("Algida Cornetto", "E322"), ("Algida Cornetto", "E471"),
            ("Haribo Goldbears", "E102"), ("Haribo Goldbears", "E110"), ("Haribo Goldbears", "E129"), ("Haribo Goldbears", "E322"),
            ("Haribo Happy Cola", "E102"), ("Haribo Happy Cola", "E110"), ("Haribo Happy Cola", "E129"),
            ("Knorr Çorba", "E621"), ("Knorr Çorba", "E627"), ("Knorr Çorba", "E330"),
            ("Pınar Kaşar Peynir", "E252"),
            ("Ülker Hanımeller", "E322"), ("Ülker Hanımeller", "E471"),
        };

        var validLinks = links
            .Where(l => productMap.ContainsKey(l.Product) && additiveMap.ContainsKey(l.ECode))
            .Select(l => new AdditiveProduct { ProductId = productMap[l.Product], AdditiveId = additiveMap[l.ECode] })
            .ToList();

        await context.AdditiveProducts.AddRangeAsync(validLinks);
        await context.SaveChangesAsync();
    }
}
