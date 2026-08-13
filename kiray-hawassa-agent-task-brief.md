# Kiray Hawassa — Agent Task Brief
**Target codebase:** Expo v54 + expo-router + NativeWind v4 + Supabase (current state: mocked auth, mocked data throughout, route groups already scaffolded per existing `app/` structure).

**How to use this doc:** Each task below is scoped to be handed to a coding agent independently. Tasks are ordered by priority. Where a design decision was ambiguous, I've made a default choice and flagged it — confirm with the product owner before implementing if the flag says "CONFIRM," otherwise proceed.

---

## DECISIONS LOCKED IN (build against these)

1. **Role model:** one role per account (`profiles.role` = `'tenant' | 'landlord' | 'staff'`), set once at onboarding. No multi-role switching for now — that was a future idea, not current scope.
2. **Contact-reveal model (CONFIRM with product owner before building, but this is the working default):**
   - Immediately after a tenant taps "I'm Interested" → the **connector's** phone number becomes visible to the tenant (connector numbers are not sensitive the way landlord/tenant numbers are).
   - Landlord and tenant phone numbers are **never** shown to each other until a `links` record is created (i.e. Close Deal → Confirm).
   - Once linked, both landlord and tenant see each other's number in-app.
3. **Payout is a status, not an instant event.** A `payouts` row is created as `pending` when a deal closes; it only becomes `paid` when staff manually marks it so. No real money-movement integration in this phase.

---

## TASK 0 — Security: Remove Staff from public role-choice (P0, do first)

**File(s):** `app/(onboarding)/role-choice.tsx`

- Remove the "Staff" option from the role-choice picker entirely. Only `Tenant` and `Landlord` should be selectable there.
- Staff accounts are provisioned out-of-band for now: add a Supabase migration giving `profiles.role` a manual override path (e.g. an admin can `UPDATE profiles SET role = 'staff' WHERE id = ...` directly, or via a Supabase Studio edit) — no in-app UI needed yet for granting staff access.
- Add a Supabase RLS policy note (see Task 6) ensuring `role = 'staff'` rows can only be set by a service-role key, never by the authenticated user themselves via client-side update.

**Acceptance:** A new signup can only become `tenant` or `landlord` through the app UI. No client-side code path can set `role = 'staff'`.

---

## TASK 1 — Split Profile Setup by role

**File(s):** `app/(onboarding)/profile-setup.tsx`

Replace the current single generic form ("Name, city, neighborhood") with role-conditional fields, branching on the role selected in the previous step:

- **Tenant fields:** Full name, Occupation, FAYIDA ID number (masked input pattern `ET-••••-••••-####`), ID photo upload. Include the trust callout copy: *"Only shared with our team once you confirm interest in a house — never shown to landlords directly."*
- **Landlord fields:** Full name, Sub-city / Kebele, ID photo upload (optional at this step; add a helper line: *"You can list a house without this, but it must be added before your first listing is shown to tenants."*).

**Acceptance:** Tenant and Landlord see visibly different forms at this step; both write to the same `profiles` table but populate role-appropriate columns (add `fayida_id`, `occupation` columns for tenant-only use, `subcity` for both, if not already present).

---

## TASK 2 — Tenant: add declined/closed states to Interests tab

**File(s):** `app/(tenant)/interests.tsx`, lead/interest data model

- Add status values beyond whatever currently exists: `waiting_for_call`, `visit_scheduled`, `linked`, `not_selected`.
- `not_selected` is set when staff marks a lead "Not Interested" (see Task 5) — surface it in the tenant's Interests list as a gray/muted pill, not just silently missing from an active list.
- `linked` state: once true, this row's UI should now also render the landlord's revealed contact info (name + full phone number + call button) inline — this is the visible tenant-side effect of the contact-reveal decision above.

**Acceptance:** A tenant whose lead was dropped by staff sees an explicit "Not Selected" status, not an ambiguous stuck "Waiting" pill. A tenant whose deal closed sees the landlord's contact info appear in that row.

---

## TASK 3 — Tenant: reveal connector contact immediately on interest

**File(s):** listing detail screen, "I'm Interested" flow

