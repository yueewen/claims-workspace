# AI Journey – Claims Workspace Frontend

This log records how the frontend was built with GitHub Copilot (agent mode in VS Code): each request, what the AI did, the problems it ran into, and how they were fixed.

## Timeline at a Glance

| # | Request | Outcome |
|---|---|---|
| 1 | Scaffold the workspace and role-based login | Two apps + shared library, login for both roles |
| 2 | Build and check for errors | All builds clean |
| 3 | Run the project | Backend + both apps running |
| 4 | Open the frontend in a browser | Found and fixed a blank-page routing bug |
| 5 | Show the post-login pages | Verified login end-to-end for both roles |
| 6 | Why is the API base URL a token? | Explained the `InjectionToken` design |
| 7 | Write documentation | `FRONTEND.md` + this journey log |

---

## Session 1 – Scaffolding and Login

### Request 1: Create the workspace and login pages

**Prompt (summary):** Given the requirements, for claimants (report, track, provide information, receive decisions) and claims staff (pick up, assess, settle/reject, team workload), create a login page for both roles as **separate projects in one workspace**, following a proposed folder structure. An existing workspace and the `ClaimServiceSystem` backend were provided.

**What the AI did**

1. **Checked the backend first.** It found an existing `AuthController` (`POST /api/v1/auth/login`), `AuthService`, and seeded users (`claimant1`, `staff1`), so no backend auth scaffolding was needed.
2. **Generated the projects** with the Angular CLI: `claimant-app`, `staff-app`, and the `claims-shared` library.
3. **Adapted the proposed structure to Angular 20.** The proposal used `app.module.ts` / `app-routing.module.ts`. The AI used standalone components with `app.config.ts` / `app.routes.ts` (the current Angular default), keeping the same `core / layouts / features` folders.
4. **Built the auth slice in each app:** `AuthService` (signals + sessionStorage), `Login` component, `authGuard`, `authInterceptor`, `AuthLayout`, and a role-specific layout with a navbar.
5. **Added role enforcement.** Each app rejects a login if the backend returns the wrong role (`Claimant` vs `ClaimStaff`).
6. **Created the shared library:** models, `ClaimsApiService`, `ReferenceDataService`, `NotificationService`, shared UI components, utilities, and the `API_BASE_URL` token.
7. **Scaffolded the feature folders** with placeholder components.
8. **Backend change:** added a `LocalClients` CORS policy for ports 4200 and 4201. None existed before.
9. Added Bootstrap 5 through the global `styles`/`scripts` entries in `angular.json`.

**Problems hit and resolved**

| Problem | Cause | Fix |
|---|---|---|
| `npx ng generate ...` failed: "could not determine executable to run" | npx resolution issue in Windows PowerShell; first run was also in the wrong directory | Ran `node_modules\.bin\ng.cmd` from the workspace folder |
| CLI prompts for SSR / zoneless | Interactive generator | User answered: no SSR, keep zone.js |
| TS2729 "used before initialization" | A field initializer referenced a constructor parameter property under the esbuild build | Used `inject()` for that dependency |

### Request 2: "Run and build to check if has any error"

The AI built `claims-shared`, `claimant-app`, `staff-app`, and the .NET solution (`dotnet build ClaimServiceSystem.slnx`). **Result:** no errors or warnings, apart from an informational .NET preview-SDK notice.

---

## Session 2 – Running, Debugging, and Documenting

### Request 3: "Can you run the project?"

- Started both Angular dev servers (ports 4200 and 4201).
- The first backend attempt picked the wrong `.csproj` (`Claims.Application`, a class library). The AI found the project that has `Properties/launchSettings.json` (`ClaimServiceSystem/ClaimServiceSystem`) and ran it with `--launch-profile https`.
- Checked the listening ports (7132, 4200, 4201) to confirm all three services were up.

### Request 4: "Run the frontend and open the browser"

**Symptom:** both apps opened to a **blank page** at `/`.

**Investigation**

1. A screenshot showed an empty page.
2. A Playwright script found no console errors. The DOM showed `<app-auth-layout>` rendered with an **empty** `<router-outlet>`.
3. In `app.routes.ts`, the auth layout was registered at `path: ''` with a single child `login`. For `/`, the router matched that first `''` route, rendered the layout, found no matching child, and never reached the guarded layout.

**Fix** (both apps):

```ts
// before
{ path: '',      component: AuthLayout, children: [{ path: 'login', component: Login }] },
// after
{ path: 'login', component: AuthLayout, children: [{ path: '',      component: Login }] },
```

**Verified:** both apps now redirect `/` → (guard) → `/login` and show the login forms.

### Request 5: "Show the after-login page"

The AI used browser automation to log in to both portals with the seeded users:

| App | Landed on | Navigation |
|---|---|---|
| staff-app (`staff1`) | `/dashboard` | Dashboard, Claims Queue, My Claims, Team Overview, Log out |
| claimant-app (`claimant1`) | `/my-claims` | My Claims, Submit a Claim, Log out |

This confirmed the full chain worked end to end: CORS, JWT login, role check, session storage, guard, and layout. Feature pages are still placeholders.

### Request 6: "Why is the API base URL a token?"

**Explanation given:**
- The shared library must not import app-specific `environment` files.
- A plain `string` can't be a DI key, so `InjectionToken<string>` gives it a typed, unique key.
- Each app provides its own value in `app.config.ts`. This allows per-app and per-environment URLs and easy mocking in tests.

### Request 7: "Create documentation"

The AI produced:
- [`docs/FRONTEND.md`](FRONTEND.md) – architecture, routing, auth flow, configuration, run instructions, status.
- [`docs/AI-JOURNEY.md`](AI-JOURNEY.md) – this file.

---

## Lessons Learned

| Lesson | Detail |
|---|---|
| Inspect the backend before generating code | Auth already existed; this avoided duplicate work |
| Windows + npx | Use `node_modules\.bin\ng.cmd` when `npx ng` fails |
| Angular 20 defaults differ from older structures | Standalone + `app.config.ts` replaces `AppModule` / routing modules |
| Empty-path layout routes | Two sibling `''` routes: the first one wins. Give the auth layout a real path |
| Building isn't the same as working | The builds passed but the app was blank. Running it in a browser found the routing bug |
| Verify with the browser | Screenshot + DOM inspection pinpointed the empty `<router-outlet>` |
| Multi-project .NET solutions | Run the project that has `launchSettings.json`, not the first `.csproj` found |

## What's Next

See **Current Status → Suggested next steps** in [FRONTEND.md](FRONTEND.md#8-current-status).
