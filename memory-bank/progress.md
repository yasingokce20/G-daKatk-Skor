# Progress: AdditiveIndex

## What Works
- [x] Memory Bank initialized with 6 mandatory files.
- [x] .NET 8 Web API project created (`AdditiveIndex.Api`).
- [x] SQLite + EF Core NuGet packages installed.
- [x] `Additive` entity, DTOs, and `AppDbContext` configured.
- [x] First EF migration (`InitialCreate`) created and applied.
- [x] `AdditivesController` implemented with GET/POST endpoints.
- [x] Initial git commit completed.
- [x] Seed data (`SeedData.cs`) added and verified via API responses.
- [x] API endpoints tested: list, search by E-code, filter by risk level.
- [x] `OffDataImporter` service skeleton created with `HttpClient` factory registration.
- [x] `Product` and `AdditiveProduct` (junction) entities created with EF migration.
- [x] `AdditivesController` updated to include related `Products` in detail responses.
- [x] Global exception handling middleware added and registered.
- [x] Community `Discussion` entity, DTOs, controller, and migration created and verified.

## In Progress
- [ ] Implement background import pipeline from Open Food Facts.
- [ ] Add FluentValidation for request DTOs.

## Pending
- [ ] Prepare for frontend integration (CORS, if needed).

## Known Issues
- None yet.

## Project Evolution Log
- **2026-04-26:** Project kickoff. Decision to start with single-project solution for fast iteration, migrate to Clean Architecture layers later.
