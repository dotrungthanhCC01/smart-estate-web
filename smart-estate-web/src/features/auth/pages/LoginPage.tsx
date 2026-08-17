import { Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

export const LoginPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Đăng Nhập Tài Khoản
        </h2>
        <p className="text-sm text-zinc-500">
          Nhập email và mật khẩu của bạn để truy cập hệ thống Smart Estate.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email</label>
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <Mail className="w-4 h-4 text-zinc-400" />
            <input
              type="email"
              placeholder="user@smartestate.vn"
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Mật khẩu</label>
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <Lock className="w-4 h-4 text-zinc-400" />
            <input
              type="password"
              placeholder="••••••••"
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-md"
        >
          <LogIn className="w-4 h-4" />
          <span>Đăng nhập</span>
        </button>
      </form>

      <div className="text-center text-xs text-zinc-500">
        Chưa có tài khoản?{" "}
        <Link to="/auth/register" className="font-semibold text-emerald-600 hover:underline">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
};
