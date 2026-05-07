// This file is the PUBLIC API for the listings feature.
//
// Think of it as the "front door" to everything inside this feature.
//
// Why this exists:
// - Other parts of the app should ONLY import from here
// - Prevents tight coupling to internal file structure
// - Makes refactoring easier (you can move files without breaking imports)
//
// Rule:
// ❌ Do NOT import from: features/listings/components/... or pages/...
// ✅ ONLY import from: features/listings

export { ListingsPage } from './pages/ListingsPage';