import { useRole } from './RoleContext';

export function useRoleSelection() {
  const { role, setRole } = useRole();
  return { role, setRole };
}
