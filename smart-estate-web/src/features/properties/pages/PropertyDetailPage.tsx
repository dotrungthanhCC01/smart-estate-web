import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  CalendarDays,
  CheckCircle,
  Star,
  ArrowLeft,
  Car,
  ShieldCheck,
  Wifi,
  Eye,
  X,
  Dumbbell,
  Waves,
  Armchair,
  Train,
  Lock,
  TreePine,
  Flame,
  Calculator,
  Grid,
  Check,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MOCK_PROPERTIES, type Property } from "@/features/properties/data/mockProperties";
import { Button } from "@/components/ui/button";

// Fix Leaflet marker icons in Vite
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Helper map icons for amenities
const getAmenityIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("bơi") || n.includes("nước") || n.includes("hồ")) return Waves;
  if (n.includes("gym") || n.includes("yoga") || n.includes("thể thao")) return Dumbbell;
  if (n.includes("wifi") || n.includes("internet") || n.includes("mạng")) return Wifi;
  if (n.includes("nội thất") || n.includes("sofa")) return Armchair;
  if (n.includes("metro") || n.includes("xe buýt") || n.includes("trạm")) return Train;
  if (n.includes("bảo vệ") || n.includes("camera") || n.includes("an ninh")) return ShieldCheck;
  if (n.includes("khóa") || n.includes("smart") || n.includes("vân tay")) return Lock;
  if (n.includes("vườn") || n.includes("công viên") || n.includes("sinh thái")) return TreePine;
  if (n.includes("bbq") || n.includes("nướng") || n.includes("onsen")) return Flame;
  if (n.includes("view") || n.includes("tầm nhìn")) return Eye;
  return CheckCircle;
};

