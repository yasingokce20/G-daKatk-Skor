# Active Context: AdditiveIndex

## Current Focus
Frontend integration is **complete**. Both .NET API and React frontend are running and connected.

## Recent Changes
- React frontend copied from demo into `AdditiveIndex.Web/`.
- `@workspace/api-client-react` internalized to `src/api/` (custom-fetch + generated hooks/schemas).
- Vite proxy: `/api/*` → `http://localhost:5004`.
- All pages: Dashboard, Additives (list/detail), Products (list/detail), Categories, Docs.
- shadcn/ui components, Tailwind CSS 4, framer-motion, wouter router, React Query.

## Next Steps (Immediate)
1. Verify all pages render correctly in the browser.
2. Add FluentValidation for request DTOs (backend).
3. Polish UI/UX if needed.

## Active Decisions & Considerations
- **Architecture:** Single-project API. Split to Clean Architecture later if needed.
- **Risk Enum:** `Safe, Low, Moderate, High, Banned` stored as strings in SQLite.
- **Frontend Integration:** React + TypeScript + Vite in `AdditiveIndex.Web/` as monorepo sibling.
- **Community Page:** `Discussion` entity preserved (not in demo but in .NET API).

## Learnings & Insights
- Demo uses `@workspace/api-client-react` hooks for data fetching; these need to be adapted/replaced for direct API calls.
- Demo's `E338` (phosphoric acid) and some other eCodes in links are not in seed data; links are safely filtered.
