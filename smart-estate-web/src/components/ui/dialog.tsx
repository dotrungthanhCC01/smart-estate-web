import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop overlay with fade */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-md transition-opacity animate-in fade-in-0 duration-300"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog container */}
      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#151518] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-250 my-auto">
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between",
      className
    )}
    {...props}
  />
);

export const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      "text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2",
      className
    )}
    {...props}
  />
);

export const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-xs text-zinc-500 dark:text-zinc-400 mt-0.5", className)}
    {...props}
  />
);

export const DialogContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("p-6 max-h-[calc(85vh-120px)] overflow-y-auto space-y-6", className)}
    {...props}
  />
);

export const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "px-6 py-4 bg-zinc-50/80 dark:bg-zinc-900/60 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3",
      className
    )}
    {...props}
  />
);

export const DialogClose = ({
  onClick,
}: {
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
    title="Đóng cửa sổ"
  >
    <X className="w-4 h-4" />
  </button>
);
