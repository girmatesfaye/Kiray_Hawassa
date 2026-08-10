export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: 'available' | 'rented' | 'pending';
  landlord_id: string;
  created_at: string;
  updated_at: string;
}
