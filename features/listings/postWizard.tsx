import React, { createContext, useContext, useMemo, useState } from 'react';

export type ListingType = 'house' | 'apartment' | 'shop';

export type WizardPhoto = {
  id: string;
  uri: string;
  name: string;
  type: string;
  uploadedPath?: string;
  publicUrl?: string;
  progress: number;
  isCover: boolean;
};

export type ListingDraft = {
  id: string;
  photos: WizardPhoto[];
  title: string;
  description: string;
  price: string;
  type: ListingType;
  rooms: string;
  bathroomType: string;
  hasWater: boolean;
  hasElectric: boolean;
  subcity: string;
  locationText: string;
  acceptedTerms: boolean;
};

type WizardContextValue = {
  draft: ListingDraft;
  resetDraft: () => void;
  updateDraft: (patch: Partial<ListingDraft>) => void;
};

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const value = (Math.random() * 16) | 0;
    const result = char === 'x' ? value : (value & 0x3) | 0x8;
    return result.toString(16);
  });
};

const createEmptyDraft = (): ListingDraft => ({
  id: createId(),
  photos: [],
  title: '',
  description: '',
  price: '',
  type: 'house',
  rooms: '',
  bathroomType: '',
  hasWater: false,
  hasElectric: false,
  subcity: '',
  locationText: '',
  acceptedTerms: true,
});

const WizardContext = createContext<WizardContextValue | undefined>(undefined);

export function ListingPostWizardProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<ListingDraft>(() => createEmptyDraft());

  const value = useMemo<WizardContextValue>(
    () => ({
      draft,
      resetDraft: () => setDraft(createEmptyDraft()),
      updateDraft: (patch) => setDraft((current) => ({ ...current, ...patch })),
    }),
    [draft]
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useListingPostWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useListingPostWizard must be used inside ListingPostWizardProvider');
  }
  return context;
}
