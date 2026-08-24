import { Search, SlidersHorizontal, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <header className="sticky top-3 z-40 w-full mb-5 animate-in slide-in-from-top-4 duration-500">
      <div className="w-full max-w-5xl mx-auto px-4 py-2 bg-white/90 dark:bg-[#151518]/90 backdrop-blur-xl border border-white/60 dark:border-zinc-800/80 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.4)] flex items-center justify-between gap-3 transition-all duration-300">
        
        {/* Search Input Section */}
        <div className="flex-1 flex items-center gap-3 pl-3">
          <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 shrink-0">
            <Search className="w-4.5 h-4.5" />
          </div>

          <div className="flex-1 min-w-0 flex items-center gap-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
              placeholder="Bạn muốn tìm bất động sản, phòng trọ ở đâu? (vd: Hà Nội, Thanh Xuân, Vinhomes...)"
              className="w-full bg-transparent text-[13.5px] font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none truncate"
            />
            {keyword && (
              <button
                onClick={() => onKeywordChange("")}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
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
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 shrink-0"
              >
                {tag}
              </span>
            ))}
            {activeFilterSummary.length > 2 && (
              <span className="text-[11px] font-bold text-zinc-400">
                +{activeFilterSummary.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Filter Trigger Button (Matching Image 1 Design) */}
        <button
          onClick={onOpenFilterModal}
          className="relative w-11 h-11 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-zinc-800 dark:text-zinc-100 flex items-center justify-center border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs hover:scale-105 active:scale-95 transition-all shrink-0 group"
          title="Mở bộ lọc nâng cao"
        >
          <SlidersHorizontal className="w-4.5 h-4.5 group-hover:rotate-90 transition-transform duration-300" />
          
          {/* Badge counter matching Image 1 */}
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-zinc-950 text-white dark:bg-emerald-500 dark:text-white text-[10.5px] font-extrabold flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-md">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
