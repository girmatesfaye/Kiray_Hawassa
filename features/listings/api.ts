// ---------------------------------------------------------------------------
// LISTINGS API — mock implementation.
// All functions match the real API signatures so screens need zero changes.
// To switch to real Supabase, replace this file with the supabase version.
// ---------------------------------------------------------------------------

import type { Listing, ListingPhoto, ListingWithPhotos } from '@/lib/supabase/types';
import {
  MOCK_LISTINGS,
  MOCK_SAVED,
} from '@/lib/mock/data';
import type { ListingDraft, WizardPhoto } from './postWizard';

export type ListingFilters = {
  search?: string;
  type?: string;
  subcity?: string;
  rooms?: number;
  minPrice?: number;
  maxPrice?: number;
  landlordId?: string;
};

function sortPhotos(photos?: ListingPhoto[] | null) {
  return [...(photos || [])].sort((a, b) => {
    if (a.is_cover !== b.is_cover) return a.is_cover ? -1 : 1;
    return a.sort_order - b.sort_order;
  });
}

export function getCoverUrl(listing: ListingWithPhotos) {
  const photos = sortPhotos(listing.photos);
  return (
    photos[0]?.public_url ||
    listing.image_url ||
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900'
  );
}

export async function fetchListings(filters: ListingFilters = {}): Promise<ListingWithPhotos[]> {
  await delay(300);
  let results = [...MOCK_LISTINGS];

  if (filters.landlordId) {
    results = results.filter((l) => l.landlord_id === filters.landlordId);
  }
  if (filters.type && filters.type !== 'all') {
    results = results.filter((l) => l.type === filters.type);
  }
  if (filters.subcity) {
    const q = filters.subcity.toLowerCase();
    results = results.filter((l) => l.subcity?.toLowerCase().includes(q));
  }
  if (filters.rooms !== undefined) {
    results = results.filter((l) => l.rooms === filters.rooms);
  }
  if (filters.minPrice !== undefined) {
    results = results.filter((l) => l.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter((l) => l.price <= filters.maxPrice!);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.location_text?.toLowerCase().includes(q) ||
        l.subcity?.toLowerCase().includes(q)
    );
  }

  return results;
}

export async function fetchListingById(id: string): Promise<ListingWithPhotos> {
  await delay(200);
  const listing = MOCK_LISTINGS.find((l) => l.id === id);
  if (!listing) throw new Error(`Listing ${id} not found`);
  return listing;
}

export async function uploadListingPhoto(
  _landlordId: string,
  _listingId: string,
  photo: WizardPhoto,
  _index: number
): Promise<{ storagePath: string; publicUrl: string }> {
  // In mock mode just return the local URI as the public URL
  await delay(500);
  return { storagePath: photo.uri, publicUrl: photo.uri };
}

export async function createListingFromDraft(landlordId: string, draft: ListingDraft): Promise<Listing> {
  await delay(600);
  const newListing: ListingWithPhotos = {
    id: draft.id,
    landlord_id: landlordId,
    title: draft.title.trim(),
    description: draft.description.trim(),
    location: draft.locationText.trim(),
    location_text: draft.locationText.trim(),
    subcity: draft.subcity.trim(),
    price: Number(draft.price),
    type: draft.type as any,
    rooms: draft.rooms ? Number(draft.rooms) : null,
    bedrooms: draft.rooms ? Number(draft.rooms) : null,
    bathroom_type: draft.bathroomType || null,
    bathrooms: null,
    has_water: draft.hasWater,
    has_electric: draft.hasElectric,
    area_sqm: null,
    status: 'available',
    image_url: draft.photos[0]?.uri || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900',
    amenities: [
      draft.hasWater ? 'Water access' : null,
      draft.hasElectric ? 'Electric access' : null,
    ].filter(Boolean) as string[],
    created_at: new Date().toISOString(),
    photos: [],
  };
  // Push to in-memory store so the home screen sees it immediately
  MOCK_LISTINGS.unshift(newListing);
  return newListing;
}

export async function fetchSavedListings(tenantId: string): Promise<ListingWithPhotos[]> {
  await delay(200);
  const saved = MOCK_SAVED[tenantId] || new Set<string>();
  return MOCK_LISTINGS.filter((l) => saved.has(l.id));
}

export async function isListingSaved(tenantId: string, listingId: string): Promise<boolean> {
  return (MOCK_SAVED[tenantId] || new Set<string>()).has(listingId);
}

export async function setListingSaved(tenantId: string, listingId: string, saved: boolean) {
  if (!MOCK_SAVED[tenantId]) MOCK_SAVED[tenantId] = new Set();
  if (saved) {
    MOCK_SAVED[tenantId].add(listingId);
  } else {
    MOCK_SAVED[tenantId].delete(listingId);
  }
}

// ---------------------------------------------------------------------------
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
