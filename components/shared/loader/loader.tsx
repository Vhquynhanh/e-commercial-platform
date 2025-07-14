import React from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoaderProps {
  label: string;
  className?: string;
  classNameSkeleton?: string;
  classNameSkeletonContainer?: string;
  skeletonCount?: number;
}

export const Loader: React.FC<LoaderProps> = ({
  label,
  className = "",
  classNameSkeleton = "",
  classNameSkeletonContainer = "mt-6",
  skeletonCount = 3
}) => {
  return (
    <div className={`text-center py-8 ${className}`}>
      <Loader2 className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-4" />
      <p className="text-dark600_light300">{label}</p>

      {/* Using Skeleton component with dynamic count */}
      <Skeleton
        count={skeletonCount}
        className={classNameSkeleton}
        containerClassName={classNameSkeletonContainer}
      />
    </div>
  );
};
