import { useState, useId } from "react";
import {
  Building2,
  MapPin,
  ImagePlus,
  DollarSign,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Clock,
  Sparkles,
  ShieldCheck,
  Bed,
  Bath,
  Maximize2,
  Eye,
  UserCheck,
  Phone,
  Tag,
  Home,
  Briefcase,
  Layers,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CITIES, PROPERTY_TYPES_OPTIONS, type PropertyType, type ListingType } from "@/features/properties/data/mockProperties";

const STEPS = [
  { id: 1, label: "Loại BĐS", icon: Building2 },
  { id: 2, label: "Vị trí & Thông số", icon: MapPin },
  { id: 3, label: "Ảnh & Giá bán", icon: ImagePlus },
  { id: 4, label: "Liên hệ & Gửi", icon: DollarSign },
];

interface ListingFormData {
  listingType: ListingType;
  propertyType: PropertyType;
  title: string;
  description: string;
  city: string;
  district: string;
  address: string;
  images: string[];
  price: string;
  priceUnit: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  direction: string;
  legalStatus: string;
  posterType: "owner" | "broker" | "developer";
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

const INITIAL_FORM: ListingFormData = {
  listingType: "buy",
  propertyType: "apartment",
  title: "",
  description: "",
  city: "Hà Nội",
  district: "Cầu Giấy",
  address: "",
  images: [],
  price: "",
  priceUnit: "tỷ",
  area: "",
  bedrooms: "2",
  bathrooms: "2",
  direction: "Đông Nam",
  legalStatus: "Sổ hồng / Sổ đỏ",
  posterType: "owner",
  contactName: "Nguyễn Văn A",
  contactPhone: "0912 345 678",
  contactEmail: "nguyenvana@gmail.com",
};

const DEFAULT_THUMBNAIL = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80";

export const PostListingPage = () => {
  const [step, setStep] = useState(1);
  const [form, setFormData] = useState<ListingFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [createdListingId, setCreatedListingId] = useState<string>("");

  const set = (partial: Partial<ListingFormData>) => setFormData((f) => ({ ...f, ...partial }));

  const propertyTypeLabel = (type: PropertyType) => {
    switch (type) {
      case "apartment": return "Căn hộ chung cư";
      case "house": return "Nhà riêng / Nhà phố";
      case "villa": return "Biệt thự cao cấp";
      case "land": return "Đất nền dự án";
      case "student_room": return "Phòng trọ sinh viên";
      case "office": return "Văn phòng / Mặt bằng";
      default: return "Bất động sản";
    }
  };

  const formattedPriceDisplay = () => {
    if (!form.price) return "0 Tỷ";
    const p = parseFloat(form.price);
    if (isNaN(p)) return "0 Tỷ";
    if (form.listingType === "buy") {
      return form.priceUnit === "tỷ" ? `${p} Tỷ` : `${p} Triệu`;
    } else {
      return form.priceUnit === "triệu/tháng" ? `${p} Triệu/tháng` : `${p}k/tháng`;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      newUrls.push(URL.createObjectURL(files[i]));
    }
    set({ images: [...form.images, ...newUrls].slice(0, 8) });
  };

  const removeImage = (index: number) => {
    set({ images: form.images.filter((_, i) => i !== index) });
  };

  const canProceed = () => {
    if (step === 1) return form.title.trim().length >= 8 && form.description.trim().length >= 15;
    if (step === 2) return form.city && form.district && form.address.trim().length > 0 && form.area;
    if (step === 3) return form.price.trim().length > 0;
    if (step === 4) return form.contactName.trim().length > 0 && form.contactPhone.trim().length > 0;
    return true;
  };

  const handleSubmit = () => {
    const newId = `LST-${Date.now().toString().slice(-5)}`;
    setCreatedListingId(newId);

    // Save to mock persistent state
    const newListing = {
      id: newId,
      title: form.title,
      description: form.description,
      price: parseFloat(form.price) || 0,
      priceUnit: form.priceUnit,
      priceDisplay: formattedPriceDisplay(),
      listingType: form.listingType,
      propertyType: form.propertyType,
      status: "pending", // Status = PENDING until Admin approves
      area: parseFloat(form.area) || 0,
      bedrooms: parseInt(form.bedrooms) || 0,
      bathrooms: parseInt(form.bathrooms) || 0,
      city: form.city,
      district: form.district,
      address: form.address,
      thumbnailUrl: form.images[0] || DEFAULT_THUMBNAIL,
      images: form.images.length > 0 ? form.images : [DEFAULT_THUMBNAIL],
      agentName: form.contactName,
      agentPhone: form.contactPhone,
      postedAt: new Date().toISOString(),
      isNew: true,
      rating: 5.0,
    };

    try {
      const existingStr = localStorage.getItem("SMART_ESTATE_PENDING_LISTINGS");
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem(
        "SMART_ESTATE_PENDING_LISTINGS",
        JSON.stringify([newListing, ...existing])
      );
    } catch {
      // fallback silent
    }

    setSubmitted(true);
  };

  // ─── Success Confirmation Screen (Submitted & Pending) ───────────────────
  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-100px)] py-10 px-4 flex items-center justify-center animate-in fade-in duration-500">
        <div className="w-full max-w-2xl bg-white dark:bg-[#141417] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
          {/* Subtle Top Glow */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500" />

          {/* Pending Status Badge Icon */}
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Clock className="w-10 h-10 text-amber-500 animate-pulse" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-3">
            ● Trạng thái: PENDING (Đang chờ Admin duyệt)
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight mb-3">
            Tin đăng đã được lưu vào Hệ thống!
          </h2>

          <p className="text-[13.5px] text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Mã tin đăng <span className="font-bold text-zinc-900 dark:text-white">#{createdListingId}</span> đã được ghi nhận vào cơ sở dữ liệu. Theo quy trình hệ thống, tin sẽ ở trạng thái <strong className="text-amber-500">CHỜ DUYỆT</strong> trước khi hiển thị chính thức trên website.
          </p>

          {/* Workflow Diagram Card */}
          <div className="bg-zinc-50 dark:bg-zinc-900/80 rounded-2xl p-5 border border-zinc-200/60 dark:border-zinc-800/80 mb-8 text-left">
            <p className="text-[11.5px] font-extrabold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Quy trình kiểm duyệt tự động & Admin
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Step A */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#18181c] border border-zinc-200/60 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-[11px] font-black flex items-center justify-center">1</span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full">Vừa nộp</span>
                </div>
                <h4 className="text-[12.5px] font-bold text-zinc-900 dark:text-white">Lưu Database</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Trạng thái: PENDING</p>
              </div>

              {/* Step B */}
              <div className="p-3.5 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-[11px] font-black flex items-center justify-center">2</span>
                  <span className="text-[10px] font-bold text-amber-500 uppercase bg-amber-500/10 px-2 py-0.5 rounded-full animate-pulse">Trong 24h</span>
                </div>
                <h4 className="text-[12.5px] font-bold text-amber-700 dark:text-amber-400">Admin Duyệt Tin</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Duyệt hoặc Từ chối</p>
              </div>

              {/* Step C */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#18181c] border border-zinc-200/60 dark:border-zinc-800 opacity-80">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-zinc-300 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-black flex items-center justify-center">3</span>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Sau duyệt</span>
                </div>
                <h4 className="text-[12.5px] font-bold text-zinc-900 dark:text-white">Hiển thị Web</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Trạng thái: APPROVED</p>
              </div>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/dashboard/my-listings"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[13px] font-extrabold hover:opacity-90 transition-all shadow-md"
            >
              Quản lý tin đăng của tôi
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFormData(INITIAL_FORM);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[13px] font-extrabold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Đăng thêm tin khác
            </button>
            <Link
              to="/home"
              className="w-full sm:w-auto px-5 py-3 rounded-2xl text-[13px] font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6">
      {/* ── Page Header ── */}
      <div className="mb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[11.5px] font-extrabold mb-2 border border-zinc-200/80 dark:border-zinc-700/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Đăng tin miễn phí — Duyệt tự động & Admin</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
          Đăng Tin Bất Động Sản Mới
        </h1>
        <p className="text-[13px] text-zinc-400 mt-1">
          Điền đầy đủ thông tin để gửi tin đăng vào hệ thống kiểm duyệt.
        </p>
      </div>

      {/* ── Stepper Navigation ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {STEPS.map((s) => {
          const isActive = step === s.id;
          const isDone = step > s.id;
          const StepIcon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => isDone && setStep(s.id)}
              disabled={!isDone}
              className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
                isActive
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white shadow-md scale-[1.01]"
                  : isDone
                  ? "bg-white dark:bg-[#141417] border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300"
                  : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200/60 dark:border-zinc-800/60 text-zinc-400 cursor-not-allowed"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-[12px] ${
                  isActive
                    ? "bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-950"
                    : isDone
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
                }`}
              >
                {isDone ? <Check className="w-4 h-4 text-emerald-500" /> : <StepIcon className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider block opacity-60">Bước {s.id}</span>
                <span className="text-[12.5px] font-bold truncate block">{s.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Main Split Content: Form (Left) & Real-time Live Preview (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Form Controls (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#141417] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 p-5 sm:p-8 shadow-sm">
          
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <h3 className="text-[16px] font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
                <Building2 className="w-4.5 h-4.5 text-zinc-500" />
                Bước 1: Loại tin đăng & Tiêu đề
              </h3>

              {/* Listing Type Toggle */}
              <div>
                <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-2">
                  Loại nhu cầu đăng tin *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "buy", label: "Cần bán BĐS", desc: "Bán nhà, đất, căn hộ" },
                    { val: "rent", label: "Cho thuê BĐS", desc: "Cho thuê phòng, nhà, CH" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => set({ listingType: opt.val as ListingType })}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        form.listingType === opt.val
                          ? "border-zinc-950 dark:border-white bg-zinc-950/5 dark:bg-white/5 font-extrabold"
                          : "border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300"
                      }`}
                    >
                      <span className="text-[13.5px] font-bold text-zinc-900 dark:text-white block">{opt.label}</span>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type selection */}
              <div>
                <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-2">
                  Loại bất động sản *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PROPERTY_TYPES_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => set({ propertyType: opt.value as PropertyType })}
                      className={`p-2.5 rounded-xl border text-[12px] font-bold text-left transition-all ${
                        form.propertyType === opt.value
                          ? "border-zinc-950 dark:border-white bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-xs"
                          : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Tiêu đề tin đăng *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set({ title: e.target.value })}
                  placeholder="VD: Căn hộ 2PN Vinhomes Central Park view sông cực đẹp..."
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500"
                />
                <p className="text-[11px] text-zinc-400 mt-1">Tối thiểu 8 ký tự ({form.title.length}/100)</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Mô tả chi tiết *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => set({ description: e.target.value })}
                  rows={4}
                  placeholder="Mô tả vị trí, nội thất, tiện ích xung quanh, tình trạng pháp lý..."
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Location & Specifications */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <h3 className="text-[16px] font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
                <MapPin className="w-4.5 h-4.5 text-zinc-500" />
                Bước 2: Vị trí địa lý & Thông số kỹ thuật
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City */}
                <div>
                  <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Tỉnh / Thành phố *
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => set({ city: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-semibold text-zinc-900 dark:text-white outline-none"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Quận / Huyện *
                  </label>
                  <input
                    type="text"
                    value={form.district}
                    onChange={(e) => set({ district: e.target.value })}
                    placeholder="VD: Cầu Giấy, Quận 1..."
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none"
                  />
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Địa chỉ chi tiết BĐS *
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => set({ address: e.target.value })}
                  placeholder="Số nhà, tên đường, tên dự án chung cư..."
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none"
                />
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1">
                    Diện tích (m²) *
                  </label>
                  <input
                    type="number"
                    value={form.area}
                    onChange={(e) => set({ area: e.target.value })}
                    placeholder="VD: 75"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-bold text-zinc-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1">
                    Số phòng ngủ
                  </label>
                  <input
                    type="number"
                    value={form.bedrooms}
                    onChange={(e) => set({ bedrooms: e.target.value })}
                    placeholder="2"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-bold text-zinc-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1">
                    Số phòng tắm
                  </label>
                  <input
                    type="number"
                    value={form.bathrooms}
                    onChange={(e) => set({ bathrooms: e.target.value })}
                    placeholder="2"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-bold text-zinc-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              {/* Legal & Direction */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1">
                    Hướng nhà / Ban công
                  </label>
                  <select
                    value={form.direction}
                    onChange={(e) => set({ direction: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[12.5px] font-semibold text-zinc-900 dark:text-white outline-none"
                  >
                    {["Đông Nam", "Tây Nam", "Đông Bắc", "Tây Bắc", "Đông", "Tây", "Nam", "Bắc"].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1">
                    Giấy tờ pháp lý
                  </label>
                  <select
                    value={form.legalStatus}
                    onChange={(e) => set({ legalStatus: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[12.5px] font-semibold text-zinc-900 dark:text-white outline-none"
                  >
                    {["Sổ hồng / Sổ đỏ", "Hợp đồng mua bán", "Đang chờ sổ"].map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Images & Pricing */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <h3 className="text-[16px] font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
                <ImagePlus className="w-4.5 h-4.5 text-zinc-500" />
                Bước 3: Hình ảnh & Giá rao bán / cho thuê
              </h3>

              {/* Price input & Unit */}
              <div>
                <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Mức giá đề xuất *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="any"
                    value={form.price}
                    onChange={(e) => set({ price: e.target.value })}
                    placeholder="VD: 3.5"
                    className="flex-1 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[14px] font-black text-zinc-900 dark:text-white outline-none"
                  />
                  <select
                    value={form.priceUnit}
                    onChange={(e) => set({ priceUnit: e.target.value })}
                    className="px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-extrabold text-zinc-900 dark:text-white outline-none"
                  >
                    {form.listingType === "buy" ? (
                      <>
                        <option value="tỷ">Tỷ VNĐ</option>
                        <option value="triệu">Triệu VNĐ</option>
                      </>
                    ) : (
                      <>
                        <option value="triệu/tháng">Triệu/tháng</option>
                        <option value="nghìn/tháng">Nghìn/tháng</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Image upload zone */}
              <div>
                <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1">
                  Hình ảnh thực tế BĐS
                </label>
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl cursor-pointer hover:border-zinc-900 dark:hover:border-white transition-all group bg-zinc-50/50 dark:bg-zinc-800/30">
                  <ImagePlus className="w-8 h-8 text-zinc-400 group-hover:scale-110 transition-transform mb-2" />
                  <span className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">Nhấn để tải ảnh từ máy tính</span>
                  <span className="text-[11px] text-zinc-400 mt-0.5">Tối đa 8 ảnh PNG, JPG (Tối đa 5MB)</span>
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="sr-only" />
                </label>

                {/* Uploaded images previews */}
                {form.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {form.images.map((imgUrl, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-zinc-200 dark:border-zinc-800">
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Contact & Submission */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <h3 className="text-[16px] font-black text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
                <UserCheck className="w-4.5 h-4.5 text-zinc-500" />
                Bước 4: Thông tin người đăng & Xác nhận
              </h3>

              {/* Poster Role */}
              <div>
                <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-2">
                  Bạn là ai? *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "owner", label: "Chính chủ" },
                    { val: "broker", label: "Môi giới" },
                    { val: "developer", label: "Chủ đầu tư" },
                  ].map((r) => (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() => set({ posterType: r.val as "owner" | "broker" | "developer" })}
                      className={`py-2.5 px-3 rounded-xl border text-[12px] font-bold transition-all ${
                        form.posterType === r.val
                          ? "border-zinc-950 dark:border-white bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-xs"
                          : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Name */}
              <div>
                <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Họ và tên người liên hệ *
                </label>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={(e) => set({ contactName: e.target.value })}
                  placeholder="VD: Nguyễn Văn A"
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-semibold text-zinc-900 dark:text-white outline-none"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Số điện thoại liên hệ *
                  </label>
                  <input
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => set({ contactPhone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-semibold text-zinc-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-extrabold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Email nhận thông báo
                  </label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => set({ contactEmail: e.target.value })}
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/60 text-[13px] font-semibold text-zinc-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              {/* Database workflow note */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[12px] leading-relaxed flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold block">Ghi chú về quy trình kiểm duyệt:</span>
                  Sau khi bấm nút nộp, tin đăng sẽ được lưu vào cơ sở dữ liệu với trạng thái <strong className="underline">PENDING (Chờ duyệt)</strong>. Admin sẽ tiến hành thẩm định và đổi thành <strong className="underline">APPROVED</strong> trước khi hiển thị lên giao diện web công khai.
                </div>
              </div>
            </div>
          )}

          {/* Stepper Footer Controls */}
          <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-5 mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-[13px] font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Quay lại</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-[13px] font-extrabold transition-all ${
                  canProceed()
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 shadow-md"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                }`}
              >
                <span>Tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-7 py-2.5 rounded-xl text-[13px] font-black transition-all ${
                  canProceed()
                    ? "bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20 active:scale-95"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Gửi tin đăng (Lưu PENDING)</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Real-time Live Card Preview (5 Cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-500" />
              Xem trước tin đăng trên Web
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse">
              PENDING
            </span>
          </div>

          {/* Real-time Property Grid Card Preview */}
          <div className="bg-white dark:bg-[#141417] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl transition-all duration-300 p-2">
            {/* Banner Image */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img
                src={form.images[0] || DEFAULT_THUMBNAIL}
                alt=""
                className="w-full h-full object-cover"
              />

              {/* Status & Category Badges */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-zinc-900/85 text-white backdrop-blur-md">
                  {form.listingType === "buy" ? "Cần bán" : "Cho thuê"}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-500 text-zinc-950 backdrop-blur-md shadow-xs">
                  Chờ duyệt
                </span>
              </div>
            </div>

            {/* Card Content Area */}
            <div className="flex flex-col p-4 gap-2.5">
              {/* Specs bar */}
              <div className="flex items-center gap-3.5 text-zinc-500 dark:text-zinc-400 text-[12px] font-medium border-b border-zinc-100 dark:border-zinc-800/80 pb-2.5">
                <span className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                  Bed - {String(form.bedrooms || 2).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                  Bath - {String(form.bathrooms || 2).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-1.5 ml-auto font-bold">
                  <Maximize2 className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                  {form.area || "0"} m²
                </span>
              </div>

              {/* Title & Location */}
              <div>
                <h4 className="text-[15px] font-extrabold text-zinc-900 dark:text-white line-clamp-1">
                  {form.title || "Tiêu đề bất động sản chưa nhập..."}
                </h4>
                <div className="flex items-center gap-1 text-zinc-400 text-[12px] mt-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{form.district || "Quận/Huyện"}, {form.city || "Thành phố"}</span>
                </div>
              </div>

              {/* Price & Category */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[19px] font-black text-zinc-950 dark:text-white tracking-tight">
                    {formattedPriceDisplay()}
                  </span>
                  <span className="text-[11.5px] text-zinc-400 font-medium">
                    · {propertyTypeLabel(form.propertyType)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Info Card */}
          <div className="p-4 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800 text-[12px] text-zinc-500 dark:text-zinc-400 space-y-1">
            <span className="font-extrabold text-zinc-900 dark:text-white block">💡 Lời khuyên đăng tin hiệu quả:</span>
            <p>• Cung cấp địa chỉ chính xác để khách hàng dễ hình dung vị trí.</p>
            <p>• Đăng ít nhất 3-5 ảnh rõ nét để tăng 80% tỉ lệ người xem tương tác.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
