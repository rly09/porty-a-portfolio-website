"use client";

import { useDevice } from "../DeviceContext";
import { cn } from "@/lib/utils";
import { ProjectsWidget } from "./ProjectsWidget";
import { SkillsWidget } from "./SkillsWidget";
import { JourneyWidget } from "./JourneyWidget";
import { BlogWidget } from "./BlogWidget";
import { ContactWidget } from "./ContactWidget";

export function WidgetGrid() {
  const { device } = useDevice();

  return (
    <div className="w-full h-full flex flex-col pb-2">
      <div
        className={cn(
          "grid gap-2 md:gap-3 flex-1 w-full",
          device === "mobile" && "grid-cols-2 grid-rows-2",
          device === "tablet" && "grid-cols-2 grid-rows-2",
          device === "desktop" && "grid-cols-4 grid-rows-1"
        )}
      >
        <div className="col-span-1 min-h-0">
          <ProjectsWidget />
        </div>
        <div className="col-span-1 min-h-0">
          <SkillsWidget />
        </div>
        <div className="col-span-1 min-h-0">
          <JourneyWidget />
        </div>
        <div className="col-span-1 min-h-0">
          <BlogWidget />
        </div>
      </div>
      
      <div className="mt-2 md:mt-3 h-[70px] shrink-0">
        <ContactWidget />
      </div>
    </div>
  );
}
