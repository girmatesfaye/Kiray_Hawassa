# Project Folder Structure — React Native (Expo) + Supabase

**Approach:** Expo Router for file-based navigation (maps directly onto the role-based routing you already designed — Landlord / Tenant / Staff route groups), feature-based folders for logic (not type-based, since "everything about listings" living in one place is what you'll actually be editing together), and Supabase kept close to the features that use it rather than one giant `api.ts`.

```
hawassa-rental-connect/
├── app/                                  # Expo Router — file path = route path
│   ├── _layout.tsx                       # Root layout: providers (Supabase, auth session, role context), splash/redirect logic
│   ├── index.tsx                         # Entry point — decides where to send the user (splash → auth → home)
│   │
│   ├── (auth)/
│   │   ├── phone.tsx                     # A2 — phone entry
│   │   └── otp.tsx                       # A3 — OTP verification
│   │
│   ├── (onboarding)/
│   │   ├── role-choice.tsx               # B1 — landlord vs tenant
│   │   └── profile-setup.tsx             # B2/B3 — branches by role internally
│   │
│   ├── (landlord)/
│   │   ├── _layout.tsx                   # Tab bar: Home / Post / Profile
│   │   ├── home.tsx                      # C1
│   │   ├── post/
│   │   │   ├── photos.tsx                # C2 — step 1
│   │   │   ├── details.tsx               # C3 — step 2
│   │   │   ├── commission.tsx            # C4 — step 3
│   │   │   └── success.tsx
│   │   ├── listing/[id].tsx              # C5 — own listing detail (edit + leads count)
│   │   └── profile.tsx                   # C6
│   │
│   ├── (tenant)/
│   │   ├── _layout.tsx                   # Tab bar: Browse / Saved / Interests / Profile
│   │   ├── browse.tsx                    # D1
│   │   ├── listing/[id].tsx              # D2 (D3 "I'm interested" renders as a modal from here)
│   │   ├── saved.tsx                     # D4
│   │   ├── interests.tsx                 # D5
│   │   └── profile.tsx                   # D6
│   │
│   └── (staff)/
│       ├── _layout.tsx                   # Tab bar: Leads / Schedule / Earnings — only reachable if role flag = staff
│       ├── leads.tsx
│       ├── lead/[id].tsx                 # Lead Detail (contact cards, notes, schedule trigger)
│       ├── schedule.tsx
│       ├── close-deal/[leadId].tsx       # The high-stakes screen — kept as its own route, not a modal buried in lead/[id]
│       └── earnings.tsx
│
├── components/                           # Pure, reusable UI — no Supabase calls in here, ever
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Chip.tsx
│   │   ├── StatusStamp.tsx               # The rotated ink-stamp badge (Available/Rented Out/Pending)
│   │   ├── ListingCard.tsx
│   │   ├── ContactCard.tsx               # Masked phone + tap-to-call icon
│   │   ├── ConfirmSheet.tsx              # Standard dismissable bottom sheet
│   │   ├── NonDismissableSheet.tsx       # The "this can't be undone" variant — deliberately a separate component so no one accidentally makes it swipe-to-close later
│   │   ├── Switch.tsx
│   │   └── StepIndicator.tsx
│   ├── forms/
│   │   ├── PhoneInput.tsx
│   │   └── OtpInput.tsx
│   └── RoleSwitcher/
│       ├── RoleSwitcherSheet.tsx
│       └── ModeStrip.tsx                 # The green/blue/gold top strip
│
├── features/                             # Domain logic, grouped by what you'll actually touch together
│   ├── auth/
│   │   ├── api.ts                        # signInWithOtp, verifyOtp calls
│   │   ├── useAuth.ts                    # session hook, wraps supabase.auth.onAuthStateChange
│   │   └── types.ts
│   ├── profile/
│   │   ├── api.ts                        # upsert landlord/tenant profile rows, ID photo upload
│   │   └── useProfile.ts
│   ├── listings/
│   │   ├── api.ts                        # CRUD + status toggle queries
│   │   ├── useListings.ts                # feed query (with role-aware filtering)
│   │   ├── useListing.ts                 # single listing + realtime subscription for status changes
│   │   └── types.ts
│   ├── interests/
│   │   ├── api.ts                        # create interest, fetch tenant's interest history
│   │   └── useInterests.ts
│   ├── links/                            # The Link record — the "wiring" logic from earlier
│   │   ├── api.ts                        # createLink() — calls the Supabase Edge Function, not a raw insert
│   │   └── useLinks.ts
│   └── role/
│       ├── RoleContext.tsx               # currentRole state + switch logic used by RoleSwitcher
│       └── useRole.ts
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                     # createClient() — single shared instance
│   │   └── database.types.ts             # generated via `supabase gen types typescript`, never hand-edited
│   ├── secureStore.ts                    # session persistence (expo-secure-store)
│   └── notifications.ts                 # push token registration, Telegram webhook trigger helpers
│
├── constants/
│   ├── colors.ts                         # --forest, --gold, --stamp-red, --paper etc. as a JS token object
│   ├── typography.ts
│   └── spacing.ts
│
├── assets/
│   ├── fonts/                            # Noto Sans, Noto Sans Ethiopic, Special Elite
│   └── images/
│
├── supabase/                             # Backend lives in the same repo — one source of truth
│   ├── migrations/                       # SQL migrations: listings, profiles, interests, links tables + RLS policies
│   ├── functions/
│   │   ├── create-link/                  # Edge Function: the one place the Link record + 3 side effects happen atomically
│   │   ├── telegram-notify/              # Pushes new-interest / deal-closed messages to your bot
│   │   └── mark-rented-out/
│   ├── seed.sql                          # Sample data matching what's in the clickable prototype
│   └── config.toml
│
├── app.config.ts                         # Expo config (replaces app.json when you need env-based values)
├── eas.json                               # Build profiles (dev/preview/production)
├── .env.example
├── tsconfig.json
└── package.json
```

## Why a few of these choices, specifically

**`features/` instead of a flat `hooks/` + `api/` split.** Everything about "listings" — the query, the hook, the types — sits in one folder. When you're building the toggle-to-rented-out feature, you're editing one folder, not hunting across three.

**`links/` is its own feature, not folded into `listings/`.** This mirrors the actual system design: creating a Link is a distinct, high-stakes transaction (flips listing status + reveals contacts + logs commission, atomically) — giving it its own folder keeps that boundary visible in the code, not just in your head.

**`createLink()` calls a Supabase Edge Function, not a client-side insert.** This is the one piece of business logic too important to trust to client code + RLS alone — the three side effects need to happen as one atomic operation server-side, and you don't want a slow connection leaving a listing marked "Rented Out" with contacts never revealed, or vice versa.

**`components/ui/` has zero Supabase imports, ever.** Keeping presentational components fully dumb (props in, events out) means you can preview them in Storybook/Expo Router's dev tools without a live backend, and reuse them identically across Landlord/Tenant/Staff views.

**`NonDismissableSheet.tsx` is a separate component from `ConfirmSheet.tsx`,** not a prop flag on one shared component. You flagged this exact friction as deliberate design earlier (the Close Deal confirmation shouldn't swipe-dismiss) — making it structurally a different component means a future refactor can't accidentally "simplify" it away by defaulting a boolean prop wrong.

**`(landlord)`, `(tenant)`, `(staff)` as Expo Router route groups**, not top-level folders. The parentheses mean they don't add a URL segment — so `home.tsx` inside `(landlord)/` is just `/home`, but you get separate `_layout.tsx` tab bars per role, which is exactly the "same app, role-conditional navigation" pattern from your single-app decision.

## What I'd set up first, in order
1. `lib/supabase/client.ts` + `.env.example` — nothing else works without this.
2. `supabase/migrations/` — the four core tables (`profiles`, `listings`, `interests`, `links`) with RLS policies before any UI.
3. `features/auth/` — phone/OTP flow end-to-end.
4. `components/ui/` — build the dumb components against static/mock data (you already have the exact visual spec from the prototype).
5. Wire `features/listings/` and `features/interests/` into the built components.
6. `supabase/functions/create-link/` last — it's the highest-stakes piece and benefits from having real listings/interests to test against.
