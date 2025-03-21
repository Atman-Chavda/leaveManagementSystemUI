import type { Routes } from "@angular/router"

export const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    loadComponent: () => import("./components/dashboard/dashboard.component").then((m) => m.DashboardComponent),
  },
  {
    path: "new-leave",
    loadComponent: () => import("./components/new-leave/new-leave.component").then((m) => m.NewLeaveComponent),
  },
  {
    path: "wfh",
    loadComponent: () => import("./components/wfh/wfh.component").then((m) => m.WfhComponent),
  },
  {
    path: "oof",
    loadComponent: () => import("./components/oof/oof.component").then((m) => m.OofComponent),
  },
  {
    path: "profile",
    loadComponent: () => import("./components/profile/profile.component").then((m) => m.ProfileComponent),
  },
  { path: "**", redirectTo: "dashboard" },
]

