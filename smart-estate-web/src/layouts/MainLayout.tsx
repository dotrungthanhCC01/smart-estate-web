import { Outlet } from "react-router-dom";
import { Header } from "@/components/common/Header";

export const MainLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground">
      {/* Floating Transparent Glass Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
    </div>
  );
};
