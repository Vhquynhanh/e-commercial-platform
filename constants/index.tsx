import { NavbarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" }
];

export const navbarLinks: NavbarLink[] = [
  {
    // icon: "fluent:home-20-regular",
    route: "/",
    value: "home",
    label: "Trang chủ"
  },
  {
    // icon: "iconoir:search",
    route: "/product/favourites",
    value: "favourties",
    label: "Yêu thích"
  },
  {
    // icon: "pepicons-pencil:bell",
    route: "/product/history",
    value: "history",
    label: "Lịch sử"
  }
];
