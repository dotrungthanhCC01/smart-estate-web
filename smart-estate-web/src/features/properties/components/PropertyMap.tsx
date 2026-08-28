import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { Star, MapPin, Bed, Bath, Maximize2, ExternalLink, GitCompare, Heart, X } from "lucide-react";
import type { Property } from "@/features/properties/data/mockProperties";
import { VIETNAM_CITIES } from "@/features/properties/data/vietnamLocations";

// Fix Leaflet default marker icons for Vite
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Helper component to dynamically fly map view bounds / zoom
const MapController = ({
  center,
  zoom,
  bounds,
}: {
  center: [number, number];
  zoom: number;
  bounds?: [number, number][];
}) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length > 0) {
      const leafletBounds = L.latLngBounds(bounds.map(([lat, lng]) => [lat, lng]));
      map.flyToBounds(leafletBounds, { padding: [40, 40], duration: 1.2 });
    } else {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, bounds, map]);

  return null;
};

/**
 * Price Pill Marker — zinc-themed, matches the web's dark design system.
 * Default: dark zinc-900 pill (matches badge style on cards).
 * Selected: white pill with dark text + glow ring.
 */
const createPricePillIcon = (priceDisplay: string, isSelected: boolean) => {
  const pillBg    = isSelected ? "#ffffff" : "#18181b";
  const pillColor = isSelected ? "#18181b" : "#ffffff";
  const pillShadow = isSelected
    ? "0 4px 20px rgba(0,0,0,0.25), 0 0 0 3px rgba(255,255,255,0.8)"
    : "0 4px 14px rgba(0,0,0,0.45)";
  const pointerBg = isSelected ? "#ffffff" : "#18181b";
  const transform = isSelected ? "scale(1.15)" : "scale(1)";

  return L.divIcon({
    className: "custom-map-price-pill-marker",
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;transform:${transform};transition:transform 0.2s cubic-bezier(.22,.68,0,1.2);">
        <div style="
          background:${pillBg};
          color:${pillColor};
          padding:5px 11px;
          border-radius:20px;
          font-size:12px;
          font-weight:800;
          white-space:nowrap;
          box-shadow:${pillShadow};
          letter-spacing:0.01em;
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
          line-height:1.3;
          border: ${isSelected ? "2px solid #18181b" : "none"};
        ">
          ${priceDisplay}
        </div>
        <div style="
          width:8px;height:8px;
          background:${pointerBg};
          transform:rotate(45deg);
          margin-top:-4px;
          box-shadow:1px 1px 3px rgba(0,0,0,0.25);
        "></div>
      </div>
    `,
    iconSize: [88, 38],
    iconAnchor: [44, 38],
  });
};

interface PropertyMapProps {
  properties: Property[];
  selectedCity?: string;
  selectedDistrict?: string;
  hoveredPropertyId?: string | null;
  onSelectProperty?: (id: string | null) => void;
}

// Helper button to close active Leaflet popup natively
const PopupCloseButton = () => {
  const map = useMap();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        map.closePopup();
      }}
      className="w-5.5 h-5.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-center shadow-md text-zinc-700 dark:text-zinc-200 hover:bg-[#17181B] hover:text-white dark:hover:bg-rose-500 dark:hover:text-white transition-colors"
      title="Đóng popup"
    >
      <X className="w-2.5 h-2.5" />
    </button>
  );
};

export const PropertyMap = ({
  properties,
  selectedCity,
  selectedDistrict,
  hoveredPropertyId,
  onSelectProperty,
}: PropertyMapProps) => {
  // Determine map center and active boundary polygon
  const { center, zoom, boundsPolygon, activeLocationName } = useMemo(() => {
    // Default View: Full Vietnam Map (Image 2)
    let targetCenter: [number, number] = [16.037, 107.965];
    let targetZoom = 6;
    let polygon: [number, number][] | undefined = undefined;
    let locationLabel = "Bản đồ bất động sản Việt Nam (Toàn Quốc)";

    if (selectedCity) {
      const cityObj = VIETNAM_CITIES.find(
        (c) => c.name.toLowerCase() === selectedCity.toLowerCase()
      );
      if (cityObj) {
        targetCenter = cityObj.center;
        targetZoom = cityObj.zoom;
        polygon = cityObj.bounds;
        locationLabel = `Thành phố ${cityObj.name}`;

        if (selectedDistrict) {
          const distObj = cityObj.districts.find(
            (d) => d.name.toLowerCase() === selectedDistrict.toLowerCase()
          );
          if (distObj) {
            targetCenter = distObj.center;
            targetZoom = 14;
            polygon = distObj.bounds;
            locationLabel = `${distObj.name}, ${cityObj.name}`;
          }
        }
      }
    }

    return {
      center: targetCenter,
      zoom: targetZoom,
      boundsPolygon: polygon,
      activeLocationName: locationLabel,
    };
  }, [selectedCity, selectedDistrict]);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-md bg-[#e8e0d5] dark:bg-zinc-900">

      {/* ── Global Leaflet style overrides — hide watermarks ── */}
      <style>{`
        /* Popup chrome */
        .custom-leaflet-popup .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 20px !important;
          overflow: hidden !important;
          border: none !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2) !important;
          background: transparent !important;
        }
        .custom-leaflet-popup .leaflet-popup-content {
          margin: 0 !important;
          width: 195px !important;
        }
        .custom-leaflet-popup .leaflet-popup-tip-container,
        .custom-leaflet-popup .leaflet-popup-close-button { display: none !important; }
        /* Force Leaflet links to inherit web theme text colors instead of default blue */
        .leaflet-container a {
          color: inherit !important;
          text-decoration: none !important;
        }
        /* Hide all Leaflet attribution / watermark */
        .leaflet-control-attribution { display: none !important; }
        /* Style zoom control to match design */
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
          border-radius: 12px !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          background: rgba(255,255,255,0.95) !important;
          color: #18181b !important;
          border: none !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
        }
        .leaflet-control-zoom a:hover {
          background: #18181b !important;
          color: #fff !important;
        }
      `}</style>

      {/* Location Badge — bottom-left to avoid zoom controls */}
      <div className="absolute bottom-4 left-3 z-[400] pointer-events-none select-none bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-800 dark:text-zinc-100 shadow-sm flex items-center gap-1.5">
        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
        <span>{activeLocationName}</span>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
        minZoom={5}
        maxBounds={[[-12, 90], [28, 130]]}
        maxBoundsViscosity={0.9}
        attributionControl={false}
        zoomControl={true}
      >
        {/* Esri World Street Map — clean, no watermark, works globally */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
        />

        <MapController center={center} zoom={zoom} bounds={boundsPolygon} />

        {/* Highlight Boundary Polygon when city or district is selected (Image 3) */}
        {boundsPolygon && (
          <Polygon
            positions={boundsPolygon}
            pathOptions={{
              fillColor: "#18181b",
              fillOpacity: 0.06,
              color: "#18181b",
              weight: 2.5,
              dashArray: "5, 5",
            }}
          />
        )}

        {/* Render Price Pill Markers for all matching properties (Image 2 & Image 3) */}
        {properties.map((prop) => {
          const isSelected = hoveredPropertyId === prop.id;
          return (
            <Marker
              key={prop.id}
              position={[prop.lat, prop.lng]}
              icon={createPricePillIcon(prop.priceDisplay, isSelected)}
              eventHandlers={{
                click: () => onSelectProperty?.(isSelected ? null : prop.id),
              }}
            >
              <Popup
                className="custom-leaflet-popup shadow-2xl rounded-2xl overflow-hidden p-0 border-none"
                eventHandlers={{
                  remove: () => {
                    onSelectProperty?.(null);
                  },
                }}
              >
                <div className="w-[195px] bg-white dark:bg-[#151518] rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-900 dark:text-white shadow-xl">
                  {/* Image Banner */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={prop.thumbnailUrl}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Top Left Badge */}
                    <div className="absolute top-1.5 left-1.5 z-10">
                      <span className="px-1.5 py-0.5 rounded-md text-[8.5px] font-bold uppercase bg-zinc-900/85 text-white backdrop-blur-md">
                        {prop.listingType === "buy" ? "Cần bán" : "Cho thuê"}
                      </span>
                    </div>

                    {/* Top Right Actions: Favorite + Close (X) */}
                    <div className="absolute top-1.5 right-1.5 flex items-center gap-1 z-10">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="w-5.5 h-5.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-center shadow-md text-zinc-600 dark:text-zinc-300"
                        title="Yêu thích"
                      >
                        <Heart className="w-2.5 h-2.5" />
                      </button>
                      <PopupCloseButton />
                    </div>
                  </div>

                  {/* Content Area — Mini Card */}
                  <div className="flex flex-col p-2 gap-1.5">
                    {/* Specs bar (Top of content) */}
                    <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[10px] font-medium border-b border-zinc-100 dark:border-zinc-800/80 pb-1">
                      {prop.bedrooms > 0 && (
                        <span className="flex items-center gap-0.5">
                          <Bed className="w-3 h-3 text-zinc-600 dark:text-zinc-300" />
                          {prop.bedrooms} PN
                        </span>
                      )}
                      {prop.bathrooms > 0 && (
                        <span className="flex items-center gap-0.5">
                          <Bath className="w-3 h-3 text-zinc-600 dark:text-zinc-300" />
                          {prop.bathrooms} WC
                        </span>
                      )}
                      <span className="flex items-center gap-0.5 ml-auto">
                        <Maximize2 className="w-3 h-3 text-zinc-600 dark:text-zinc-300" />
                        {prop.area} m²
                      </span>
                    </div>

                    {/* Title + Location */}
                    <div>
                      <Link
                        to={`/properties/${prop.id}`}
                        className="text-[11.5px] font-bold text-zinc-900 dark:text-white line-clamp-1 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors block !text-zinc-900 dark:!text-white leading-tight"
                      >
                        {prop.title}
                      </Link>
                      <div className="flex items-center gap-0.5 text-zinc-400 text-[10px] mt-0.5">
                        <MapPin className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate">{prop.district}, {prop.city}</span>
                      </div>
                    </div>

                    {/* Price & Rating */}
                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-[14px] font-black text-zinc-950 dark:text-white tracking-tight">
                        {prop.priceDisplay}
                      </span>

                      <div className="flex items-center gap-0.5 bg-zinc-50 dark:bg-zinc-800/60 px-1 py-0.5 rounded border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold text-zinc-800 dark:text-zinc-200">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span>{prop.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/properties/${prop.id}`}
                      className="mt-0.5 w-full flex items-center justify-center gap-1 py-1 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[10.5px] font-extrabold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs active:scale-[0.99] !text-white dark:!text-zinc-950"
                    >
                      <span>Xem chi tiết</span>
                      <ExternalLink className="w-2.5 h-2.5 text-white dark:text-zinc-950" />
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
