import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/common/Sidebar";
import { Bell, UserCircle, Search } from "lucide-react";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen w-full flex bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      {/* Fixed Navigation Sidebar */}
      <Sidebar />

      {/* Dashboard Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Topbar Header */}
        <header className="h-16 border-b bg-white dark:bg-zinc-950 px-6 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-lg w-full max-w-sm text-sm text-zinc-500">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm giao dịch, lịch hẹn, môi giới..."
              className="bg-transparent border-none outline-none w-full text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-2 border-l pl-4">
              <UserCircle className="w-8 h-8 text-zinc-400" />
              <div className="hidden sm:block text-left text-xs">
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">Nguyễn Môi Giới</p>
                <p className="text-zinc-500">Senior Agent</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Content Area: <Outlet /> renders overview, pipeline, appointments, chat */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
