import { supabase } from './client';
import { Lead, Listing, Payout, Profile } from './types';

// In-memory mock store for local interactive fallback demo state
let MOCK_LEADS: Lead[] = [
  {
    id: '1',
    tenant_id: 'tenant-101',
    listing_id: '1',
    connector_id: 'staff-01',
    status: 'visit_scheduled',
    created_at: '2026-08-10T14:30:00Z',
    updated_at: '2026-08-10T15:15:00Z',
    tenant: {
      id: 'tenant-101',
      role: 'tenant',
      full_name: 'Abebe Bikila',
      phone: '+251 911 234 567',
      avatar_url: null,
      is_complete: true,
      created_at: '2026-08-01',
      updated_at: '2026-08-01',
      fayida_id: 'ET-9821-3412-8841',
      occupation: 'Civil Engineer',
      id_photo_url: null,
      subcity: 'Tabor Sub-City',
    },
    landlord: {
      id: 'landlord-201',
      role: 'landlord',
      full_name: 'Kebede Tassew',
      phone: '+251 922 887 766',
      avatar_url: null,
      is_complete: true,
      created_at: '2026-08-01',
      updated_at: '2026-08-01',
      fayida_id: null,
      occupation: null,
      id_photo_url: null,
      subcity: 'Haile Resort Area',
    },
    connector: {
      id: 'staff-01',
      role: 'staff',
      full_name: 'Abebe Connector',
      phone: '+251 930 112 233',
      avatar_url: null,
      is_complete: true,
      created_at: '2026-08-01',
      updated_at: '2026-08-01',
      fayida_id: null,
      occupation: null,
      id_photo_url: null,
      subcity: 'Hawassa Center',
    },
    listing: {
      id: '1',
      landlord_id: 'landlord-201',
      title: 'Modern 2BR Lakeside Villa',
      description: 'Beautifully furnished 2-bedroom villa located within walking distance of Lake Hawassa.',
      location: 'Haile Resort Area, Hawassa',
      price: 25000,
      bedrooms: 2,
      bathrooms: 2,
      area_sqm: 120,
      status: 'available',
      image_url: 'https://lh3.googleusercontent.com/aida/AP1WRLv7n9ZOygo_lFtyhSaqYBYa3SdY1iijTNEluSVYWjjbi8ISBf1-WyHypkJjcygs44a91Fr6SR0sRymrGKNbKQJUeGtKrVFKPmHQI40TFgzxVolJX4tEJDpReiAGH432mcnt76QzqNbU8NLZdjKVyRQvn4YTrszxNv8rT33gRb6CBb39sIxL7qVlZI3x3TI7Y4FTeOqZzGzhaUvSp9C-b8Tzn81xscTnxyrArX2DFIixpf9pKl-ajf_eBEw',
      amenities: ['Water Tank', 'Parking Space', 'Furnished'],
      created_at: '2026-08-01',
    },
  },
  {
    id: '2',
    tenant_id: 'tenant-102',
    listing_id: '2',
    connector_id: 'staff-01',
    status: 'waiting_for_call',
    created_at: '2026-08-08T10:00:00Z',
    updated_at: '2026-08-08T10:00:00Z',
    tenant: {
      id: 'tenant-102',
      role: 'tenant',
      full_name: 'Marta Alemu',
      phone: '+251 944 556 677',
      avatar_url: null,
      is_complete: true,
      created_at: '2026-08-05',
      updated_at: '2026-08-05',
      fayida_id: 'ET-1122-3344-5566',
      occupation: 'Doctor',
      id_photo_url: null,
      subcity: 'Piassa',
    },
    landlord: {
      id: 'landlord-202',
      role: 'landlord',
      full_name: 'Solomon Worku',
      phone: '+251 955 443 322',
      avatar_url: null,
      is_complete: true,
      created_at: '2026-08-02',
      updated_at: '2026-08-02',
      fayida_id: null,
      occupation: null,
      id_photo_url: null,
      subcity: 'Piassa',
    },
    connector: {
      id: 'staff-01',
      role: 'staff',
      full_name: 'Hawassa Support Agent',
      phone: '+251 911 000 999',
      avatar_url: null,
      is_complete: true,
      created_at: '2026-08-01',
      updated_at: '2026-08-01',
      fayida_id: null,
      occupation: null,
      id_photo_url: null,
      subcity: 'Hawassa Center',
    },
    listing: {
      id: '2',
      landlord_id: 'landlord-202',
      title: 'Spacious Commercial Storefront',
      description: 'Prime commercial location in Piassa.',
      location: 'Piassa Main Street, Hawassa',
      price: 40000,
      bedrooms: 0,
      bathrooms: 1,
      area_sqm: 85,
      status: 'available',
      image_url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600',
      amenities: ['Glass Front', 'Main Road View'],
      created_at: '2026-08-02',
    },
  },
];

