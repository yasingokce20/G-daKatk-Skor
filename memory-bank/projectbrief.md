# Project Brief: AdditiveIndex API

## Overview
A backend-focused .NET 8 Web API that provides structured, reliable data about food additives. The project serves as the single source of truth for additive information (name, E-code, health risk level, source, scientific studies) and which products contain them. Data is primarily sourced from Open Food Facts (OFF) and stored locally for consistency and performance.

## Core Goals
1. **Data Consistency First:** Prioritize accurate, reliable additive data over breadth of features at launch.
2. **Backend-Centric Learning:** Use this project to deeply learn API design, data management, EF Core, and layered architecture.
3. **Reusable Foundation:** Design the web service so it can serve as a stable backend for future frontend or mobile clients.

## Scope

### Phase 1: MVP (Tamamlandı)
- [x] Additive catalog with search and filtering (by E-code, name, risk level).
- [x] Additive detail view: name, E-code, risk level, source/origin, scientific references, products containing it.
- [x] Product catalog with search and filtering.
- [x] REST API with Swagger/OpenAPI documentation.

### Phase 2: UI/UX & Content (Aktif)
- Dark/Light tema desteği
- Veri Güvenliği ve Etik sayfası
- Geliştiriciler için API rehberi
- Breadcrumb navigation

### Phase 3: Kullanıcı & Topluluk (Planlanan)
- **Kullanıcı Sistemi:** Kayıt, giriş, JWT yetkilendirme
- **Yorum Sistemi:** Ürün ve katkı maddelerine kullanıcı yorumları
- **Blog Modülü:** Faydalı makaleler, rehberler, tartışma forumu
- **Topluluk:** Kullanıcılar konu başlığı açıp tartışabilecek

### Out of Scope
- User-generated additive data edits (core data remains admin-only).
- Admin dashboard (Phase 4+).
- Advanced analytics or ML recommendation engine.

## Success Criteria
- All API responses return consistent, well-structured DTOs.
- Database schema supports future expansion (e.g., new additive attributes, product mappings).
- 100% of core read endpoints are documented in Swagger.
