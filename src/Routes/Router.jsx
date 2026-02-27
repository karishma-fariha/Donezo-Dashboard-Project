import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../Pages/Dashboard";

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
    path:"/dashboard",
    element:<ProtectedRoute>
        <Dashboard></Dashboard>
    </ProtectedRoute>
  }
]);