import { supabase } from '@/lib/supabase/client';

export async function fetchListings(filters?: { role?: string; status?: string }) {
  let query = supabase.from('listings').select('*');
  if (filters?.status) query = query.eq('status', filters.status);
  if (filters?.role) query = query.eq('role', filters.role);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchListingById(id: string) {
  const { data, error } = await supabase.from('listings').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}
