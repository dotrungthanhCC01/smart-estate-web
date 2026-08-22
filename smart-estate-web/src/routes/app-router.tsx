import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// System Layouts (containing <Outlet />)
import { MainLayout } from "@/layouts/MainLayout";
import { HomeLayout } from "@/layouts/HomeLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";

// Route Security Guard
import { ProtectedRoute } from "@/components/common/ProtectedRoute";

// Landing Page
import { HomePage } from "@/pages/HomePage";

// App Pages (HomeLayout + AppHeader)
import { AppHomePage } from "@/pages/AppHomePage";
import { PropertyListPage } from "@/features/properties/pages/PropertyListPage";
import { PropertyDetailPage } from "@/features/properties/pages/PropertyDetailPage";
import { PostListingPage } from "@/features/listings/pages/PostListingPage";

// Auth
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";

// Dashboard (protected)
import { AppointmentPage } from "@/features/appointments/pages/AppointmentPage";
import { PipelinePage } from "@/features/pipeline/pages/PipelinePage";
import { ChatPage } from "@/features/chat/pages/ChatPage";
import { DashboardOverviewPage } from "@/features/dashboard/pages/DashboardOverviewPage";

import { NotFoundPage } from "@/pages/NotFoundPage";

/**
 * CẤU HÌNH ĐỊNH TUYẾN ỨNG DỤNG
 *
 * Mỗi nhóm route có layout riêng:
 * - /              → MainLayout  (Landing page — Header cũ)
 * - /home, /properties, /post-listing → HomeLayout (AppHeader mới)
 * - /auth/*        → AuthLayout
 * - /dashboard/*   → DashboardLayout (protected)
 */
const router = createBrowserRouter([

  // ─── 1. LANDING PAGE ─────────────────────────────────────────────────────
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
    ],
  },

  // ─── 2. APP HOME ─────────────────────────────────────────────────────────
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      { index: true, element: <AppHomePage /> },
    ],
  },

  // ─── 3. PROPERTIES ───────────────────────────────────────────────────────
  {
    path: "/properties",
    element: <HomeLayout />,
    children: [
      { index: true, element: <PropertyListPage /> },
      { path: ":id", element: <PropertyDetailPage /> },
    ],
  },

  // ─── 4. POST LISTING ─────────────────────────────────────────────────────
  {
    path: "/post-listing",
    element: <HomeLayout />,
    children: [
      { index: true, element: <PostListingPage /> },
    ],
  },

  // ─── 5. CONVENIENCE ALIASES ──────────────────────────────────────────────
  {
    path: "/mua-ban",
    element: <Navigate to="/properties?type=buy" replace />,
  },
  {
    path: "/cho-thue",
    element: <Navigate to="/properties?type=rent" replace />,
  },
  {
    path: "/favorites",
    element: <HomeLayout />,
    children: [{ index: true, element: <AppHomePage /> }],
  },
  {
    path: "/blog",
    element: <HomeLayout />,
    children: [{ index: true, element: <AppHomePage /> }],
  },

  // ─── 6. AUTH ROUTES ──────────────────────────────────────────────────────
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },

  // ─── 7. PROTECTED DASHBOARD ROUTES ───────────────────────────────────────
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardOverviewPage /> },
          { path: "appointments", element: <AppointmentPage /> },
          { path: "pipeline", element: <PipelinePage /> },
          { path: "chat", element: <ChatPage /> },
        ],
      },
    ],
  },

  // ─── 8. CATCH-ALL 404 ────────────────────────────────────────────────────
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
