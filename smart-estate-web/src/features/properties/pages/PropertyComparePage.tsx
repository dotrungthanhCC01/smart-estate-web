import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Star,
  CheckCircle2,
  XCircle,
  GitCompare,
  Home,
  BarChart3,
  Sparkles,
} from "lucide-react";
import {
  MOCK_PROPERTIES,
  type Property,
} from "@/features/properties/data/mockProperties";

// ─── Row definitions ─────────────────────────────────────────────────────────
const COMPARE_ROWS: {
  key: string;
  label: string;
  render: (p: Property) => React.ReactNode;
}[] = [
  {
    key: "type",
    label: "Loại BĐS",
    render: (p) =>
      p.propertyType === "apartment" ? "Căn hộ"
      : p.propertyType === "villa" ? "Biệt thự"
      : p.propertyType === "student_room" ? "Trọ / Studio"
      : p.propertyType === "house" ? "Nhà phố"
      : p.propertyType,
  },
  {
    key: "listing",
    label: "Hình thức",
    render: (p) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-bold border ${
        p.listingType === "buy"
          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700"
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700"
      }`}>
        {p.listingType === "buy" ? "Cần bán" : "Cho thuê"}
      </span>
    ),
  },
  {
    key: "price",
    label: "Giá",
    render: (p) => (
      <span className="text-[17px] font-black text-zinc-900 dark:text-white">{p.priceDisplay}</span>
    ),
  },
  {
    key: "area",
    label: "Diện tích",
    render: (p) => (
      <span className="flex items-center gap-1.5 font-semibold">
        <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-800 dark:text-zinc-200">{p.area} m²</span>
      </span>
    ),
  },
  {
    key: "bedrooms",
    label: "Phòng ngủ",
    render: (p) => (
      <span className="flex items-center gap-1.5 font-semibold">
        <Bed className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-800 dark:text-zinc-200">
          {p.bedrooms > 0 ? `${p.bedrooms} phòng` : "Studio"}
        </span>
      </span>
    ),
  },
  {
    key: "bathrooms",
    label: "Phòng tắm",
    render: (p) => (
      <span className="flex items-center gap-1.5 font-semibold">
        <Bath className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-800 dark:text-zinc-200">{p.bathrooms} phòng</span>
      </span>
    ),
  },
  {
    key: "address",
    label: "Địa chỉ",
    render: (p) => (
      <span className="flex items-start gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
        <span className="text-[12.5px] text-zinc-600 dark:text-zinc-300 leading-relaxed">{p.district}, {p.city}</span>
      </span>
    ),
  },
  {
    key: "rating",
    label: "Đánh giá",
    render: (p) => (
      <span className="flex items-center gap-1.5">
        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        <span className="font-black text-zinc-900 dark:text-white text-[15px]">{p.rating.toFixed(1)}</span>
        <span className="text-[11.5px] text-zinc-400">/5.0</span>
      </span>
    ),
  },
  {
    key: "posterType",
    label: "Nguồn đăng",
    render: (p) => (
      <span className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">
        {p.posterType === "owner" ? "Chính chủ" : p.posterType === "broker" ? "Môi giới" : "Chủ đầu tư"}
      </span>
    ),
  },
  {
    key: "isNew",
    label: "Tin mới",
    render: (p) =>
      p.isNew ? (
        <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-4 h-4" /> Có
        </span>
      ) : (
        <span className="flex items-center gap-1 text-[12px] font-bold text-zinc-400">
          <XCircle className="w-4 h-4" /> Không
        </span>
      ),
  },
];

export const PropertyComparePage = () => {
  const [searchParams] = useSearchParams();
  const ids = (searchParams.get("ids") || "").split(",").filter(Boolean);

  const properties = useMemo(
    () =>
      ids
        .map((id) => MOCK_PROPERTIES.find((p) => p.id === id))
        .filter(Boolean) as Property[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ids.join(",")]
  );

  // Empty state
  if (properties.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center shadow-xs">
          <GitCompare className="w-9 h-9 text-zinc-400" />
        </div>
        <div>
          <h2 className="text-[20px] font-extrabold text-zinc-900 dark:text-white mb-2">
            Chưa đủ BĐS để so sánh
          </h2>
          <p className="text-zinc-400 text-[13.5px] max-w-sm leading-relaxed">
            Vui lòng chọn ít nhất 2 bất động sản từ danh sách để tiến hành so sánh.
          </p>
        </div>
        <Link
          to="/properties"
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-[13.5px] hover:opacity-90 transition-opacity shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách BĐS
        </Link>
      </div>
    );
  }

  const bestPrice = Math.min(...properties.map((p) => p.price));
  const bestArea = Math.max(...properties.map((p) => p.area));
  const bestRating = Math.max(...properties.map((p) => p.rating));

  const colClass = properties.length === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className="w-full pb-16 space-y-5">

      {/* ── Header ── */}
      <div className="flex items-center gap-4">
        <Link
          to="/properties"
          className="w-10 h-10 rounded-2xl bg-white dark:bg-[#151518] border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4.5 h-4.5 text-zinc-700 dark:text-zinc-300" />
        </Link>
        <div>
          <h1 className="text-[20px] font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-zinc-500" />
            So sánh bất động sản
          </h1>
          <p className="text-[13px] text-zinc-400 mt-0.5">
            Đang so sánh {properties.length} bất động sản
          </p>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className={`grid ${colClass} gap-4`}>
        {properties.map((prop) => (
          <div
            key={prop.id}
            className="bg-white dark:bg-[#151518] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img
                src={prop.thumbnailUrl}
                alt={prop.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-zinc-900/85 text-white backdrop-blur-md">
                  {prop.listingType === "buy" ? "Cần bán" : "Cho thuê"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h3 className="text-[14px] font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug">
                {prop.title}
              </h3>
              <div className="flex items-center gap-1 text-zinc-400 text-[12px]">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{prop.district}, {prop.city}</span>
              </div>

              {/* Specs */}
              <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 text-[12px] font-medium py-2 border-y border-zinc-100 dark:border-zinc-800/80">
                {prop.bedrooms > 0 && (
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5" />
                    {prop.bedrooms} PN
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5" />
                  {prop.bathrooms} WC
                </span>
                <span className="flex items-center gap-1 ml-auto">
                  <Maximize2 className="w-3.5 h-3.5" />
                  {prop.area} m²
                </span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-[20px] font-black text-zinc-900 dark:text-white">{prop.priceDisplay}</span>
                <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-800/60 px-2 py-1 rounded-md border border-zinc-100 dark:border-zinc-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[12px] font-bold text-zinc-800 dark:text-zinc-200">{prop.rating.toFixed(1)}</span>
                </div>
              </div>

              <Link
                to={`/properties/${prop.id}`}
                className="mt-1 w-full py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[12.5px] font-bold text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5" />
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── Detail Comparison Table ── */}
      <div className="bg-white dark:bg-[#151518] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
          <BarChart3 className="w-4.5 h-4.5 text-zinc-500" />
          <h2 className="text-[15px] font-extrabold text-zinc-900 dark:text-white">
            Bảng so sánh chi tiết
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/40 border-b border-zinc-100 dark:border-zinc-800/80">
                <th className="text-left px-5 py-3 text-[11px] font-bold text-zinc-400 uppercase tracking-widest w-32 min-w-[110px]">
                  Tiêu chí
                </th>
                {properties.map((prop) => (
                  <th key={prop.id} className="px-5 py-3 text-left">
                    <span className="text-[12.5px] font-extrabold text-zinc-900 dark:text-white line-clamp-1">
                      {prop.title}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, idx) => (
                <tr
                  key={row.key}
                  className={`border-b border-zinc-50 dark:border-zinc-800/60 ${
                    idx % 2 === 1 ? "bg-zinc-50/60 dark:bg-zinc-800/20" : ""
                  }`}
                >
                  <td className="px-5 py-3.5 text-[12px] font-bold text-zinc-400 whitespace-nowrap">
                    {row.label}
                  </td>
                  {properties.map((prop) => {
                    const isBest =
                      (row.key === "price" && prop.price === bestPrice) ||
                      (row.key === "area" && prop.area === bestArea) ||
                      (row.key === "rating" && prop.rating === bestRating);

                    return (
                      <td
                        key={prop.id}
                        className={`px-5 py-3.5 ${isBest ? "bg-zinc-950/[0.04] dark:bg-white/[0.04]" : ""}`}
                      >
                        {isBest && (
                          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-full mb-1.5">
                            <Sparkles className="w-2.5 h-2.5" />
                            Tốt nhất
                          </div>
                        )}
                        <div>{row.render(prop)}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Amenities ── */}
      <div className="bg-white dark:bg-[#151518] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
          <CheckCircle2 className="w-4.5 h-4.5 text-zinc-500" />
          <h2 className="text-[15px] font-extrabold text-zinc-900 dark:text-white">
            Tiện ích
          </h2>
        </div>
        <div className={`grid ${colClass} divide-x divide-zinc-100 dark:divide-zinc-800/60`}>
          {properties.map((prop) => (
            <div key={prop.id} className="px-5 py-4">
              <div className="text-[12px] font-extrabold text-zinc-900 dark:text-white mb-3 line-clamp-1">
                {prop.title}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {prop.amenities.length === 0 ? (
                  <span className="text-[12px] text-zinc-400">Chưa có thông tin</span>
                ) : (
                  prop.amenities.map((am) => (
                    <span
                      key={am}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80"
                    >
                      <CheckCircle2 className="w-3 h-3 text-zinc-500" />
                      {am}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
