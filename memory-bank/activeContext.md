# Active Context: AdditiveIndex

## Current Focus
Core API is functional and manually verified. Moving toward OFF integration and product mapping.
- Memory Bank created and populated.
- .NET 8 Web API project scaffolded, built, and running.
- SQLite + EF Core packages added; migration applied.
- Initial `Additive` entity and DTOs defined.
- Seed data verified through live API calls (8 additives, filtering + search work).
- `OffDataImporter` service skeleton created with `HttpClient` factory registration.

## Recent Changes
- Added `SeedData.cs` with 8 representative additives (E100, E102, E110, E120, E202, E211, E951, E621).
- `AdditivesController` supports query filters (`riskLevel`, `search`).
- Registered `HttpClient` named "OffApi" and `OffDataImporter` scoped service in DI.

## Next Steps (Immediate)
1. Create `Product` and `AdditiveProduct` (junction) entities to model "which products contain which additives".
2. Add a new EF migration for the product relationship.
3. Implement `POST /api/additives/{id}/products` or an importer endpoint to populate product links from OFF.
4. Add global exception handling middleware to sanitize error responses.
5. Evaluate whether to add `Discussion` entity before or after OFF import pipeline.

## Active Decisions & Considerations
- **Architecture:** We will start with a single-project API solution (Controllers + Services + Data in one assembly) to keep iteration fast. If complexity grows, we will split into Clean Architecture layers (Domain, Application, Infrastructure, API).
- **Risk Enum:** Additive risk levels will use an enum (`None`, `Low`, `Medium`, `High`, `Unknown`) stored as strings in SQLite for readability.
- **OFF Integration:** Deferred until the core entity model is stable and migrations are working. We will build a dedicated `OffDataImporter` service later.
- **Community Page:** Will be a simple `Discussion` entity (Id, Username, Message, CreatedAt) with GET/POST endpoints. No edit/delete for now.

## Learnings & Insights
- Starting with a minimal, working API beats over-engineering layers upfront.
- SQLite is ideal for local development and demo deployments; migration to PostgreSQL is possible later without EF Core changes.
