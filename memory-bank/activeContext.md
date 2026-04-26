# Active Context: AdditiveIndex

## Current Focus
Core API foundation is complete and manually verified. All MVP entities and endpoints are functional. Next focus: OFF import pipeline and input validation.
- Memory Bank created and populated.
- .NET 8 Web API project scaffolded, built, and running.
- SQLite + EF Core packages added; multiple migrations applied.
- `Additive`, `Product`, `AdditiveProduct`, and `Discussion` entities defined.
- Seed data verified through live API calls (8 additives, filtering + search work).
- `OffDataImporter` service skeleton created with `HttpClient` factory registration.
- Global exception handling middleware registered.
- Community `DiscussionsController` verified with POST/GET.

## Recent Changes
- Added `SeedData.cs` with 8 representative additives (E100, E102, E110, E120, E202, E211, E951, E621).
- `AdditivesController` supports query filters (`riskLevel`, `search`) and includes `Products` in detail DTOs.
- Registered `HttpClient` named "OffApi" and `OffDataImporter` scoped service in DI.
- Added `GlobalExceptionHandlerMiddleware` to prevent stack trace / schema leakage in production.
- Added `Product`, `AdditiveProduct`, and `Discussion` entities with migrations.

## Next Steps (Immediate)
1. Implement `POST /api/import/product` or background job to populate `Product` and `AdditiveProduct` links from OFF.
2. Add FluentValidation for `CreateAdditiveDto` and `CreateDiscussionDto`.
3. Evaluate whether to split into Clean Architecture layers (Domain, Application, Infrastructure, API) before OFF import complexity grows.

## Active Decisions & Considerations
- **Architecture:** We will start with a single-project API solution (Controllers + Services + Data in one assembly) to keep iteration fast. If complexity grows, we will split into Clean Architecture layers (Domain, Application, Infrastructure, API).
- **Risk Enum:** Additive risk levels will use an enum (`None`, `Low`, `Medium`, `High`, `Unknown`) stored as strings in SQLite for readability.
- **OFF Integration:** Deferred until the core entity model is stable and migrations are working. We will build a dedicated `OffDataImporter` service later.
- **Community Page:** Will be a simple `Discussion` entity (Id, Username, Message, CreatedAt) with GET/POST endpoints. No edit/delete for now.

## Learnings & Insights
- Starting with a minimal, working API beats over-engineering layers upfront.
- SQLite is ideal for local development and demo deployments; migration to PostgreSQL is possible later without EF Core changes.
