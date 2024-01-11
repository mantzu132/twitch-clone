"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleSkeleton } from "@/app/(browse)/_components/sidebar/toggle";
import { RecommendedSkeleton } from "@/app/(browse)/_components/sidebar/recommended";
import { useIsClient } from "usehooks-ts";
import { FollowingSkeleton } from "@/app/(browse)/_components/sidebar/following";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);
  const isClient = useIsClient();

  if (!isClient)
    return (
      <Skeleton className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </Skeleton>
    );

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]",
      )}
    >
      {children}
    </aside>
  );
};
