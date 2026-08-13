# Kiray Hawassa — Agent Task Brief #2: Real Data Layer
**Context:** Prior brief (staff security, profile setup, Close Deal transaction, contact reveal, dropped leads, payouts) is implemented and verified. This brief covers the piece that was still mocked: **listings CRUD, the Post wizard, and interest creation** — the actual core marketplace loop. Nothing downstream (Leads, Close Deal, Earnings) matters to a real user until this works.

**Build order:** Task 1 (schema/storage) → Task 2 (Post wizard writes) → Task 3 (Browse reads) → Task 4 (Interest creation + connector assignment) → Task 5 (realtime status sync). Each depends on the one before it.

---

## TASK 1 — Confirm/extend schema + set up photo storage

**Files:** `supabase/migrations/`, new migration if needed

- Confirm `listings` table exists with at minimum: `id`, `landlord_id`, `title`, `description`, `price`, `type` (house/apartment/shop), `rooms`, `bathroom_type`, `has_water`, `has_electric`, `subcity`, `location_text`, `status` (`available` | `pending` | `rented_out`), `created_at`. Add whatever's missing.
- Confirm `interests` table exists with at minimum: `id`, `tenant_id`, `listing_id`, `landlord_id` (denormalized for fast lookups), `staff_id` (nullable until assigned), `status` (`waiting_for_call` | `visit_scheduled` | `linked` | `not_selected`), `created_at`.
- **Create a Supabase Storage bucket** (e.g. `listing-photos`), public-read, authenticated-write. Add an RLS/storage policy so a landlord can only upload/delete photos tied to their own listing IDs, not arbitrary paths.
- Add a `listing_photos` table (or a `photo_urls text[]` column on `listings` if you want to keep it simple for now) to track which uploaded photos belong to which listing, including which one is the cover photo.

**Acceptance:** Migration runs clean. A test insert/select against `listings` and `interests` works from the Supabase SQL editor. Storage bucket accepts an authenticated upload and rejects an unauthenticated one.

---

## TASK 2 — Wire the Post wizard to real writes

**Files:** `app/(landlord)/post/*` (Photos → Details → Commission → Review steps)

- Step 1 (Photos): replace mock photo grid with real `expo-image-picker` selection + upload to the `listing-photos` bucket. Show upload progress per photo. First uploaded photo = cover by default, keep the existing "Cover" tag UI, just wire it to a real flag now.
- Step 2 (Details): form fields write to local wizard state as before — no DB write yet, just validate and hold state (title, price, type, rooms, utilities, subcity, location, description).
- Step 3 (Commission): unchanged UI, still just a consent checkbox gating progression — no DB write here either.
- Step 4 (Review): show a live preview built from all prior steps' state (already partially exists per earlier prototype work) — this is where the actual `listings` insert plus photo-URL linking happens, on tapping "Publish." Insert status defaults to `available`.
- On success, route to a success screen and invalidate/refetch any cached listings query so the new listing shows up immediately on the landlord's Home dashboard without a manual refresh.

**Acceptance:** A landlord can complete all 4 steps and see their real listing, with real uploaded photos, appear on their own Home dashboard.

---

## TASK 3 — Wire Browse (tenant feed) to real reads

**Files:** `app/(tenant)/browse.tsx`, `app/(tenant)/listing/[id].tsx`, `features/listings/api.ts` (or equivalent)

- Replace mock listing array with a real Supabase query: all listings where `status != 'rented_out'` for the default view (rented-out ones still fetched but rendered at reduced opacity per the earlier UI spec — don't filter them out entirely, dim them).
- Wire the search bar and filter chips (price range, subcity, type, room count) to actual query params, not client-side filtering of a fixed mock array — this matters once listing counts grow beyond what's comfortable to fetch in full every time.
- Listing detail screen (`listing/[id].tsx`) fetches the single real listing by ID, including its real photo URLs for the gallery/carousel.
- Heart/save icon: wire to a `saved_listings` join table (tenant_id, listing_id) if not already present — add the table if missing.

**Acceptance:** A tenant browsing sees real landlord-posted listings, can filter them against real query params, and can open a real listing detail page with real photos.

---

## TASK 4 — Wire interest creation + connector assignment

**Files:** `app/(tenant)/listing/[id].tsx` ("I'm Interested" flow), `components/ui/ConnectorContactSheet.tsx`, `features/interests/api.ts`

- On tapping "I'm Interested": insert a real row into `interests` (tenant_id, listing_id, landlord_id from the listing, status `waiting_for_call`).
- **Connector assignment logic — keep this simple for the pilot:** since there's realistically one connector (you) for a Hawassa pilot, assignment can just be: fetch the single active `staff` profile and set `staff_id` on the interest at creation time. Don't build a load-balancing/round-robin assignment system yet — that's solving a problem you don't have at pilot scale. Leave a comment in the code noting this is a deliberate simplification if more than one connector is added later.
- `ConnectorContactSheet` now pulls the real assigned staff member's name + phone (masked/tap-to-call pattern, same as landlord/tenant contact cards elsewhere) instead of a placeholder.
- This new `interests` row is what should now actually appear in the Staff Leads list (`app/(staff)/leads.tsx`) — confirm that screen is already querying `interests` for real (it may already be, per the prior brief's Task 5 work) and that a freshly created interest shows up there without a manual refresh.

**Acceptance:** Tapping "I'm Interested" as a tenant creates a real row, shows a real connector's contact info immediately, and that same lead appears in the Staff Leads list without needing to restart the app.

---

## TASK 5 — Realtime status sync across roles

**Files:** wherever listing status and interest status are displayed (Browse, listing detail, landlord Home, tenant Interests, staff Leads)

- Once Close Deal (already implemented) flips `listings.status` to `rented_out`, that change should propagate live to anyone currently viewing that listing — use a Supabase Realtime subscription on the `listings` table (or at minimum, refetch-on-focus using `expo-router`'s screen focus events as a lighter-weight fallback if full realtime feels like scope creep right now).
- Same for `interests.status` — a tenant sitting on the Interests tab should see a lead move from `waiting_for_call` to `linked` without manually pulling to refresh, once staff closes that deal.

**Acceptance:** With two devices/sessions open (one tenant, one staff), closing a deal on the staff side visibly updates the tenant's screen within a few seconds without a manual app restart.

---

## What I'd explicitly NOT do yet
- No payment/mobile-money integration — payouts stay manual (`pending`/`paid` toggle), as already built.
- No multi-connector load balancing — single hardcoded active staff member is fine at pilot scale.
- No push notifications infrastructure if it doesn't already exist — SMS-via-whatever-was-already-wired-up for Close Deal notifications is enough; don't add a new notification system just for interest creation.

## Suggested order to hand to the agent
Task 1 → Task 2 → Task 3 → Task 4 → Task 5, one at a time, verifying `npx tsc --noEmit` and a manual click-through after each before moving to the next — this loop is what already worked well in the previous brief, no reason to change it.
