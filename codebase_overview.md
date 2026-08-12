# Kiray Hawassa — Codebase Overview

**Kiray Hawassa** is a React Native / Expo mobile app (v54) for a **rental marketplace in Hawassa, Ethiopia**. It connects three types of users — **Landlords**, **Tenants**, and **Staff (Connectors)** — through property listings and a lead management system. The backend is powered by **Supabase** (auth + database). Styling uses **NativeWind** (Tailwind CSS for React Native).

---

## Root-Level Files

| File | Purpose |
|---|---|
| [app.json](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app.json) | Expo config — app name (`Kiray_Hawassa`), scheme (`kirayhawassa`), icons, splash screen, and Android/iOS settings. Enables `typedRoutes` and `reactCompiler` experiments. |
| [package.json](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/package.json) | Dependencies: Expo 54, React Native 0.81, expo-router 6, Supabase JS, NativeWind, react-native-reanimated, gesture-handler, etc. |
| [babel.config.js](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/babel.config.js) | Babel preset for Expo (including NativeWind transform). |
| [metro.config.js](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/metro.config.js) | Metro bundler config (NativeWind + CSS support). |
| [tailwind.config.js](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/tailwind.config.js) | TailwindCSS config used by NativeWind; defines custom theme tokens. |
| [global.css](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/global.css) | Injects Tailwind base/components/utilities for NativeWind. |
| [tsconfig.json](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/tsconfig.json) | TypeScript config (`@/` path alias pointing to root). |
| [eslint.config.js](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/eslint.config.js) | ESLint rules for Expo. |
| [.env](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/.env) | Secret environment variables — Supabase URL & anon key. |
| [.env.example](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/.env.example) | Template showing which env vars are required. |
| [expo-env.d.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/expo-env.d.ts) | Auto-generated Expo typed routes declaration. |
| [nativewind-env.d.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/nativewind-env.d.ts) | NativeWind TypeScript ambient declaration. |
| [AGENTS.md](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/AGENTS.md) | Agent rules: always read Expo v54 docs before writing code. |
| [README.md](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/README.md) | Project intro and getting-started instructions. |
| [expo-supabase-folder-structure.md](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/expo-supabase-folder-structure.md) | Architectural reference doc describing the intended folder conventions. |

---

## `app/` — Expo Router (File-System Routing)

The `app/` directory drives all routing via **expo-router**. Every file maps to a screen/route. Parenthesized folders `(group)` are **route groups** — they do NOT add a URL segment, they just organize files.

### [app/_layout.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/_layout.tsx) ⭐ Root
The most important file in the project. It:
- Loads custom fonts (Plus Jakarta Sans, Lexend, Nunito, Google Sans)
- Initializes **Supabase auth** session state and listens for auth changes
- Fetches the user's **profile + role** from the `profiles` table
- Provides an `AuthContext` (session, role, profile, signIn, signOut, updateRole)
- Contains a `RootRedirect` component that routes users based on auth state:
  - No session → `/(auth)/phone`
  - No role → `/(onboarding)/role-choice`
  - Role set but profile incomplete → `/(onboarding)/profile-setup`
  - `landlord` → `/(landlord)/home`
  - `tenant` → `/(tenant)/browse`
  - `staff` → `/(staff)/leads`

### [app/index.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/index.tsx)
Entry point stub — immediately redirects to the correct screen (handled by `_layout.tsx`).

### [app/notifications.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/notifications.tsx)
A shared **Notifications** screen accessible from any role's tab bar.

---

### `app/(auth)/` — Authentication Screens
Phone-number-based OTP authentication flow.

| File | Description |
|---|---|
| [phone.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(auth)/phone.tsx) | Step 1 — User enters their phone number |
| [otp.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(auth)/otp.tsx) | Step 2 — User enters the OTP SMS code |
| [sign-in.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(auth)/sign-in.tsx) | Alternative email/password sign-in screen |
| [sign-up.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(auth)/sign-up.tsx) | Alternative sign-up screen |

---

### `app/(onboarding)/` — Post-Auth Onboarding Flow
Runs once after a user logs in for the first time.

| File | Description |
|---|---|
| [index.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(onboarding)/index.tsx) | Onboarding welcome/intro screen |
| [role-choice.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(onboarding)/role-choice.tsx) | User picks their role: **Landlord**, **Tenant**, or **Staff** |
| [profile-setup.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(onboarding)/profile-setup.tsx) | User fills in profile details to mark their profile as complete |

---

### `app/(landlord)/` — Landlord Role Screens
Tab-based navigation for property owners.

