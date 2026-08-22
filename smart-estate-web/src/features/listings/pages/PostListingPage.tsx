import { useState } from "react";
import {
  Building2,
  MapPin,
  ImagePlus,
  DollarSign,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  AlertCircle,
} from "lucide-react";
import { CITIES, PROPERTY_TYPES_OPTIONS } from "@/features/properties/data/mockProperties";

const STEPS = [
  { id: 1, label: "Thông tin cơ bản", icon: Building2 },
  { id: 2, label: "Vị trí", icon: MapPin },
  { id: 3, label: "Hình ảnh", icon: ImagePlus },
  { id: 4, label: "Giá & Liên hệ", icon: DollarSign },
];

interface FormData {
  listingType: "buy" | "rent";
  propertyType: string;
  title: string;
  description: string;
  city: string;
  district: string;
  address: string;
  images: File[];
  price: string;
  priceUnit: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

const INITIAL_FORM: FormData = {
  listingType: "buy",
  propertyType: "",
  title: "",
  description: "",
  city: "",
  district: "",
  address: "",
  images: [],
  price: "",
  priceUnit: "tỷ",
  area: "",
  bedrooms: "",
  bathrooms: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
};

// ─── Step components ──────────────────────────────────────────────────────────
const Step1 = ({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) => (
  <div className="flex flex-col gap-6">
    {/* Listing type */}
    <div>
      <label className="block text-[13px] font-bold text-zinc-700 dark:text-zinc-300 mb-2">Loại tin đăng *</label>
      <div className="flex gap-3">
        {[
          { val: "buy", label: "Cần bán", emoji: "🏠" },
          { val: "rent", label: "Cho thuê", emoji: "🔑" },
        ].map(({ val, label, emoji }) => (
          <button
            key={val}
            onClick={() => set({ listingType: val as "buy" | "rent" })}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 text-[14px] font-bold transition-all ${
              form.listingType === val
                ? "border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md"
                : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500"
            }`}
          >
            <span>{emoji}</span>
            {label}
          </button>
        ))}
      </div>
    </div>

    {/* Property type */}
    <div>
      <label className="block text-[13px] font-bold text-zinc-700 dark:text-zinc-300 mb-2">Loại bất động sản *</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PROPERTY_TYPES_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => set({ propertyType: opt.value })}
            className={`py-2.5 px-3 rounded-xl text-[12.5px] font-semibold border transition-all text-left ${
              form.propertyType === opt.value
                ? "border-zinc-900 dark:border-zinc-400 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>

    {/* Title */}
    <div>
      <label className="block text-[13px] font-bold text-zinc-700 dark:text-zinc-300 mb-2">Tiêu đề tin đăng *</label>
      <input
        type="text"
        value={form.title}
        onChange={(e) => set({ title: e.target.value })}
        placeholder="VD: Căn hộ 2PN Vinhomes Central Park, view sông..."
        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[13.5px] text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500 dark:focus:border-zinc-500 transition-colors"
      />
      <p className="text-[11px] text-zinc-400 mt-1">{form.title.length}/100 ký tự</p>
    </div>

    {/* Description */}
    <div>
      <label className="block text-[13px] font-bold text-zinc-700 dark:text-zinc-300 mb-2">Mô tả chi tiết *</label>
      <textarea
        value={form.description}
        onChange={(e) => set({ description: e.target.value })}
        rows={5}
        placeholder="Mô tả vị trí, tiện ích, tình trạng pháp lý, nội thất, v.v..."
        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[13.5px] text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500 dark:focus:border-zinc-500 resize-none transition-colors"
      />
    </div>
  </div>
);

const Step2 = ({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) => (
  <div className="flex flex-col gap-6">
    {/* City */}
    <div>
      <label className="block text-[13px] font-bold text-zinc-700 dark:text-zinc-300 mb-2">Tỉnh / Thành phố *</label>
      <select
        value={form.city}
        onChange={(e) => set({ city: e.target.value })}
        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[13.5px] text-zinc-900 dark:text-white outline-none focus:border-zinc-500 dark:focus:border-zinc-500 appearance-none transition-colors"
      >
        <option value="">Chọn tỉnh / thành phố</option>
        {CITIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>

    {/* District */}
    <div>
      <label className="block text-[13px] font-bold text-zinc-700 dark:text-zinc-300 mb-2">Quận / Huyện *</label>
      <input
        type="text"
        value={form.district}
        onChange={(e) => set({ district: e.target.value })}
        placeholder="VD: Quận 1, Huyện Bình Chánh..."
        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[13.5px] text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500 dark:focus:border-zinc-500 transition-colors"
      />
    </div>

    {/* Full address */}
    <div>
      <label className="block text-[13px] font-bold text-zinc-700 dark:text-zinc-300 mb-2">Địa chỉ chi tiết *</label>
      <input
        type="text"
        value={form.address}
        onChange={(e) => set({ address: e.target.value })}
        placeholder="Số nhà, tên đường, tên dự án..."
        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[13.5px] text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500 dark:focus:border-zinc-500 transition-colors"
      />
    </div>

    {/* Map hint */}
    <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
      <AlertCircle className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
      <p className="text-[13px] text-blue-700 dark:text-blue-400 leading-relaxed">
        Bản đồ tương tác để ghim vị trí chính xác sẽ được tích hợp trong phiên bản tiếp theo. Hiện tại vui lòng nhập địa chỉ đầy đủ.
      </p>
    </div>
  </div>
);

const Step3 = ({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) => {
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    set({ images: [...form.images, ...files].slice(0, 10) });
  };
  const removeImage = (i: number) => {
    set({ images: form.images.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-[13px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">Hình ảnh bất động sản *</label>
        <p className="text-[12px] text-zinc-400 mb-3">Tải lên tối đa 10 ảnh. Ảnh đầu tiên là ảnh đại diện.</p>

        {/* Upload zone */}
        <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-2xl cursor-pointer hover:border-zinc-500 dark:hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all group">
          <ImagePlus className="w-8 h-8 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors mb-2" />
          <p className="text-[13px] font-semibold text-zinc-400 dark:text-zinc-500">Nhấn để tải ảnh lên</p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-600 mt-1">JPG, PNG, WEBP — tối đa 5MB mỗi ảnh</p>
          <input type="file" accept="image/*" multiple className="sr-only" onChange={handleFiles} />
        </label>
      </div>

      {/* Preview grid */}
      {form.images.length > 0 && (
        <div>
          <p className="text-[12px] font-semibold text-zinc-400 mb-2">{form.images.length}/10 ảnh đã chọn</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {form.images.map((file, i) => (
              <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {i === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 text-center text-[10px] font-bold text-white bg-black/60 py-0.5">
                    Ảnh đại diện
                  </div>
                )}
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Step4 = ({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) => (
  <div className="flex flex-col gap-6">
    {/* Price */}
    <div>
      <label className="block text-[13px] font-bold text-zinc-700 dark:text-zinc-300 mb-2">Giá *</label>
      <div className="flex gap-2">
        <input
          type="number"
          value={form.price}
          onChange={(e) => set({ price: e.target.value })}
          placeholder="Nhập giá"
          className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[13.5px] text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500 dark:focus:border-zinc-500 transition-colors"
        />
        <select
          value={form.priceUnit}
          onChange={(e) => set({ priceUnit: e.target.value })}
          className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[13.5px] text-zinc-900 dark:text-white outline-none focus:border-zinc-500 dark:focus:border-zinc-500 appearance-none"
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

    {/* Area + Rooms */}
    <div className="grid grid-cols-3 gap-3">
      {[
        { key: "area", label: "Diện tích (m²)", placeholder: "VD: 75" },
        { key: "bedrooms", label: "Số phòng ngủ", placeholder: "VD: 2" },
        { key: "bathrooms", label: "Số phòng tắm", placeholder: "VD: 2" },
      ].map(({ key, label, placeholder }) => (
        <div key={key}>
          <label className="block text-[12px] font-bold text-zinc-700 dark:text-zinc-300 mb-2">{label}</label>
          <input
            type="number"
            value={(form as unknown as Record<string, string>)[key]}
            onChange={(e) => set({ [key]: e.target.value } as Partial<FormData>)}
            placeholder={placeholder}
            className="w-full px-3 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[13px] text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500 dark:focus:border-zinc-500 transition-colors"
          />
        </div>
      ))}
    </div>

    {/* Contact */}
    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-5">
      <p className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300 mb-4">Thông tin liên hệ *</p>
      <div className="flex flex-col gap-3">
        {[
          { key: "contactName", label: "Họ tên", placeholder: "Nguyễn Văn A", type: "text" },
          { key: "contactPhone", label: "Số điện thoại", placeholder: "09xx xxx xxx", type: "tel" },
          { key: "contactEmail", label: "Email", placeholder: "example@email.com", type: "email" },
        ].map(({ key, label, placeholder, type }) => (
          <div key={key}>
            <label className="block text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mb-1">{label}</label>
            <input
              type={type}
              value={(form as unknown as Record<string, string>)[key]}
              onChange={(e) => set({ [key]: e.target.value } as Partial<FormData>)}
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[13.5px] text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500 dark:focus:border-zinc-500 transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Main PostListingPage ──────────────────────────────────────────────────────
export const PostListingPage = () => {
  const [step, setStep] = useState(1);
  const [form, setFormData] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const set = (partial: Partial<FormData>) => setFormData((f) => ({ ...f, ...partial }));

  const canNext = () => {
    if (step === 1) return form.listingType && form.propertyType && form.title.length >= 10 && form.description.length >= 20;
    if (step === 2) return form.city && form.district && form.address;
    if (step === 3) return form.images.length > 0;
    if (step === 4) return form.price && form.contactName && form.contactPhone;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0c0c0e] flex items-center justify-center p-6">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-12 max-w-md w-full text-center shadow-xl">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">Đã gửi thành công!</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-[14px] leading-relaxed mb-6">
            Tin đăng của bạn đang được kiểm duyệt. Chúng tôi sẽ thông báo kết quả trong vòng <span className="font-bold text-zinc-900 dark:text-white">24 giờ</span>.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-left">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                <span className="text-amber-600 text-[12px] font-bold">1</span>
              </div>
              <div>
                <p className="text-[12.5px] font-bold text-zinc-700 dark:text-zinc-300">Đang chờ kiểm duyệt</p>
                <p className="text-[11px] text-zinc-400">Admin xem xét nội dung và pháp lý</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-left opacity-50">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                <span className="text-zinc-500 text-[12px] font-bold">2</span>
              </div>
              <div>
                <p className="text-[12.5px] font-bold text-zinc-700 dark:text-zinc-300">Thông báo kết quả</p>
                <p className="text-[11px] text-zinc-400">Bạn nhận email/SMS xác nhận</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-left opacity-50">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                <span className="text-zinc-500 text-[12px] font-bold">3</span>
              </div>
              <div>
                <p className="text-[12.5px] font-bold text-zinc-700 dark:text-zinc-300">Hiển thị công khai</p>
                <p className="text-[11px] text-zinc-400">Tin của bạn xuất hiện trên listing</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setFormData(INITIAL_FORM); }}
            className="mt-6 w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[13.5px] font-bold hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors"
          >
            Đăng tin mới
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0c0c0e] pt-24 pb-14 px-6">
      <div className="max-w-[680px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-zinc-400 text-[12px] font-bold uppercase tracking-widest mb-2">Hoàn toàn miễn phí</p>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Đăng tin bất động sản</h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <button
                disabled={s.id > step}
                onClick={() => s.id < step && setStep(s.id)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl text-center transition-all ${
                  step === s.id
                    ? "bg-zinc-900 dark:bg-white"
                    : s.id < step
                    ? "opacity-70 hover:opacity-100 cursor-pointer"
                    : "opacity-30 cursor-not-allowed"
                }`}
              >
                <s.icon className={`w-4.5 h-4.5 ${step === s.id ? "text-white dark:text-zinc-900" : "text-zinc-500 dark:text-zinc-400"}`} />
                <span className={`text-[10.5px] font-bold hidden sm:block ${step === s.id ? "text-white dark:text-zinc-900" : "text-zinc-400"}`}>
                  {s.label}
                </span>
                {s.id < step && <CheckCircle2 className="w-3 h-3 text-emerald-400 sm:hidden" />}
              </button>
              {i < STEPS.length - 1 && (
                <div className={`w-px h-8 shrink-0 ${s.id < step ? "bg-emerald-300 dark:bg-emerald-700" : "bg-zinc-200 dark:bg-zinc-700"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form body */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-6">
            {(() => {
              const StepIcon = STEPS[step - 1].icon;
              return <StepIcon className="w-5 h-5 text-zinc-500" />;
            })()}
            <h2 className="text-[15px] font-extrabold text-zinc-900 dark:text-white">
              Bước {step}: {STEPS[step - 1].label}
            </h2>
          </div>

          {step === 1 && <Step1 form={form} set={set} />}
          {step === 2 && <Step2 form={form} set={set} />}
          {step === 3 && <Step3 form={form} set={set} />}
          {step === 4 && <Step4 form={form} set={set} />}
        </div>

        {/* Nav buttons */}
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-[13.5px] font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Quay lại
            </button>
          )}
          <div className="flex-1" />
          {step < 4 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
              className={`flex items-center gap-2 px-7 py-3 rounded-xl text-[13.5px] font-bold transition-all ${
                canNext()
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-100 shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
              }`}
            >
              Tiếp theo
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canNext()}
              className={`flex items-center gap-2 px-7 py-3 rounded-xl text-[13.5px] font-bold transition-all ${
                canNext()
                  ? "bg-amber-500 hover:bg-amber-400 text-zinc-900 shadow-lg shadow-amber-500/30"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Gửi tin đăng
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
