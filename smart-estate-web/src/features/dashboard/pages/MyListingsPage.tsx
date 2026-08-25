import { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronRight,
  Search,
  MoreHorizontal,
  TrendingUp,
  Users,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MOCK_PROPERTIES } from "@/features/properties/data/mockProperties";

type TabType = "active" | "pending" | "expired";

const TAB_CONFIG: { key: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "active", label: "Đang hiển thị", icon: CheckCircle2 },
  { key: "pending", label: "Chờ duyệt", icon: Clock },
  { key: "expired", label: "Đã hết hạn", icon: XCircle },
];

// Assign mock status to properties for demo
const MY_LISTINGS = MOCK_PROPERTIES.slice(0, 9).map((p, i) => ({
  ...p,
  myStatus: (i < 4 ? "active" : i < 7 ? "pending" : "expired") as TabType,
  views: Math.floor(Math.random() * 800) + 100,
  saves: Math.floor(Math.random() * 60) + 5,
  inquiries: Math.floor(Math.random() * 20) + 1,
  expireDate:
    i < 4
      ? "30/09/2026"
      : i < 7
      ? "Chờ duyệt"
      : "01/08/2026",
}));

interface DeleteConfirmProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({ title, onConfirm, onCancel }: DeleteConfirmProps) => (
  <div className="fixed inset-0 z-[700] flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div
      className="bg-white dark:bg-[#151518] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl p-8 max-w-md w-full mx-4 text-center"
      style={{ animation: "scaleIn 0.2s ease" }}
    >
      <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mx-auto mb-4">
        <Trash2 className="w-7 h-7 text-rose-500" />
      </div>
      <h3 className="text-[17px] font-extrabold text-zinc-900 dark:text-white mb-2">
        Xóa tin đăng?
      </h3>
      <p className="text-[13px] text-zinc-400 mb-6 leading-relaxed">
        Bạn có chắc muốn xóa tin đăng{" "}
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          "{title}"
        </span>
        ? Hành động này không thể hoàn tác.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-[13px] font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Hủy
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-2xl bg-rose-500 text-white text-[13px] font-bold hover:bg-rose-600 transition-colors"
        >
          Xóa tin
        </button>
      </div>
    </div>
    <style>{`
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.92); }
        to   { opacity: 1; transform: scale(1); }
      }
    `}</style>
  </div>
);

export const MyListingsPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("active");
  const [searchQ, setSearchQ] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [listings, setListings] = useState(MY_LISTINGS);

  const filtered = listings.filter(
    (l) =>
      l.myStatus === activeTab &&
      (searchQ === "" ||
        l.title.toLowerCase().includes(searchQ.toLowerCase()) ||
        l.address.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const counts = {
    active: listings.filter((l) => l.myStatus === "active").length,
    pending: listings.filter((l) => l.myStatus === "pending").length,
    expired: listings.filter((l) => l.myStatus === "expired").length,
  };

  const handleDelete = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    setDeleteTarget(null);
  };

  const deleteTargetTitle =
    listings.find((l) => l.id === deleteTarget)?.title || "";

  return (
    <div className="w-full pb-16 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-[20px] font-extrabold text-zinc-900 dark:text-white">
            Quản lý tin đăng
          </h1>
          <p className="text-[13px] text-zinc-400 mt-0.5">
            Quản lý tất cả tin đăng bất động sản của bạn
          </p>
        </div>
        <Link
          to="/post-listing"
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[13px] font-extrabold hover:opacity-90 transition-opacity shadow-md"
        >
          <Plus className="w-4 h-4" />
          Đăng tin mới
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tổng lượt xem", value: listings.reduce((a, b) => a + b.views, 0).toLocaleString(), icon: Eye, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "Lượt yêu thích", value: listings.reduce((a, b) => a + b.saves, 0).toString(), icon: Heart, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
          { label: "Lượt liên hệ", value: listings.reduce((a, b) => a + b.inquiries, 0).toString(), icon: Users, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-[#151518] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-[18px] font-black text-zinc-900 dark:text-white leading-tight">{stat.value}</div>
                <div className="text-[11.5px] text-zinc-400">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs + Search */}
      <div className="bg-white dark:bg-[#151518] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Tab Buttons */}
          <div className="flex items-center p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800 gap-1">
            {TAB_CONFIG.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-bold transition-all ${
                  activeTab === key
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === key
                    ? key === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : key === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500"
                }`}>
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Tìm kiếm tin đăng..."
              className="pl-9 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[12.5px] text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors w-56"
            />
          </div>
        </div>

        {/* Listing Count */}
        <div className="text-[12px] text-zinc-400 font-medium">
          Hiển thị <span className="font-bold text-zinc-700 dark:text-zinc-300">{filtered.length}</span> tin đăng
        </div>
      </div>

      {/* Listings */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-[#151518] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
            <Search className="w-7 h-7 text-zinc-400" />
          </div>
          <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-1">
            Không tìm thấy tin đăng
          </h3>
          <p className="text-zinc-400 text-[13px] max-w-xs">
            {activeTab === "active"
              ? "Bạn chưa có tin đăng nào đang hiển thị."
              : activeTab === "pending"
              ? "Không có tin nào đang chờ duyệt."
              : "Không có tin nào đã hết hạn."}
          </p>
          <Link
            to="/post-listing"
            className="mt-4 px-5 py-2.5 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[13px] font-bold hover:opacity-90 transition-opacity"
          >
            Đăng tin mới
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((listing) => (
            <div
              key={listing.id}
              className="bg-white dark:bg-[#151518] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs overflow-hidden flex flex-col sm:flex-row"
            >
              {/* Thumbnail */}
              <div className="relative sm:w-40 aspect-[16/9] sm:aspect-auto overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                <img
                  src={listing.thumbnailUrl}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    listing.myStatus === "active"
                      ? "bg-emerald-500 text-white"
                      : listing.myStatus === "pending"
                      ? "bg-amber-400 text-white"
                      : "bg-zinc-500 text-white"
                  }`}>
                    {listing.myStatus === "active" ? "Đang hiển thị" : listing.myStatus === "pending" ? "Chờ duyệt" : "Hết hạn"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-zinc-900 dark:text-white line-clamp-1">
                      {listing.title}
                    </h3>
                    <p className="text-[12px] text-zinc-400 mt-0.5 truncate">
                      {listing.address}
                    </p>
                  </div>
                  <span className="text-[16px] font-black text-zinc-900 dark:text-white shrink-0">
                    {listing.priceDisplay}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-[11.5px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {listing.views.toLocaleString()} lượt xem
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {listing.saves} lưu
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {listing.inquiries} liên hệ
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Hạn: {listing.expireDate}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                  <Link
                    to={`/properties/${listing.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Xem
                  </Link>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <Edit3 className="w-3.5 h-3.5" />
                    Chỉnh sửa
                  </button>
                  {listing.myStatus === "expired" && (
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Gia hạn
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteTarget(listing.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Xóa
                  </button>
                  <Link to={`/properties/${listing.id}`} className="flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <button className="flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          title={deleteTargetTitle}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};
