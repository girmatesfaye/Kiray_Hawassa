export type Role = 'landlord' | 'tenant' | 'staff';

export type LeadStatus = 'waiting_for_call' | 'visit_scheduled' | 'linked' | 'not_selected';

export type PayoutStatus = 'pending' | 'paid';

export interface Profile {
  id: string;
  role: Role | null;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
  // Tenant-only fields
  fayida_id: string | null;
  occupation: string | null;
  id_photo_url: string | null;
  // Shared / Landlord fields
  subcity: string | null;
}

export interface Lead {
  id: string;
  tenant_id: string;
  listing_id: string;
  landlord_id?: string;
  staff_id?: string | null;
  connector_id: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
  // Joined fields (optional, from queries)
  listing?: Listing;
  tenant?: Profile;
  connector?: Profile;
  landlord?: Profile;
}

export interface Listing {
  id: string;
  landlord_id: string;
  title: string;
  description: string | null;
  location: string | null;
  price: number;
  type?: 'house' | 'apartment' | 'shop' | null;
  rooms?: number | null;
  bathroom_type?: string | null;
  has_water?: boolean | null;
  has_electric?: boolean | null;
  subcity?: string | null;
  location_text?: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqm: number | null;
  status: 'available' | 'pending' | 'rented_out';
  image_url: string | null;
  amenities: string[] | null;
  created_at: string;
}

export interface ListingPhoto {
  id: string;
  listing_id: string;
  landlord_id: string;
  storage_path: string;
  public_url: string;
  is_cover: boolean;
  sort_order: number;
  created_at: string;
}

export type ListingWithPhotos = Listing & {
  photos?: ListingPhoto[];
};

export interface Link {
  id: string;
  tenant_id: string;
  landlord_id: string;
  listing_id: string;
  staff_id: string;
  commission_amount: number;
  created_at: string;
  // Joined
  tenant?: Profile;
  landlord?: Profile;
  listing?: Listing;
}

export interface Payout {
  id: string;
  link_id: string;
  staff_id: string;
  amount: number;
  status: PayoutStatus;
  created_at: string;
  paid_at: string | null;
  // Joined
  link?: Link;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}

export interface AuthContextType {
  session: ReturnType<typeof import('@supabase/supabase-js')['createClient']> extends { auth: { getSession: () => Promise<{ data: { session: infer S } }> } } ? S : any;
  role: Role | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (phone: string, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateRole: (role: Role) => Promise<void>;
}
