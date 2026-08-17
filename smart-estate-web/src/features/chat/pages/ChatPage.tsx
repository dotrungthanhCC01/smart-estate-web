import { MessageSquare, Send } from "lucide-react";

export const ChatPage = () => {
  return (
    <div className="h-[calc(100vh-8rem)] bg-white dark:bg-zinc-900 border rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3">
      {/* Conversations List */}
      <div className="border-r p-4 space-y-4">
        <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-500" />
          <span>Trò chuyện trực tiếp</span>
        </h3>
        
        <div className="space-y-2">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-500/30 flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
              KH
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate">Khách hàng Trần Văn B</p>
              <p className="text-[11px] text-zinc-500 truncate">Tôi muốn hỏi về pháp lý căn shophouse...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window Workspace */}
      <div className="md:col-span-2 flex flex-col justify-between p-4 bg-zinc-50 dark:bg-zinc-950">
        <div className="border-b pb-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
            KH
          </div>
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Trần Văn B</h4>
            <span className="text-[10px] text-emerald-500 font-semibold">● Realtime Online (Socket.io)</span>
          </div>
        </div>

        <div className="flex-1 py-4 flex items-center justify-center text-xs text-zinc-400">
          Module Socket.io-client Realtime Chat Workspace
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nhập tin nhắn tư vấn..."
            className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm outline-none"
          />
          <button className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
