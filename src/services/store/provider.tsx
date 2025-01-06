import React, { createContext, useContext, useState } from 'react';

type ContextType = {
  units: Units;
  toggleUnits: () => void;
};

const AppContext = createContext<ContextType>({
  toggleUnits(): void {},
  units: 'metric',
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [units, setUnits] = useState<Units>('metric');

  return (
    <AppContext.Provider
      value={{
        units,
        toggleUnits: () => setUnits(units === 'metric' ? 'imperial' : 'metric'),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }

  return context;
}