- On successful interest creation, the confirmation state (toast/sheet) should now include the assigned connector's masked-but-callable phone number with a tap-to-call button — per the "call agent directly" flow already noted in your doc, formalized here as: this happens at interest-time, not link-time.
- If no connector is yet assigned (e.g. auto-assignment logic doesn't exist yet), fall back to a generic support number or a "Staff will reach out shortly" message rather than showing a broken/empty contact card.

**Acceptance:** Tapping "I'm Interested" results in a visible connector contact point, every time, with a defined fallback if assignment hasn't happened yet.

---

## TASK 4 — Landlord: close the visibility gap on Home dashboard

**File(s):** `app/(landlord)/home.tsx`

- For each listing card shown on the dashboard, add a passive one-line status under the stats: e.g. *"3 people interested · assigned to connector"* when leads exist, or nothing extra when there are none.
- Add a connector contact point on the listing detail screen (`app/(landlord)/listing/[id].tsx` if it exists, or create it) mirroring Task 3's tenant-side connector reveal — landlords should be able to reach the connector the same way tenants can, once a lead exists on their listing.
- Add a simple commission-receipt line once a deal closes on that listing: *"Commission paid: [amount] ETB · [date]"* — only renders once `payouts.status = 'paid'` for the related deal (ties into Task 7).

**Acceptance:** A landlord viewing their own listing can see interest activity and reach their connector without needing staff to initiate contact first.

---

## TASK 5 — Staff: add a real "Dropped" filter and confirmation

**File(s):** `app/(staff)/leads.tsx`, lead detail screen

- Add `Dropped` as a fourth filter chip alongside New / Meeting Scheduled / Deal Closed.
- "Mark Not Interested" on a lead must trigger a confirmation dialog before setting status — no silent one-tap status change (matches the non-trivial nature of dropping a lead, even though it's reversible in principle).
- Dropped leads remain visible under the `Dropped` filter (not deleted, not hidden) so staff can revive them if the tenant re-expresses interest later.

**Acceptance:** Dropped leads are filterable, reversible, and never silently disappear from staff's view.

---

## TASK 6 — Database: define the Close Deal transaction as one atomic operation

**File(s):** new Supabase Edge Function (e.g. `supabase/functions/close-deal/`), `links` table migration if not present

Close Deal must perform all of the following as a single transaction (all-or-nothing, not sequential client-side calls):

1. Insert a `links` row: `tenant_id`, `landlord_id`, `listing_id`, `staff_id`, `commission_amount` (10% of entered rent), `created_at`.
2. Update `listings.status = 'rented_out'`.
3. Insert a `payouts` row: `status = 'pending'`, `amount = commission_amount`, `staff_id`, `link_id`.
4. Flip contact visibility: this is a **read-time check**, not a write — landlord/tenant contact-number queries should check `EXISTS (SELECT 1 FROM links WHERE ...)` rather than duplicating phone numbers into new columns. Implement as an RLS policy or a view, not client logic.
5. Trigger notifications to both tenant and landlord (push/SMS — whatever's already wired up elsewhere in the app).

**Acceptance:** No code path can end up in a state where the listing shows `rented_out` but the `links` row doesn't exist, or vice versa. Do this as a Postgres function wrapped in a transaction, called via the Edge Function, not as multiple separate `.from(...).insert()` calls from the client.

---

## TASK 7 — Staff: Payout status management

**File(s):** `app/(staff)/earnings.tsx`

- Earnings tab should split payouts into `Pending` and `Paid` sections (or a filter toggle).
- Add a manual "Mark as Paid" action per pending payout row — this is the only thing that flips `payouts.status` to `'paid'`. No automated payment integration in this phase.
- Once marked paid, the corresponding landlord's listing detail page should now show the commission-receipt line from Task 4.

**Acceptance:** Staff can see which commissions are still owed to them vs. already collected, and marking one as paid is a deliberate, visible action.

---

## Suggested build order for the agent
1. Task 0 (security) — do not skip or defer.
2. Task 1 (profile fields) — needed before real Supabase writes make sense for onboarding.
3. Task 6 (Close Deal transaction + schema) — the riskiest piece, do it while everything else is still fresh, since Tasks 2–5 all reference fields/states it defines.
4. Tasks 2–5 (role-specific UI updates) — can be done in parallel/any order once Task 6's schema exists.
5. Task 7 (payout status UI) — last, depends on Task 6's `payouts` table.
