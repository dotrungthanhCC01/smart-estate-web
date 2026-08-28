import { useEffect, useRef, useState } from "react";
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
    body: "Tin đăng \"Căn hộ 2PN Vinhomes Grand Park\" của bạn đã được phê duyệt.",
    time: "15 phút trước",
    read: false,
  },
  {
    id: "n3",
    type: "payment",
    title: "Thanh toán thành công",
    body: "Gói đăng tin Cơ bản 30 ngày — 299.000đ đã xử lý thành công.",
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
];

const ICON_MAP = {
  property: Home,
  payment: CreditCard,
  message: MessageCircle,
  promotion: Tag,
  system: Info,
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
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [pos, setPos] = useState<{ top: number; right: number }>({ top: 76, right: 16 });

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Reposition modal relative to anchorRef
  useEffect(() => {
    if (!open) return;
    if (anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 10,
        right: Math.max(16, window.innerWidth - rect.right),
      });
    }
  }, [open, anchorRef]);

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

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div
      ref={modalRef}
      className={cn(
        "fixed z-[600] w-[360px] max-h-[500px] flex flex-col",
        "bg-white dark:bg-[#141417] border border-zinc-200/80 dark:border-zinc-800/80",
        "rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl"
      )}
      style={{
        top: `${pos.top}px`,
        right: `${pos.right}px`,
        animation: "slideInDown 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <Bell className="w-4 h-4 text-zinc-900 dark:text-white" />
          <span className="text-[14px] font-extrabold text-zinc-900 dark:text-white">
            Thông báo
          </span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white">
              {unreadCount} mới
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
              Đã đọc
            </button>
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="overflow-y-auto flex-1 divide-y divide-zinc-100/60 dark:divide-zinc-800/60">
        {notifications.map((notif) => {
          const Icon = ICON_MAP[notif.type] || Info;
          return (
            <button
              key={notif.id}
              onClick={() => {
                setNotifications((prev) =>
                  prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
                );
              }}
              className={cn(
                "w-full text-left flex items-start gap-3 px-4 py-3 transition-colors",
                "hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
                !notif.read ? "bg-zinc-100/50 dark:bg-zinc-800/40" : "bg-transparent"
              )}
            >
              {/* Icon Chip */}
              <div className="w-8.5 h-8.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Icon className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "text-[12.5px] font-bold truncate",
                      notif.read
                        ? "text-zinc-600 dark:text-zinc-400 font-medium"
                        : "text-zinc-950 dark:text-white font-extrabold"
                    )}
                  >
                    {notif.title}
                  </span>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 animate-pulse" />
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
      <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50">
        <button className="w-full py-2 rounded-xl text-[12px] font-extrabold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-xs">
          Xem tất cả thông báo
        </button>
      </div>

      <style>{`
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export const NOTIFICATION_UNREAD_COUNT = MOCK_NOTIFICATIONS.filter(
  (n) => !n.read
).length;
