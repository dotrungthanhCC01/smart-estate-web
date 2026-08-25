import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  RotateCcw,
  GitCompare,
  X,
} from "lucide-react";
import {
  MOCK_PROPERTIES,
  type Property,
} from "@/features/properties/data/mockProperties";
import { CustomSelect } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PropertySearchHeader } from "@/features/properties/components/PropertySearchHeader";
import {
  PropertyFilterModal,
  type PropertyFilterValues,
} from "@/features/properties/components/PropertyFilterModal";
import { PropertyMap } from "@/features/properties/components/PropertyMap";
import { CompareBar } from "@/features/properties/components/CompareBar";

// ─── Property Grid Card — đồng bộ LuxuryPropertyCard ───────────────────────────
const PropertyGridCard = ({
  property,
  isHovered,
  onHover,
  isComparing,
  onToggleCompare,
}: {
  property: Property;
  isHovered?: boolean;
  onHover?: (id: string | null) => void;
  isComparing?: boolean;
  onToggleCompare?: (id: string) => void;
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      to={`/properties/${property.id}`}
      onMouseEnter={() => onHover?.(property.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`group flex flex-col bg-white dark:bg-[#151518] rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isHovered
          ? "border-zinc-300 dark:border-zinc-600 shadow-md"
          : "border-zinc-200/80 dark:border-zinc-800/80 shadow-xs"
      }`}
    >
      {/* Image Banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={property.thumbnailUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badges */}
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

        {/* Top Right: Compare + Favorite */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleCompare?.(property.id);
            }}
            title={isComparing ? "Bỏ so sánh" : "Thêm so sánh"}
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all ${
              isComparing
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                : "bg-white/90 dark:bg-zinc-900/90 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {isComparing ? <X className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked((v) => !v);
            }}
            className="w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
          >
            <Heart
              className={`w-4.5 h-4.5 transition-colors ${
                liked ? "fill-rose-500 text-rose-500" : "text-zinc-500 dark:text-zinc-400"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content Area — đồng bộ LuxuryPropertyCard */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Specs bar */}
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

        {/* Title + Location */}
        <div>
          <h3 className="text-[16px] font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-zinc-400 text-[12.5px] mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{property.district}, {property.city}</span>
          </div>
        </div>

        {/* Price & Rating */}
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

// ─── Property List Card (Compact) ────────────────────────────────────────────
const PropertyListCard = ({
  property,
  isHovered,
  onHover,
  isComparing,
  onToggleCompare,
}: {
  property: Property;
  isHovered?: boolean;
  onHover?: (id: string | null) => void;
  isComparing?: boolean;
  onToggleCompare?: (id: string) => void;
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      to={`/properties/${property.id}`}
      onMouseEnter={() => onHover?.(property.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`group flex flex-col sm:flex-row bg-white dark:bg-[#151518] rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
        isHovered
          ? "border-zinc-300 dark:border-zinc-600 shadow-md"
          : "border-zinc-200/80 dark:border-zinc-800/80 shadow-xs"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative sm:w-56 aspect-[16/10] sm:aspect-auto overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
        <img
          src={property.thumbnailUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-zinc-900/85 text-white backdrop-blur-md">
            {property.listingType === "buy" ? "Cần bán" : "Cho thuê"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-2">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[20px] font-black text-zinc-900 dark:text-white">
              {property.priceDisplay}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleCompare?.(property.id);
                }}
                title={isComparing ? "Bỏ so sánh" : "Thêm so sánh"}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                  isComparing
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {isComparing ? <X className="w-3.5 h-3.5" /> : <GitCompare className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-rose-500 transition-colors"
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
            </div>
          </div>

          <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white line-clamp-1 mt-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
            {property.title}
          </h3>

          <p className="text-[12.5px] text-zinc-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{property.district}, {property.city}</span>
          </p>

          <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[12.5px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              {property.bedrooms} PN
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {property.bathrooms} WC
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5" />
              {property.area} m²
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-zinc-700 dark:text-zinc-200">{property.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─── Main PropertyListPage ──────────────────────────────────────────────────────
export const PropertyListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const compareProperties = useMemo(
    () => MOCK_PROPERTIES.filter((p) => compareIds.includes(p.id)),
    [compareIds]
  );

  const [filters, setFilters] = useState<PropertyFilterValues>({
    keyword: searchParams.get("q") || "",
    region: "all",
    city: searchParams.get("city") || "",
    district: searchParams.get("district") || "",
    ward: searchParams.get("ward") || "",
    listingType: (searchParams.get("type") as "" | "buy" | "rent") || "",
    propertyType: searchParams.get("category") || "",
    posterType: searchParams.get("poster") || "",
    priceRange: searchParams.get("price") || "",
    minPrice: "",
    maxPrice: "",
    bedrooms: searchParams.get("beds") || "",
    bathrooms: "",
    minArea: "",
    maxArea: "",
    direction: "",
    amenities: [],
  });

  useEffect(() => {
    setFilters({
      keyword: searchParams.get("q") || "",
      region: "all",
      city: searchParams.get("city") || "",
      district: searchParams.get("district") || "",
      ward: searchParams.get("ward") || "",
      listingType: (searchParams.get("type") as "" | "buy" | "rent") || "",
      propertyType: searchParams.get("category") || "",
      posterType: searchParams.get("poster") || "",
      priceRange: searchParams.get("price") || "",
      minPrice: "",
      maxPrice: "",
      bedrooms: searchParams.get("beds") || "",
      bathrooms: "",
      minArea: "",
      maxArea: "",
      direction: "",
      amenities: [],
    });
  }, [searchParams]);

  const applyFilters = (newFilters: PropertyFilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1);
    const params = new URLSearchParams();
    if (newFilters.keyword) params.set("q", newFilters.keyword);
    if (newFilters.city) params.set("city", newFilters.city);
    if (newFilters.district) params.set("district", newFilters.district);
    if (newFilters.ward) params.set("ward", newFilters.ward);
    if (newFilters.listingType) params.set("type", newFilters.listingType);
    if (newFilters.propertyType) params.set("category", newFilters.propertyType);
    if (newFilters.posterType) params.set("poster", newFilters.posterType);
    if (newFilters.priceRange) params.set("price", newFilters.priceRange);
    if (newFilters.bedrooms) params.set("beds", newFilters.bedrooms);
    setSearchParams(params);
  };

  const resetFilters = () => {
    const emptyFilters: PropertyFilterValues = {
      keyword: "", region: "all", city: "", district: "", ward: "",
      listingType: "", propertyType: "", posterType: "", priceRange: "",
      minPrice: "", maxPrice: "", bedrooms: "", bathrooms: "",
      minArea: "", maxArea: "", direction: "", amenities: [],
    };
    setFilters(emptyFilters);
    setCurrentPage(1);
    setSearchParams(new URLSearchParams());
  };

  const filteredProperties = useMemo(() => {
    let list = [...MOCK_PROPERTIES];
    if (filters.listingType) list = list.filter((p) => p.listingType === filters.listingType);
    if (filters.propertyType) list = list.filter((p) => p.propertyType === filters.propertyType);
    if (filters.posterType) list = list.filter((p) => p.posterType === filters.posterType);
    if (filters.city) list = list.filter((p) => p.city.toLowerCase().includes(filters.city.toLowerCase()));
    if (filters.district) list = list.filter((p) => p.district.toLowerCase().includes(filters.district.toLowerCase()));
    if (filters.keyword.trim()) {
      const kw = filters.keyword.toLowerCase();
      list = list.filter((p) =>
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
      list = list.filter((p) => p.price >= parseFloat(minS) && p.price <= parseFloat(maxS));
    }
    if (filters.amenities.length > 0) {
      list = list.filter((p) => filters.amenities.every((am) => p.amenities?.includes(am)));
    }
    if (sortBy === "newest") list.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
    else if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "area") list.sort((a, b) => b.area - a.area);
    return list;
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(start, start + itemsPerPage);
  }, [filteredProperties, currentPage]);

  const activeTagsSummary = useMemo(() => {
    const list: string[] = [];
    if (filters.city) list.push(filters.city);
    if (filters.district) list.push(filters.district);
    if (filters.listingType) list.push(filters.listingType === "buy" ? "Cần bán" : "Cho thuê");
    if (filters.bedrooms) list.push(`${filters.bedrooms} PN`);
    if (filters.posterType === "owner") list.push("Chính chủ");
    return list;
  }, [filters]);

  const activeFilterCount = Object.values(filters).filter(
    (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v) && v !== "all")
  ).length;

  const sortOptions = [
    { value: "newest", label: "Mới nhất" },
    { value: "price-asc", label: "Giá: Thấp đến cao" },
    { value: "price-desc", label: "Giá: Cao đến thấp" },
    { value: "area", label: "Diện tích lớn nhất" },
  ];

  return (
    <div className="w-full pb-24">
      <PropertySearchHeader
        keyword={filters.keyword}
        onKeywordChange={(val) => applyFilters({ ...filters, keyword: val })}
        activeFilterCount={activeFilterCount}
        activeFilterSummary={activeTagsSummary}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
      />

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-4 min-w-0">
            
            {/* Toolbar */}
            <div className="bg-white dark:bg-[#151518] p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h1 className="text-[16px] font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span>Danh sách bất động sản</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
                      {filteredProperties.length} kết quả
                    </span>
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-lg transition-all ${
                        viewMode === "grid" ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs" : "text-zinc-400"
                      }`}
                      title="Chế độ lưới"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-lg transition-all ${
                        viewMode === "list" ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs" : "text-zinc-400"
                      }`}
                      title="Chế độ danh sách"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  <CustomSelect options={sortOptions} value={sortBy} onChange={setSortBy} className="w-44 text-[12px]" />
                </div>
              </div>

              {activeTagsSummary.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mr-1">Đang lọc:</span>
                  {activeTagsSummary.map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/80">
                      {tag}
                    </span>
                  ))}
                  <button onClick={resetFilters} className="flex items-center gap-1 text-[11.5px] font-bold text-rose-500 hover:text-rose-600 ml-auto transition-colors">
                    <RotateCcw className="w-3 h-3" />
                    Xóa lọc
                  </button>
                </div>
              )}
            </div>

            {/* Empty State */}
            {filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-[#151518] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-center p-8 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                  <Search className="w-7 h-7 text-zinc-400" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">Không tìm thấy bất động sản phù hợp</h3>
                <p className="text-zinc-400 text-[13.5px] max-w-sm mb-5">Vui lòng chọn lại khu vực hoặc thử mở rộng các điều kiện lọc.</p>
                <Button onClick={resetFilters} className="rounded-full px-6 font-bold">Xóa tất cả điều kiện lọc</Button>
              </div>
            ) : (
              <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                {paginatedProperties.map((property) =>
                  viewMode === "grid" ? (
                    <PropertyGridCard
                      key={property.id}
                      property={property}
                      isHovered={hoveredPropertyId === property.id}
                      onHover={setHoveredPropertyId}
                      isComparing={compareIds.includes(property.id)}
                      onToggleCompare={handleToggleCompare}
                    />
                  ) : (
                    <PropertyListCard
                      key={property.id}
                      property={property}
                      isHovered={hoveredPropertyId === property.id}
                      onHover={setHoveredPropertyId}
                      isComparing={compareIds.includes(property.id)}
                      onToggleCompare={handleToggleCompare}
                    />
                  )
                )}
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <div className="flex items-center justify-between bg-white dark:bg-[#151518] p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs mt-2">
                <span className="text-[12.5px] font-medium text-zinc-500">
                  Trang <span className="font-bold text-zinc-900 dark:text-white">{currentPage}</span> / {totalPages}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="w-8 h-8 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((pg) => (
                    <button
                      key={pg}
                      onClick={() => setCurrentPage(pg)}
                      className={`w-8 h-8 rounded-xl text-[12.5px] font-bold transition-all ${
                        currentPage === pg
                          ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md"
                          : "border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {pg}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="w-8 h-8 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Map */}
          <div className="lg:col-span-5 hidden lg:block sticky top-20">
            <PropertyMap
              properties={filteredProperties}
              selectedCity={filters.city}
              selectedDistrict={filters.district}
              hoveredPropertyId={hoveredPropertyId}
              onSelectProperty={(id) => setHoveredPropertyId(id)}
            />
          </div>
        </div>
      </div>

      <PropertyFilterModal
        open={isFilterModalOpen}
        onOpenChange={setIsFilterModalOpen}
        filters={filters}
        onApplyFilters={applyFilters}
        onResetFilters={resetFilters}
        filteredCount={filteredProperties.length}
      />

      <CompareBar
        selectedProperties={compareProperties}
        onRemove={(id) => setCompareIds((prev) => prev.filter((i) => i !== id))}
        onClear={() => setCompareIds([])}
      />
    </div>
  );
};
