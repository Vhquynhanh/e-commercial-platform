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
    label: "HOME"
  },
  {
    // icon: "iconoir:search",
    route: "/product",
    label: "PRODUCT"
  },
  {
    // icon: "pepicons-pencil:bell",
    route: "/about-us",
    label: "ABOUT US"
  },
  {
    // icon: "ant-design:message-outlined",
    route: "/contact",
    label: "CONTACT"
  }
];
