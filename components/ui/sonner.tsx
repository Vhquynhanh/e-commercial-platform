"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-blue-100 group-[.toaster]:text-blue-500 group-[.toaster]:border group-[.toaster]:border-blue-100 group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:p-4 group-[.toaster]:min-w-[300px]",

          description:
            "group-[.toast]:text-gray-900 dark:group-[.toast]:text-gray-300 group-[.toast]:text-sm group-[.toast]:mt-1",

          actionButton:
            "group-[.toast]:bg-blue-500 group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:rounded-md group-[.toast]:text-sm group-[.toast]:text-white group-[.toast]:font-medium group-[.toast]:transition-colors",

          cancelButton:
            "group-[.toast]:bg-green-300 group-[.toast]:hover:bg-gray-200 group-[.toast]:text-gray-700 group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:rounded-md group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-colors dark:group-[.toast]:bg-gray-700 dark:group-[.toast]:hover:bg-gray-600 dark:group-[.toast]:text-gray-200"
        }
      }}
      {...props}
    />
  );
};

export { Toaster };
