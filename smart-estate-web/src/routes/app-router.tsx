import { createBrowserRouter, RouterProvider } from "react-router-dom";

// System Layouts (containing <Outlet />)
import { MainLayout } from "@/layouts/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";

// Route Security Guard
import { ProtectedRoute } from "@/components/common/ProtectedRoute";

// Page Components
import { HomePage } from "@/pages/HomePage";
import { PropertyListPage } from "@/features/properties/pages/PropertyListPage";
import { PropertyDetailPage } from "@/features/properties/pages/PropertyDetailPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { AppointmentPage } from "@/features/appointments/pages/AppointmentPage";
import { PipelinePage } from "@/features/pipeline/pages/PipelinePage";
import { ChatPage } from "@/features/chat/pages/ChatPage";
import { DashboardOverviewPage } from "@/features/dashboard/pages/DashboardOverviewPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

/**
 * CẤU HÌNH ĐỊNH TUYẾN ỨNG DỤNG (APP ROUTER)
 * 
 * 1. MainLayout (Public Routes): Bọc các trang công khai bằng Header & Footer chung.
 *    Các trang con (HomePage, PropertyListPage...) tự động chui vào thẻ <Outlet /> của MainLayout.
 * 
 * 2. AuthLayout (Auth Routes): Khung giao diện thẻ căn giữa cho Đăng nhập / Đăng ký.
 * 
 * 3. DashboardLayout (Protected Routes): Khung Quản trị Môi giới có Sidebar + Header + <Outlet />.
 */
const router = createBrowserRouter([
  // 1. PUBLIC ROUTES (MainLayout with Header, Footer & <Outlet />)
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "properties", element: <PropertyListPage /> },
      { path: "properties/:id", element: <PropertyDetailPage /> },
    ],
  },

  // 2. AUTHENTICATION ROUTES (AuthLayout with Centered Card & <Outlet />)
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },

  // 3. PROTECTED DASHBOARD ROUTES (DashboardLayout with Sidebar & <Outlet />)
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

  // 4. CATCH-ALL 404 NOT FOUND ROUTE
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
