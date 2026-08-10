export type Role = 'landlord' | 'tenant' | 'staff';

export interface Profile {
  id: string;
  role: Role | null;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  session: ReturnType<typeof import('@supabase/gotrue-js').Session> | null;
  role: Role | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (phone: string, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateRole: (role: Role) => Promise<void>;
}
