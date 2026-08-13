import { supabase } from '@/lib/supabase/client';
import type { Listing, ListingPhoto, ListingWithPhotos } from '@/lib/supabase/types';
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

const listingSelect = '*, photos:listing_photos(*)';

function sortPhotos(photos?: ListingPhoto[] | null) {
  return [...(photos || [])].sort((a, b) => {
    if (a.is_cover !== b.is_cover) return a.is_cover ? -1 : 1;
    return a.sort_order - b.sort_order;
  });
}

export function getCoverUrl(listing: ListingWithPhotos) {
  const photos = sortPhotos(listing.photos);
  return photos[0]?.public_url || listing.image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900';
}

export async function fetchListings(filters: ListingFilters = {}) {
  let query = supabase
    .from('listings')
    .select(listingSelect)
    .order('created_at', { ascending: false });

  if (filters.landlordId) query = query.eq('landlord_id', filters.landlordId);
  if (filters.type && filters.type !== 'all') query = query.eq('type', filters.type);
  if (filters.subcity) query = query.ilike('subcity', `%${filters.subcity}%`);
  if (filters.rooms !== undefined) query = query.eq('rooms', filters.rooms);
  if (filters.minPrice !== undefined) query = query.gte('price', filters.minPrice);
  if (filters.maxPrice !== undefined) query = query.lte('price', filters.maxPrice);
  if (filters.search) {
    const term = `%${filters.search}%`;
    query = query.or(`title.ilike.${term},location_text.ilike.${term},subcity.ilike.${term}`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as ListingWithPhotos[];
}

export async function fetchListingById(id: string) {
  const { data, error } = await supabase
    .from('listings')
    .select(listingSelect)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as ListingWithPhotos;
}

export async function uploadListingPhoto(
  landlordId: string,
  listingId: string,
  photo: WizardPhoto,
  index: number
) {
  const extension = photo.name.split('.').pop() || 'jpg';
  const storagePath = `${landlordId}/${listingId}/${Date.now()}-${index}.${extension}`;
  const response = await fetch(photo.uri);
  const blob = await response.blob();

  const { error } = await supabase.storage
    .from('listing-photos')
    .upload(storagePath, blob, {
      contentType: photo.type || 'image/jpeg',
      upsert: true,
    });
  if (error) throw error;

  const { data } = supabase.storage.from('listing-photos').getPublicUrl(storagePath);
  return { storagePath, publicUrl: data.publicUrl };
}

export async function createListingFromDraft(landlordId: string, draft: ListingDraft) {
  const uploadedPhotos = draft.photos.filter((photo) => photo.publicUrl && photo.uploadedPath);
  const cover = uploadedPhotos.find((photo) => photo.isCover) || uploadedPhotos[0];

  const { data: listing, error } = await supabase
    .from('listings')
    .insert({
      id: draft.id,
      landlord_id: landlordId,
      title: draft.title.trim(),
      description: draft.description.trim(),
      price: Number(draft.price),
      type: draft.type,
      rooms: draft.rooms ? Number(draft.rooms) : null,
      bedrooms: draft.rooms ? Number(draft.rooms) : null,
      bathroom_type: draft.bathroomType.trim() || null,
      bathrooms: Number.parseInt(draft.bathroomType, 10) || null,
      has_water: draft.hasWater,
      has_electric: draft.hasElectric,
      subcity: draft.subcity.trim(),
      location_text: draft.locationText.trim(),
      location: draft.locationText.trim(),
      status: 'available',
      image_url: cover?.publicUrl || null,
      amenities: [
        draft.hasWater ? 'Water access' : null,
        draft.hasElectric ? 'Electric access' : null,
      ].filter(Boolean),
    })
    .select()
    .single();

  if (error) throw error;

  if (uploadedPhotos.length > 0) {
    const { error: photoError } = await supabase.from('listing_photos').insert(
      uploadedPhotos.map((photo, index) => ({
        listing_id: draft.id,
        landlord_id: landlordId,
        storage_path: photo.uploadedPath,
        public_url: photo.publicUrl,
        is_cover: photo.isCover || index === 0,
        sort_order: index,
      }))
    );
    if (photoError) throw photoError;
  }

  return listing as Listing;
}

export async function fetchSavedListings(tenantId: string) {
  const { data, error } = await supabase
    .from('saved_listings')
    .select('listing:listings(*, photos:listing_photos(*))')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((row: any) => row.listing) as ListingWithPhotos[];
}

export async function isListingSaved(tenantId: string, listingId: string) {
  const { data, error } = await supabase
    .from('saved_listings')
    .select('listing_id')
    .eq('tenant_id', tenantId)
    .eq('listing_id', listingId)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export async function setListingSaved(tenantId: string, listingId: string, saved: boolean) {
  if (saved) {
    const { error } = await supabase
      .from('saved_listings')
      .upsert({ tenant_id: tenantId, listing_id: listingId });
    if (error) throw error;
    return;
  }

  const { error } = await supabase
    .from('saved_listings')
    .delete()
    .eq('tenant_id', tenantId)
    .eq('listing_id', listingId);
  if (error) throw error;
}
