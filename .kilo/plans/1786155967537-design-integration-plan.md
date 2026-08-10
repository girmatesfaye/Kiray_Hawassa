# Design Integration + Folder Structure Execution Plan

## Decision: Light-mode only

Remove all legacy dark-mode infrastructure. All components use Stitch light-mode tokens from `constants/colors.ts` directly.

## Decision: React Context for auth/role state

`AuthContext` wraps the root layout. It holds:
- `session` — Supabase auth session
- `role` — `'landlord' | 'tenant' | 'staff' | null` (derived from profiles table after onboarding)
- `profile` — full profile row
- `isLoading` — true during initial session refresh
- `signIn`, `signOut`, `updateRole` — actions

No Zustand, no React Query for auth state. Context is sufficient for this app's scope.

## Decision: Direct Supabase in features

Each feature folder contains its own hooks and queries that import the Supabase client directly from `lib/supabase/client.ts`. No intermediate API/service layer. Edge Function calls use `supabase.functions.invoke()` inside the relevant feature hook.

## Pre-flight checks

- Verify no production screens depend on `themed-view`, `themed-text`, `use-theme-color`, or `use-color-scheme`.
- Confirm `app.json` `userInterfaceStyle` is changed from `"automatic"` to `"light"`.
- Confirm no other file imports `@/constants/theme`.
- Acquire Plus Jakarta Sans TTF font files (user-provided or downloaded).

## Execution Steps

### 1. Remove legacy theming layer

Delete these files:
- `constants/theme.ts`
- `hooks/use-theme-color.ts`
- `hooks/use-color-scheme.ts`
- `hooks/use-color-scheme.web.ts`
- `components/themed-view.tsx`
- `components/themed-text.tsx`
- `components/parallax-scroll-view.tsx`

Delete or rewrite `components/ui/collapsible.tsx` (imports `ThemedView`, `ThemedText`, `Colors` from `@/constants/theme`).

### 2. Lock app to light mode

Edit `app.json`: change `"userInterfaceStyle": "automatic"` → `"userInterfaceStyle": "light"`.

### 3. Add fonts

Place Plus Jakarta Sans TTF files in `assets/fonts/`:
- `PlusJakartaSans-Regular.ttf`
- `PlusJakartaSans-Medium.ttf`
- `PlusJakartaSans-SemiBold.ttf`
- `PlusJakartaSans-Bold.ttf`
- `PlusJakartaSans-ExtraBold.ttf`

Update `app/_layout.tsx` to load fonts via `expo-font` `useFonts` and render `expo-splash-screen` until loaded.

### 4. Wire root layout + auth context

Update `app/_layout.tsx`:
- Import and load fonts
- Create `AuthContext` with `session`, `role`, `profile`, `isLoading`, `signIn`, `signOut`, `updateRole`
- On mount, call `supabase.auth.getSession()` to refresh stored session
- Wrap app in `AuthContext.Provider`
- Centralized redirect logic based on state:

| State | Redirect to |
|-------|-------------|
| `isLoading === true` | Splash screen (or blank) |
| No session | `/(auth)/phone` |
| Session exists, `role === null` | `/(onboarding)/role-choice` |
| Session exists, `role` set, `profile` incomplete | `/(onboarding)/profile-setup` |
| Session exists, `role === 'landlord'` | `/(landlord)/home` |
| Session exists, `role === 'tenant'` | `/(tenant)/browse` |
| Session exists, `role === 'staff'` | `/(staff)/leads` |

**Onboarding flow (2-step):**
1. `role-choice.tsx` — user picks landlord/tenant; `updateRole()` creates profile row with role
2. `profile-setup.tsx` — role-specific fields (name, phone, etc.); marks profile complete
3. After profile-setup, root redirect sends user to their role home

`AuthContext.updateRole()` writes to Supabase and updates local state.

Create `lib/supabase/client.ts` — singleton Supabase client used by context and features.

Create `lib/supabase/types.ts` — shared types for `Profile`, `Role`, etc.

### 5. Migrate routes

- Delete empty `app/(tabs)/` directory.
- Create `app/(auth)/phone.tsx`, `app/(auth)/otp.tsx`.
- Create `app/(onboarding)/role-choice.tsx`, `app/(onboarding)/profile-setup.tsx`.
- Create `app/(landlord)/_layout.tsx`, `home.tsx`, `post/` folder, `listing/[id].tsx`, `profile.tsx`.
- Create `app/(tenant)/_layout.tsx`, `browse.tsx`, `listing/[id].tsx`, `saved.tsx`, `interests.tsx`, `profile.tsx`.
- Create `app/(staff)/_layout.tsx`, `leads.tsx`, `lead/[id].tsx`, `schedule.tsx`, `close-deal/[leadId].tsx`, `earnings.tsx`.

Each route group `_layout.tsx` renders its role-specific tab bar AND independently checks:
- If `isLoading`, show blank/splash
- If `role !== expectedRole`, redirect to the user's actual home

This catches role changes, mid-session logouts, and deep links.

### 6. Build UI primitives

Create in `components/ui/`:
- `Button.tsx`
- `Chip.tsx`
- `StatusStamp.tsx`
- `ConfirmSheet.tsx`
- `StepIndicator.tsx`
- `ContactCard.tsx`
- `ListingCard.tsx`

All use `constants/colors.ts`, `constants/typography.ts`, `constants/spacing.ts`. No Supabase imports.

### 7. Supabase setup

- Create `lib/supabase/client.ts` — singleton Supabase client
- Create `lib/supabase/types.ts` — shared types (`Profile`, `Role`, etc.)
- Create `.env.example` with `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### 8. Feature folders

Create per folder-structure guide:
- `features/listings/` — queries, hooks, types for listings
- `features/links/` — link creation (calls Edge Function)
- `features/leads/` — lead queries and mutations
- `features/profile/` — profile read/update

Staff accounts are created directly in the Supabase dashboard with `role = 'staff'`. When a staff user logs in, `AuthContext` reads their role and redirects them to `/(staff)/leads`. No staff onboarding flow in the app.

## Validation

- `npm run lint` after each batch
- Expo loads without font missing warnings
- Tailwind classes compile in at least one screen
- No imports remain from deleted theme files
