# Tech Context: AdditiveIndex

## Technology Stack
- **Runtime:** .NET 8 (LTS)
- **Project Type:** ASP.NET Core Web API
- **Database:** SQLite (file-based, ideal for local dev and portable demos)
- **ORM:** Entity Framework Core 8
- **API Documentation:** Swashbuckle.AspNetCore (Swagger + Swagger UI)
- **Validation:** FluentValidation.AspNetCore (planned)
- **External Data Source:** Open Food Facts REST API (https://world.openfoodfacts.org)

## Development Environment
- **OS:** Windows
- **IDE:** Visual Studio / VS Code
- **CLI:** `dotnet` CLI for builds, migrations, and package management
- **Git:** Repository initialized in root folder

## Key Dependencies
```
Microsoft.EntityFrameworkCore.Sqlite
Microsoft.EntityFrameworkCore.Design
Swashbuckle.AspNetCore
```

## Build & Migration Commands
```bash
# Create migration
dotnet ef migrations add <Name> --project <ProjectPath>

# Update database
dotnet ef database update --project <ProjectPath>

# Run API
dotnet run --project <ProjectPath>
```

## Constraints & Assumptions
- SQLite does not support some advanced EF features (e.g., JSON columns). Keep entity relationships simple.
- OFF API rate limits must be respected; import will be batched and throttled.
- No authentication/authorization in MVP. All endpoints are public read (community write isolated).
