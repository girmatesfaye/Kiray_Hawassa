import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/useAuth';
import { fetchProfile, updateProfile } from './api';
import { Profile } from '@/lib/supabase/types';

export function useProfile() {
  const { session, isLoading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    setIsLoading(true);
    fetchProfile(session.user.id)
      .then(setProfile)
      .finally(() => setIsLoading(false));
  }, [session]);

  const save = async (updates: Record<string, any>) => {
    if (!session) throw new Error('Not authenticated');
    const updated = await updateProfile(session.user.id, updates);
    setProfile(updated);
    return updated;
  };

  return { profile, isLoading: isLoading || authLoading, save };
}
