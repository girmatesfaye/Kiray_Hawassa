import { supabase } from '@/lib/supabase/client';

export async function createLink(listingId: string, tenantId: string) {
  const { data, error } = await supabase.functions.invoke('create-link', {
    body: { listingId, tenantId },
  });
  if (error) throw error;
  return data;
}
