"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { DeviceSwitcher } from "@/components/ui/DeviceSwitcher";
import { DeviceFrame } from "@/components/DeviceFrame";
import { DeviceProvider, useDevice } from "@/components/DeviceContext";
import { WidgetGrid } from "@/components/widgets/WidgetGrid";
import { FloatingQuotes } from "@/components/FloatingQuotes";

function LandingContent() {
  const { device, setDevice } = useDevice();

  return (
    <main className="fixed inset-0 w-screen h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <FloatingQuotes />
      </div>
      
      {/* Absolute Top Bar */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex items-start justify-between z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <DeviceSwitcher activeDevice={device} onChange={setDevice} />
        </div>
        
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>

      {/* Hero Text */}
      <div className="absolute top-20 md:top-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-40 w-max max-w-[95vw]">
        <h1 className="text-2xl md:text-4xl font-display tracking-tight text-mono-950 dark:text-mono-50">
          Hey, I am Roshan Lal Yogi
        </h1>
        <p className="text-[10px] md:text-sm font-mono font-medium text-mono-600 dark:text-mono-400 mt-2 tracking-widest uppercase">
          Building intelligent apps, interfaces, and digital experiences.
        </p>
      </div>

      {/* Center Device Frame */}
      <div className="flex-1 w-full flex items-center justify-center z-10 pt-40 md:pt-36 pb-8 px-4">
        <DeviceFrame>
          <WidgetGrid />
        </DeviceFrame>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <DeviceProvider defaultDevice="mobile">
      <LandingContent />
    </DeviceProvider>
  );
}