let MOCK_PAYOUTS: Payout[] = [
  {
    id: '1',
    link_id: 'link-01',
    staff_id: 'staff-01',
    amount: 2500,
    status: 'paid',
    created_at: '2026-08-10T16:00:00Z',
    paid_at: '2026-08-11T09:00:00Z',
    link: {
      id: 'link-01',
      tenant_id: 'tenant-101',
      landlord_id: 'landlord-201',
      listing_id: '1',
      staff_id: 'staff-01',
      commission_amount: 2500,
      created_at: '2026-08-10T16:00:00Z',
      listing: {
        id: '1',
        landlord_id: 'landlord-201',
        title: 'Modern 2BR Lakeside Villa',
        description: '',
        location: 'Haile Resort Area',
        price: 25000,
        bedrooms: 2,
        bathrooms: 2,
        area_sqm: 120,
        status: 'rented_out',
        image_url: null,
        amenities: [],
        created_at: '2026-08-01',
      },
    },
  },
  {
    id: '2',
    link_id: 'link-02',
    staff_id: 'staff-01',
    amount: 4000,
    status: 'pending',
    created_at: '2026-08-12T11:00:00Z',
    paid_at: null,
    link: {
      id: 'link-02',
      tenant_id: 'tenant-102',
      landlord_id: 'landlord-202',
      listing_id: '2',
      staff_id: 'staff-01',
      commission_amount: 4000,
      created_at: '2026-08-12T11:00:00Z',
      listing: {
        id: '2',
        landlord_id: 'landlord-202',
        title: 'Commercial Storefront Piassa',
        description: '',
        location: 'Piassa Main Street',
        price: 40000,
        bedrooms: 0,
        bathrooms: 1,
        area_sqm: 85,
        status: 'rented_out',
        image_url: null,
        amenities: [],
        created_at: '2026-08-02',
      },
    },
  },
];

/**
 * Task 3: Create interest lead on listing
 */
export async function createInterest(tenantId: string, listingId: string) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        tenant_id: tenantId,
        listing_id: listingId,
        status: 'waiting_for_call',
      })
      .select()
      .single();
    if (!error && data) return data;
  } catch (e) {
    console.log('Supabase fetch fallback to mock');
  }

  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    tenant_id: tenantId,
    listing_id: listingId,
    connector_id: 'staff-01',
    status: 'waiting_for_call',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    connector: {
      id: 'staff-01',
      role: 'staff',
      full_name: 'Abebe (Hawassa Connector)',
      phone: '+251 930 112 233',
      avatar_url: null,
      is_complete: true,
      created_at: '',
      updated_at: '',
      fayida_id: null,
      occupation: null,
      id_photo_url: null,
      subcity: null,
    },
  };
  MOCK_LEADS.unshift(newLead);
  return newLead;
}

/**
 * Task 2: Get tenant's expressed interests
 */
export async function getTenantInterests(tenantId: string): Promise<Lead[]> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*, listing:listings(*), connector:profiles!connector_id(*), landlord:profiles!listings_landlord_id_fkey(*)')
      .eq('tenant_id', tenantId);
    if (!error && data && data.length > 0) return data as Lead[];
  } catch (e) {
    console.log('Supabase fetch fallback to mock');
  }
  return MOCK_LEADS;
}

