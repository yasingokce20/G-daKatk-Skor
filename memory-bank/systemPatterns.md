# System Patterns: AdditiveIndex

## Architecture
- **Pattern:** Layered / Clean Architecture (lightweight single-project start, split later if needed).
- **Layers:**
  - **API (Controllers):** Thin controllers with inline mapping. `AdditivesController`, `CategoriesController`, `ReferencesController`, `ProductsController`, `StatsController`, `HealthController`, `DiscussionsController`, `ImportController`, `AuthController`, `CommentsController`, `BlogController`.
  - **Application (Services):** `OffDataImporter` for OFF API integration, `JwtService` for authentication.
  - **Domain (Entities):** `Additive`, `Product`, `AdditiveProduct`, `Category`, `Reference`, `Discussion`, `User`, `Comment`, `BlogPost`, `BlogCategory`.
  - **Data (DbContext / Seed):** EF Core `AppDbContext`, `SeedData`.

### New Entities (Phase 2-4)
- **User:** id, email, username, passwordHash, role (user/admin), createdAt
- **Comment:** id, userId, targetType (additive/product), targetId, content, createdAt, isApproved
- **BlogPost:** id, title, slug, content, authorId, categoryId, type (article/discussion), status, createdAt
- **BlogCategory:** id, name, description

## Design Patterns
- **DTO Pattern:** All API inputs/outputs use DTOs. Separate list DTOs with pagination envelope.
- **Pagination Envelope:** List endpoints return `{ data: [...], pagination: { page, limit, total, totalPages } }`.
- **Global Exception Handling:** Middleware catches unhandled exceptions and returns sanitized error responses.
- **CORS:** Open CORS policy for frontend development.

## Data Integrity
- **EF Core Security:** All queries via LINQ with parameterized expressions. No raw SQL concatenation.
- **Enum Storage:** `RiskLevel` enum stored as `string` in SQLite (`Safe, Low, Moderate, High, Banned`).
- **JSON Serialization:** camelCase property names, string enum converter (lowercase).
- **Cascade Deletes:** Reference → Additive (cascade). Additive → Category (SetNull).

## API Design
- **RESTful endpoints:**
  - `GET/POST/PUT/DELETE /api/additives` - full CRUD with pagination, filtering, sorting.
  - `GET /api/additives/{id}` - detail with category and references.
  - `GET /api/additives/by-ecode/{eCode}` - lookup by E-code.
  - `GET /api/additives/{id}/products` - products containing additive.
  - `GET /api/categories` - all categories.
  - `GET/POST /api/references` - with optional `?additiveId=` filter.
  - `GET /api/products` - paginated with search/filter.
  - `GET /api/products/{id}` - detail with additives.
  - `GET /api/stats/overview|risk-distribution|category-distribution` - dashboard stats.
  - `GET /api/healthz` - health check.
  - `POST /api/auth/register|login` - JWT authentication.
  - `GET/POST /api/comments?targetType=&targetId=` - comments on additives/products.
  - `GET/POST /api/blog/posts` - blog articles and discussions.
  - `GET/POST /api/blog/categories` - blog categories.
  - `POST /api/import/product/{barcode}` - OFF import.
