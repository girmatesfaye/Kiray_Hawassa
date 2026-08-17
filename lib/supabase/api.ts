// ---------------------------------------------------------------------------
// SUPABASE API — mock implementation.
// Thin wrappers that delegate to feature-level mock APIs.
// To connect real Supabase, replace bodies with actual DB calls.
// ---------------------------------------------------------------------------

import { Lead, Payout } from './types';
import {
  createInterest as createRealInterest,
  fetchStaffInterests,
  fetchTenantInterests,
  updateInterestStatus,
} from '@/features/interests/api';
import { MOCK_INTERESTS, MOCK_PAYOUTS } from '@/lib/mock/data';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function createInterest(tenantId: string, listingId: string) {
  // Fetch landlord_id from the in-memory listing store
  const { MOCK_LISTINGS } = await import('@/lib/mock/data');
  const listing = MOCK_LISTINGS.find((l) => l.id === listingId);
  return createRealInterest({
    tenantId,
    listingId,
    landlordId: listing?.landlord_id ?? '',
  });
}

export async function getTenantInterests(tenantId: string): Promise<Lead[]> {
  return fetchTenantInterests(tenantId);
}

export async function getStaffLeads(statusFilter?: string): Promise<Lead[]> {
  return fetchStaffInterests(statusFilter);
}

export async function updateLeadStatus(leadId: string, status: Lead['status']) {
  return updateInterestStatus(leadId, status);
}

export async function closeDeal(params: {
  interest_id: string;
  tenant_id: string;
  landlord_id: string;
  listing_id: string;
  staff_id: string;
  commission_amount: number;
}) {
  await delay(600);

  // Update interest status
  const idx = MOCK_INTERESTS.findIndex((i) => i.id === params.interest_id);
  if (idx !== -1) {
    MOCK_INTERESTS[idx] = { ...MOCK_INTERESTS[idx], status: 'linked', updated_at: new Date().toISOString() };
    // Mark the listing rented out
    const { MOCK_LISTINGS } = await import('@/lib/mock/data');
    const lIdx = MOCK_LISTINGS.findIndex((l) => l.id === params.listing_id);
    if (lIdx !== -1) MOCK_LISTINGS[lIdx] = { ...MOCK_LISTINGS[lIdx], status: 'rented_out' };
  }

  const newPayout: Payout = {
    id: `payout-${Date.now()}`,
    link_id: `link-${Date.now()}`,
    staff_id: params.staff_id,
    amount: params.commission_amount,
    status: 'pending',
    created_at: new Date().toISOString(),
    paid_at: null,
    link: {
      id: `link-${Date.now()}`,
      tenant_id: params.tenant_id,
      landlord_id: params.landlord_id,
      listing_id: params.listing_id,
      staff_id: params.staff_id,
      commission_amount: params.commission_amount,
      created_at: new Date().toISOString(),
    },
  };
  MOCK_PAYOUTS.unshift(newPayout);
  return { success: true, payout: newPayout };
}

export async function getStaffPayouts(staffId: string): Promise<Payout[]> {
  await delay(300);
  return MOCK_PAYOUTS.filter((p) => p.staff_id === staffId);
}

export async function markPayoutAsPaid(payoutId: string) {
  await delay(200);
  const idx = MOCK_PAYOUTS.findIndex((p) => p.id === payoutId);
  if (idx !== -1) {
    MOCK_PAYOUTS[idx] = { ...MOCK_PAYOUTS[idx], status: 'paid', paid_at: new Date().toISOString() };
  }
  return MOCK_PAYOUTS[idx];
}
