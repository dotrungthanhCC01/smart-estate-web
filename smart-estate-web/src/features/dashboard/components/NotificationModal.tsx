import { useEffect, useRef } from "react";
import {
  Bell,
  X,
  CheckCheck,
  Home,
  CreditCard,
  MessageCircle,
  Tag,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "property" | "payment" | "message" | "promotion" | "system";
  title: string;
  body: string;
  time: string;
  read: boolean;
  avatar?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "message",
    title: "Tin nhắn mới từ Nguyễn Văn A",
    body: "Căn hộ Q7 có thể xem vào thứ 7 không anh?",
    time: "2 phút trước",
    read: false,
  },
  {
    id: "n2",
    type: "property",
    title: "Tin đăng đã được duyệt",
    body: "Tin đăng \"Căn hộ 2PN Vinhomes Grand Park\" của bạn đã được phê duyệt và hiển thị.",
    time: "15 phút trước",
    read: false,
  },
  {
    id: "n3",
    type: "payment",
    title: "Thanh toán thành công",
    body: "Gói đăng tin Cơ bản 30 ngày — 299.000đ đã được xử lý thành công.",
    time: "1 giờ trước",
    read: false,
  },
  {
    id: "n4",
    type: "promotion",
    title: "Ưu đãi đặc biệt tháng 8",
    body: "Giảm 30% gói đăng tin VIP. Áp dụng đến 31/08/2026.",
    time: "3 giờ trước",
    read: true,
  },
  {
    id: "n5",
    type: "property",
    title: "BĐS mới phù hợp với bạn",
    body: "5 căn hộ mới tại Quận 7 vừa được đăng phù hợp với tìm kiếm của bạn.",
    time: "5 giờ trước",
    read: true,
  },
  {
    id: "n6",
    type: "system",
    title: "Cập nhật hệ thống",
    body: "SmartEstate vừa nâng cấp tính năng tìm kiếm AI. Khám phá ngay!",
    time: "1 ngày trước",
    read: true,
  },
];

const ICON_MAP = {
  property: { icon: Home, color: "#8b5cf6", bg: "#f5f3ff" },
  payment: { icon: CreditCard, color: "#10b981", bg: "#ecfdf5" },
  message: { icon: MessageCircle, color: "#3b82f6", bg: "#eff6ff" },
  promotion: { icon: Tag, color: "#f59e0b", bg: "#fffbeb" },
  system: { icon: Info, color: "#6b7280", bg: "#f9fafb" },
};

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement | HTMLButtonElement | null>;
}

export const NotificationModal = ({
  open,
  onClose,
  anchorRef,
}: NotificationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        anchorRef?.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div
      ref={modalRef}
      className={cn(
        "fixed z-[600] w-[360px] max-h-[520px] flex flex-col",
        "right-4 top-[76px]",
        "bg-white dark:bg-[#151518] border border-zinc-200/80 dark:border-zinc-800/80",
        "rounded-3xl shadow-2xl overflow-hidden"
      )}
      style={{ animation: "slideInDown 0.2s ease" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <Bell className="w-4.5 h-4.5 text-zinc-900 dark:text-white" />
          <span className="text-[14px] font-extrabold text-zinc-900 dark:text-white">
            Thông báo
          </span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
              {unreadCount} mới
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
            <CheckCheck className="w-3.5 h-3.5" />
            Đọc tất cả
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="overflow-y-auto flex-1 divide-y divide-zinc-50 dark:divide-zinc-800/60">
        {MOCK_NOTIFICATIONS.map((notif) => {
          const { icon: Icon, color, bg } = ICON_MAP[notif.type];
          return (
            <button
              key={notif.id}
              className={cn(
                "w-full text-left flex items-start gap-3 px-4 py-3.5 transition-colors",
                "hover:bg-zinc-50 dark:hover:bg-zinc-800/40",
                !notif.read && "bg-blue-50/50 dark:bg-blue-900/10"
              )}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: bg }}
              >
                <Icon className="w-4.5 h-4.5" style={{ color }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "text-[12.5px] font-bold truncate",
                      notif.read
                        ? "text-zinc-700 dark:text-zinc-300"
                        : "text-zinc-900 dark:text-white"
                    )}
                  >
                    {notif.title}
                  </span>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  )}
                </div>
                <p className="text-[11.5px] text-zinc-400 dark:text-zinc-500 line-clamp-2 mt-0.5 leading-relaxed">
                  {notif.body}
                </p>
                <span className="text-[10.5px] text-zinc-400 font-medium mt-1 block">
                  {notif.time}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800/80">
        <button className="w-full py-2 rounded-xl text-[12px] font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          Xem tất cả thông báo
        </button>
      </div>

      <style>{`
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export const NOTIFICATION_UNREAD_COUNT = MOCK_NOTIFICATIONS.filter(
  (n) => !n.read
).length;
