# System Patterns: AdditiveIndex

## Architecture
- **Pattern:** Layered / Clean Architecture (lightweight single-project start, split later if needed).
- **Layers:**
  - **API (Controllers):** Thin controllers delegating to services.
  - **Application (Services):** Business logic, data transformation, OFF import orchestration.
  - **Domain (Entities / DTOs):** Core models with no external dependencies.
  - **Data (DbContext / Repositories):** EF Core `DbContext`, migrations, and seeding.

## Design Patterns
- **DTO Pattern:** All API inputs/outputs use DTOs to decouple internal entities from external contracts.
- **Repository Pattern (light):** `DbContext` acts as the unit of work; explicit repositories added only if query complexity grows.
- **Global Exception Handling:** Middleware catches unhandled exceptions and returns sanitized error responses (no stack traces or DB schema leaked in production).
- **Input Validation:** FluentValidation on request DTOs before service layer execution.

## Data Integrity
- **Read-Only Core Data:** Additive records are immutable to end users. Updates only via admin/importer pipeline.
- **EF Core Security:** All queries written with LINQ or parameterized raw queries. No string concatenation into SQL.
- **Enum Storage:** `RiskLevel` enum stored as `string` in SQLite to preserve readability in DB and Swagger.

## API Design
- **RESTful conventions:** `GET /api/additives`, `GET /api/additives/{eCode}`, `GET /api/additives/{id}/products`.
- **Consistent envelope:** Future consideration: wrap list responses in a standard envelope (`{ data, totalCount, page }`).
- **Swagger annotations:** XML comments on controllers/actions for rich OpenAPI docs.
