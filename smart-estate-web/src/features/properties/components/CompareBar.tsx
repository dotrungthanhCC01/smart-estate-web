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
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[500] px-4"
      style={{ animation: "slideUp 0.3s cubic-bezier(.22,.68,0,1.2)", width: "min(760px, calc(100vw - 2rem))" }}
    >
      <div className="bg-white dark:bg-[#151518] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3">
        
        {/* Icon + Label */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <GitCompare className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          </div>
          {/* Only show label on wider screens */}
          <div className="hidden sm:block">
            <div className="text-[12px] font-extrabold text-zinc-900 dark:text-white leading-tight">So sánh</div>
            <div className="text-[10.5px] text-zinc-400">{selectedProperties.length}/3 đã chọn</div>
          </div>
        </div>

        {/* Selected Properties */}
        <div className="flex items-center gap-2 flex-1 overflow-hidden min-w-0">
          {selectedProperties.map((prop) => (
            <div
              key={prop.id}
              className="relative flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 rounded-xl px-2.5 py-2 min-w-0 max-w-[200px] shrink-0"
            >
              <img
                src={prop.thumbnailUrl}
                alt={prop.title}
                className="w-7 h-7 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0 pr-5">
                <div className="text-[11px] font-bold text-zinc-900 dark:text-white truncate">{prop.title}</div>
                <div className="text-[10px] text-zinc-400 font-medium">{prop.priceDisplay}</div>
              </div>
              {/* X remove button — properly sized */}
              <button
                onClick={() => onRemove(prop.id)}
                className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-colors shrink-0"
                title="Bỏ chọn"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}

          {/* Empty Slots */}
          {Array.from({ length: 3 - selectedProperties.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="w-[130px] h-[52px] rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center shrink-0"
            >
              <span className="text-[11px] text-zinc-400 font-medium">+ Chọn BĐS</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClear}
            className="px-3 py-1.5 rounded-xl text-[12px] font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
          >
            Xóa
          </button>
          {selectedProperties.length >= 2 && (
            <Link
              to={`/properties/compare?ids=${selectedProperties.map((p) => p.id).join(",")}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[12.5px] font-extrabold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              So sánh ngay
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};
