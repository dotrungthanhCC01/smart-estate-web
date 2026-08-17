import { Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";

export const RegisterPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Tạo Tài Khoản Mới
        </h2>
        <p className="text-sm text-zinc-500">
          Đăng ký tài khoản Khách hàng hoặc Nhà Môi Giới Bất động sản.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Họ và tên</label>
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <User className="w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
        </div>

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
          <UserPlus className="w-4 h-4" />
          <span>Tạo tài khoản</span>
        </button>
      </form>

      <div className="text-center text-xs text-zinc-500">
        Đã có tài khoản?{" "}
        <Link to="/auth/login" className="font-semibold text-emerald-600 hover:underline">
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
};
