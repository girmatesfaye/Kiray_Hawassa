import { supabase } from '@/lib/supabase/client';
import type { Lead, Profile } from '@/lib/supabase/types';

const interestSelect =
  '*, listing:listings(*, photos:listing_photos(*)), tenant:profiles!tenant_id(*), connector:profiles!interests_staff_id_fkey(*), landlord:profiles!interests_landlord_id_fkey(*)';

function normalizeInterest(row: any): Lead {
  return {
    ...row,
    connector_id: row.staff_id ?? null,
    connector: row.connector ?? null,
  } as Lead;
}

export async function fetchActiveStaff() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'staff')
    .eq('is_complete', true)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data as Profile | null;
}

export async function createInterest(params: {
  tenantId: string;
  listingId: string;
  landlordId: string;
}) {
  const staff = await fetchActiveStaff();

  // Pilot simplification: Hawassa launch has one active connector. If multiple
  // connectors are added later, replace this with assignment/load balancing.
  const { data, error } = await supabase
    .from('interests')
    .upsert(
      {
        tenant_id: params.tenantId,
        listing_id: params.listingId,
        landlord_id: params.landlordId,
        staff_id: staff?.id ?? null,
        status: 'waiting_for_call',
      },
      { onConflict: 'tenant_id,listing_id' }
    )
    .select(interestSelect)
    .single();

  if (error) throw error;
  return normalizeInterest(data);
}

export async function fetchTenantInterests(tenantId: string) {
  const { data, error } = await supabase
    .from('interests')
    .select(interestSelect)
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(normalizeInterest);
}

export const fetchInterests = fetchTenantInterests;

export async function fetchStaffInterests(statusFilter?: string) {
  let query = supabase
    .from('interests')
    .select(interestSelect)
    .order('created_at', { ascending: false });

  if (statusFilter && statusFilter !== 'All') {
    if (statusFilter === 'New') query = query.eq('status', 'waiting_for_call');
    if (statusFilter === 'Meeting Scheduled') query = query.eq('status', 'visit_scheduled');
    if (statusFilter === 'Deal Closed') query = query.eq('status', 'linked');
    if (statusFilter === 'Dropped') query = query.eq('status', 'not_selected');
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(normalizeInterest);
}

export async function updateInterestStatus(interestId: string, status: Lead['status']) {
  const { data, error } = await supabase
    .from('interests')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', interestId)
    .select(interestSelect)
    .single();
  if (error) throw error;
  return normalizeInterest(data);
}
