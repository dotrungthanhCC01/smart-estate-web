import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  X,
  Star,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
} from "lucide-react";
import {
  MOCK_PROPERTIES,
  CITIES,
  PROPERTY_TYPES_OPTIONS,
  PRICE_RANGES_BUY,
  PRICE_RANGES_RENT,
  type Property,
} from "@/features/properties/data/mockProperties";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/select";

// ─── Property Grid Card ──────────────────────────────────────────────────────
const PropertyGridCard = ({ property }: { property: Property }) => {
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

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-zinc-900/85 text-white backdrop-blur-md">
            {property.listingType === "buy" ? "Cần bán" : "Cho thuê"}
          </span>
          {property.isNew && (
            <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white backdrop-blur-md">
              Mới
            </span>
          )}
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked((v) => !v);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked ? "fill-rose-500 text-rose-500" : "text-zinc-500 dark:text-zinc-400"
            }`}
          />
        </button>
      </div>

      {/* Info Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Specs Bar */}
        <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 text-[12px] font-medium border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
              Bed - {String(property.bedrooms).padStart(2, "0")}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
              Bath - {String(property.bathrooms).padStart(2, "0")}
            </span>
          )}
          <span className="flex items-center gap-1 ml-auto">
            <Maximize2 className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
            {property.area} m²
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
            {property.title}
          </h3>
          <p className="text-[12px] text-zinc-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{property.address}</span>
          </p>
        </div>

        {/* Price & Category */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[18px] font-black text-zinc-900 dark:text-white">
              {property.priceDisplay}
            </span>
            <span className="text-[11.5px] text-zinc-400 font-medium">
              · {property.propertyType === "apartment" ? "Căn hộ" : property.propertyType === "villa" ? "Biệt thự" : property.propertyType === "student_room" ? "Trọ / Studio" : "Nhà phố"}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-800/60 px-2 py-0.5 rounded-md border border-zinc-100 dark:border-zinc-800">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11.5px] font-bold text-zinc-800 dark:text-zinc-200">
              {property.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─── Filter State ─────────────────────────────────────────────────────────────
interface FilterState {
  keyword: string;
  listingType: "" | "buy" | "rent";
  propertyType: string;
  city: string;
  bedrooms: string;
  priceRange: string;
}

export const PropertyListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Sidebar visibility state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  // Filters State synchronized with URL query params
  const [filters, setFilters] = useState<FilterState>({
    keyword: searchParams.get("q") || "",
    listingType: (searchParams.get("type") as "" | "buy" | "rent") || "",
    propertyType: searchParams.get("category") || "",
    city: searchParams.get("city") || "",
    bedrooms: "",
    priceRange: searchParams.get("price") || "",
  });

  // Re-sync filters whenever URL query changes (Instant Header Navigation)
  useEffect(() => {
    setFilters({
      keyword: searchParams.get("q") || "",
      listingType: (searchParams.get("type") as "" | "buy" | "rent") || "",
      propertyType: searchParams.get("category") || "",
      city: searchParams.get("city") || "",
      bedrooms: "",
      priceRange: searchParams.get("price") || "",
    });
  }, [searchParams]);

  const updateFilter = (partial: Partial<FilterState>) => {
    setFilters((prev) => {
      const next = { ...prev, ...partial };
      const params = new URLSearchParams();
      if (next.keyword) params.set("q", next.keyword);
      if (next.listingType) params.set("type", next.listingType);
      if (next.propertyType) params.set("category", next.propertyType);
      if (next.city) params.set("city", next.city);
      if (next.priceRange) params.set("price", next.priceRange);
      setSearchParams(params);
      return next;
    });
  };

  const resetFilters = () => {
    setFilters({
      keyword: "",
      listingType: "",
      propertyType: "",
      city: "",
      bedrooms: "",
      priceRange: "",
    });
    setSearchParams(new URLSearchParams());
  };

  // Filtered properties list
  const filtered = useMemo(() => {
    let list = [...MOCK_PROPERTIES];

    if (filters.listingType) {
      list = list.filter((p) => p.listingType === filters.listingType);
    }
    if (filters.propertyType) {
      list = list.filter((p) => p.propertyType === filters.propertyType);
    }
    if (filters.city) {
      list = list.filter((p) => p.city.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.keyword.trim()) {
      const kw = filters.keyword.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(kw) ||
          p.address.toLowerCase().includes(kw) ||
          p.description.toLowerCase().includes(kw) ||
          p.district.toLowerCase().includes(kw)
      );
    }
    if (filters.bedrooms) {
      const n = filters.bedrooms === "4+" ? 4 : parseInt(filters.bedrooms);
      list = list.filter((p) => (filters.bedrooms === "4+" ? p.bedrooms >= n : p.bedrooms === n));
    }
    if (filters.priceRange) {
      const [minS, maxS] = filters.priceRange.split("-");
      const min = parseFloat(minS);
      const max = parseFloat(maxS);
      list = list.filter((p) => p.price >= min && p.price <= max);
    }

    if (sortBy === "newest") list.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
    else if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "area") list.sort((a, b) => b.area - a.area);

    return list;
  }, [filters, sortBy]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const propertyTypeOptions = [
    { value: "", label: "Tất cả loại BĐS" },
    ...PROPERTY_TYPES_OPTIONS.map((t) => ({ value: t.value, label: t.label })),
  ];

  const cityOptions = [
    { value: "", label: "Toàn quốc (Tất cả)" },
    ...CITIES.map((c) => ({ value: c, label: c })),
  ];

  const sortOptions = [
    { value: "newest", label: "Mới nhất" },
    { value: "price-asc", label: "Giá: Thấp đến cao" },
    { value: "price-desc", label: "Giá: Cao đến thấp" },
    { value: "area", label: "Diện tích lớn nhất" },
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0c0c0e] text-zinc-900 dark:text-zinc-100 pt-20">

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6 items-start">

          {/* ── Collapsible Left Filter Sidebar (Sát mép trái) ── */}
          {isSidebarOpen ? (
            <aside className="w-[300px] shrink-0 bg-white dark:bg-[#151518] rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col gap-5 sticky top-[88px] max-h-[calc(100vh-100px)] overflow-y-auto z-20 animate-in fade-in slide-in-from-left-4 duration-300">
              
              {/* Header Sidebar: Tiêu đề + Nút Xóa bộ lọc ĐẶT TRÊN CÙNG DỄ NHÌN */}
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3.5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-zinc-900 dark:text-white" />
                  <h2 className="text-[15px] font-extrabold text-zinc-900 dark:text-white">Bộ lọc tìm kiếm</h2>
                </div>

                <div className="flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-1 text-[11.5px] font-bold text-rose-500 hover:text-rose-600 transition-colors"
                      title="Xóa tất cả điều kiện lọc"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Xóa bộ lọc
                    </button>
                  )}
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                    title="Thu gọn sidebar"
                  >
                    <PanelLeftClose className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Ô Tìm kiếm từ khóa */}
              <div>
                <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Từ khóa tìm kiếm
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={filters.keyword}
                    onChange={(e) => updateFilter({ keyword: e.target.value })}
                    placeholder="Vinhomes, trọ Thủ Đức..."
                    className="w-full pl-9 pr-7 py-2 text-[13px] rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:ring-1 focus:ring-zinc-900/20"
                  />
                  {filters.keyword && (
                    <button
                      onClick={() => updateFilter({ keyword: "" })}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Mục đích giao dịch */}
              <div>
                <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Nhu cầu giao dịch
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  {[
                    { key: "", label: "Tất cả" },
                    { key: "buy", label: "Cần mua" },
                    { key: "rent", label: "Cho thuê" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => updateFilter({ listingType: item.key as "" | "buy" | "rent" })}
                      className={`py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                        filters.listingType === item.key
                          ? "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CustomSelect: Loại BĐS */}
              <div>
                <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Loại bất động sản
                </label>
                <CustomSelect
                  options={propertyTypeOptions}
                  value={filters.propertyType}
                  onChange={(val) => updateFilter({ propertyType: val })}
                  placeholder="Tất cả loại BĐS"
                />
              </div>

              {/* CustomSelect: Tỉnh / Thành phố */}
              <div>
                <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Tỉnh / Thành phố
                </label>
                <CustomSelect
                  options={cityOptions}
                  value={filters.city}
                  onChange={(val) => updateFilter({ city: val })}
                  placeholder="Toàn quốc (Tất cả)"
                />
              </div>

              {/* Khoảng giá */}
              <div>
                <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Khoảng giá ({filters.listingType === "rent" ? "Thuê" : "Mua"})
                </label>
                <div className="flex flex-col gap-1">
                  {(filters.listingType === "rent" ? PRICE_RANGES_RENT : PRICE_RANGES_BUY).map((range) => {
                    const val = `${range.min}-${range.max}`;
                    const isSelected = filters.priceRange === val;
                    return (
                      <button
                        key={range.label}
                        onClick={() => updateFilter({ priceRange: isSelected ? "" : val })}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-[12px] font-medium transition-all ${
                          isSelected
                            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold"
                            : "bg-zinc-50 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        <span>{range.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Số phòng ngủ */}
              <div>
                <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Số phòng ngủ
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["1", "2", "3", "4+"].map((bed) => {
                    const isSelected = filters.bedrooms === bed;
                    return (
                      <button
                        key={bed}
                        onClick={() => updateFilter({ bedrooms: isSelected ? "" : bed })}
                        className={`py-1.5 rounded-xl text-[12px] font-bold border transition-all ${
                          isSelected
                            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-xs"
                            : "border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400"
                        }`}
                      >
                        {bed} PN
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          ) : (
            /* Button toggle mở lại bộ lọc (Gọn gàng, tinh tế hợp tông web - Ảnh 5 fix) */
            <Button
              onClick={() => setIsSidebarOpen(true)}
              variant="outline"
              size="sm"
              className="sticky top-[88px] rounded-full text-[12.5px] font-bold gap-1.5 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md shrink-0 z-20"
            >
              <PanelLeftOpen className="w-4 h-4" />
              <span>Hiện bộ lọc</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-[10px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          )}

          {/* ── Main Properties Grid Container ── */}
          <div className="flex-1 min-w-0">

            {/* Top Toolbar (Controls & Count) */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <p className="text-[14px] font-medium text-zinc-500 dark:text-zinc-400">
                  Hiển thị <span className="font-extrabold text-zinc-900 dark:text-white">{filtered.length}</span> bất động sản phù hợp
                </p>
              </div>

              {/* CustomSelect Sort By */}
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-zinc-400 font-medium hidden sm:inline">Sắp xếp:</span>
                <CustomSelect
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  className="w-44"
                />
              </div>
            </div>

            {/* Properties Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#151518] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 text-center p-8">
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                  <Search className="w-7 h-7 text-zinc-400" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  Không tìm thấy bất động sản phù hợp
                </h3>
                <p className="text-zinc-400 text-[13.5px] max-w-[360px] mb-5">
                  Vui lòng thử điều chỉnh lại từ khóa hoặc xóa bớt các điều kiện lọc để xem thêm kết quả.
                </p>
                <Button onClick={resetFilters} className="rounded-full px-6 font-bold">
                  Xóa bộ lọc tìm kiếm
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-5 ${
                  isSidebarOpen
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                }`}
              >
                {filtered.map((property) => (
                  <PropertyGridCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
