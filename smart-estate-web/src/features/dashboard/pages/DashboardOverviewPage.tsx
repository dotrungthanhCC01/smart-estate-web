import { TrendingUp, Building, Users, CalendarCheck } from "lucide-react";

export const DashboardOverviewPage = () => {
  const stats = [
    { title: "Tổng BĐS Đang Quản Lý", value: "148", icon: Building, color: "text-emerald-500" },
    { title: "Khách Hàng Tiềm Năng", value: "1,240", icon: Users, color: "text-blue-500" },
    { title: "Lịch Hẹn Trong Tuần", value: "24", icon: CalendarCheck, color: "text-purple-500" },
    { title: "Doanh Số Tháng Này", value: "1.8 Tỷ", icon: TrendingUp, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Tổng Quan Dashboard
        </h1>
        <p className="text-sm text-zinc-500">
          Thống kê báo cáo hiệu suất môi giới và hệ thống Smart Estate.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500">{stat.title}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
