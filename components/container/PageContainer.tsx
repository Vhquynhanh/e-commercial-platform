"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className
}: PageContainerProps) {
  return (
    <div
      className={clsx(
        "p-[30px] w-full mx-auto border border-[#D9D9D9] rounded-[10px]",
        className
      )}
    >
      {children}
    </div>
  );
}
