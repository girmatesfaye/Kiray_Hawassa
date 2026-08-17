// ---------------------------------------------------------------------------
// INTERESTS API — mock implementation.
// All functions match the real API signatures so screens need zero changes.
// ---------------------------------------------------------------------------

import type { Lead, Profile } from '@/lib/supabase/types';
import { MOCK_CONNECTOR, MOCK_INTERESTS, MOCK_LISTINGS, MOCK_LANDLORD } from '@/lib/mock/data';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchActiveStaff(): Promise<Profile | null> {
  return MOCK_CONNECTOR;
}

export async function createInterest(params: {
  tenantId: string;
  listingId: string;
  landlordId: string;
}): Promise<Lead> {
  await delay(400);

  // Check for existing interest (upsert behaviour)
  const existing = MOCK_INTERESTS.find(
    (i) => i.tenant_id === params.tenantId && i.listing_id === params.listingId
  );
  if (existing) return existing;

  const listing = MOCK_LISTINGS.find((l) => l.id === params.listingId);
  const newInterest: Lead = {
    id: `interest-${Date.now()}`,
    tenant_id: params.tenantId,
    listing_id: params.listingId,
    landlord_id: params.landlordId,
    staff_id: MOCK_CONNECTOR.id,
    connector_id: MOCK_CONNECTOR.id,
    status: 'waiting_for_call',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    connector: MOCK_CONNECTOR,
    landlord: MOCK_LANDLORD,
    listing: listing as any,
  };
  MOCK_INTERESTS.unshift(newInterest);
  return newInterest;
}

export async function fetchTenantInterests(tenantId: string): Promise<Lead[]> {
  await delay(300);
  return MOCK_INTERESTS.filter((i) => i.tenant_id === tenantId);
}

export const fetchInterests = fetchTenantInterests;

export async function fetchStaffInterests(statusFilter?: string): Promise<Lead[]> {
  await delay(300);
  if (!statusFilter || statusFilter === 'All') return [...MOCK_INTERESTS];
  const statusMap: Record<string, Lead['status']> = {
    'New': 'waiting_for_call',
    'Meeting Scheduled': 'visit_scheduled',
    'Deal Closed': 'linked',
    'Dropped': 'not_selected',
  };
  const status = statusMap[statusFilter];
  return status ? MOCK_INTERESTS.filter((i) => i.status === status) : [...MOCK_INTERESTS];
}

export async function updateInterestStatus(interestId: string, status: Lead['status']): Promise<Lead> {
  await delay(200);
  const idx = MOCK_INTERESTS.findIndex((i) => i.id === interestId);
  if (idx === -1) throw new Error(`Interest ${interestId} not found`);
  MOCK_INTERESTS[idx] = { ...MOCK_INTERESTS[idx], status, updated_at: new Date().toISOString() };
  return MOCK_INTERESTS[idx];
}
