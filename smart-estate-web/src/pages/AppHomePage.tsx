import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ArrowRight,
  Bed,
  Bath,
  Maximize2,
  Heart,
  Star,
  Building2,
  Home,
  Sparkles,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import {
  MOCK_PROPERTIES,
  CITIES,
  PROPERTY_TYPES_OPTIONS,
  type Property,
} from "@/features/properties/data/mockProperties";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/select";

// ─── Minimalist Luxury Property Card ──────────────────────────────────────────
const LuxuryPropertyCard = ({ property }: { property: Property }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      to={`/properties/${property.id}`}
      className="group flex flex-col bg-white dark:bg-[#151518] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={property.thumbnailUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Minimalist Badges (Matching Image 2 Style - No Emojis/Purples) */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-zinc-900/85 text-white backdrop-blur-md">
            {property.listingType === "buy" ? "Cần bán" : "Cho thuê"}
          </span>
          {property.isNew && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white backdrop-blur-md">
              Mới
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked((v) => !v);
          }}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all z-10"
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors ${
              liked ? "fill-rose-500 text-rose-500" : "text-zinc-500 dark:text-zinc-400"
            }`}
          />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Specs bar (Bed, Bath, Area) */}
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 text-[12.5px] font-medium border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
              Bed - {String(property.bedrooms).padStart(2, "0")}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
              Bath - {String(property.bathrooms).padStart(2, "0")}
            </span>
          )}
          <span className="flex items-center gap-1.5 ml-auto">
            <Maximize2 className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
            {property.area} m²
          </span>
        </div>

        {/* Title and location */}
        <div>
          <h3 className="text-[16px] font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-zinc-400 text-[12.5px] mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{property.district}, {property.city}</span>
          </div>
        </div>

        {/* Price & Type */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[20px] font-black text-zinc-900 dark:text-white">
              {property.priceDisplay}
            </span>
            <span className="text-[12px] text-zinc-400 font-medium">
              · {property.propertyType === "apartment" ? "Căn hộ" : property.propertyType === "villa" ? "Biệt thự" : property.propertyType === "student_room" ? "Trọ / Studio" : "Nhà phố"}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-800/60 px-2 py-1 rounded-md border border-zinc-100 dark:border-zinc-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-[12px] font-bold text-zinc-800 dark:text-zinc-200">
              {property.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─── Main AppHomePage Component ───────────────────────────────────────────────
export const AppHomePage = () => {
  const navigate = useNavigate();

  // Search Bar state
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  // Filter Tabs state for Featured Section (Matching Image 2 Minimalist style)
  const [activeTab, setActiveTab] = useState<"all" | "apartment" | "villa" | "rent" | "buy" | "student">("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeyword) params.set("q", searchKeyword);
    if (searchType) params.set("category", searchType);
    if (searchCity) params.set("city", searchCity);
    if (searchPrice) params.set("price", searchPrice);
    navigate(`/properties?${params.toString()}`);
  };

  // Options for CustomSelect
  const typeOptions = [
    { value: "", label: "Tất cả loại BĐS" },
    ...PROPERTY_TYPES_OPTIONS.map((t) => ({ value: t.value, label: t.label })),
  ];

  const cityOptions = [
    { value: "", label: "Toàn quốc (Tất cả)" },
    ...CITIES.map((c) => ({ value: c, label: c })),
  ];

  const priceOptions = [
    { value: "", label: "Tất cả mức giá" },
    { value: "0-5", label: "Dưới 5 Triệu / Tỷ" },
    { value: "5-15", label: "5 – 15 Triệu / Tỷ" },
    { value: "15-30", label: "15 – 30 Tỷ" },
    { value: "30-999", label: "Trên 30 Tỷ" },
  ];

  // Filtered Properties for Featured section
  const filteredFeatured = MOCK_PROPERTIES.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "apartment") return p.propertyType === "apartment";
    if (activeTab === "villa") return p.propertyType === "villa";
    if (activeTab === "rent") return p.listingType === "rent";
    if (activeTab === "buy") return p.listingType === "buy";
    if (activeTab === "student") return p.propertyType === "student_room" || p.targetSegment === "student";
    return true;
  });

  const displayProperties = isExpanded ? filteredFeatured : filteredFeatured.slice(0, 6);
  const studentProperties = MOCK_PROPERTIES.filter((p) => p.targetSegment === "student" || p.propertyType === "student_room");
  const familyProperties = MOCK_PROPERTIES.filter((p) => p.targetSegment === "family");

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0c0c0e] text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white">

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[540px] lg:min-h-[600px] flex flex-col justify-between overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Architecture"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
        </div>

        {/* Top Hero Text Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32">
          <div className="max-w-[780px]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 dark:bg-black/30 border border-white/20 backdrop-blur-md mb-5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="text-[12px] font-bold text-white tracking-wider uppercase">
                Nền tảng Bất động sản thông minh
              </span>
            </div>

            <h1 className="text-white text-4xl sm:text-6xl lg:text-[64px] font-black leading-[1.08] tracking-tight mb-5">
              Smart Ways to Grow <br className="hidden sm:inline" />
              <span className="font-light italic text-zinc-200">Your Property Portfolio</span>
            </h1>

            <p className="text-white/80 text-[15px] sm:text-[16.5px] leading-relaxed max-w-[540px] mb-8">
              Từ phòng trọ sinh viên, căn hộ gia đình trẻ đến dinh thự nghỉ dưỡng cao cấp — Mọi bất động sản đều được kiểm duyệt minh bạch.
            </p>

            {/* Segment Shortcut Pills */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => navigate("/properties?type=buy")}
                className="px-5 py-2 rounded-full bg-white text-zinc-950 font-bold text-[13px] hover:bg-zinc-100 transition-all shadow-md"
              >
                Mua nhà ở
              </button>
              <button
                onClick={() => navigate("/properties?type=rent")}
                className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md font-bold text-[13px] transition-all border border-white/20"
              >
                Thuê căn hộ
              </button>
              <button
                onClick={() => navigate("/properties?category=student_room&type=rent")}
                className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md font-bold text-[13px] transition-all border border-white/20"
              >
                Trọ Sinh Viên
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Floating Search Box (CustomSelect Shadcn-style UI) ── */}
      <div className="relative z-20 max-w-[1240px] mx-auto w-full px-6 sm:px-10 -mt-14 sm:-mt-18">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white dark:bg-[#151518] rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col gap-3.5 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[15.5px] font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Tìm kiếm Bất động sản phù hợp
            </h2>
            <span className="text-[12px] text-zinc-400 font-medium hidden sm:inline">Hơn 50,000+ tin đăng đã duyệt</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
            {/* Field 1: Keyword */}
            <div className="flex flex-col gap-1">
              <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
                Từ khóa / Dự án
              </label>
              <div className="relative flex items-center px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80">
                <Search className="w-4 h-4 text-zinc-400 shrink-0 mr-2" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Vinhomes, Trọ Thủ Đức..."
                  className="w-full bg-transparent text-[13px] font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none"
                />
              </div>
            </div>

            {/* Field 2: CustomSelect Property Type */}
            <div className="flex flex-col gap-1">
              <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
                Loại bất động sản
              </label>
              <CustomSelect
                options={typeOptions}
                value={searchType}
                onChange={setSearchType}
                placeholder="Tất cả loại BĐS"
              />
            </div>

            {/* Field 3: CustomSelect City */}
            <div className="flex flex-col gap-1">
              <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
                Khu vực / Tỉnh thành
              </label>
              <CustomSelect
                options={cityOptions}
                value={searchCity}
                onChange={setSearchCity}
                placeholder="Toàn quốc (Tất cả)"
              />
            </div>

            {/* Field 4: CustomSelect Price & Submit Button */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
                  Mức giá
                </label>
                <CustomSelect
                  options={priceOptions}
                  value={searchPrice}
                  onChange={setSearchPrice}
                  placeholder="Tất cả mức giá"
                />
              </div>

              <Button
                type="submit"
                className="h-[42px] rounded-xl px-5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-md shrink-0 mt-auto"
              >
                <Search className="w-4 h-4 mr-1" />
                Tìm
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Spacer below Search Box */}
      <div className="h-10 sm:h-14" />

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — FEATURED PROPERTIES (Matching Image 2 Minimalist Pills)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-zinc-500 dark:text-zinc-400 text-[12px] font-bold uppercase tracking-widest mb-1.5">
              Danh mục tuyển chọn
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
              Bất động sản <span className="font-light italic text-zinc-400 dark:text-zinc-500">nổi bật</span>
            </h2>
          </div>

          {/* Minimalist Filter Pills Container (Image 2 Style - No Emojis) */}
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#EFEFEF] dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
            {[
              { key: "all", label: "Tất cả" },
              { key: "apartment", label: "Căn hộ" },
              { key: "villa", label: "Biệt thự" },
              { key: "rent", label: "Cho thuê" },
              { key: "buy", label: "Cần mua" },
              { key: "student", label: "Trọ sinh viên" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white font-bold shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProperties.map((property) => (
            <LuxuryPropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Expand or View All Trigger */}
        <div className="text-center mt-10 flex items-center justify-center gap-4">
          <Button
            onClick={() => setIsExpanded((prev) => !prev)}
            variant="outline"
            size="lg"
            className="rounded-full px-8 font-bold border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[13.5px]"
          >
            {isExpanded ? "Thu gọn danh sách" : `Xem thêm (${filteredFeatured.length - displayProperties.length} BĐS nữa)`}
          </Button>

          <Link to="/properties">
            <Button
              size="lg"
              className="rounded-full px-8 font-extrabold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-[13.5px] shadow-sm"
            >
              Mở toàn bộ danh sách
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — PHÒNG TRỌ SINH VIÊN & NGƯỜI ĐI LÀM (No Purple Badges)
      ══════════════════════════════════════════════════════════ */}
      {studentProperties.length > 0 && (
        <section className="py-14 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-[12px] font-bold uppercase tracking-widest mb-1">
                Dành cho Sinh viên &amp; Người đi làm
              </p>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                Phòng trọ &amp; Studio tiện nghi giá tốt
              </h2>
            </div>

            <Link to="/properties?category=student_room&type=rent">
              <Button variant="outline" className="rounded-full text-[12.5px] font-bold">
                Xem tất cả ({studentProperties.length})
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentProperties.map((prop) => (
              <LuxuryPropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — CĂN HỘ GIA ĐÌNH TRẺ
      ══════════════════════════════════════════════════════════ */}
      {familyProperties.length > 0 && (
        <section className="py-14 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-[12px] font-bold uppercase tracking-widest mb-1">
                An cư gia đình
              </p>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                Căn hộ &amp; Nhà ở cho Hộ Gia Đình
              </h2>
            </div>

            <Link to="/properties?type=buy">
              <Button variant="outline" className="rounded-full text-[12.5px] font-bold">
                Xem thêm
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyProperties.map((prop) => (
              <LuxuryPropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — BUY & RENT SPLIT CARDS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Mua */}
          <Link
            to="/properties?type=buy"
            className="group relative h-[340px] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Mua BĐS"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 text-white">
                <Home className="w-5 h-5" />
              </div>
              <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-1">
                Giao dịch an toàn · Sổ hồng trao tay
              </p>
              <h3 className="text-white text-3xl font-black tracking-tight mb-2">
                Mua Bất Động Sản
              </h3>
              <p className="text-white/75 text-[13.5px] leading-relaxed mb-4 max-w-[380px]">
                Sở hữu căn hộ cao cấp, nhà phố ven sông, biệt thự nghỉ dưỡng với pháp lý chuẩn xác.
              </p>
              <div className="flex items-center gap-2 text-white font-extrabold text-[13.5px] group-hover:translate-x-1 transition-transform">
                <span>Khám phá ngay</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card Thuê */}
          <Link
            to="/properties?type=rent"
            className="group relative h-[340px] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
              alt="Thuê BĐS"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-1">
                Linh hoạt · Đầy đủ tiện nghi
              </p>
              <h3 className="text-white text-3xl font-black tracking-tight mb-2">
                Thuê Bất Động Sản
              </h3>
              <p className="text-white/75 text-[13.5px] leading-relaxed mb-4 max-w-[380px]">
                Tìm kiếm phòng trọ, căn hộ studio, penthouse và văn phòng hiện đại hỗ trợ 24/7.
              </p>
              <div className="flex items-center gap-2 text-white font-extrabold text-[13.5px] group-hover:translate-x-1 transition-transform">
                <span>Tìm phòng ngay</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — POST LISTING CTA BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
        <div className="rounded-3xl bg-zinc-900 dark:bg-[#18181c] p-8 sm:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-[560px] relative z-10">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-white uppercase tracking-widest mb-3 inline-block">
              Dành cho chủ nhà &amp; môi giới
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Đăng tin bất động sản &amp; tiếp cận khách hàng nhanh nhất
            </h2>
            <p className="text-zinc-400 text-[14px] leading-relaxed mb-4">
              Đăng tin phòng trọ, căn hộ, nhà phố miễn phí 100%. Quy trình 4 bước kiểm duyệt minh bạch trong 24 giờ.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link to="/post-listing">
              <Button
                size="lg"
                className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-extrabold px-8 py-6 text-[14.5px] shadow-xl hover:scale-105 transition-transform"
              >
                <Plus className="w-4.5 h-4.5 mr-2" />
                Đăng tin ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer id="contact" className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] py-12 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center">
              <Building2 className="w-4.5 h-4.5 text-white dark:text-zinc-900" />
            </div>
            <span className="font-extrabold text-[16px] text-zinc-900 dark:text-white">
              Smart<span className="font-light text-zinc-500">Estate</span>
            </span>
          </div>

          <p className="text-zinc-500 text-[12.5px] text-center">
            © 2026 Smart Estate Platform. Nền tảng giao dịch &amp; quản trị BĐS thông minh.
          </p>

          <div className="flex items-center gap-6 text-[13px] font-semibold text-zinc-500 dark:text-zinc-400">
            <Link to="/properties?type=buy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Mua BĐS</Link>
            <Link to="/properties?type=rent" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Thuê BĐS</Link>
            <Link to="/post-listing" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Đăng tin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
