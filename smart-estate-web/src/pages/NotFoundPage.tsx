import { Link } from "react-router-dom";
import { ArrowLeft, FileQuestion } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 text-center space-y-4">
      <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center">
        <FileQuestion className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
        404 - Không Tìm Thấy Trang
      </h1>
      <p className="text-zinc-500 text-sm max-w-md">
        Đường dẫn bạn yêu cầu không tồn tại hoặc đã được di chuyển.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Trở về Trang chủ</span>
      </Link>
    </div>
  );
};
