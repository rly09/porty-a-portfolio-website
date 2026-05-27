"use client";

import { motion } from "framer-motion";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DeviceType } from "@/types/device";

interface DeviceSwitcherProps {
  activeDevice: DeviceType;
  onChange: (device: DeviceType) => void;
  className?: string;
}

const devices = [
  { id: "mobile", icon: Smartphone, label: "Mobile" },
  { id: "tablet", icon: Tablet, label: "Tablet" },
  { id: "desktop", icon: Monitor, label: "Desktop" },
] as const;

export function DeviceSwitcher({
  activeDevice,
  onChange,
  className,
}: DeviceSwitcherProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 p-1 rounded-full",
        "bg-white/60 dark:bg-black/40 backdrop-blur-md",
        "border border-black/10 dark:border-white/10",
        "shadow-sm",
        className
      )}
    >
      {devices.map((device) => {
        const Icon = device.icon;
        const isActive = activeDevice === device.id;

        return (
          <button
            key={device.id}
            onClick={() => onChange(device.id)}
            className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-full",
              "text-sm font-medium transition-colors",
              isActive
                ? "text-mono-950 dark:text-mono-50"
                : "text-mono-500 hover:text-mono-900 dark:hover:text-mono-100"
            )}
            aria-label={`Switch to ${device.label} view`}
          >
            {isActive && (
              <motion.div
                layoutId="device-switcher-active"
                className="absolute inset-0 rounded-full bg-white dark:bg-mono-800 shadow-md border border-black/5 dark:border-white/5"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon className="relative z-10 w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}
