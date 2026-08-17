import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Building2, ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/store/theme.context";

interface HeaderProps {
  activeSection?: string;
}

export const Header = ({ activeSection = "hero" }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "hero", label: "TỔNG QUAN", href: "#hero" },
    { id: "portfolio", label: "BỘ SƯU TẬP", href: "#portfolio" },
    { id: "about", label: "VỀ CHÚNG TÔI", href: "#about" },
    { id: "types", label: "LOẠI HÌNH BĐS", href: "#types" },
    { id: "faq", label: "HỎI ĐÁP & ĐỐI TÁC", href: "#faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-3 pb-1 pointer-events-none">
      <div className="max-w-[1400px] mx-auto h-[62px] px-6 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/85 backdrop-blur-xl shadow-lg shadow-black/5 flex items-center justify-between pointer-events-auto transition-all duration-300">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-zinc-900 dark:text-white">
            Smart<span className="text-zinc-500 font-medium">Estate</span>
          </span>
        </Link>

        {/* Nav with Active Section Indicator */}
        <nav className="flex items-center gap-1.5 p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-105"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-all hover:scale-105"
            title={theme === "dark" ? "Chuyển sang Chế độ Sáng" : "Chuyển sang Chế độ Tối"}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          <Link
            to="/auth/login"
            className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-3 py-2 transition-colors"
          >
            Đăng nhập
          </Link>
          <Link
            to="/auth/register"
            className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-5 py-2.5 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm transition-all hover:scale-105"
          >
            <span>Bắt đầu ngay</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          <button
            className="p-1.5 text-zinc-800 dark:text-zinc-200"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-lg bg-white/95 dark:bg-zinc-900/95 border border-black/10 dark:border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl backdrop-blur-2xl pointer-events-auto">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`block text-xs font-bold uppercase tracking-wider transition ${
                activeSection === item.id ? "text-zinc-950 dark:text-white font-extrabold" : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-black/5 dark:border-white/5 flex flex-col gap-2">
            <Link
              to="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="block text-center text-xs font-bold uppercase tracking-wider py-3 border border-black/10 dark:border-white/15 rounded-full text-zinc-900 dark:text-white"
            >
              Đăng nhập
            </Link>
            <Link
              to="/auth/register"
              onClick={() => setMobileOpen(false)}
              className="block text-center text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-3 rounded-full"
            >
              Bắt đầu ngay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
