import { MapPin, Filter, Building } from "lucide-react";

export const PropertyListPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Danh Sách Bất Động Sản
          </h1>
          <p className="text-sm text-zinc-500">
            Tìm kiếm & Khám phá danh sách bất động sản bán & cho thuê với bộ lọc thông minh.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition">
            <Filter className="w-4 h-4" />
            <span>Bộ lọc tìm kiếm</span>
          </button>
        </div>
      </div>

      {/* Map & List Split View Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px]">
        {/* Properties List Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border text-center space-y-3">
            <Building className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200">
              Module Properties List (TanStack Query + Pagination)
            </h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Trang này hiển thị danh sách tin đăng bất động sản gọi từ Backend API thông qua Axios Interceptor và React Query.
            </p>
          </div>
        </div>

        {/* Leaflet Map Column */}
        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 border">
          <MapPin className="w-12 h-12 text-emerald-600 animate-bounce" />
          <h4 className="font-bold text-zinc-800 dark:text-zinc-200">React-Leaflet Map View</h4>
          <p className="text-xs text-zinc-500">
            Bản đồ định vị vị trí tọa độ GPS của các bất động sản trên giao diện.
          </p>
        </div>
      </div>
    </div>
  );
};
