import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    label: "Main",
    isTitle: true,
    isVisible: true
  },
  {
    label: "Dashboard",
    icon: "home",
    link: "/dashboard",
    isVisible: true
  },
  {
    label: "Hospitals",
    isTitle: true,
    isVisible: true
  },
  {
    label: "Hospitals",
    icon: "plus",
    link: "/hospitals",
    isVisible: true
  },
  {
    label: "Ambulances",
    isTitle: true,
    isVisible: true
  },
  {
    label: "Ambulances",
    icon: "truck",
    link: "/ambulances",
    isVisible: true
  },
  {
    label: "Users",
    isTitle: true,
    isVisible: true
  },
  {
    label: "App Users (Patients)",
    icon: "users",
    link: "/users/app-users",
    isVisible: true
  },
  {
    label: "Hospital Users",
    icon: "users",
    link: "/users/hospital-users",
    isVisible: true
  },
  {
    label: "System Users",
    icon: "users",
    link: "/users/system-users",
    isVisible: true
  },
  {
    label: "Ambulance Crew Members",
    icon: "users",
    link: "/users/ambulance-crew-members",
    isVisible: true
  },
  {
    label: "Bookings",
    isTitle: true,
    isVisible: true
  },
  {
    label: "Bookings",
    icon: "calendar",
    link: "/bookings",
    isVisible: true
  }
];
