import { useState, useRef } from "react";
import { Search, SlidersHorizontal, X, Sparkles, Bell } from "lucide-react";
import {
  NotificationModal,
  NOTIFICATION_UNREAD_COUNT,
} from "@/features/dashboard/components/NotificationModal";

interface PropertySearchHeaderProps {
  keyword: string;
  onKeywordChange: (val: string) => void;
  activeFilterCount: number;
  activeFilterSummary: string[];
  onRemoveTag?: (tagKey: string) => void;
  onOpenFilterModal: () => void;
}

export const PropertySearchHeader = ({
  keyword,
  onKeywordChange,
  activeFilterCount,
  activeFilterSummary,
  onRemoveTag,
  onOpenFilterModal,
}: PropertySearchHeaderProps) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-2 z-40 w-full mb-3 animate-in slide-in-from-top-4 duration-500">
      <div className="w-full max-w-5xl mx-auto px-4 py-2 bg-white/90 dark:bg-[#141417]/90 backdrop-blur-2xl border border-white/80 dark:border-zinc-800/80 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)] flex items-center justify-between gap-3 transition-all duration-300">
        
        {/* Search Input Section */}
        <div className="flex-1 flex items-center gap-3 pl-3">
          <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-500 dark:text-zinc-400 shrink-0 shadow-inner">
            <Search className="w-4.5 h-4.5" />
          </div>

          <div className="flex-1 min-w-0 flex items-center gap-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
              placeholder="Bạn muốn tìm bất động sản, phòng trọ ở đâu? (vd: Hà Nội, Thanh Xuân, Vinhomes...)"
              className="w-full bg-transparent text-[13.5px] font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none truncate"
            />
            {keyword && (
              <button
                onClick={() => onKeywordChange("")}
                className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors shrink-0"
                title="Xóa từ khóa"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Tags Quick Bar (if any) */}
        {activeFilterSummary.length > 0 && (
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-xs shrink-0">
            {activeFilterSummary.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/80 shrink-0 shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                {tag}
              </span>
            ))}
            {activeFilterSummary.length > 2 && (
              <span className="px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                +{activeFilterSummary.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Right Action Buttons Group: Filter + Notification */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Filter Trigger Button */}
          <button
            onClick={onOpenFilterModal}
            className="relative w-10.5 h-10.5 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:scale-105 active:scale-95 flex items-center justify-center border border-zinc-800 dark:border-white/20 shadow-md transition-all group"
            title="Mở bộ lọc nâng cao"
          >
            <SlidersHorizontal className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            
            {/* Badge counter */}
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-md animate-pulse">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Notification Bell Button — Màu sắc tương đồng bộ lọc, hiển thị bên phải bộ lọc */}
          <button
            ref={bellRef}
            onClick={() => setNotifOpen((v) => !v)}
            className="relative w-10.5 h-10.5 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:scale-105 active:scale-95 flex items-center justify-center border border-zinc-800 dark:border-white/20 shadow-md transition-all group"
            title="Thông báo hệ thống"
          >
            <Bell className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            
            {NOTIFICATION_UNREAD_COUNT > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-md animate-pulse">
                {NOTIFICATION_UNREAD_COUNT}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notification Dropdown Modal */}
      <NotificationModal
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        anchorRef={bellRef}
      />
    </header>
  );
};
