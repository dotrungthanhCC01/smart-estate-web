import { useState, useEffect } from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  MapPin,
  Tag,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/select";
import {
  PROPERTY_TYPES_OPTIONS,
  PRICE_RANGES_BUY,
  PRICE_RANGES_RENT,
} from "@/features/properties/data/mockProperties";
import { VIETNAM_CITIES } from "@/features/properties/data/vietnamLocations";

export interface PropertyFilterValues {
  keyword: string;
  region: "all" | "north" | "central" | "south";
  city: string;
  district: string;
  ward: string;
  listingType: "" | "buy" | "rent";
  propertyType: string;
  posterType: string;
  priceRange: string; // "min-max"
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minArea: string;
  maxArea: string;
  direction: string;
  amenities: string[];
}

interface PropertyFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: PropertyFilterValues;
  onApplyFilters: (filters: PropertyFilterValues) => void;
  onResetFilters: () => void;
  filteredCount: number;
}

export const PropertyFilterModal = ({
  open,
  onOpenChange,
  filters: initialFilters,
  onApplyFilters,
  onResetFilters,
  filteredCount,
}: PropertyFilterModalProps) => {
  const [draft, setDraft] = useState<PropertyFilterValues>(initialFilters);

  // Sync draft filters whenever modal opens or initialFilters change
  useEffect(() => {
    if (open) setDraft(initialFilters);
  }, [open, initialFilters]);

  // Handle city change -> reset district & ward
  const handleCityChange = (cityVal: string) => {
    setDraft((prev) => ({
      ...prev,
      city: cityVal,
      district: "",
      ward: "",
    }));
  };

  // Handle district change -> reset ward
  const handleDistrictChange = (distVal: string) => {
    setDraft((prev) => ({
      ...prev,
      district: distVal,
      ward: "",
    }));
  };

  // Toggle amenity selection
  const toggleAmenity = (amenityName: string) => {
    setDraft((prev) => {
      const exists = prev.amenities.includes(amenityName);
      const next = exists
        ? prev.amenities.filter((a) => a !== amenityName)
        : [...prev.amenities, amenityName];
      return { ...prev, amenities: next };
    });
  };

  // Get districts based on selected City
  const selectedCityObj = VIETNAM_CITIES.find((c) => c.name === draft.city);
  const availableDistricts = selectedCityObj ? selectedCityObj.districts : [];

  // Get wards based on selected District
  const selectedDistrictObj = availableDistricts.find((d) => d.name === draft.district);
  const availableWards = selectedDistrictObj ? selectedDistrictObj.wards : [];

  // Calculate total active filter tags in draft
  const activeTags: { key: keyof PropertyFilterValues; label: string }[] = [];
  if (draft.city) activeTags.push({ key: "city", label: draft.city });
  if (draft.district) activeTags.push({ key: "district", label: draft.district });
  if (draft.ward) activeTags.push({ key: "ward", label: draft.ward });
  if (draft.listingType)
    activeTags.push({ key: "listingType", label: draft.listingType === "buy" ? "Cần mua" : "Cho thuê" });
  if (draft.propertyType) {
    const pType = PROPERTY_TYPES_OPTIONS.find((t) => t.value === draft.propertyType);
    if (pType) activeTags.push({ key: "propertyType", label: pType.label });
  }
  if (draft.posterType) {
    const pLabel =
      draft.posterType === "owner"
        ? "Chính chủ"
        : draft.posterType === "broker"
        ? "Môi giới"
        : "Chủ đầu tư";
    activeTags.push({ key: "posterType", label: pLabel });
  }
  if (draft.bedrooms) activeTags.push({ key: "bedrooms", label: `${draft.bedrooms} PN` });
  if (draft.direction) activeTags.push({ key: "direction", label: `Hướng ${draft.direction}` });
  if (draft.priceRange) activeTags.push({ key: "priceRange", label: `Giá: ${draft.priceRange}` });
  draft.amenities.forEach((am) => activeTags.push({ key: "amenities", label: am }));

  const ALL_AMENITIES = [
    "Hồ bơi vô cực",
    "Phòng Gym 5 sao",
    "Smart Home",
    "View sông",
    "Wifi tốc độ cao",
    "Khóa vân tay",
    "Máy giặt riêng",
    "Camera 24/7",
    "Gần trạm Metro",
    "Ban công riêng",
    "Gần trường ĐH",
    "Không chung chủ",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Modal Top Header */}
      <DialogHeader>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center shadow-xs">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <DialogTitle>Bộ lọc tìm kiếm bất động sản</DialogTitle>
            <p className="text-[11.5px] text-zinc-400 font-medium">
              Tùy chỉnh tiêu chí tìm kiếm theo nhu cầu của bạn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeTags.length > 0 && (
            <button
              onClick={() => {
                const resetState: PropertyFilterValues = {
                  keyword: "",
                  region: "all",
                  city: "",
                  district: "",
                  ward: "",
                  listingType: "",
                  propertyType: "",
                  posterType: "",
                  priceRange: "",
                  minPrice: "",
                  maxPrice: "",
                  bedrooms: "",
                  bathrooms: "",
                  minArea: "",
                  maxArea: "",
                  direction: "",
                  amenities: [],
                };
                setDraft(resetState);
                onResetFilters();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
              title="Xóa tất cả tiêu chí đã chọn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
          <DialogClose onClick={() => onOpenChange(false)} />
        </div>
      </DialogHeader>

      {/* Modal Body / Form Fields with ample bottom space */}
      <DialogContent className="pb-28">
        
        {/* Selected Filter Tags Pills */}
        {activeTags.length > 0 && (
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                <Tag className="w-3 h-3 text-zinc-400" />
                Đã chọn ({activeTags.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeTags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-bold bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-xs"
                >
                  {tag.label}
                  <button
                    onClick={() => {
                      if (tag.key === "amenities") {
                        setDraft((prev) => ({
                          ...prev,
                          amenities: prev.amenities.filter((a) => a !== tag.label),
                        }));
                      } else {
                        setDraft((prev) => ({ ...prev, [tag.key]: "" }));
                      }
                    }}
                    className="text-zinc-400 hover:text-rose-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── 1. KHU VỰC HÀNH CHÍNH (TỈNH / QUẬN / PHƯỜNG) ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-900 dark:text-white" />
            <h3 className="text-[14px] font-bold text-zinc-900 dark:text-white">
              Khu vực địa lý (Tỉnh / Quận / Phường)
            </h3>
          </div>

          {/* 3 Cascading Selects */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                Tỉnh / Thành phố
              </label>
              <CustomSelect
                options={[
                  { value: "", label: "Tất cả Tỉnh/Thành" },
                  ...VIETNAM_CITIES.map((c) => ({ value: c.name, label: c.name })),
                ]}
                value={draft.city}
                onChange={handleCityChange}
                placeholder="Chọn Tỉnh / Thành"
              />
            </div>

            <div>
              <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                Quận / Huyện
              </label>
              <CustomSelect
                options={[
                  { value: "", label: "Tất cả Quận/Huyện" },
                  ...availableDistricts.map((d) => ({ value: d.name, label: d.name })),
                ]}
                value={draft.district}
                onChange={handleDistrictChange}
                placeholder="Chọn Quận / Huyện"
              />
            </div>

            <div>
              <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                Phường / Xã
              </label>
              <CustomSelect
                options={[
                  { value: "", label: "Tất cả Phường/Xã" },
                  ...availableWards.map((w) => ({ value: w.name, label: w.name })),
                ]}
                value={draft.ward}
                onChange={(val) => setDraft((prev) => ({ ...prev, ward: val }))}
                placeholder="Chọn Phường / Xã"
              />
            </div>
          </div>
        </div>

        {/* ── 2. NHU CẦU & LOẠI BẤT ĐỘNG SẢN & NGUỒN TIN ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          
          {/* Nhu cầu */}
          <div>
            <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
              Nhu cầu giao dịch
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800">
              {[
                { key: "", label: "Tất cả" },
                { key: "buy", label: "Cần Mua" },
                { key: "rent", label: "Cho Thuê" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setDraft((prev) => ({ ...prev, listingType: item.key as any }))}
                  className={`py-1.5 rounded-lg text-[11.5px] font-bold transition-all ${
                    draft.listingType === item.key
                      ? "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loại BĐS */}
          <div>
            <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
              Loại bất động sản
            </label>
            <CustomSelect
              options={[
                { value: "", label: "Tất cả loại BĐS" },
                ...PROPERTY_TYPES_OPTIONS,
              ]}
              value={draft.propertyType}
              onChange={(val) => setDraft((prev) => ({ ...prev, propertyType: val }))}
              placeholder="Tất cả loại BĐS"
            />
          </div>

          {/* Nguồn tin / Người đăng */}
          <div>
            <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
              Người đăng tin
            </label>
            <CustomSelect
              options={[
                { value: "", label: "Tất cả nguồn tin" },
                { value: "owner", label: "Chính chủ (Ủy quyền)" },
                { value: "broker", label: "Môi giới chuyên nghiệp" },
                { value: "developer", label: "Chủ đầu tư dự án" },
              ]}
              value={draft.posterType}
              onChange={(val) => setDraft((prev) => ({ ...prev, posterType: val }))}
              placeholder="Chọn người đăng"
            />
          </div>
        </div>

        {/* ── 3. KHOẢNG GIÁ ── */}
        <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block">
            Khoảng giá giao dịch ({draft.listingType === "rent" ? "Cho Thuê" : "Cần Mua"})
          </label>

          <div className="flex flex-wrap gap-1.5">
            {(draft.listingType === "rent" ? PRICE_RANGES_RENT : PRICE_RANGES_BUY).map((range) => {
              const val = `${range.min}-${range.max}`;
              const isSelected = draft.priceRange === val;
              return (
                <button
                  key={range.label}
                  onClick={() => setDraft((prev) => ({ ...prev, priceRange: isSelected ? "" : val }))}
                  className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all border ${
                    isSelected
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white shadow-xs"
                      : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200/80 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 4. THÔNG SỐ & TIỆN ÍCH ── */}
        <div className="space-y-4 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Số phòng ngủ */}
            <div>
              <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                Số phòng ngủ
              </label>
              <div className="flex rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1 border border-zinc-200/60 dark:border-zinc-700/60">
                {["", "1", "2", "3", "4+"].map((bed) => (
                  <button
                    key={bed}
                    onClick={() => setDraft((prev) => ({ ...prev, bedrooms: bed }))}
                    className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                      draft.bedrooms === bed
                        ? "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    {bed === "" ? "Tất cả" : `${bed} PN`}
                  </button>
                ))}
              </div>
            </div>

            {/* Hướng nhà */}
            <div>
              <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                Hướng nhà
              </label>
              <CustomSelect
                options={[
                  { value: "", label: "Tất cả các hướng" },
                  { value: "Đông", label: "Đông" },
                  { value: "Tây", label: "Tây" },
                  { value: "Nam", label: "Nam" },
                  { value: "Bắc", label: "Bắc" },
                  { value: "Đông Nam", label: "Đông Nam" },
                  { value: "Tây Nam", label: "Tây Nam" },
                  { value: "Đông Bắc", label: "Đông Bắc" },
                  { value: "Tây Bắc", label: "Tây Bắc" },
                ]}
                value={draft.direction}
                onChange={(val) => setDraft((prev) => ({ ...prev, direction: val }))}
                placeholder="Chọn hướng nhà"
              />
            </div>
          </div>

          {/* Tiện ích nổi bật */}
          <div>
            <label className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
              Tiện ích nổi bật
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_AMENITIES.map((am) => {
                const sel = draft.amenities.includes(am);
                return (
                  <button
                    key={am}
                    onClick={() => toggleAmenity(am)}
                    className={`px-3 py-1.5 rounded-xl text-[11.5px] font-medium border transition-all ${
                      sel
                        ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white font-bold shadow-xs"
                        : "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400"
                    }`}
                  >
                    {am}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Modal Footer: Action Button "Xem X kết quả" */}
      <DialogFooter>
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] text-zinc-500 dark:text-zinc-400 font-medium">
            Tìm thấy <strong className="text-zinc-900 dark:text-white font-extrabold">{filteredCount}</strong> bất động sản
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              onApplyFilters(draft);
              onOpenChange(false);
            }}
            className="rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-extrabold px-6 h-11 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-[13.5px]"
          >
            <Search className="w-4 h-4" />
            <span>Xem {filteredCount} kết quả</span>
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};