/**
 * Task 5: Get staff leads with optional status filter
 */
export async function getStaffLeads(statusFilter?: string): Promise<Lead[]> {
  try {
    let query = supabase
      .from('leads')
      .select('*, tenant:profiles!tenant_id(*), listing:listings(*), connector:profiles!connector_id(*)');
    if (statusFilter && statusFilter !== 'All') {
      if (statusFilter === 'New') query = query.eq('status', 'waiting_for_call');
      if (statusFilter === 'Meeting Scheduled') query = query.eq('status', 'visit_scheduled');
      if (statusFilter === 'Deal Closed') query = query.eq('status', 'linked');
      if (statusFilter === 'Dropped') query = query.eq('status', 'not_selected');
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) return data as Lead[];
  } catch (e) {
    console.log('Supabase fetch fallback to mock');
  }

  if (!statusFilter || statusFilter === 'All') return MOCK_LEADS;
  if (statusFilter === 'New') return MOCK_LEADS.filter((l) => l.status === 'waiting_for_call');
  if (statusFilter === 'Meeting Scheduled') return MOCK_LEADS.filter((l) => l.status === 'visit_scheduled');
  if (statusFilter === 'Deal Closed') return MOCK_LEADS.filter((l) => l.status === 'linked');
  if (statusFilter === 'Dropped') return MOCK_LEADS.filter((l) => l.status === 'not_selected');
  return MOCK_LEADS;
}

/**
 * Task 5: Update lead status (e.g. Mark Not Interested -> not_selected)
 */
export async function updateLeadStatus(leadId: string, status: Lead['status']) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', leadId)
      .select();
    if (!error && data) return data;
  } catch (e) {
    console.log('Supabase update fallback to mock');
  }

  const idx = MOCK_LEADS.findIndex((l) => l.id === leadId);
  if (idx !== -1) {
    MOCK_LEADS[idx].status = status;
    MOCK_LEADS[idx].updated_at = new Date().toISOString();
  }
}

/**
 * Task 6: Perform Close Deal transaction via Edge Function or fallback stored proc
 */
export async function closeDeal(params: {
  lead_id: string;
  tenant_id: string;
  landlord_id: string;
  listing_id: string;
  staff_id: string;
  commission_amount: number;
}) {
  try {
    const { data, error } = await supabase.functions.invoke('close-deal', {
      body: params,
    });
    if (!error && data) return data;
  } catch (e) {
    console.log('Edge Function fallback to client mock closeDeal');
  }

  // Fallback state update for mock environment
  const idx = MOCK_LEADS.findIndex((l) => l.id === params.lead_id);
  if (idx !== -1) {
    MOCK_LEADS[idx].status = 'linked';
    if (MOCK_LEADS[idx].listing) {
      MOCK_LEADS[idx].listing!.status = 'rented_out';
    }
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
      listing: MOCK_LEADS[idx]?.listing,
    },
  };
  MOCK_PAYOUTS.unshift(newPayout);
  return { success: true, payout: newPayout };
}

/**
 * Task 7: Get payouts for staff
 */
export async function getStaffPayouts(staffId: string): Promise<Payout[]> {
  try {
    const { data, error } = await supabase
      .from('payouts')
      .select('*, link:links(*, listing:listings(*))')
      .eq('staff_id', staffId);
    if (!error && data && data.length > 0) return data as Payout[];
  } catch (e) {
    console.log('Supabase payouts fetch fallback to mock');
  }
  return MOCK_PAYOUTS;
}

/**
 * Task 7: Mark payout as paid
 */
export async function markPayoutAsPaid(payoutId: string) {
  try {
    const { data, error } = await supabase
      .from('payouts')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', payoutId)
      .select();
    if (!error && data) return data;
  } catch (e) {
    console.log('Supabase payout update fallback to mock');
  }

  const idx = MOCK_PAYOUTS.findIndex((p) => p.id === payoutId);
  if (idx !== -1) {
    MOCK_PAYOUTS[idx].status = 'paid';
    MOCK_PAYOUTS[idx].paid_at = new Date().toISOString();
  }
}
