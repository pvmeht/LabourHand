import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Splash } from "./components/Splash";
import { Onboarding } from "./components/Onboarding";
import { Landing } from "./components/Landing";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { ProjectDetails } from "./components/ProjectDetails";
import { WorkerProfile } from "./components/WorkerProfile";
import { PlaceBid } from "./components/PlaceBid";
import { ContractorDashboard } from "./components/ContractorDashboard";
import { MyBids } from "./components/MyBids";
import { Messages } from "./components/Messages";
import { CompareBids } from "./components/CompareBids";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/auth",
    Component: Register,
  },
  // Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/project/:id",
        Component: ProjectDetails,
      },
      {
        path: "/worker/:id",
        Component: WorkerProfile,
      },
      {
        path: "/bid/:projectId",
        Component: PlaceBid,
      },
      {
        path: "/contractor",
        Component: ContractorDashboard,
      },
      {
        path: "/my-bids",
        Component: MyBids,
      },
      {
        path: "/messages",
        Component: Messages,
      },
      {
        path: "/compare-bids/:projectId",
        Component: CompareBids,
      },
    ]
  }
]);