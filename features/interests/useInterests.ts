import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/useAuth';
import { fetchInterests } from './api';

// Realtime subscription removed for mock mode.
// Re-add supabase channel when switching to real data.
export function useInterests() {
  const { session } = useAuth();
  const [interests, setInterests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    const userId = session.user.id;
    setIsLoading(true);
    fetchInterests(userId)
      .then((data) => setInterests(data || []))
      .finally(() => setIsLoading(false));
  }, [session]);

  return { interests, isLoading };
}