| File/Folder | Description |
|---|---|
| [_layout.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(landlord)/_layout.tsx) | Bottom tab navigator for the landlord section |
| [home.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(landlord)/home.tsx) | Dashboard showing the landlord's property listings |
| [profile.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(landlord)/profile.tsx) | Landlord's profile settings screen |
| `listing/[id].tsx` | Dynamic screen — detail view of a specific listing by ID |
| `post/index.tsx` | Step 1 of the post-listing flow (entry point) |
| `post/details.tsx` | Step 2 — enter property details |
| `post/photos.tsx` | Step 3 — upload property photos |
| `post/commission.tsx` | Step 4 — set commission/pricing |
| `post/review.tsx` | Step 5 — review the listing before publishing |
| `post/success.tsx` | Confirmation screen after successful listing |

---

### `app/(tenant)/` — Tenant Role Screens
Tab-based navigation for renters.

| File/Folder | Description |
|---|---|
| [_layout.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(tenant)/_layout.tsx) | Bottom tab navigator for the tenant section |
| [browse.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(tenant)/browse.tsx) | Main feed/home — browse available rental listings |
| [search.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(tenant)/search.tsx) | Search and filter listings |
| [saved.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(tenant)/saved.tsx) | Tenant's saved/bookmarked listings |
| [interests.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(tenant)/interests.tsx) | Listings the tenant has expressed interest in |
| [profile.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(tenant)/profile.tsx) | Tenant profile settings |
| `listing/[id].tsx` | Dynamic screen — full detail view of a listing |

---

### `app/(staff)/` — Staff (Connector) Role Screens
Tab-based navigation for staff/agents who connect landlords and tenants.

| File/Folder | Description |
|---|---|
| [_layout.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(staff)/_layout.tsx) | Bottom tab navigator for the staff section |
| [dashboard.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(staff)/dashboard.tsx) | Staff overview dashboard with key metrics |
| [leads.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(staff)/leads.tsx) | List of all leads (tenant-landlord connections to manage) |
| [add-lead.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(staff)/add-lead.tsx) | Form to manually add a new lead |
| [schedule.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(staff)/schedule.tsx) | Schedule property viewing meetings |
| [activity.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(staff)/activity.tsx) | Activity log for the staff member |
| [earnings.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/(staff)/earnings.tsx) | Staff commission/earnings tracker |
| `lead/[id].tsx` | Dynamic screen — detail view of a specific lead |
| `close-deal/[leadId].tsx` | Flow to formally close/finalize a deal on a lead |

---

### `app/screens/` — Screen Placeholder Components
These are **stub/skeleton** components that match the screen architecture. Each file exports a simple component that renders a placeholder. They serve as scaffolding references or are used in Storybook-style development.

Includes stubs for: SignIn, SignUp, Onboarding, RoleSelection, HomeFeed, ListingDetail, PostListingStep1-3, PostListingReview, ConnectorDashboard, LeadsList, LeadDetail, ManualSearchAddLead, ScheduleMeetingFlow, TenantProfileCompletionStep1, SavedListings, InterestedListings, SearchFilters, Profile, Notifications, MyListings, ActivityLog.

The [index.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/app/screens/index.ts) re-exports all of them.

---

## `components/` — Shared UI Components

### `components/ui/` — General UI Primitives

| File | Description |
|---|---|
| [Button.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/Button.tsx) | Reusable button with variants (primary, secondary, outline, etc.) |
| [Chip.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/Chip.tsx) | Small tag/chip for filters and labels |
| [ConfirmSheet.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/ConfirmSheet.tsx) | A bottom sheet modal for confirmation dialogs |
| [ContactCard.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/ContactCard.tsx) | Card showing landlord/tenant contact info |
| [HeaderBar.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/HeaderBar.tsx) | Shared navigation header bar component |
| [ListingCard.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/ListingCard.tsx) | Card component to display a property listing preview |
| [NonDismissableSheet.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/NonDismissableSheet.tsx) | A bottom sheet the user cannot dismiss by swiping down |
| [StatusStamp.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/StatusStamp.tsx) | Visual badge/stamp for statuses (active, pending, closed, etc.) |
| [StepIndicator.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/StepIndicator.tsx) | Progress dots/steps indicator for multi-step flows |
| [Switch.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/Switch.tsx) | Toggle switch component |
| [collapsible.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/collapsible.tsx) | Expandable/collapsible section component |
| [icon-symbol.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/icon-symbol.tsx) | Cross-platform icon wrapper (uses SF Symbols on iOS, MaterialIcons otherwise) |
| [icon-symbol.ios.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/ui/icon-symbol.ios.tsx) | iOS-specific icon implementation using SF Symbols |

