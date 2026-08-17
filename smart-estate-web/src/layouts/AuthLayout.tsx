import { Outlet, Link } from "react-router-dom";
import { Building2 } from "lucide-react";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950 p-4">
      {/* Brand logo link */}
      <Link to="/" className="mb-6 flex items-center gap-2 font-bold text-2xl text-white hover:opacity-90 transition">
        <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-900/50">
          <Building2 className="h-7 w-7" />
        </div>
        <span>Smart Estate</span>
      </Link>

      {/* Auth Card Container: <Outlet /> renders LoginPage or RegisterPage inside */}
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-6 sm:p-8">
        <Outlet />
      </div>

      <p className="mt-6 text-xs text-zinc-500 text-center">
        © 2026 Smart Estate Web. Protected with JWT Authentication.
      </p>
    </div>
  );
};
