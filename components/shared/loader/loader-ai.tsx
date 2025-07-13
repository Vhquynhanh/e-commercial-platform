import { Loader2 } from "lucide-react";
import React from "react";

export const Loader = () => {
  const bars = Array.from({ length: 12 });

  return (
    <div className="text-center py-8">
      <Loader2 className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-4" />
      <p className="text-dark600_light300">
        AI đang phân tích để tìm khoá học phù hợp nhất...
      </p>

      {/* Loading Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="background-light100_dark700 rounded-xl p-4 animate-pulse"
          >
            <div className="h-48 background-light200_dark600 rounded-lg mb-4"></div>
            <div className="h-4 background-light200_dark600 rounded mb-2"></div>
            <div className="h-4 background-light200_dark600 rounded w-3/4 mb-2"></div>
            <div className="h-3 background-light200_dark600 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
