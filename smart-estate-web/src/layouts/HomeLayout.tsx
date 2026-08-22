import { Outlet } from "react-router-dom";
import { AppHeader } from "@/components/common/AppHeader";

/**
 * HomeLayout — Layout cho trang chủ (/home) và các trang app chính.
 * Dùng AppHeader riêng (có Mua/Thuê, Đăng tin, Chat, Yêu thích...)
 * khác với MainLayout dùng cho landing page.
 */
export const HomeLayout = () => {
  return (
    <div className="min-h-dvh w-full flex flex-col bg-background text-foreground">
      <AppHeader />
      {/* pt-16 to offset fixed AppHeader height (64px) */}
      <main className="flex-1 w-full ">
        <Outlet />
      </main>
    </div>
  );
};
