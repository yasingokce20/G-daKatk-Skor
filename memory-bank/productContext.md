# Product Context: AdditiveIndex

## Problem Statement
Consumers struggle to understand what food additives are, where they come from, and whether they pose health risks. Existing sources are often fragmented, inconsistent, or not machine-readable. This project aims to centralize and standardize that information behind a clean, documented API.

## Target Users
- **Primary:** Frontend/web developers who will consume the API to build UIs.
- **Secondary:** Health-conscious consumers (via future web UI) looking up additives by E-code or product.
- **Tertiary:** Researchers or students referencing additive safety data.

## User Experience Goals
- **Trust:** Users must trust the data. Every additive record should clearly show its source and risk classification.
- **Speed:** API responses should be fast; local SQLite caching of OFF data is key.
- **Clarity:** Swagger docs must be accurate and up to date so integrators know exactly what to expect.

## Key Behaviors
1. A user searches for "E100" and gets the additive name, risk level, origin, and a list of products that include it.
2. A user browses additives by risk level (e.g., "High Risk") to learn which ones to avoid.
3. A user visits the community page to read discussions; no additive data is user-editable.

## Data Flow
1. **Ingestion:** OFF API is queried periodically; additive and product data is normalized and persisted to SQLite.
2. **API Layer:** Controllers expose read-only endpoints (with community write endpoints isolated).
3. **Consumption:** Future web UI calls the local API, never the OFF API directly.
