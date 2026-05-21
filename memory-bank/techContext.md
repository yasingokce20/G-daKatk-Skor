# Tech Context: AdditiveIndex

## Technology Stack
### Backend
- **Runtime:** .NET 8 (LTS)
- **Project Type:** ASP.NET Core Web API
- **Database:** SQLite (file-based, ideal for local dev and portable demos)
- **ORM:** Entity Framework Core 8
- **API Documentation:** Swashbuckle.AspNetCore (Swagger + Swagger UI)
- **Validation:** FluentValidation.AspNetCore (planned)
- **External Data Source:** Open Food Facts REST API (https://world.openfoodfacts.org)

### Frontend (`AdditiveIndex.Web/`)
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4 + shadcn/ui (new-york style)
- **Routing:** wouter
- **Data Fetching:** @tanstack/react-query 5
- **Charts:** recharts
- **Animation:** framer-motion
- **Icons:** lucide-react
- **API Client:** Internalized orval-generated hooks in `src/api/`

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

## Build & Run Commands
```bash
# Backend (.NET API on port 5004)
dotnet ef migrations add <Name> --project AdditiveIndex.Api
dotnet ef database update --project AdditiveIndex.Api
dotnet run --project AdditiveIndex.Api --urls "http://localhost:5004"

# Frontend (Vite dev server on port 5173, proxies /api/* to :5004)
cd AdditiveIndex.Web && npm run dev
```

## Constraints & Assumptions
- SQLite does not support some advanced EF features (e.g., JSON columns). Keep entity relationships simple.
- OFF API rate limits must be respected; import will be batched and throttled.
- No authentication/authorization in MVP. All endpoints are public read (community write isolated).
