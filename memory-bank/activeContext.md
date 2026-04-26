# Active Context: AdditiveIndex

## Current Focus
Project initialization and foundational setup:
- Memory Bank created and populated.
- .NET 8 Web API project scaffolded.
- SQLite + EF Core packages added.
- Initial `Additive` entity and DTOs defined.

## Recent Changes
- Created `memory-bank/` folder and 6 mandatory Markdown files per Memory Bank protocol.
- Initialized repository with `dotnet new webapi`.
- Added NuGet packages: `Microsoft.EntityFrameworkCore.Sqlite`, `Microsoft.EntityFrameworkCore.Design`, `Swashbuckle.AspNetCore`.

## Next Steps (Immediate)
1. Configure `DbContext` with SQLite connection string.
2. Create the initial database migration (`AdditivesDbInitial`).
3. Seed a small set of sample additives for manual testing.
4. Implement the first controller: `AdditivesController` with GET endpoints (list, detail, search by E-code).
5. Verify Swagger UI loads and endpoints return expected DTO shapes.

## Active Decisions & Considerations
- **Architecture:** We will start with a single-project API solution (Controllers + Services + Data in one assembly) to keep iteration fast. If complexity grows, we will split into Clean Architecture layers (Domain, Application, Infrastructure, API).
- **Risk Enum:** Additive risk levels will use an enum (`None`, `Low`, `Medium`, `High`, `Unknown`) stored as strings in SQLite for readability.
- **OFF Integration:** Deferred until the core entity model is stable and migrations are working. We will build a dedicated `OffDataImporter` service later.
- **Community Page:** Will be a simple `Discussion` entity (Id, Username, Message, CreatedAt) with GET/POST endpoints. No edit/delete for now.

## Learnings & Insights
- Starting with a minimal, working API beats over-engineering layers upfront.
- SQLite is ideal for local development and demo deployments; migration to PostgreSQL is possible later without EF Core changes.
