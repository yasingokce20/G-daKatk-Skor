# Active Context: AdditiveIndex

## Current Focus
**Phase 1: UI/UX & Content Improvements** - ✅ **TAMAMLANDI**

Tüm Phase 1 özellikleri başarıyla tamamlandı. Phase 2 (Kullanıcı Sistemi) için hazırız.

## Recent Changes (Phase 1 - Son Tamamlananlar)
- ✅ Ürünler listesi sayfasına breadcrumb navigation eklendi
- ✅ Dark/Light tema sistemi implemente edildi (ThemeProvider + localStorage + Material Symbols)
- ✅ Veri Güvenliği ve Etik sayfası oluşturuldu (4 kaynak, risk metodolojisi, etik ilkeler)
- ✅ Geliştiriciler için interaktif API Rehberi oluşturuldu (4 tab: Genel Bakış, Katkı Maddeleri, Ürünler, İstatistikler)
- ✅ Footer linkleri güncellendi
- ✅ Dark mode CSS değişkenleri eklendi

## Next Steps (Phase 2 - Kullanıcı Sistemi)
1. User entity oluştur (id, email, username, passwordHash, role, createdAt)
2. JWT authentication backend implementasyonu
3. Login/Register API endpoints
4. Frontend auth context ve protected routes
5. Login/Register sayfaları

## Notes
- Tüm yeni sayfalar Material Design 3 tasarımına uygun oluşturuldu
- API rehberi sayfası kod örnekleri ve interaktif tab'lar içeriyor
- Tema değişikliği anında uygulanıyor ve localStorage'da saklanıyor

## Active Decisions & Considerations
- **Architecture:** Single-project API. Split to Clean Architecture later if needed.
- **Risk Enum:** `Safe, Low, Moderate, High, Banned` stored as strings in SQLite.
- **Frontend Integration:** React + TypeScript + Vite in `AdditiveIndex.Web/` as monorepo sibling.
- **Community Page:** `Discussion` entity preserved (not in demo but in .NET API).

## Learnings & Insights
- Demo uses `@workspace/api-client-react` hooks for data fetching; these need to be adapted/replaced for direct API calls.
- Demo's `E338` (phosphoric acid) and some other eCodes in links are not in seed data; links are safely filtered.
