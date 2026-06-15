# CLAUDE.md

This file provides guidance to AI Coding Assistants (Claude Code, Gemini CLI, Cursor, Antigravity, etc.) when working with code in this repository.

## What This Repo Is

**GenericSuite for ReactJS** is an npm library (not a standalone app) that provides a reusable, JSON-configurable CRUD editor, menu builder, login interface, and supporting utilities for React applications. It is published to npm and consumed by downstream apps. The companion backend is [genericsuite-be](https://github.com/tomkat-cr/genericsuite-be); the AI-extended version is [genericsuite-fe-ai](https://github.com/tomkat-cr/genericsuite-fe-ai).

The package is built with Rollup and publishes to npm as CJS + ESM dual-format. It is **not** a standalone app — it is consumed by host applications.

It is part of a larger ecosystem of GenericSuite projects, including backends (genericsuite-be) and mobile packages (genericsuite-mobile). For more information about the GenericSuite ecosystem, see the [GenericSuite Basecamp](https://github.com/tomkat-cr/genericsuite-basecamp).

## Commands

```bash
# Install
npm install

# Build the library (outputs to dist/ as CJS + ESM via Rollup)
npm run build          # or: make build

# Run tests (Jest + jsdom)
npm test               # or: make test

# Run a single test file
npx jest src/lib/components/App/App.test.tsx

# Development server (react-app-rewired)
npm run start-dev

# Development server (Vite)
npm run start-dev-vite

# Build Tailwind CSS
make tailwind-build    # one-shot
make tailwind          # watch mode

# Pre-publish check (build + test)
sh scripts/npm_publish.sh pre-publish   # or: make pre-publish

# Publish to npm
sh scripts/npm_publish.sh publish       # or: make publish

# Update snapshots when UI changes intentionally
UPDATE_SNAPSHOTS=1 make publish

# Run the library as a standalone app (configured in the .env file to point to the corresponding external app backend)
make run_lib

# Run SAST testing
make sast-test
```

## Architecture

### Library Entry Point

`src/lib/index.cjs` is the Rollup input. It re-exports everything that consumers can import. `dist/cjs/index.js` and `dist/esm/index.js` are the built outputs; `dist/index.d.ts` is the generated type declarations.

### Source Layout (`src/lib/`)

| Directory | Purpose |
|---|---|
| `components/` | React components: `App`, `LoginPage`, `HomePage`, `About`, `AppFooter`, `SuperAdminOptions` (Users, GeneralConfig), `UsersMenu` (UserProfile, UsersApiKey, UsersConfig) |
| `services/` | Core logic. The Generic CRUD Editor lives here as `generic.editor.rfc.*.jsx`. Also: `db.service.jsx`, `authentication.service.jsx`, `generic.menu.service.jsx`, and utility services. |
| `helpers/` | Context providers (`AppContext.jsx`, `UserContext.jsx`), UI helpers, navigation, auth header, modal utilities, etc. |
| `constants/` | `app_constants.jsx`, `general_constants.jsx`, `class_name_constants.jsx` (Tailwind class strings for the UI) |
| `test-helpers/mocks.js` | Shared Jest mocks for use in component tests |

### Generic CRUD Editor (GCE)

The core feature. It is split into focused modules under `src/lib/services/`:

- **`generic.editor.rfc.service.jsx`** — main component (listing table, pagination, toolbar). Uses `useReducer` via `gceReducer`.
- **`generic.editor.rfc.provider.jsx`** — `MainSectionContext` / `MainSectionProvider`: React context that caches API data between child components (de-duplicates concurrent fetches via `promisesRef`).
- **`generic.editor.rfc.formpage.jsx`** — `FormPage`: the create/edit/read form, built on Formik + Yup.
- **`generic.editor.rfc.common.jsx`** — shared config processing: `setEditorParameters`, `getEditoObj`, column resolution, parent–child key wiring.
- **`generic.editor.rfc.search.jsx`** — search/filter bar.
- **`generic.editor.rfc.selector.jsx`** — select/combo field with description lookup.
- **`generic.editor.rfc.suggestion.dropdown.jsx`** — autocomplete suggestion dropdown.
- **`generic.editor.rfc.specific.func.jsx`** — pluggable pre/post-read/write hooks (`processGenericFuncArray`).
- **`generic.editor.rfc.ui.jsx`** — renders individual form field elements by type.
- **`generic.editor.rfc.timestamp.jsx`** — timestamp field handling.
- **`generic.editor.singlepage.jsx`** — single-page (non-modal) editor variant.

Consumers configure the GCE entirely through a JSON `editorConfig` prop. The JSON schema lives in `src/configs/frontend/` (frontend config) and `src/configs/backend/` (backend config, consumed by the API). No code rewriting is needed per table — just a new JSON file.

### Menu System

`generic.menu.service.jsx` fetches the menu structure from the backend API (`getMenuFromApi`), then renders it via `GenericMenuBuilder`. Routes are dynamically constructed from the API response, enabling per-user security-group filtering on the server side.

### State / Context

- **`AppContext`** (`helpers/AppContext.jsx`) — app-wide state (dark mode, menu mode, auth token).
- **`UserContext`** (`helpers/UserContext.jsx`) — current user profile.
- **`MainSectionContext`** — scoped to each GCE instance; provides fetch deduplication and caching.

### Styling

Tailwind CSS 4 is used. Class name strings are centralized in `src/lib/constants/class_name_constants.jsx` so consumers can override them. The input stylesheet is `src/input.css`; built output goes to `public/output.css`.

### Testing

Tests use Jest + `@testing-library/react` + `react-test-renderer` for snapshots. Snapshot files live in `__snapshots__/` alongside each test. Tests mock `react-markdown` at the module level. When intentional UI changes break snapshots, run `UPDATE_SNAPSHOTS=1 make publish` to regenerate them.

## Code style guidelines

### File naming
- Source files use dot-separated lowercase names: `generic.editor.rfc.formpage.jsx`, `auth-header.jsx`
- Services: `{feature}.service.jsx`; GCE sub-modules: `generic.editor.rfc.{function}.jsx`
- Production source is `.jsx`; test files are `.test.tsx`

### Component structure
- Arrow function components: `export const MyComponent = (props) => { ... }`
- No PropTypes — the codebase uses implicit contracts (duck typing)
- Prefer `useReducer` for complex state; use `useCallback` + `useMemo` in context providers to avoid unnecessary re-renders
- Custom context hooks: `useAppContext()`, `useUser()` — follow this pattern for new contexts

### Imports ordering
1. React (`import React, { ... } from 'react'`)
2. External libraries (Formik, Yup, axios, rxjs)
3. Internal services (`../services/...`)
4. Internal helpers (`../helpers/...`)
5. Constants (`../constants/...`)

### Constants
- Defined in dedicated files: `general_constants.jsx` (messages, actions), `class_name_constants.jsx` (Tailwind strings), `app_constants.jsx` (app-level config)
- Named `ALL_CAPS`: `ACTION_CREATE`, `MSG_ERROR_INVALID_CREDS`, `BUTTON_PRIMARY_CLASS`
- Never hardcode strings inline that belong in constants files

### Logging / debugging
- Every file that has conditional debug output declares `const debug = false;` at the top
- Use `console_debug_log()` (from `logging.service.jsx`) — never raw `console.log` in production paths
- Gate all debug calls: `if (debug) console_debug_log(...)`
- Track issue references in comments: `// GS-NNN - short description`

### Services vs components
- Services are stateless modules or ES6 classes (e.g., `dbApiService` with `getAll()`, `createRow()`, etc.)
- Components handle rendering and orchestrate services — they do not contain raw fetch/axios calls directly

## Security considerations

### Auth token storage
- JWT is stored **only in `localStorage`** (intentional; survives page refresh). Do not move it to memory-only state without understanding the tradeoffs.
- The token is managed via an RxJS `BehaviorSubject` (`currentUserSubject`) in `logout.service.jsx`

### API authorization
- `authHeader()` (`helpers/auth-header.jsx`) injects either `Authorization: Bearer <token>` or `x-access-tokens: <token>`, controlled by `REACT_APP_X_TOKEN`
- `dbApiService` (`services/db.service.jsx`) applies auth headers to **every** outgoing request — new API methods must do the same

### Redirect safety
- `sanitizeRedirectUrl()` in `LoginPage.jsx` enforces same-origin redirects, decodes URI components, and rejects protocol-relative URLs (`//`). Use this function whenever handling a redirect URL from user input or query params

### HTTP error / session handling
- 401/403 responses trigger auto-logout via `response.handlers.service.jsx`
- `isSessionExpired()` in `error-and-reenter.jsx` detects expired-token error messages — extend its `MSG_ERROR_INVALID_TOKEN` list if new patterns appear from the backend

### Route protection
- `PrivateRoute` (`helpers/`) checks `currentUser` before rendering — all authenticated routes must use it

### Environment variables
- API base URL and version come from `REACT_APP_API_URL` / `REACT_APP_API_VERSION`; never hardcode these
- Debug mode is toggled via `REACT_APP_DEBUG=1`
- All `process.env` reads should have safe fallbacks (e.g., `|| 'v1'`)

## Important Notes

- The files `AGENTS.md`, `GEMINI.md`, etc. (if present) have only a referece to `@CLAUDE.md` — edit only `CLAUDE.md`.
- Skills live in `.ai/skills/` (source of truth); symlinked under `.agents/skills/`, `.claude/skills/`, `.codex/skills/`, `.gemini/skills/`, and `.devin/skills/`.
