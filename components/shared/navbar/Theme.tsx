"use client";
import React from "react";

import { useTheme } from "@/contexts/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants";
import "@/styles/theme.css";
import { cn } from "@/lib/util";

const Theme = ({ className }: { className?: string }) => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className={cn("relative border-none", className)}>
      <MenubarMenu>
        <MenubarTrigger>
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent
          className="absolute -right-12 mt-3 min-w-[120px]
        rounded border py-2 dark:border-dark-700 background-light50_dark100 text-dark900_light200"
        >
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              className="flex items-center gap-4 px-2.5 py-2 dark:hover:bg-dark-600 hover:bg-light-200 rounded-md transition-colors"
              onClick={() => {
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                src={item.icon}
                alt={item.value}
                width={16}
                height={16}
                className={`${mode === item.value && "text-primary-500"}`}
              />
              <p
                className={`font-semibold ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark700_light300"
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
