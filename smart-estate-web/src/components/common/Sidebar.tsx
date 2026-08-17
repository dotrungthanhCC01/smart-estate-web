import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building,
  CalendarDays,
  Kanban,
  MessageSquare,
  ArrowLeft
} from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    { label: "Tổng quan", path: "/dashboard", icon: LayoutDashboard, end: true },
    { label: "Quản lý BĐS", path: "/properties", icon: Building },
    { label: "Lịch hẹn xem nhà", path: "/dashboard/appointments", icon: CalendarDays },
    { label: "Tiến độ Deal (Kanban)", path: "/dashboard/pipeline", icon: Kanban },
    { label: "Nhắn tin Realtime", path: "/dashboard/chat", icon: MessageSquare },
  ];

  return (
    <aside className="w-64 border-r bg-white dark:bg-zinc-950 min-h-screen flex flex-col justify-between p-4">
      <div className="space-y-6">
        {/* Brand header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="p-2 bg-emerald-600 rounded-lg text-white font-bold text-sm">
            SE
          </div>
          <div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Smart Estate Portal</h3>
            <p className="text-xs text-zinc-500">Môi giới & Quản trị</p>
          </div>
        </div>

        {/* Menu list */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer back link */}
      <div className="border-t pt-4 space-y-2">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </NavLink>
      </div>
    </aside>
  );
};
