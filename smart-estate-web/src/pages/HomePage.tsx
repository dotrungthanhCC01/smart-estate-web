import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  Search,
  Phone,
  Plus,
  Minus,
  Building,
  Key,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

// ─── Data & Constants ───────────────────────────────────────────────────────
const PORTFOLIO_PROPERTIES = [
  {
    id: "1",
    title: "Căn Hộ Horizon Luxury Penthouse",
    location: "Bình Thạnh, TP. HCM",
    price: "Từ 15.8 Tỷ",
    installment: "Trả góp 10 năm",
    initialPayment: "Thanh toán 1.5 Tỷ",
    completion: "Bàn giao Q4/2025",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    category: "Căn hộ",
  },
  {
    id: "2",
    title: "Biệt Thự Đơn Lập The Riviera Resort",
    location: "Quận 2, TP. Thủ Đức",
    price: "Từ 42.5 Tỷ",
    installment: "Trả góp 5 năm",
    initialPayment: "Thanh toán 4.2 Tỷ",
    completion: "Bàn giao Q2/2026",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    category: "Biệt thự",
  },
];

const PROPERTY_TYPES = [
  {
    id: "01",
    name: "Biệt Thự Cao Cấp",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    offset: "translate-y-4",
  },
  {
    id: "02",
    name: "Penthouse Thượng Lưu",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    offset: "-translate-y-4",
  },
  {
    id: "03",
    name: "Căn Hộ Hạng Sang",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    offset: "translate-y-4",
  },
  {
    id: "04",
    name: "BĐS Ven Biển",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    offset: "-translate-y-4",
  },
  {
    id: "05",
    name: "Dinh Biệt Sân Golf",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    offset: "translate-y-4",
  },
];

const PARTNERS = ["DAMAC", "EMAAR", "NAKHEEL", "SOBHA", "MERAAS"];

const FAQS = [
  {
    q: "Smart Estate cung cấp những loại hình bất động sản nào?",
    a: "Chúng tôi cung cấp bộ sưu tập độc quyền bao gồm căn hộ Penthouse, biệt thự ven sông, shophouse mặt tiền kinh doanh và căn hộ dịch vụ cao cấp.",
  },
  {
    q: "Phương thức thanh toán và chính sách trả góp như thế nào?",
    a: "Hỗ trợ chính sách trả góp linh hoạt lên đến 10 năm từ chủ đầu tư, ân hạn nợ gốc và lãi suất 0% trong 24 tháng đầu.",
  },
  {
    q: "Người nước ngoài có thể sở hữu bất động sản tại Việt Nam không?",
    a: "Có! Người nước ngoài được quyền sở hữu nhà ở theo hình thức hợp đồng thuê dài hạn (50 năm) hoặc sở hữu căn hộ thuộc khối quota cho phép.",
  },
  {
    q: "Quy trình đặt lịch xem nhà trực tuyến được thực hiện ra sao?",
    a: "Bạn chỉ cần chọn bất động sản yêu thích, đặt lịch qua FullCalendar và chuyên viên môi giới của chúng tôi sẽ xác nhận trong vòng 15 phút.",
  },
  {
    q: "Có những chi phí phát sinh nào khi thực hiện giao dịch không?",
    a: "Mọi chi phí công chứng, thuế trước bạ và phí quản lý đều được minh bạch 100% trên hợp đồng trước khi thanh toán.",
  },
];

