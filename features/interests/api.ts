import { supabase } from '@/lib/supabase/client';

export async function createInterest(listingId: string, tenantId: string) {
  const { data, error } = await supabase
    .from('interests')
    .insert({ listing_id: listingId, tenant_id: tenantId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchInterests(tenantId: string) {
  const { data, error } = await supabase
    .from('interests')
    .select('*, listing:listings(*)')
    .eq('tenant_id', tenantId);
  if (error) throw error;
  return data;
}
