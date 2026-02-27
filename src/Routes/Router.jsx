import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../Pages/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import Task from "../Pages/Task";
import Calendar from "../Pages/Calendar";
import Analytics from "../Pages/Analytics";
import Team from "../Pages/Team";
import Settings from "../Pages/Settings";
import Help from "../Pages/Help";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path:"/",
    Component: AuthLayout,
    children:[
        {
            path:"login",
            Component:Login
        },
    ]
  },
  {
    path:"/",
    element:<ProtectedRoute>
        <DashboardLayout></DashboardLayout>
    </ProtectedRoute>,
    children:[
        {
            path:"dashboard",
            element:<Dashboard></Dashboard>
        },
        {
            path:"tasks",
            element:<Task></Task>
        },
        {
            path:"calendar",
            element:<Calendar></Calendar>
        },
        {
            path:"analytics",
            element:<Analytics></Analytics>
        },
        {
            path:"team",
            element:<Team></Team>
        },
        {
            path:"settings",
            element:<Settings></Settings>
        },
        {
            path:"help",
            element:<Help></Help>
        }
    ]
  }
]);