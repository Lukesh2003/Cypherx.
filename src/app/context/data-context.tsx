
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, Tourist, MOCK_ALERTS, MOCK_TOURISTS } from '@/lib/data';

interface DataContextProps {
  tourists: Tourist[];
  alerts: Alert[];
  addTourist: (tourist: Tourist) => void;
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
  setTourists: React.Dispatch<React.SetStateAction<Tourist[]>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [tourists, setTourists] = useState<Tourist[]>(MOCK_TOURISTS);
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

  const addTourist = (tourist: Tourist) => {
    setTourists(prevTourists => [tourist, ...prevTourists]);
  };

  return (
    <DataContext.Provider value={{ tourists, alerts, addTourist, setAlerts, setTourists }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