export const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [scheduleSent, setScheduleSent] = useState(false);

  // Lightbox modal state for room images
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string } | null>(null);

  // Mortgage Calculator State
  const [loanYears, setLoanYears] = useState(15);
  const [loanPercent, setLoanPercent] = useState(70);

  const property = MOCK_PROPERTIES.find((p) => p.id === id) ?? MOCK_PROPERTIES[0];
  const similarProperties = MOCK_PROPERTIES.filter((p) => p.id !== property.id).slice(0, 3);

  const allImages = property.images.length > 0 ? property.images : [property.thumbnailUrl];

  // Mortgage calculation
  const propertyPriceBillion = property.listingType === "buy" ? property.price : 3.5;
  const loanAmount = (propertyPriceBillion * (loanPercent / 100)) * 1000; // in million VND
  const monthlyRate = 0.08 / 12; // 8% / year
  const totalMonths = loanYears * 12;
  const monthlyPayment = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const openLightbox = (url: string, title: string) => {
    setLightboxImg({ url, title });
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0c0c0e] text-zinc-900 dark:text-zinc-100 pt-2 pb-24">

      {/* ── Top Breadcrumbs Bar ── */}
      <div className="bg-white/90 dark:bg-[#151518]/90 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl px-6 py-3 sticky top-2 z-30 shadow-xs mb-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13px] text-zinc-400">
            <Link
              to="/home"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1.5 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Trang chủ
            </Link>
            <span>/</span>
            <Link
              to="/properties"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors font-medium"
            >
              Bất động sản
            </Link>
            <span>/</span>
            <span className="text-zinc-700 dark:text-zinc-200 font-semibold truncate max-w-[240px] sm:max-w-md">
              {property.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked((v) => !v)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                liked
                  ? "border-rose-300 bg-rose-50 text-rose-500 dark:bg-rose-950/30"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-rose-500"
              }`}
            >
              <Heart className={`w-4.5 h-4.5 ${liked ? "fill-rose-500" : ""}`} />
            </button>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Đã sao chép liên kết BĐS!");
                }
              }}
              className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition-all"
              title="Chia sẻ"
            >
              <Share2 className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 pt-6">

        {/* ══════════════════════════════════════════════════════════
            GRID GALLERY (Airbnb / Booking Professional Style - Sắc nét & Bao quát)
        ══════════════════════════════════════════════════════════ */}
        <div className="relative rounded-3xl overflow-hidden mb-8 shadow-md grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[420px] bg-zinc-900">
          {/* Main Large Image (Left 2 columns) */}
          <div
            onClick={() => openLightbox(allImages[0], property.title)}
            className="md:col-span-2 relative h-full group overflow-hidden cursor-pointer bg-zinc-800"
          >
            <img
              src={allImages[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          </div>

          {/* Sub Images Grid (Right 2 columns) */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
            {allImages.slice(1, 5).map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(imgUrl, `${property.title} - Ảnh ${idx + 2}`)}
                className="relative h-full group overflow-hidden cursor-pointer bg-zinc-800"
              >
                <img
                  src={imgUrl}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                {/* Show View All button on 4th sub image */}
                {idx === 3 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(allImages[0], property.title);
                    }}
                    className="absolute inset-0 bg-black/50 hover:bg-black/70 backdrop-blur-xs flex items-center justify-center gap-2 text-white font-bold text-[13px] transition-all"
                  >
                    <Grid className="w-4 h-4" />
                    <span>Xem tất cả ảnh ({allImages.length})</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Floating trigger for mobile */}
          <button
            onClick={() => openLightbox(allImages[0], property.title)}
            className="md:hidden absolute bottom-4 right-4 px-4 py-2 rounded-2xl bg-black/70 text-white backdrop-blur-md text-[12px] font-bold shadow-lg flex items-center gap-1.5"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Xem {allImages.length} ảnh</span>
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════
            MAIN CONTENT AREA
        ══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── Left Column ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">

            {/* Title & Rating Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                  {property.title}
                </h1>

                {/* Rating Badge */}
                <div className="flex items-center gap-2 bg-white dark:bg-[#151518] px-3.5 py-1.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
                  <span className="text-[16px] font-black text-zinc-900 dark:text-white">
                    {property.rating.toFixed(1)}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[12px] text-zinc-400 font-medium">
                    ({property.reviewCount} đánh giá)
                  </span>
                </div>
              </div>

              {/* Address Pin */}
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-[13.5px]">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{property.address}</span>
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="bg-white dark:bg-[#151518] rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
              <h2 className="text-[15.5px] font-bold text-zinc-900 dark:text-white mb-3">Mô tả bất động sản</h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-[14px] leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Room Thumbnails (Click to view Lightbox) */}
            {property.roomImages && property.roomImages.length > 0 && (
              <div>
                <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-3">
                  Không gian thực tế các phòng
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {property.roomImages.map((room) => (
                    <div
                      key={room.name}
                      onClick={() => openLightbox(room.url, room.name)}
                      className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 cursor-pointer shadow-xs hover:shadow-md transition-all"
                    >
                      <img
                        src={room.url}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-3">
                        <span className="text-[12px] font-bold text-white leading-tight">
                          {room.name}
                        </span>
                        <Eye className="w-3.5 h-3.5 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Grid */}
            <div className="bg-white dark:bg-[#151518] rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
              <h2 className="text-[15.5px] font-bold text-zinc-900 dark:text-white mb-4">
                Tiện ích &amp; Đặc quyền
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 text-[13px] font-semibold text-zinc-800 dark:text-zinc-200"
                    >
                      <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Map View */}
            <div className="bg-white dark:bg-[#151518] rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
              <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4.5 h-4.5 text-zinc-900 dark:text-white" />
                  <h2 className="text-[15.5px] font-bold text-zinc-900 dark:text-white">
                    Vị trí thực tế trên bản đồ
                  </h2>
                </div>
                <span className="text-[12px] text-zinc-400">{property.city}</span>
              </div>

              <div className="h-[320px] w-full">
                <MapContainer
                  center={[property.lat, property.lng]}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="w-full h-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker position={[property.lat, property.lng]}>
                    <Popup>
                      <div className="text-center font-sans">
                        <p className="font-bold text-[13px] text-zinc-900">{property.title}</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{property.address}</p>
                        <p className="font-extrabold text-[13px] text-zinc-900 mt-1">{property.priceDisplay}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Mortgage Loan Calculator */}
            <div className="bg-white dark:bg-[#151518] rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
              <div className="flex items-center gap-2 mb-5">
                <Calculator className="w-5 h-5 text-zinc-900 dark:text-white" />
                <h2 className="text-[15.5px] font-extrabold text-zinc-900 dark:text-white">
                  Bảng dự toán tài chính &amp; Vay mua nhà
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[12.5px] font-semibold mb-1">
                      <span className="text-zinc-500">Tỷ lệ vay:</span>
                      <span className="font-bold text-zinc-900 dark:text-white">{loanPercent}% ({((propertyPriceBillion * loanPercent) / 100).toFixed(1)} Tỷ)</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="80"
                      step="5"
                      value={loanPercent}
                      onChange={(e) => setLoanPercent(Number(e.target.value))}
                      className="w-full accent-zinc-900 dark:accent-white cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[12.5px] font-semibold mb-1">
                      <span className="text-zinc-500">Thời hạn vay:</span>
                      <span className="font-bold text-zinc-900 dark:text-white">{loanYears} năm</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="1"
                      value={loanYears}
                      onChange={(e) => setLoanYears(Number(e.target.value))}
                      className="w-full accent-zinc-900 dark:accent-white cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Ước tính trả góp hàng tháng
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
                    ~{monthlyPayment.toLocaleString()} <span className="text-xs font-normal">Tr/tháng</span>
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    *Giả định lãi suất 8.0%/năm
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Brief Information Box ── */}
          <div className="w-full lg:w-[360px] shrink-0 sticky top-[138px]">
            <div className="bg-white dark:bg-[#151518] rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl flex flex-col gap-5">

              {/* Brief Information Header */}
              <div>
                <p className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2">
                  Brief Information
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={property.agentAvatar}
                    alt={property.agentName}
                    className="w-12 h-12 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700"
                  />
                  <div>
                    <p className="text-[14.5px] font-extrabold text-zinc-900 dark:text-white leading-tight">
                      {property.agentName}
                    </p>
                    <p className="text-[12px] text-zinc-400">{property.agentTitle}</p>
                  </div>
                </div>
              </div>

              {/* 4 Specs Badges (Bed, Bath, Car, Sqft) */}
              <div className="grid grid-cols-4 gap-2 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Bed className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                  <span className="text-[12.5px] font-extrabold text-zinc-900 dark:text-white">
                    {property.bedrooms}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Bath className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                  <span className="text-[12.5px] font-extrabold text-zinc-900 dark:text-white">
                    {property.bathrooms}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Car className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                  <span className="text-[12.5px] font-extrabold text-zinc-900 dark:text-white">
                    {property.parking || 1}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Maximize2 className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                  <span className="text-[12.5px] font-extrabold text-zinc-900 dark:text-white">
                    {property.area} m²
                  </span>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60">
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-400">
                    {property.listingType === "buy" ? "Giá niêm yết" : "Giá thuê / tháng"}
                  </p>
                  <p className="text-[19px] font-black text-zinc-900 dark:text-white mt-0.5">
                    {property.priceDisplay}
                  </p>
                </div>
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-400">
                    {property.listingType === "buy" ? "Pháp lý" : "Đặt cọc"}
                  </p>
                  <p className="text-[13.5px] font-bold text-zinc-800 dark:text-zinc-200 mt-1 truncate">
                    {property.legalStatus || "2 Tháng tiền cọc"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5">
                <Button
                  onClick={() => setShowPhone((v) => !v)}
                  size="lg"
                  className="rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-extrabold text-[14px] py-6 shadow-md"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {showPhone ? property.agentPhone : "Show contacts / Hiện SĐT"}
                </Button>

                <div className="flex gap-2">
                  <Link to="/dashboard/chat" className="flex-1">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full rounded-2xl border-zinc-200 dark:border-zinc-700 font-bold text-[13px] py-5 gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat trực tiếp
                    </Button>
                  </Link>

                  <Button
                    onClick={() => setScheduleSent(true)}
                    variant="outline"
                    size="lg"
                    className="flex-1 rounded-2xl border-zinc-200 dark:border-zinc-700 font-bold text-[13px] py-5 gap-1.5"
                  >
                    <CalendarDays className="w-4 h-4" />
                    Đặt lịch xem
                  </Button>
                </div>

                {scheduleSent && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[12.5px] font-semibold text-center flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4" />
                    Đã gửi yêu cầu hẹn lịch xem nhà thành công!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SIMILAR PROPERTIES SECTION
        ══════════════════════════════════════════════════════════ */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">
                  Đề xuất phù hợp
                </p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                  Bất động sản tương tự dành cho bạn
                </h2>
              </div>
              <Link to="/properties">
                <Button variant="outline" className="rounded-full text-[13px] font-bold">
                  Xem tất cả
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((sim) => (
                <Link
                  key={sim.id}
                  to={`/properties/${sim.id}`}
                  className="group flex flex-col bg-white dark:bg-[#151518] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={sim.thumbnailUrl}
                      alt={sim.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-zinc-900/80 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase backdrop-blur-md">
                      {sim.listingType === "buy" ? "Cần bán" : "Cho thuê"}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <p className="text-[18px] font-black text-zinc-900 dark:text-white">
                      {sim.priceDisplay}
                    </p>
                    <h3 className="text-[14.5px] font-bold text-zinc-800 dark:text-zinc-200 line-clamp-1">
                      {sim.title}
                    </h3>
                    <p className="text-[12px] text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{sim.district}, {sim.city}</span>
                    </p>
                    <div className="flex items-center gap-3 pt-2 mt-1 border-t border-zinc-100 dark:border-zinc-800 text-[12px] text-zinc-500">
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {sim.bedrooms} PN</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {sim.bathrooms} PT</span>
                      <span className="flex items-center gap-1 ml-auto"><Maximize2 className="w-3.5 h-3.5" /> {sim.area} m²</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════
          IMAGE LIGHTBOX MODAL
      ══════════════════════════════════════════════════════════ */}
      {lightboxOpen && lightboxImg && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 px-6 border-b border-zinc-800 text-white">
              <span className="font-bold text-[15px]">{lightboxImg.title}</span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={lightboxImg.url}
                alt={lightboxImg.title}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
