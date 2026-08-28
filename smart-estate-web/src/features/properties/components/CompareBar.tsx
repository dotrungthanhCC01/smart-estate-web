import { X, ArrowRight, GitCompare } from "lucide-react";
import { Link } from "react-router-dom";
import type { Property } from "@/features/properties/data/mockProperties";

interface CompareBarProps {
  selectedProperties: Property[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const CompareBar = ({
  selectedProperties,
  onRemove,
  onClear,
}: CompareBarProps) => {
  if (selectedProperties.length === 0) return null;

  return (
    <div className="w-full shrink-0 animate-in slide-in-from-bottom-3 duration-300">
      <div className="bg-white dark:bg-[#151518] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-md p-3 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 w-full">
        {/* Left section: Icon & Count */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8.5 h-8.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center shrink-0 shadow-xs">
            <GitCompare className="w-4 h-4" />
          </div>
          <div className="hidden sm:block shrink-0">
            <div className="text-[12px] font-extrabold text-zinc-900 dark:text-white leading-tight whitespace-nowrap">
              So sánh BĐS
            </div>
            <div className="text-[10px] text-zinc-400 font-semibold whitespace-nowrap">
              {selectedProperties.length}/3 đã chọn
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

        {/* Items Container: Flexible distribution */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          {selectedProperties.map((prop) => (
            <div
              key={prop.id}
              className="relative flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-zinc-700/60 rounded-xl px-2.5 py-1.5 min-w-0 flex-1 h-[44px] overflow-hidden group hover:border-zinc-400 transition-colors"
            >
              <img
                src={prop.thumbnailUrl}
                alt={prop.title}
                className="w-7 h-7 rounded-lg object-cover shrink-0 shadow-xs"
              />
              <div className="flex-1 min-w-0 pr-4">
                <div className="text-[11px] font-extrabold text-zinc-900 dark:text-white truncate leading-tight">
                  {prop.title}
                </div>
                <div className="text-[10px] text-zinc-400 font-semibold truncate mt-0.5">
                  {prop.priceDisplay}
                </div>
              </div>
              <button
                onClick={() => onRemove(prop.id)}
                className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white transition-colors shrink-0"
                title="Bỏ chọn"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: 3 - selectedProperties.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="hidden md:flex h-[44px] rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700/60 items-center justify-center min-w-0 flex-1 text-zinc-400 hover:border-zinc-400 transition-colors select-none"
            >
              <span className="text-[11px] font-bold text-zinc-400 truncate px-1">+ Thêm BĐS</span>
            </div>
          ))}
        </div>

        {/* Actions section */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onClear}
            className="px-2.5 py-1.5 rounded-xl text-[11.5px] font-bold text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors whitespace-nowrap"
          >
            Xóa tất cả
          </button>
          {selectedProperties.length >= 2 && (
            <Link
              to={`/properties/compare?ids=${selectedProperties.map((p) => p.id).join(",")}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[11.5px] font-extrabold hover:opacity-90 transition-all whitespace-nowrap shadow-sm shrink-0"
            >
              <span>So sánh ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
