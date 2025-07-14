import { cn } from "@/lib/util";
import React from "react";

interface SkeletonProps {
  count?: number;
  height?: string;
  width?: string;
  className?: string;
  containerClassName?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  count = 3,
  height = "h-48",
  width = "w-full",
  className = "",
  containerClassName = ""
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        containerClassName
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`background-light100_dark700 rounded-xl p-4 animate-pulse ${className}`}
        >
          <div
            className={`${height} ${width} mb-4 background-light200_dark600 rounded`}
          ></div>
          <div className="h-4 background-light200_dark600 rounded mb-2"></div>
          <div className="h-4 background-light200_dark600 rounded w-3/4 mb-2"></div>
          <div className="h-3 background-light200_dark600 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};
