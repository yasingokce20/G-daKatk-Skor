# Progress: AdditiveIndex

## What Works
- [x] Memory Bank initialized with 6 mandatory files.
- [x] .NET 8 Web API project created (`AdditiveIndex.Api`).
- [x] SQLite + EF Core NuGet packages installed.
- [x] RiskLevel enum updated: `Safe, Low, Moderate, High, Banned`.
- [x] `Category` and `Reference` entities added.
- [x] `Additive` entity extended: alternativeNames, function, adiBySafety, regulatoryStatus, sourceDetails, categoryId.
- [x] `Product` entity extended: productCategory, description. Brand now required.
- [x] `AppDbContext` updated with new entities and full relationship configuration.
- [x] DTOs fully rewritten to match demo OpenAPI spec (pagination, category, reference, stats DTOs).
- [x] `AdditivesController` rewritten with pagination, filtering (riskLevel, categoryId, source, search), sorting, CRUD.
- [x] `CategoriesController` created (GET all).
- [x] `ReferencesController` created (GET with optional additiveId filter, POST).
- [x] `ProductsController` created (GET list with pagination/filter, GET by id with additives, GET products by additive).
- [x] `StatsController` created (overview, risk-distribution, category-distribution).
- [x] `HealthController` created (GET /api/healthz).
- [x] Seed data updated: 7 categories, 31 additives, 7 references, 29 products, ~60 product-additive links.
- [x] EF Core migration recreated from scratch (`InitialCreate`).
- [x] CORS enabled for frontend integration.
- [x] JSON serialization configured with camelCase and string enum converter.
- [x] Build and run verified successfully on `http://localhost:5004`.
- [x] Global exception handling middleware active.
- [x] Community `Discussion` entity and controller preserved.
- [x] `OffDataImporter` service updated for new Product entity shape.

- [x] React frontend copied from demo into `AdditiveIndex.Web/` as monorepo sibling.
- [x] `@workspace/api-client-react` library internalized to `src/api/` (no workspace dependency).
- [x] All `@workspace/api-client-react` imports replaced with `@/api`.
- [x] Vite proxy configured: `/api/*` → `http://localhost:5004`.
- [x] npm install + Vite dev server verified (http://localhost:5173).
- [x] API proxy verified: frontend fetches data from .NET API successfully.

## In Progress
- None.

## Pending
- [ ] Add FluentValidation for request DTOs.

## Known Issues
- None.

## Project Evolution Log
- **2026-04-26:** Project kickoff. Decision to start with single-project solution for fast iteration.
- **2026-04-27:** Yol A implemented: .NET API fully aligned with demo OpenAPI spec. All entities, DTOs, controllers, seed data, and migrations updated.
- **2026-05-21:** React frontend integrated into `AdditiveIndex.Web/`. API client internalized, Vite proxy configured, both servers verified working.
