import { Outlet, Link } from "react-router-dom";
import { Building2, ChevronLeft, ChevronRight, Quote, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../store/theme.context";

// ─── Data ─────────────────────────────────────────────────────────────────────
const founders = [
  {
    name: "Nguyễn Văn An",
    title: "CEO & Co-Founder",
    company: "Smart Estate Vietnam",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    quote:
      '"Smart Estate giúp tôi quản lý danh mục bất động sản toàn quốc và thực hiện giao dịch an toàn chỉ trong vài phút. Nền tảng hoàn hảo cho thị trường Việt Nam."',
  },
  {
    name: "Trần Thị Minh",
    title: "CTO & Co-Founder",
    company: "Smart Estate Vietnam",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    quote:
      '"Chúng tôi xây dựng Smart Estate với tầm nhìn kết nối người mua, người bán và môi giới trên một nền tảng minh bạch, hiện đại và đáng tin cậy nhất Việt Nam."',
  },
  {
    name: "Lê Hoàng Phúc",
    title: "CPO & Co-Founder",
    company: "Smart Estate Vietnam",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    quote:
      '"Với Smart Estate, chúng tôi mang đến trải nghiệm tìm kiếm và giao dịch bất động sản tốt nhất, giúp mọi người dễ dàng sở hữu ngôi nhà mơ ước."',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export const AuthLayout = () => {
  const [current, setCurrent] = useState(0);
  const founder = founders[current];
  const { theme, toggleTheme } = useTheme();

  const prev = () => setCurrent((c) => (c - 1 + founders.length) % founders.length);
  const next = () => setCurrent((c) => (c + 1) % founders.length);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % founders.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex w-full min-h-dvh overflow-hidden bg-[#F9F8F6] dark:bg-[#0c0c0e] transition-colors duration-300">

      {/* ════════════════════════════════════
          LEFT — Form Panel (45%)
      ════════════════════════════════════ */}
      <div className="w-[45%] shrink-0 flex flex-col items-center justify-start pt-[12vh] pb-10 px-14 bg-white dark:bg-[#121215] rounded-r-3xl shadow-[16px_0_48px_rgba(0,0,0,0.06)] dark:shadow-[16px_0_48px_rgba(0,0,0,0.7)] border-r border-[#EFECE6] dark:border-zinc-800/80 overflow-y-auto min-h-dvh relative z-10 transition-colors duration-300">
        
        {/* Theme Toggle Button — Top Left */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center text-zinc-700 dark:text-amber-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
          aria-label="Toggle theme"
          title={theme === "dark" ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
        >
          {theme === "dark" ? <Sun size={18} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" /> : <Moon size={18} className="text-zinc-700" />}
        </button>

        <div className="w-full max-w-[360px]">
          <Outlet />
        </div>
      </div>

      {/* ════════════════════════════════════
          RIGHT — Image Panel (55%)
      ════════════════════════════════════ */}
      <div className="relative flex-1 overflow-hidden bg-[#F9F8F6] dark:bg-[#0c0c0e] min-h-dvh transition-colors duration-300">

        {/* Ambient background glow in dark mode */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 dark:bg-indigo-500/15 blur-3xl pointer-events-none" />

        {/* ── Image blob — border-0 outline-none overrides global border-border ── */}
        <div className="absolute inset-6  rounded-[44px] overflow-hidden border-0 outline-none shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)]">

          {/* Property image */}
          <img
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85"
            alt="Smart Estate Property"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 dark:brightness-[0.82] dark:contrast-[1.12] dark:saturate-[1.1]"
          />

          {/* Multi-stop atmospheric gradient */}

          {/* Logo — top left */}
          <Link
            to="/"
            className="absolute top-6 left-7 z-20 flex items-center gap-2.5 no-underline text-white group"
          >
            <div className="w-9 h-9 rounded-[10px] bg-white/[0.18] dark:bg-black/40 border border-white/30 dark:border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-lg">
              <Building2 size={17} className="text-white" />
            </div>
            <span className="font-bold text-[14px] tracking-tight drop-shadow-md text-white">
              Smart Estate
            </span>
          </Link>

          {/* Tagline — top right */}
          <p className="absolute top-7 right-7 z-20 text-white/95 text-[13px] font-medium text-right leading-snug max-w-[300px] drop-shadow-lg">
            Khám phá hàng nghìn bất động sản<br />
            để mua, bán &amp; cho thuê cùng Smart Estate.
          </p>
        </div>



        {/* ════════════════════════════════════════════
            FOUNDER CARD
        ════════════════════════════════════════════ */}
        <div className="absolute bottom-20 right-12 z-30 w-[50%]">

          {/* Glass card with fixed height so it never moves */}
          <div className="relative w-full h-[260px] rounded-2xl border border-white/[0.18] dark:border-white/[0.14] pt-[58px] pb-5 px-[22px] bg-black/[0.55] dark:bg-black/[0.72] backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.5)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between">

            {/* Avatar — square, rounded corners, real person photo, overlaps card top */}
            <div className="absolute -left-[40px] -top-25 w-[140px] h-[140px] rounded-sm overflow-hidden border-[3px] border-white/90 dark:border-white/80 shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_16px_rgba(255,255,255,0.1)]">
              <img
                src={founder.avatar}
                alt={founder.name}
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Quote icon badge */}
            <div className="flex items-center gap-2 mb-1">
              <Quote size={16} className="text-white/40 dark:text-amber-400/70" />
            </div>

            {/* Quote text container — fixed space */}
            <div className="h-[80px] overflow-hidden flex items-start">
              <p className="text-white/[0.92] text-[13px] leading-relaxed italic font-normal line-clamp-4">
                {founder.quote}
              </p>
            </div>

            {/* Footer: name/title + nav arrows */}
            <div className="flex items-end justify-between gap-3">

              <div className="flex flex-col gap-[2px]">
                <p className="text-white font-bold text-[15px] leading-tight mb-[3px] tracking-tight">{founder.name}</p>
                <p className="text-white/70 dark:text-white/80 text-[12px] font-medium">{founder.title}</p>
                <p className="text-white/[0.45] text-[11px] mt-[1px]">{founder.company}</p>
              </div>

              {/* Navigation arrows */}
              <div className="flex gap-1.5 items-center shrink-0">
                <button
                  onClick={prev}
                  aria-label="Previous founder"
                  className="w-[32px] h-[32px] rounded-full border border-white/25 dark:border-white/20 bg-white/10 dark:bg-white/10 hover:bg-white/25 dark:hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next founder"
                  className="w-[32px] h-[32px] rounded-full border border-white/25 dark:border-white/20 bg-white/10 dark:bg-white/10 hover:bg-white/25 dark:hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-[6px] justify-center mt-4">
              {founders.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="h-[5px] rounded-full border-none p-0 cursor-pointer transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 6,
                    background: i === current ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.25)",
                    boxShadow: i === current ? "0 0 10px rgba(255,255,255,0.6)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
