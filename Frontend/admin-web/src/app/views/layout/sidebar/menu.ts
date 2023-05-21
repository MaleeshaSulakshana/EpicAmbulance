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
    isVisible: true,
    data: ["hospitals.view"]
  },
  {
    label: "Hospitals",
    icon: "plus",
    link: "/hospitals",
    isVisible: true,
    data: ["hospitals.view"]
  },
  {
    label: "Ambulances",
    isTitle: true,
    isVisible: true,
    data: ["ambulances.view"]
  },
  {
    label: "Ambulances",
    icon: "truck",
    link: "/ambulances",
    isVisible: true,
    data: ["ambulances.view"]
  },
  {
    label: "Users",
    isTitle: true,
    isVisible: true,
    data: ["systemUsers.view", "appUsers.view", "hospitalUsers.view", "ambulanceCrewMembers.view"]
  },
  {
    label: "App Users (Patients)",
    icon: "users",
    link: "/users/app-users",
    isVisible: true,
    data: ["appUsers.view"]
  },
  {
    label: "Hospital Users",
    icon: "users",
    link: "/users/hospital-users",
    isVisible: true,
    data: ["hospitalUsers.view"]
  },
  {
    label: "System Users",
    icon: "users",
    link: "/users/system-users",
    isVisible: true,
    data: ["systemUsers.view"]
  },
  {
    label: "Ambulance Crew Members",
    icon: "users",
    link: "/users/ambulance-crew-members",
    isVisible: true,
    data: ["ambulanceCrewMembers.view"]
  },
  {
    label: "Bookings",
    isTitle: true,
    isVisible: true,
    data: ["bookings.view"]
  },
  {
    label: "Bookings",
    icon: "calendar",
    link: "/bookings",
    isVisible: true,
    data: ["bookings.view"]
  }
];
