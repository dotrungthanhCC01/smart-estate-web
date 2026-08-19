import { Link, useLocation } from "react-router-dom";
import { User, Mail, Lock, UserPlus, LogIn, Building2 } from "lucide-react";

export const RegisterPage = () => {
  const location = useLocation();
  const isLogin = location.pathname.includes("/auth/login");

  return (
    <div className="flex flex-col w-full">

      {/* ── Logo ── */}
      <Link to="/" className="flex items-center gap-2.5 mb-8 no-underline group">
        <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-all">
          <Building2 size={18} className="text-white dark:text-zinc-950" />
        </div>
        <span className="font-extrabold text-[1.15rem] text-zinc-900 dark:text-white tracking-tight">
          Smart Estate
        </span>
      </Link>

      {/* ── Tabs: Đăng nhập / Đăng ký ── */}
      <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1.5 rounded-2xl mb-7 border border-zinc-200/50 dark:border-zinc-700/50">
        <Link
          to="/auth/login"
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 no-underline ${
            isLogin
              ? "bg-white dark:bg-zinc-700/90 text-zinc-900 dark:text-white shadow-sm dark:shadow-md border border-zinc-200/60 dark:border-zinc-600/60"
              : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
          }`}
        >
          <LogIn size={13} />
          Đăng nhập
        </Link>
        <Link
          to="/auth/register"
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 no-underline ${
            !isLogin
              ? "bg-white dark:bg-zinc-700/90 text-zinc-900 dark:text-white shadow-sm dark:shadow-md border border-zinc-200/60 dark:border-zinc-600/60"
              : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
          }`}
        >
          <UserPlus size={13} />
          Đăng ký
        </Link>
      </div>

      {/* ── Heading ── */}
      <div className="mb-6">
        <h1 className="text-[1.75rem] font-extrabold text-zinc-900 dark:text-white leading-tight tracking-tight mb-1.5">
          Tạo tài khoản mới
        </h1>
        <p className="text-[13.5px] text-zinc-500 dark:text-zinc-400">
          Đăng ký tài khoản Khách hàng hoặc Nhà Môi Giới.
        </p>
      </div>

      {/* ── Form ── */}
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 mb-5">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-semibold text-zinc-700 dark:text-zinc-300">
            Họ và tên
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none">
              <User size={16} />
            </div>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-[#F6F5F2] dark:bg-zinc-900/90 text-[13.5px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all focus:bg-white dark:focus:bg-zinc-900 focus:border-zinc-800 dark:focus:border-zinc-400 focus:ring-4 focus:ring-zinc-900/5 dark:focus:ring-white/5"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-semibold text-zinc-700 dark:text-zinc-300">
            Địa chỉ Email
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none">
              <Mail size={16} />
            </div>
            <input
              type="email"
              placeholder="name@smartestate.vn"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-[#F6F5F2] dark:bg-zinc-900/90 text-[13.5px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all focus:bg-white dark:focus:bg-zinc-900 focus:border-zinc-800 dark:focus:border-zinc-400 focus:ring-4 focus:ring-zinc-900/5 dark:focus:ring-white/5"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-semibold text-zinc-700 dark:text-zinc-300">
            Mật khẩu
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none">
              <Lock size={16} />
            </div>
            <input
              type="password"
              placeholder="Tối thiểu 8 ký tự"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-[#F6F5F2] dark:bg-zinc-900/90 text-[13.5px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all focus:bg-white dark:focus:bg-zinc-900 focus:border-zinc-800 dark:focus:border-zinc-400 focus:ring-4 focus:ring-zinc-900/5 dark:focus:ring-white/5"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 mt-1.5 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-[14px] font-bold tracking-wide shadow-[0_4px_16px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_24px_rgba(255,255,255,0.18)] transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 cursor-pointer"
        >
          <UserPlus size={16} />
          <span>Tạo tài khoản</span>
        </button>
      </form>

      {/* ── Sign in link ── */}
      <p className="text-center text-[12.5px] text-zinc-500 dark:text-zinc-400 mt-2">
        Đã có tài khoản?{" "}
        <Link
          to="/auth/login"
          className="font-bold text-zinc-900 dark:text-white hover:underline no-underline transition-colors underline-offset-2 ml-1"
        >
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
};
