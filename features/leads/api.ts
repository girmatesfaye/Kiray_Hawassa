import { supabase } from '@/lib/supabase/client';

export async function fetchLeads(staffId: string) {
  const { data, error } = await supabase
    .from('interests')
    .select('*, listing:listings(*), tenant:profiles!tenant_id(*)')
    .eq('staff_id', staffId);
  if (error) throw error;
  return data;
}

export async function fetchLeadById(interestId: string) {
  const { data, error } = await supabase
    .from('interests')
    .select('*, listing:listings(*), tenant:profiles!tenant_id(*)')
    .eq('id', interestId)
    .single();
  if (error) throw error;
  return data;
}