### `components/forms/` — Form Input Components

| File | Description |
|---|---|
| [PhoneInput.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/forms/PhoneInput.tsx) | Phone number input with country code support |
| [OtpInput.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/components/forms/OtpInput.tsx) | 6-digit OTP/PIN code input with per-digit boxes |

---

## `features/` — Feature Modules (Business Logic)

Each feature contains an `api.ts` (Supabase queries) and a custom hook. This is a clean separation of data fetching from UI.

| Feature | Files | Description |
|---|---|---|
| `auth` | [api.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/auth/api.ts), [useAuth.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/auth/useAuth.ts) | Auth API calls (send OTP, verify OTP) and auth hook |
| `listings` | [api.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/listings/api.ts), [useListings.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/listings/useListings.ts), [types.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/listings/types.ts) | CRUD operations for property listings |
| `leads` | [api.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/leads/api.ts), [useLeads.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/leads/useLeads.ts) | Create/update/fetch staff leads |
| `profile` | [api.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/profile/api.ts), [useProfile.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/profile/useProfile.ts) | Fetch and update user profiles |
| `interests` | [api.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/interests/api.ts), [useInterests.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/interests/useInterests.ts) | Tenant's "interested" listings (like/save) |
| `links` | [api.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/links/api.ts), [useLinks.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/links/useLinks.ts) | Deep-link / referral link handling |
| `role` | [RoleContext.tsx](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/role/RoleContext.tsx), [useRole.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/features/role/useRole.ts) | React context + hook to read the current user's role |

---

## `lib/` — Infrastructure / Third-Party Clients

### `lib/supabase/`

| File | Description |
|---|---|
| [client.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/lib/supabase/client.ts) | Initializes and exports the single `supabase` client instance using the env vars |
| [types.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/lib/supabase/types.ts) | TypeScript interfaces: `Profile`, `Role` (`'landlord' | 'tenant' | 'staff'`), `AuthContextType`, and Supabase table row types |

---

## `constants/` — Design Tokens

| File | Description |
|---|---|
| [colors.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/constants/colors.ts) | Centralized color palette — primary, secondary, surface, text, error, status colors |
| [typography.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/constants/typography.ts) | Font families (`FontFamily`) and font size scale |
| [spacing.ts](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/constants/spacing.ts) | Spacing scale (xs, sm, md, lg, xl, etc.) for consistent margins/padding |

---

## `assets/` — Static Assets

| Folder | Description |
|---|---|
| `assets/fonts/` | Custom font files: Plus Jakarta Sans, Lexend (variable), Nunito (variable), Google Sans (variable) |
| `assets/images/` | App icon, splash screen image, adaptive Android icons, favicon |

---

## `hooks/` — Global Custom Hooks
Currently **empty** — custom hooks live inside their respective `features/` modules instead.

---

## `scripts/`

| File | Description |
|---|---|
| [reset-project.js](file:///c:/Users/Dev%20Girma/Desktop/Kiray_Hawassa/scripts/reset-project.js) | Utility script (`npm run reset-project`) to wipe the app back to a clean scaffold state |

---

## Configuration & Tooling Folders

| Folder | Description |
|---|---|
| `.expo/` | Auto-generated Expo cache and project metadata — **do not edit** |
| `.git/` | Git version control data |
| `.vscode/` | VS Code workspace settings (recommended extensions, etc.) |
| `.claude/` | Claude AI assistant configuration for this project |
| `.kilo/` | Kilo editor configuration |
| `mcp/` | MCP (Model Context Protocol) tool configuration files |
| `node_modules/` | All installed npm dependencies — **do not edit** |

---

## Architecture Summary

```
User opens app
      │
      ▼
app/_layout.tsx  ←── Loads fonts, checks Supabase session
      │
      ├── No session ──────────────→ (auth)/phone → otp
      │
      ├── Logged in, no role ──────→ (onboarding)/role-choice → profile-setup
      │
      ├── role = landlord ─────────→ (landlord)/ tabs
      │                                  home | listing/[id] | post/* | profile
      │
      ├── role = tenant ───────────→ (tenant)/ tabs
      │                                  browse | search | saved | interests | profile | listing/[id]
      │
      └── role = staff ────────────→ (staff)/ tabs
                                         dashboard | leads | lead/[id] | add-lead
                                         schedule | activity | earnings | close-deal/[leadId]
```
