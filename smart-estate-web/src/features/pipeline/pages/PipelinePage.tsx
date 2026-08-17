import { Plus } from "lucide-react";

export const PipelinePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Tiến Độ Giao Dịch Deal (Kanban)
          </h1>
          <p className="text-sm text-zinc-500">
            Quản lý quy trình chăm sóc khách hàng & hợp đồng kéo thả với Dnd-kit.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">
          <Plus className="w-4 h-4" />
          <span>Thêm Deal mới</span>
        </button>
      </div>

      {/* Kanban Board Columns Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["Lead Tiềm Năng", "Đã Xem Nhà", "Thương Lượng cọc", "Thành Công"].map((col, idx) => (
          <div key={idx} className="bg-zinc-200/60 dark:bg-zinc-900/60 rounded-xl p-4 border space-y-3 min-h-[350px]">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">{col}</h4>
              <span className="text-xs bg-white dark:bg-zinc-800 px-2 py-0.5 rounded-full font-semibold">2</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border shadow-sm space-y-2 text-xs">
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">Căn hộ Vinhomes #102</p>
              <p className="text-zinc-500">Khách hàng: Anh Minh (090123...)</p>
              <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">
                4.2 Tỷ VNĐ
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
