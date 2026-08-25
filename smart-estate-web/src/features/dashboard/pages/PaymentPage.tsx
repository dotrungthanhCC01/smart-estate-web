import { useState } from "react";
import {
  CreditCard,
  History,
  CheckCircle2,
  Star,
  Zap,
  Crown,
  QrCode,
  Copy,
  Clock,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentTab = "plans" | "history";

const PLANS = [
  {
    id: "basic",
    name: "Cơ bản",
    icon: Star,
    color: "#6b7280",
    bgColor: "bg-zinc-50 dark:bg-zinc-800/40",
    borderColor: "border-zinc-200 dark:border-zinc-700",
    price: "299.000đ",
    priceNote: "/ 30 ngày",
    features: [
      "Đăng tối đa 3 tin/tháng",
      "Hiển thị ảnh tối đa 5 ảnh",
      "Thời hạn tin: 30 ngày",
      "Hỗ trợ qua email",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Chuyên nghiệp",
    icon: Zap,
    color: "#8b5cf6",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    borderColor: "border-violet-300 dark:border-violet-700",
    price: "699.000đ",
    priceNote: "/ 30 ngày",
    features: [
      "Đăng tối đa 15 tin/tháng",
      "Ảnh không giới hạn + video",
      "Đẩy tin lên top 3 ngày/lần",
      "Huy hiệu \"Chuyên nghiệp\"",
      "Hỗ trợ ưu tiên 24/7",
    ],
    popular: true,
  },
  {
    id: "vip",
    name: "VIP / Môi giới",
    icon: Crown,
    color: "#f59e0b",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-300 dark:border-amber-700",
    price: "1.499.000đ",
    priceNote: "/ 30 ngày",
    features: [
      "Đăng không giới hạn tin",
      "Ảnh, video, tour 3D",
      "Đẩy tin top mỗi ngày",
      "Huy hiệu VIP + xác minh",
      "Quản lý khách hàng CRM",
      "Hỗ trợ Dedicated Manager",
    ],
    popular: false,
  },
];

const MOCK_HISTORY = [
  {
    id: "tx001",
    plan: "Chuyên nghiệp",
    amount: "699.000đ",
    date: "20/08/2026",
    method: "Chuyển khoản ngân hàng",
    status: "success",
    ref: "SE20260820A1B2",
  },
  {
    id: "tx002",
    plan: "Cơ bản",
    amount: "299.000đ",
    date: "20/07/2026",
    method: "QR Pay",
    status: "success",
    ref: "SE20260720C3D4",
  },
  {
    id: "tx003",
    plan: "VIP / Môi giới",
    amount: "1.499.000đ",
    date: "05/07/2026",
    method: "Thẻ tín dụng",
    status: "success",
    ref: "SE20260705E5F6",
  },
  {
    id: "tx004",
    plan: "Chuyên nghiệp",
    amount: "699.000đ",
    date: "20/06/2026",
    method: "Chuyển khoản ngân hàng",
    status: "failed",
    ref: "SE20260620G7H8",
  },
  {
    id: "tx005",
    plan: "Cơ bản",
    amount: "299.000đ",
    date: "01/06/2026",
    method: "QR Pay",
    status: "success",
    ref: "SE20260601I9J0",
  },
];

export const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState<PaymentTab>("plans");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedPlanData = PLANS.find((p) => p.id === selectedPlan);

  return (
    <div className="w-full pb-16 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-[20px] font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-violet-500" />
          Thanh toán & Gói dịch vụ
        </h1>
        <p className="text-[13px] text-zinc-400 mt-0.5">
          Nâng cấp gói đăng tin để tiếp cận nhiều khách hàng hơn
        </p>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-500 rounded-3xl p-5 text-white shadow-lg shadow-violet-200 dark:shadow-violet-900/40">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest opacity-75 mb-1">
              Gói hiện tại
            </div>
            <div className="text-[22px] font-black flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Chuyên nghiệp
            </div>
            <div className="text-[12px] opacity-80 mt-1">
              Hạn đến: <span className="font-bold">20/09/2026</span> · còn 26 ngày
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="px-3 py-1 rounded-full bg-white/20 text-[11px] font-bold flex items-center gap-1">
              <BadgeCheck className="w-3.5 h-3.5" />
              Đang hoạt động
            </div>
            <div className="text-[12px] opacity-75">15 tin / tháng · còn 7 tin</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 w-fit gap-1">
        {[
          { key: "plans" as PaymentTab, label: "Gói dịch vụ", icon: TrendingUp },
          { key: "history" as PaymentTab, label: "Lịch sử giao dịch", icon: History },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-bold transition-all",
              activeTab === key
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ─── Plans Tab ─── */}
      {activeTab === "plans" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={cn(
                    "relative bg-white dark:bg-[#151518] rounded-3xl border-2 p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl",
                    plan.bgColor,
                    isSelected ? plan.borderColor + " shadow-lg" : "border-transparent"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-extrabold bg-violet-500 text-white shadow-md whitespace-nowrap">
                      ⭐ Phổ biến nhất
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
                      style={{ background: plan.color + "20" }}
                    >
                      <Icon className="w-5.5 h-5.5" style={{ color: plan.color }} />
                    </div>
                    <div>
                      <div className="text-[14px] font-extrabold text-zinc-900 dark:text-white">
                        {plan.name}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[20px] font-black text-zinc-900 dark:text-white">
                          {plan.price}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-medium">
                          {plan.priceNote}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-5">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-[12.5px] text-zinc-600 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: plan.color }} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Select Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(plan.id);
                      setShowQR(true);
                    }}
                    className={cn(
                      "w-full py-2.5 rounded-2xl text-[13px] font-extrabold transition-all",
                      isSelected
                        ? "text-white shadow-md"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    )}
                    style={isSelected ? { background: plan.color } : {}}
                  >
                    {isSelected ? "Đã chọn · Thanh toán" : "Chọn gói"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* QR Payment Modal */}
          {showQR && selectedPlanData && (
            <div className="fixed inset-0 z-[700] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowQR(false)}>
              <div
                className="bg-white dark:bg-[#151518] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl p-8 max-w-sm w-full mx-4 text-center"
                style={{ animation: "scaleIn 0.2s ease" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-[16px] font-extrabold text-zinc-900 dark:text-white mb-1">
                  Thanh toán gói {selectedPlanData.name}
                </div>
                <div className="text-[22px] font-black text-zinc-900 dark:text-white mb-4">
                  {selectedPlanData.price}
                </div>

                {/* QR Code Placeholder */}
                <div className="w-48 h-48 mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 border-2 border-dashed border-zinc-200 dark:border-zinc-700">
                  <div className="flex flex-col items-center gap-2 text-zinc-400">
                    <QrCode className="w-12 h-12" />
                    <span className="text-[11px] font-bold">QR Code thanh toán</span>
                  </div>
                </div>

                {/* Bank Info */}
                <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl p-4 text-left space-y-2 mb-4">
                  {[
                    { label: "Ngân hàng", value: "Vietcombank" },
                    { label: "Số tài khoản", value: "0123456789" },
                    { label: "Tên TK", value: "SMARTESTATE VIET NAM" },
                    { label: "Nội dung CK", value: `SE-${selectedPlanData.id.toUpperCase()}-${Date.now().toString().slice(-6)}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-3">
                      <span className="text-[11.5px] text-zinc-400 font-medium shrink-0">{label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] font-bold text-zinc-900 dark:text-white truncate">{value}</span>
                        <button
                          onClick={() => handleCopy(value)}
                          className="text-zinc-400 hover:text-violet-500 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {copied && (
                  <div className="text-[11.5px] font-bold text-emerald-500 mb-2">
                    ✓ Đã sao chép!
                  </div>
                )}

                <p className="text-[11px] text-zinc-400 mb-4 leading-relaxed">
                  Sau khi chuyển khoản, gói dịch vụ sẽ được kích hoạt trong vòng <strong>5-15 phút</strong>.
                </p>

                <button
                  onClick={() => setShowQR(false)}
                  className="w-full py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[13px] font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── History Tab ─── */}
      {activeTab === "history" && (
        <div className="bg-white dark:bg-[#151518] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
            <History className="w-4.5 h-4.5 text-zinc-500" />
            <h2 className="text-[14px] font-extrabold text-zinc-900 dark:text-white">
              Lịch sử giao dịch
            </h2>
          </div>

          <div className="divide-y divide-zinc-50 dark:divide-zinc-800/60">
            {MOCK_HISTORY.map((tx) => (
              <div key={tx.id} className="flex items-center gap-4 px-5 py-4">
                {/* Status Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0",
                  tx.status === "success"
                    ? "bg-emerald-50 dark:bg-emerald-900/20"
                    : "bg-rose-50 dark:bg-rose-900/20"
                )}>
                  {tx.status === "success"
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    : <Clock className="w-5 h-5 text-rose-400" />
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-zinc-900 dark:text-white">
                      Gói {tx.plan}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold",
                      tx.status === "success"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                    )}>
                      {tx.status === "success" ? "Thành công" : "Thất bại"}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-zinc-400 mt-0.5">
                    {tx.method} · {tx.date} · Mã: <span className="font-mono">{tx.ref}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className={cn(
                  "text-[15px] font-black shrink-0",
                  tx.status === "success"
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-400 line-through"
                )}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Footer */}
          <div className="px-5 py-3 bg-zinc-50 dark:bg-zinc-800/40 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
            <span className="text-[12px] text-zinc-400 font-medium">
              Tổng {MOCK_HISTORY.filter(t => t.status === "success").length} giao dịch thành công
            </span>
            <span className="text-[13px] font-black text-zinc-900 dark:text-white">
              Tổng chi: 2.796.000đ
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
