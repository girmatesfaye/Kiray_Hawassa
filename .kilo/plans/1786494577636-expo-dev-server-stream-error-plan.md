# Plan: Stabilize Expo dev server (Node v24 `ERR_STREAM_UNABLE_TO_PIPE`)

## Goal
Unblock running the app on web so the implemented screens can be validated. The blocker is a dev-server error surfaced on `expo start --web`.

## Root cause (verified)
- `npm run web` bundles `expo-router/entry.js` successfully (905/905, 99.9%), then throws while serving the response:
  ```
  Error: Cannot pipe to a closed or destroyed stream (ERR_STREAM_UNABLE_TO_PIPE)
      at pipelineImpl → respond (node_modules/expo-server/build/cjs/vendor/http.js:112)
  ```
- Installed `expo-server@1.0.7` (SDK 54, deduped under `expo@54.0.36` / `@expo/cli@54.0.26`) `respond()` pipes `Readable.fromWeb(expoRes.body)` to `res` **without** checking `res.destroyed` / `writableEnded`.
- Upstream fix is expo PR #43305 ("Check `writableEnded` and `destroyed` before continuing with the `respond` logic"), shipped in `expo-server` starting at the **SDK-55** line (`55.0.11`, verified: guarded `respond()` + `signal` passed to `pipeline` + `convertRequest` wired to abort on `res.close`/`error`).
- The installed `expo-server@1.0.7` is the **latest stable SDK-54** release — the guard is NOT back-ported to SDK 54.
- On **Node v24.12.0** `pipeline` rejects eagerly at initiation with `ERR_STREAM_UNABLE_TO_PIPE`; on Node v22 the same disconnect surfaces as `ERR_STREAM_PREMATURE_CLOSE` (still a logged exception without the guard). This is the client-disconnect-during-bundle path (bundle took ~230s on web → browser tab likely closed/reloaded mid-stream).

## Scope decisions
- **Screen cross-check**: DONE. All route-group screens in `app/(auth)`, `app/(onboarding)`, `app/(landlord)`, `app/(tenant)`, `app/(staff)` exist (0 missing). The `app/screens/` stubs are intentional scaffolding (per `codebase_overview.md`); **leave them in place** — do NOT delete, do NOT refactor to re-export routes. (Out of scope.)
- **Node version**: project pins only `engines` via expo-server (`>=20.16.0`); no `.nvmrc`, no version manager installed locally.
- **Expo bump**: `expo`/`expo-router` are pinned with `~` (`expo ~54.0.35`, `expo-router ~6.0.24`). An SDK bump touches the lock file and needs migration checks.

## Recommended approach: local patch to expo-server (surgical, no SDK jump)
Durable backport of the exact upstream guard to the vendored `expo-server@1.0.7`, applied via `patch-package` so it survives `npm install`. Avoids an Expo SDK 54→55 migration while applying the real fix.

### Steps
1. **Reproduce & classify** before patching:
   - `npm run web` → observe whether the server **stays up** after the error (non-fatal) or **exits** (fatal).
   - Reload the web tab; if the bundle serves, the error is non-fatal disconnect noise (confirms root cause).
2. Add patch tooling: `npm i -D patch-package@6` (and `postinstall: "patch-package"` in `package.json`).
3. Patch the two SDK-54 files (cjs + mjs) under `node_modules/expo-server/build/.../vendor/http.js`:
   - In `respond(...)`: add `if (nodeResponse.writableEnded || nodeResponse.destroyed) return;` as the first line.
   - Pass `request.signal` into `respond` and forward `{ signal }` to `pipeline(..., res)` so aborts propagate cleanly.
4. `npx patch-package expo-server` to generate `patches/expo-server+1.0.7.patch`.
5. Commit `patches/` + `package.json` `postinstall` change (do NOT commit `node_modules/`).
6. Re-run `npm run web`; confirm no `ERR_STREAM_UNABLE_TO_PIPE` and the web preview loads.

## Alternatives (if patch tooling is rejected)
- **Node downgrade**: install Node v22.12.0 LTS (no `.nvmrc` change required). Reduces severity to `ERR_STREAM_PREMATURE_CLOSE` (still logged on disconnect) — partial mitigation, not a true fix. Requires a local version manager (none currently installed).
- **Expo upgrade 54 → 55**: `expo@~55.0.0` + `expo-router` aligned release; ships fixed `expo-server@55.x`. Real fix, but larger migration surface (review Expo 55 changelog, `expo prebuild` if applicable). Do this only if a dependency modernization sprint is already planned.

## Risks
- `patch-package` patches are lost if `patches/` isn't committed or `postinstall` isn't wired — enforce via the committed patch + `postinstall` script.
- If the team standard is "never patch node_modules," default to the **Node v22 LTS downgrade** as the interim unblock while scheduling the SDK-55 upgrade.
- The ~230s cold-bundle time for web is the real trigger; consider adding `expo start --web` caching or clearing Metro cache (`expo start -c`) to speed repeat runs.

## Validation
- `npm run web` serves the bundle and the browser preview loads with NO `Cannot pipe to a closed or destroyed stream` error.
- Reloading the web tab during/after bundle no longer prints the Node-internal stack trace.
- `npm install` re-applies the patch automatically (check `postinstall` ran: terminal shows "patching expo-server").

## Open question (for the implementer)
Confirm whether the team prefers the **patch-package backport** (recommended) or the **Node v22 LTS downgrade** as the unblock path; this plan implements the backport unless told otherwise.
