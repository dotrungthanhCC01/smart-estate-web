import { CalendarDays, Plus } from "lucide-react";

export const AppointmentPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Quản Lý Lịch Hẹn Xem Nhà
          </h1>
          <p className="text-sm text-zinc-500">
            Tích hợp FullCalendar xem thời gian biểu giữa Môi Giới và Khách Hàng.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">
          <Plus className="w-4 h-4" />
          <span>Tạo lịch hẹn mới</span>
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-8 text-center space-y-4">
        <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
          <CalendarDays className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200">
          Module FullCalendar Integration
        </h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto">
          Tích hợp `@fullcalendar/react` để hiển thị chế độ xem Theo Ngày (TimeGrid), Theo Tháng (DayGrid) và Đặt lịch xem trực tuyến.
        </p>
      </div>
    </div>
  );
};
