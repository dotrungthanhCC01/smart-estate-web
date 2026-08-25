import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  Sun,
  Moon,
  Heart,
  MessageCircle,
  Plus,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { useTheme } from "@/store/theme.context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotificationModal, NOTIFICATION_UNREAD_COUNT } from "@/features/dashboard/components/NotificationModal";

const NAV_ITEMS = [
  { label: "Mua BĐS", href: "/properties?type=buy" },
  { label: "Thuê BĐS", href: "/properties?type=rent" },
  { label: "Trọ Sinh Viên", href: "/properties?category=student_room&type=rent" },
  { label: "Đăng bán", href: "/post-listing" },
  { label: "Môi giới", href: "/dashboard/pipeline" },
  { label: "Bài viết", href: "/blog" },
];

export const AppHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    const [path, search] = href.split("?");
    if (search) {
      return location.pathname === path && location.search.includes(search);
    }
    return location.pathname === path && !location.search;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-2 pointer-events-none transition-all duration-300">
        <div className="max-w-[1440px] mx-auto h-[64px] px-5 sm:px-8 bg-white/75 dark:bg-[#0c0c0e]/75 backdrop-blur-2xl border border-white/40 dark:border-zinc-800/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex items-center justify-between pointer-events-auto transition-all">

          {/* ── Brand Logo ── */}
          <Link to="/home" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
              <Building2 className="w-5 h-5 text-white dark:text-zinc-900" />
            </div>
            <span className="font-extrabold text-[17.5px] tracking-tight text-zinc-900 dark:text-white">
              Smart<span className="font-light text-zinc-500">Estate</span>
            </span>
          </Link>

          {/* ── Center Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200",
                  isActive(item.href)
                    ? "text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800 font-bold shadow-xs"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50/80 dark:hover:bg-zinc-850"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ── Right Action Controls ── */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Favourite Button */}
            <Link
              to="/favorites"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-semibold text-zinc-600 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              title="Yêu thích"
            >
              <Heart className="w-4 h-4 text-zinc-500" />
              <span className="hidden sm:inline">Yêu thích</span>
              <span className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10.5px] font-bold flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Chat Link */}
            <Link
              to="/dashboard/chat"
              className="relative w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              title="Tin nhắn"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600" />
            </Link>

            {/* 🔔 Notification Bell */}
            <button
              ref={bellRef}
              onClick={() => setNotifOpen((v) => !v)}
              className={cn(
                "relative w-8 h-8 rounded-full flex items-center justify-center transition-all",
                notifOpen
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
              title="Thông báo"
            >
              <Bell className="w-4 h-4" />
              {NOTIFICATION_UNREAD_COUNT > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center px-1 leading-none">
                  {NOTIFICATION_UNREAD_COUNT}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              title={theme === "dark" ? "Chế độ sáng" : "Chế độ tối"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-zinc-200" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>

            {/* Đăng tin CTA */}
            <Link to="/post-listing" className="hidden sm:block">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-[12.5px] font-bold border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 h-8 px-3"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Đăng tin
              </Button>
            </Link>

            {/* Login / Register */}
            <Link to="/auth/login">
              <Button
                variant="default"
                size="sm"
                className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 px-4 h-8 text-[12.5px] font-bold shadow-sm"
              >
                Đăng nhập
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Nav Dropdown ── */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 max-w-[1440px] mx-auto border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl rounded-2xl p-5 space-y-2 shadow-2xl pointer-events-auto">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block py-2.5 px-3 rounded-xl text-[13.5px] font-semibold transition-all",
                  isActive(item.href)
                    ? "text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-850 font-bold"
                    : "text-zinc-500 dark:text-zinc-400"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Link
                to="/post-listing"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-[13px] font-bold"
              >
                <Plus className="w-4 h-4" />
                Đăng tin bất động sản
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Notification Modal */}
      <NotificationModal
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        anchorRef={bellRef}
      />
    </>
  );
};
