import { Outlet } from "react-router-dom";
import { Header } from "@/components/common/Header";

export const MainLayout = () => {
  return (
    <div className="h-dvh w-full flex flex-col bg-background text-foreground overflow-hidden">
      {/* Floating Transparent Glass Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
};
