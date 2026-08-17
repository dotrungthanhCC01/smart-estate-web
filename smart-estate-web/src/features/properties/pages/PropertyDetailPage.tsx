import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, MapPin } from "lucide-react";

export const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link to="/properties" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700">
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại danh sách BĐS</span>
      </Link>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-6 space-y-6">
        <div className="space-y-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
            Bán - Căn hộ chung cư
          </span>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Chi Tiết Bất Động Sản #{id || "1"}
          </h1>
          <p className="text-sm text-zinc-500 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>Khu đô thị Vinhomes Grand Park, Phường Long Thạnh Mỹ, TP. Thủ Đức</span>
          </p>
        </div>

        <div className="h-64 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-xl flex items-center justify-center text-white font-bold">
          <Building2 className="w-16 h-16 opacity-40 mr-3" />
          <span>Hình ảnh Gallery BĐS #{id}</span>
        </div>
      </div>
    </div>
  );
};
