import { useContext, createContext, type ReactNode } from 'react';
import type { Role } from '@/lib/supabase/types';

type RoleContextValue = {
  role: Role | null;
  setRole: (role: Role | null) => void;
};

export const RoleContext = createContext<RoleContextValue>({
  role: null,
  setRole: () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  return <RoleContext.Provider value={{ role: null, setRole: () => {} }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  return useContext(RoleContext);
}
