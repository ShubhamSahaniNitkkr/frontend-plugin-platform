# Frontend Plugin Platform

> Runtime-composable frontend platform with dynamic plugin loading, inspired by VS Code Extensions, Chrome Extensions, and Grafana Plugins.

<img width="2240" height="1168" alt="image" src="https://github.com/user-attachments/assets/aeee8c7e-62e9-418a-902c-f8c87b97acc9" />


## Quick Start

**Prerequisites:** Node.js 20+, npm 10+

```bash
# Install dependencies
npm install

# Copy environment config
cp .env.example .env

# Start API + Host (builds plugins first)
npm run dev
```

- **Host:** http://localhost:4321
- **API:** http://localhost:3001/api/v1
- **Demo login:** `demo@fpp.dev` / `password123`

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Build plugins + start API and host |
| `npm run build` | Production build for all packages |
| `npm test` | Run unit tests across workspaces |
| `npm run test:e2e` | Run Playwright E2E tests |

---

## Architecture

```
Host Application (Astro + React)
        ↓
Plugin Marketplace → Plugin Registry → Runtime Loading
        ↓
Plugin SDK + Event Bus + Component Registry
        ↓
Installed Plugins (Analytics, Tasks, Notifications, Reports)
```

### Monorepo Layout

```
apps/host/          Astro + React host application
apps/api/           Express REST API (SQLite)
packages/shared/    Zod schemas, types, constants
packages/event-bus/ Pub/sub event system
packages/plugin-sdk/ Plugin developer SDK
plugins/*           Reference plugin implementations
e2e/                Playwright end-to-end tests
```

---

## Core Concepts

### 1. Plugin Architecture

**What:** Modular extensions loaded at runtime via manifest + entry point. The host exposes extension points (routes, widgets, menu items) without knowing plugin internals.

**Why:** Enables independent feature delivery, team autonomy, and customer extensibility without redeploying the host.

**Alternatives:** Micro-frontends (Module Federation), feature flags, compile-time imports.

**Tradeoffs:** Added complexity in versioning, debugging, and testing vs. maximum flexibility.

### 2. Plugin Lifecycle

```
Available → install() → Installed → enable() → Enabled
Enabled → disable() → Disabled → enable() → Enabled
Installed/Disabled → uninstall() → Destroyed
```

Hooks: `onInstall`, `onEnable`, `onDisable`, `onUpdate`, `onUninstall`, `onDestroy`

**Why:** Predictable, safe state transitions with rollback on failure.

### 3. Event Bus Architecture

Plugins communicate via typed events (`task.created`, `report.generated`, `user.loggedIn`). No direct plugin-to-plugin imports.

**Why:** Loose coupling, independent deployability, permission-aware publishing.

**Alternatives:** Shared Redux store, direct imports, `postMessage`.

### 4. Runtime Loading

Plugins load via dynamic `import()` when enabled. Built artifacts deploy to `apps/host/public/plugins/`.

**Why:** Code splitting, lazy activation, smaller initial bundle.

### 5. Error Isolation

Each plugin is wrapped in `PluginBoundary` (React Error Boundary). Failures show fallback UI; host continues operating.

### 6. Plugin SDK (`@fpp/plugin-sdk`)

| API | Purpose |
|-----|---------|
| `registerPlugin()` | Register plugin with manifest + contributions |
| `registerRoute()` | Add client-side route |
| `registerWidget()` | Inject UI into host slot |
| `registerMenuItem()` | Add navigation item |
| `emitEvent()` / `subscribeEvent()` | Event bus communication |
| `getPermissions()` / `getConfiguration()` | Access control + settings |

### 7. State Management

| Layer | Tool | Stores |
|-------|------|--------|
| Client state | Redux Toolkit | User, theme, plugin metadata, plugin config |
| Server state | RTK Query | Marketplace, registry, tasks, reports |

Plugin-local state uses `useReducer` (e.g., Task Manager) — never pollutes global store.

---

## Built-in Plugins

| Plugin | Features | Concepts |
|--------|----------|----------|
| **Analytics** | Dashboard widgets, usage stats, activity charts | Widget injection, config, events |
| **Task Manager** | CRUD tasks, filtering, dashboard | Routes, `useReducer`, navigation |
| **Notifications** | Activity feed, event toasts | Event bus, compound components |
| **Reports** | Generate/export reports | Permissions, actions |

---

## React Patterns Demonstrated

| Pattern | Location |
|---------|----------|
| `React.memo` | `PluginCard`, `UsageWidget`, `Navigation` |
| `useMemo` / `useCallback` | Widget sorting, event handlers |
| `useReducer` | Task Manager state, Activity feed |
| `useRef` | Task form focus |
| Context API | `PlatformContext`, `FeedContext` |
| Custom Hooks | `usePlugin`, `useEventBus`, `usePluginSlot` |
| `Suspense` / `React.lazy` | Plugin route loading |
| Error Boundaries | `PluginBoundary`, `ErrorBoundary` |
| Compound Components | `FeedProvider` + `FeedList` |

---

## Testing

```bash
npm test              # Vitest unit tests
npm run test:e2e      # Playwright E2E
```

**Unit tests:** EventBus, ComponentRegistry, permissions, compatibility  
**E2E tests:** Marketplace flow, plugin lifecycle, dynamic navigation

---

## Tech Stack

- **Frontend:** Astro, React 18, TypeScript, Mantine UI, Redux Toolkit, RTK Query, React Hook Form, Zod
- **Backend:** Node.js, Express, TypeScript, SQLite
- **Testing:** Vitest, React Testing Library, Playwright

---

## License

MIT