// ─── Main Component ─────────────────────────────────────────────────────────
export const HomePage = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMuted, setIsMuted] = useState(true);
  const [activePortfolioTab, setActivePortfolioTab] = useState<"Căn hộ" | "Biệt thự" | "Cho thuê">("Căn hộ");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay fallback
      });
    }
  }, []);

  // Active Section Intersection Observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  return (
    <div className="w-full h-dvh flex flex-col bg-background text-foreground overflow-hidden">
      {/* Floating Header with Active Section Pill Highlight */}
      <Header activeSection={activeSection} />

      {/* Snap Scroll Main Container */}
      <div
        ref={containerRef}
        className="snap-main-container flex-1 bg-[#F9F8F6] dark:bg-[#0F0F0F] text-[#121212] dark:text-[#F9F8F6] transition-colors duration-300"
      >
        
        {/* ══════════════════════════════════════════════════
            SECTION 1 — HERO OVERVIEW WITH VIDEO (#hero) (Image 2 Layout)
        ══════════════════════════════════════════════════ */}
        <section
          id="hero"
          className="snap-full-section px-6 sm:px-12 pt-28 pb-10"
        >
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-8 items-center h-full">
            {/* Left Column — Text & Search */}
            <div className="col-span-6 space-y-6 my-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white" />
                Kiến Tạo Không Gian Sống Thượng Lưu
              </div>

              <h1 className="text-[58px] font-extrabold leading-[1.02] tracking-tight text-zinc-900 dark:text-white">
                Bất Động Sản:<br />
                <span className="text-zinc-400 dark:text-zinc-500 font-light italic">Khái Niệm Mới</span> Cho An Cư & Đầu Tư
              </h1>

              <p className="text-zinc-600 dark:text-zinc-400 text-base max-w-xl font-normal leading-relaxed">
                Khám phá bộ sưu tập bất động sản độc quyền với bản đồ AI Leaflet, đặt lịch xem nhà FullCalendar và quản lý hợp đồng minh bạch.
              </p>

              {/* Quick Search Box */}
              <div className="p-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl flex items-center gap-3 max-w-xl">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Tìm theo khu vực, dự án hoặc ngân sách..."
                    className="w-full bg-transparent border-none outline-none text-xs font-medium placeholder:text-zinc-400 text-zinc-900 dark:text-white"
                  />
                </div>
                <Link
                  to="/properties"
                  className="flex items-center gap-1.5 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition shadow-md"
                >
                  <span>Tìm kiếm</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-2 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" /> 12,500+ BĐS Đang Bán</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" /> 480+ Môi Giới Chuyên Nghiệp</span>
              </div>
            </div>

            {/* Right Column — Luxury Real Estate Video Preview Box */}
            <div className="col-span-6 relative rounded-[2.5rem] overflow-hidden h-[625px] border border-black/10 dark:border-white/10 shadow-2xl my-auto group">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover "
                poster="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
              >
                <source
                  src="/assets/overview.mp4"
                  type="video/mp4"
                />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white flex items-center justify-center backdrop-blur-md shadow-md hover:scale-110 transition-transform"
                title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <div className="absolute bottom-6 left-6 z-20 max-w-xs space-y-1">
                <span className="text-[10px] font-bold text-white/70 tracking-widest uppercase">Khu Đô Thị Hạng Sang</span>
                <h4 className="text-white font-extrabold text-lg leading-snug drop-shadow">
                  Horizon Park Residences & Marina
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SECTION 2 — PROPERTY PORTFOLIO (#portfolio) (Hover Fade Up Pills)
        ══════════════════════════════════════════════════ */}
        <section
          id="portfolio"
          className="snap-full-section px-6 sm:px-12 pt-28 pb-10"
        >
          <div className="max-w-[1400px] mx-auto w-full flex flex-col justify-between h-full">
            {/* Top Bar Header */}
            <div className="flex flex-row items-center justify-between gap-4">
              <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Bộ Sưu Tập Bất Động Sản Nổi Bật
              </h2>

              {/* Category Filter Pills */}
              <div className="flex gap-1 p-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 w-fit">
                {(["Căn hộ", "Biệt thự", "Cho thuê"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivePortfolioTab(tab)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                      activePortfolioTab === tab
                        ? "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-sm"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* 2 Large Rounded Cards with HOVER FADE-UP REVEAL */}
            <div className="grid grid-cols-2 gap-6 my-auto">
              {PORTFOLIO_PROPERTIES.map((prop) => (
                <div
                  key={prop.id}
                  className="relative rounded-[2.5rem] overflow-hidden h-[480px] group border border-black/10 dark:border-white/10 shadow-xl cursor-pointer transition-all duration-500"
                >
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute top-6 right-6 z-20">
                    <Link
                      to="/properties/1"
                      className="w-12 h-12 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                    </Link>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

                  <div className="absolute top-6 left-6 z-20 max-w-xs">
                    <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight drop-shadow-md">
                      {prop.title}
                    </h3>
                  </div>

                  <div className="absolute bottom-6 right-6 z-20 group-hover:bottom-24 transition-all duration-500">
                    <div className="px-4 py-2 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                      <span>{prop.location}</span>
                    </div>
                  </div>

                  {/* Bottom Information Pills — REVEALS ONLY ON HOVER WITH FADE UP */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 info-pill-reveal">
                    <div className="flex flex-wrap gap-2 items-center">
                      <div className="px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-900 dark:text-white shadow-xl flex flex-col justify-center border border-black/10 dark:border-white/10 hover:scale-105 transition-transform">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Mức giá</span>
                        <span className="text-xs font-extrabold">{prop.price}</span>
                      </div>

                      <div className="px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-900 dark:text-white shadow-xl flex flex-col justify-center border border-black/10 dark:border-white/10 hover:scale-105 transition-transform">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Trả góp</span>
                        <span className="text-xs font-extrabold">{prop.installment}</span>
                      </div>

                      <div className="px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-900 dark:text-white shadow-xl flex flex-col justify-center border border-black/10 dark:border-white/10 hover:scale-105 transition-transform">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Thanh toán đầu</span>
                        <span className="text-xs font-extrabold">{prop.initialPayment}</span>
                      </div>

                      <div className="px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-900 dark:text-white shadow-xl flex items-center gap-2 border border-black/10 dark:border-white/10">
                        <Building className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        <Key className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                      </div>

                      <div className="px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-900 dark:text-white shadow-xl flex flex-col justify-center border border-black/10 dark:border-white/10 hover:scale-105 transition-transform ml-auto">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Bàn giao</span>
                        <span className="text-xs font-extrabold">{prop.completion}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-zinc-500 font-medium pt-2">
              <p>💡 Rê chuột vào từng bất động sản để xem chi tiết tài chính & thông số</p>
              <Link to="/properties" className="font-bold text-zinc-900 dark:text-white hover:underline flex items-center gap-1">
                Xem tất cả BĐS <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SECTION 3 — ABOUT US & POPPING NUMBERS (#about) (Image 3 Style)
        ══════════════════════════════════════════════════ */}
        <section
          id="about"
          className="snap-full-section px-12 pt-28 pb-10"
        >
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 gap-12 items-center h-full">
            {/* Left Column — Text & Stat Numbers with POP Animations */}
            <div className="space-y-8 my-auto">
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-500">
                  Về Chúng Tôi
                </span>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg">
                  Tại Smart Estate, chúng tôi cung cấp trải nghiệm mua bán bất động sản cao cấp hàng đầu, được thiết kế riêng nhằm đáp ứng và vượt trên mọi kỳ vọng của bạn.
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex -space-x-3">
                    <img className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Đội ngũ" />
                    <img className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Đội ngũ" />
                    <img className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" alt="Đội ngũ" />
                    <img className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="Đội ngũ" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-500 max-w-[140px] leading-tight">
                    Đội Ngũ Chuyên Viên Môi Giới Hàng Đầu
                  </span>
                </div>
              </div>

              {/* Huge Numbers Stats with Pop-Up / Scale Effects */}
              <div className="space-y-4 border-t border-black/10 dark:border-white/10 pt-6">
                <div className="stat-number-pop cursor-pointer flex items-baseline justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-3 group">
                  <span className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white group-hover:text-zinc-500 transition-colors">42+</span>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 text-right max-w-[220px]">
                    Giao Dịch Thành Công Mỗi Tháng
                  </span>
                </div>

                <div className="stat-number-pop cursor-pointer flex items-baseline justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-3 group">
                  <span className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white group-hover:text-zinc-500 transition-colors">99.4%</span>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 text-right max-w-[220px]">
                    Tỷ Lệ Hài Lòng Từ Khách Hàng
                  </span>
                </div>

                <div className="stat-number-pop cursor-pointer flex items-baseline justify-between gap-4 group">
                  <span className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white group-hover:text-zinc-500 transition-colors">210+</span>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 text-right max-w-[220px]">
                    Bất Động Sản Độc Quyền Sẵn Sàng Giao Dịch
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column — Arch Building Image with Hover Zoom */}
            <div className="relative rounded-[2.5rem] overflow-hidden h-[520px] border border-black/10 dark:border-white/10 shadow-2xl my-auto group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Kiến trúc cao cấp"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute top-6 right-6 z-20">
                <Link
                  to="/auth/register"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg hover:scale-105 transition-transform"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Liên Hệ Ngay</span>
                </Link>
              </div>

              <div className="absolute bottom-6 right-6 z-20 max-w-sm">
                <div className="p-4 rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="Chuyên viên tư vấn"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-zinc-800"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Ưu Đãi Đặc Biệt</span>
                    <p className="text-xs font-extrabold text-zinc-900 dark:text-white leading-tight">
                      Nhận Tư Vấn Trực Tiếp Từ Chuyên Gia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SECTION 4 — PROPERTY TYPES BENTO GRID (#types) (Staggered Offset Cards)
        ══════════════════════════════════════════════════ */}
        <section
          id="types"
          className="snap-full-section px-6 sm:px-12 pt-28 pb-10"
        >
          <div className="max-w-[1400px] mx-auto w-full flex flex-col justify-between h-full">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Khám Phá Các Loại Hình BĐS
              </h2>
            </div>

            {/* STAGGERED VERTICAL OFFSET CARDS GRID WITH HOVER REVEAL */}
            <div className="grid grid-cols-5 gap-4 my-auto">
              {PROPERTY_TYPES.map((type) => (
                <div
                  key={type.id}
                  className={`relative rounded-3xl overflow-hidden group border border-black/10 dark:border-white/10 shadow-lg h-[400px] cursor-pointer transition-transform duration-500 ${type.offset}`}
                >
                  <img
                    src={type.image}
                    alt={type.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Floating Top Right Arrow */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-9 h-9 rounded-full bg-white/90 text-zinc-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />

                  {/* BOTTOM HOVER REVEAL TEXT */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 space-y-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-bold text-white/60 tracking-widest">{type.id}</span>
                    <h4 className="text-white font-extrabold text-base leading-snug drop-shadow">
                      {type.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-xs text-zinc-500 font-semibold">
              Hơn 100+ phong cách kiến trúc độc bản phục vụ các nhà đầu tư thượng lưu
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SECTION 5 — FAQ & PARTNERS (#faq) (Fits 100dvh Cleanly)
        ══════════════════════════════════════════════════ */}
        <section
          id="faq"
          className="snap-full-section px-6 sm:px-12 pt-28 pb-10"
        >
          <div className="max-w-[1400px] mx-auto w-full my-auto space-y-8">
            {/* Logo Partners Bar */}
            <div className="flex items-center justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-6 opacity-75">
              {PARTNERS.map((brand, i) => (
                <span key={i} className="text-xl font-black tracking-[0.25em] uppercase text-zinc-800 dark:text-zinc-200">
                  {brand}
                </span>
              ))}
            </div>

            {/* FAQ Main Split Grid */}
            <div className="grid grid-cols-12 gap-8 items-start">
              {/* Left FAQ Intro */}
              <div className="col-span-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white" />
                  Giải Đáp Thắc Mắc
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                  Câu Hỏi Thường Gặp
                </h2>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
                  Tại Smart Estate, mọi câu hỏi về pháp lý, quy trình thanh toán và thủ tục sở hữu đều được đội ngũ chuyên viên giải đáp rõ ràng.
                </p>
              </div>

              {/* Right Accordion List */}
              <div className="col-span-7 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 p-6 shadow-xl space-y-3">
                {FAQS.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className="border-b border-black/5 dark:border-white/5 last:border-none pb-3 last:pb-0"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-4 text-left py-1.5 text-xs sm:text-sm font-bold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                      >
                        <span>{faq.q}</span>
                        <span className="text-zinc-500 shrink-0">
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed font-normal">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SECTION 6 — FOOTER SECTION (#footer-section)
        ══════════════════════════════════════════════════ */}
        <section
          id="footer-section"
          className="snap-full-section flex flex-col justify-center"
        >
          <Footer />
        </section>

      </div>
    </div>
  );
};
