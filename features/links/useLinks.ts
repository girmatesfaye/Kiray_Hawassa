import { useState } from 'react';
import { useAuth } from '@/features/auth/useAuth';
import { createLink } from './api';

export function useLinks() {
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateLink = async (listingId: string, tenantId: string) => {
    if (!session) throw new Error('Not authenticated');
    setIsLoading(true);
    try {
      return await createLink(listingId, tenantId);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreateLink, isLoading };
}
