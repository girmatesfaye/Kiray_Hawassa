import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export function useListings(filters?: { status?: string }) {
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let query = supabase.from('listings').select('*');
    if (filters?.status) query = query.eq('status', filters.status);

    query.then(({ data }) => {
      setListings(data || []);
      setIsLoading(false);
    });
  }, [filters?.status]);

  return { listings, isLoading };
}
