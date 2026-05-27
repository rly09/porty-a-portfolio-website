"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { DeviceType } from "@/types/device";

interface DeviceContextType {
  device: DeviceType;
  setDevice: (device: DeviceType) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function DeviceProvider({
  children,
  defaultDevice = "mobile",
}: {
  children: ReactNode;
  defaultDevice?: DeviceType;
}) {
  const [device, setDevice] = useState<DeviceType>(defaultDevice);

  return (
    <DeviceContext.Provider value={{ device, setDevice }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
}
