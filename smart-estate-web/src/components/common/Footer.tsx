import { Link } from "react-router-dom";
import { Building2, ArrowUpRight, Phone, MapPin, Clock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#EFECE6] dark:bg-[#141414] text-zinc-900 dark:text-zinc-100 border-t border-black/10 dark:border-white/10 py-12 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column — Brand & Links */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Brand & Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-white">
                    Smart<span className="text-zinc-500 font-medium">Estate</span>
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal max-w-sm">
                  Mang đến trải nghiệm giao dịch bất động sản cao cấp hàng đầu, được thiết kế riêng nhằm đáp ứng và vượt trên mọi kỳ vọng của bạn.
                </p>
                <div className="pt-2">
                  <Link
                    to="/auth/register"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition shadow-sm"
                  >
                    <span>Tư vấn trực tiếp ngay</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </div>
              </div>

              {/* Quick Links & Contact */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Đường dẫn nhanh</h5>
                <ul className="space-y-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <li><Link to="/properties" className="hover:text-zinc-950 dark:hover:text-white transition">Danh mục Bất động sản</Link></li>
                  <li><Link to="/properties" className="hover:text-zinc-950 dark:hover:text-white transition">Biệt thự & Căn hộ cao cấp</Link></li>
                  <li><Link to="/dashboard" className="hover:text-zinc-950 dark:hover:text-white transition">Kênh Môi giới & Cố vấn</Link></li>
                  <li><Link to="/dashboard/appointments" className="hover:text-zinc-950 dark:hover:text-white transition">Đặt lịch hẹn tư vấn</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10 dark:border-white/10 pt-6 text-xs text-zinc-500 font-medium">
              <p>© 2026 SmartEstate. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition">Điều khoản dịch vụ</a>
                <a href="#" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition">Chính sách bảo mật</a>
              </div>
            </div>
          </div>

          {/* Right Column — Office HQ & Interactive Location Card */}
          <div className="lg:col-span-5 rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-zinc-900 dark:text-white" />
                <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white">Trụ Sở Chính Smart Estate</h4>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-300">
                TP. HCM
              </span>
            </div>

            {/* Map Preview Frame */}
            <div className="relative rounded-2xl overflow-hidden h-40 border border-black/10 dark:border-white/10 bg-zinc-200 dark:bg-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                alt="HQ Map"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div className="text-white text-xs space-y-0.5">
                  <p className="font-bold">Tòa nhà Smart Tower, Quận 1</p>
                  <p className="text-[10px] text-zinc-300">Đường Nguyễn Huệ, P. Bến Nghé, Q. 1, TP. HCM</p>
                </div>
              </div>
            </div>

            {/* Info Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-500 font-medium text-[10px] uppercase tracking-wider">
                  <Clock className="w-3 h-3" /> Giờ Làm Việc
                </div>
                <p className="font-bold text-zinc-900 dark:text-white text-xs">8:00 - 20:00 (T2 - CN)</p>
              </div>

              <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-500 font-medium text-[10px] uppercase tracking-wider">
                  <Phone className="w-3 h-3" /> Hotline Tư Vấn
                </div>
                <p className="font-bold text-zinc-900 dark:text-white text-xs">+84 1900 6868</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
