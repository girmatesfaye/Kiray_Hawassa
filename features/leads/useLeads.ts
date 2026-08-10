import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/useAuth';
import { fetchLeads } from './api';

export function useLeads() {
  const { session } = useAuth();
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    setIsLoading(true);
    fetchLeads(session.user.id)
      .then((data) => setLeads(data || []))
      .finally(() => setIsLoading(false));
  }, [session]);

  return { leads, isLoading };
}
