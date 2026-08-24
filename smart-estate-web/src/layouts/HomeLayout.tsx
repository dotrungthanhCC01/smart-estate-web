import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/common/AppSidebar";

/**
 * HomeLayout — Layout chính sử dụng Sidebar bên trái cố định (Collapsible glassmorphism aside).
 * Tự động căn lề (margin-left) mượt mà cho phần nội dung chính.
 */
export const HomeLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-dvh w-full flex bg-[#F9F8F6] dark:bg-[#0c0c0e] text-zinc-900 dark:text-zinc-100">
      {/* ── Fixed Left Collapsible Sidebar ── */}
      <AppSidebar onToggleCollapse={setCollapsed} />

      {/* ── Main Content Area ── */}
      <main
        className={`flex-1 w-full transition-all duration-300 ease-in-out ${
          collapsed ? "pl-[92px]" : "pl-[92px] lg:pl-[284px]"
        } pr-4 sm:pr-6 py-4`}
      >
        <Outlet />
      </main>
    </div>
  );
};
