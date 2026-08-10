import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/useAuth';
import { fetchInterests } from './api';

export function useInterests() {
  const { session } = useAuth();
  const [interests, setInterests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    setIsLoading(true);
    fetchInterests(session.user.id)
      .then((data) => setInterests(data || []))
      .finally(() => setIsLoading(false));
  }, [session]);

  return { interests, isLoading };
}
