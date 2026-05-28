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
    <div className="w-full h-full flex flex-col justify-between items-center pb-2">
      <div
        className={cn(
          "grid gap-2 md:gap-4 w-full",
          device === "mobile" && "grid-cols-2 grid-rows-2",
          device === "tablet" && "grid-cols-2 grid-rows-2",
          device === "desktop" && "grid-cols-4 grid-rows-1"
        )}
      >
        <div className="col-span-1 h-[100px] md:h-[120px]">
          <ProjectsWidget />
        </div>
        <div className="col-span-1 h-[100px] md:h-[120px]">
          <SkillsWidget />
        </div>
        <div className="col-span-1 h-[100px] md:h-[120px]">
          <JourneyWidget />
        </div>
        <div className="col-span-1 h-[100px] md:h-[120px]">
          <BlogWidget />
        </div>
      </div>
      
      <div className="w-full h-[40px] md:h-[48px] shrink-0">
        <ContactWidget />
      </div>
    </div>
  );
}
