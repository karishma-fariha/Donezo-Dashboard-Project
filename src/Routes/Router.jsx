import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../Pages/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import Analytics from "../Pages/Analytics";
import Team from "../Pages/Team";
import Settings from "../Pages/Settings";
import Help from "../Pages/Help";
import User from "../Pages/User";
import Product from "../Pages/Product";
import Overview from "../Pages/Overview";

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
            path:"overview",
            element:<Overview></Overview>
        },
        {
            path:"users",
            element:<User></User>
        },
        {
            path:"products",
            element:<Product></Product>
        },
        {
            path:"analytics",
            element:<Analytics></Analytics>
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