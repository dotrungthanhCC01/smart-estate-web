import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { Star, MapPin, Bed, Bath, Maximize2, ExternalLink } from "lucide-react";
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
  onSelectProperty?: (id: string) => void;
}

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
    <div className="w-full h-[calc(100vh-140px)] sticky top-[100px] rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-md bg-[#F4F3F0] dark:bg-zinc-900 z-10">
      
      {/* Top Map Location Badge */}
      <div className="absolute top-4 left-4 z-[400] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 text-[12px] font-bold text-zinc-900 dark:text-zinc-100 shadow-sm flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
        <span>{activeLocationName}</span>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
                click: () => onSelectProperty?.(prop.id),
              }}
            >
              <Popup className="custom-leaflet-popup shadow-2xl rounded-2xl overflow-hidden p-0 border-none">
                <div className="w-64 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden text-zinc-900 dark:text-white p-1">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                    <img
                      src={prop.thumbnailUrl}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-zinc-900/85 text-white backdrop-blur-md">
                      {prop.listingType === "buy" ? "Cần bán" : "Cho thuê"}
                    </span>
                  </div>
                  
                  <div className="p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[16px] font-black text-zinc-900 dark:text-white">
                        {prop.priceDisplay}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{prop.rating}</span>
                      </div>
                    </div>

                    <h4 className="text-[13px] font-bold line-clamp-1">
                      {prop.title}
                    </h4>
                    
                    <p className="text-[11px] text-zinc-400 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>{prop.address}</span>
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
                      <span>{prop.bedrooms} PN</span>
                      <span>•</span>
                      <span>{prop.bathrooms} WC</span>
                      <span>•</span>
                      <span>{prop.area} m²</span>
                    </div>

                    <Link
                      to={`/properties/${prop.id}`}
                      className="mt-2 w-full flex items-center justify-center gap-1 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-[12px] font-bold hover:opacity-90 transition-opacity"
                    >
                      <span>Xem chi tiết</span>
                      <ExternalLink className="w-3.5 h-3.5" />
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
