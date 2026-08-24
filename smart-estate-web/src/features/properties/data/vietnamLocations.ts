/**
/**
 * VIETNAM ECONOMIC REGIONS & ADMINISTRATIVE LOCATIONS DATA
 * Contains 3 major economic regions (North, Center, South),
 * province/city hierarchy, district/ward options, and map boundary polygons/coordinates.
 */

export interface LocationWard {
  name: string;
  code: string;
}

export interface LocationDistrict {
  name: string;
  code: string;
  center: [number, number]; // [lat, lng]
  bounds?: [number, number][]; // Polygon coordinates array
  wards: LocationWard[];
}

export interface LocationCity {
  name: string;
  code: string;
  region: "north" | "central" | "south";
  regionName: string;
  center: [number, number]; // [lat, lng]
  zoom: number;
  bounds?: [number, number][]; // Polygon boundary
  districts: LocationDistrict[];
}

export interface EconomicRegion {
  id: "north" | "central" | "south";
  name: string;
  icon: string;
  description: string;
  cities: string[];
}

export class EconomicRegionData {
  static REGIONS: EconomicRegion[] = [
    {
      id: "north",
      name: "Miền Bắc (Vùng Kinh Tế Trọng Điểm Bắc Bộ)",
      icon: "🏔️",
      description: "Thủ đô Hà Nội & các tỉnh công nghiệp Hải Phòng, Quảng Ninh, Bắc Ninh...",
      cities: ["Hà Nội", "Hải Phòng", "Quảng Ninh", "Bắc Ninh", "Hưng Yên", "Hải Dương", "Thái Nguyên"],
    },
    {
      id: "central",
      name: "Miền Trung (Duyên Hải Miền Trung & Du Lịch)",
      icon: "🏖️",
      description: "Trung tâm du lịch & đô thị biển Đà Nẵng, Nha Trang, Huế, Quảng Nam...",
      cities: ["Đà Nẵng", "Khánh Hòa", "Thừa Thiên Huế", "Quảng Nam", "Bình Định", "Nghệ An"],
    },
    {
      id: "south",
      name: "Miền Nam (Vùng Kinh Tế Trọng Điểm Nam Bộ)",
      icon: "🌴",
      description: "TP. Hồ Chí Minh & các thủ phủ công nghiệp Bình Dương, Đồng Nai, Cần Thơ...",
      cities: ["TP. Hồ Chí Minh", "Bình Dương", "Đồng Nai", "Bà Rịa - Vũng Tàu", "Cần Thơ", "Long An"],
    },
  ];
}

export const VIETNAM_CITIES: LocationCity[] = [
  // ─── 1. HÀ NỘI (MIỀN BẮC) ───────────────────────────────────────────────────
  {
    name: "Hà Nội",
    code: "HN",
    region: "north",
    regionName: "Miền Bắc",
    center: [21.0285, 105.8542],
    zoom: 12,
    bounds: [
      [21.1200, 105.7500],
      [21.1300, 105.9000],
      [21.0500, 105.9500],
      [20.9500, 105.9200],
      [20.9300, 105.7800],
      [20.9800, 105.7200],
      [21.0800, 105.7100],
      [21.1200, 105.7500],
    ],
    districts: [
      {
        name: "Thanh Xuân",
        code: "HN-TX",
        center: [20.9982, 105.8080],
        bounds: [
          [21.0080, 105.7950],
          [21.0100, 105.8200],
          [20.9950, 105.8280],
          [20.9850, 105.8150],
          [20.9880, 105.7980],
          [21.0080, 105.7950],
        ],
        wards: [
          { name: "Khương Đình", code: "KD" },
          { name: "Nhân Chính", code: "NC" },
          { name: "Thanh Xuân Trung", code: "TXT" },
          { name: "Thanh Xuân Bắc", code: "TXB" },
          { name: "Thượng Đình", code: "TD" },
          { name: "Khương Trung", code: "KT" },
        ],
      },
      {
        name: "Cầu Giấy",
        code: "HN-CG",
        center: [21.0369, 105.7831],
        bounds: [
          [21.0520, 105.7720],
          [21.0550, 105.7980],
          [21.0300, 105.8050],
          [21.0200, 105.7850],
          [21.0350, 105.7700],
          [21.0520, 105.7720],
        ],
        wards: [
          { name: "Dịch Vọng Hậu", code: "DVH" },
          { name: "Dịch Vọng", code: "DV" },
          { name: "Quan Hoa", code: "QH" },
          { name: "Nghĩa Tân", code: "NT" },
          { name: "Mai Dịch", code: "MD" },
          { name: "Trung Hòa", code: "TH" },
        ],
      },
      {
        name: "Nam Từ Liêm",
        code: "HN-NTL",
        center: [21.0135, 105.7640],
        bounds: [
          [21.0300, 105.7400],
          [21.0350, 105.7750],
          [21.0050, 105.7850],
          [20.9900, 105.7600],
          [21.0050, 105.7350],
          [21.0300, 105.7400],
        ],
        wards: [
          { name: "Mỹ Đình 1", code: "MD1" },
          { name: "Mỹ Đình 2", code: "MD2" },
          { name: "Mễ Trì", code: "MT" },
          { name: "Trung Văn", code: "TV" },
          { name: "Tây Mỗ", code: "TM" },
        ],
      },
      {
        name: "Hoàn Kiếm",
        code: "HN-HK",
        center: [21.0285, 105.8542],
        bounds: [
          [21.0400, 105.8450],
          [21.0420, 105.8620],
          [21.0200, 105.8650],
          [21.0180, 105.8480],
          [21.0400, 105.8450],
        ],
        wards: [
          { name: "Hàng Bạc", code: "HB" },
          { name: "Hàng Trống", code: "HT" },
          { name: "Tràng Tiền", code: "TT" },
          { name: "Phan Chu Trinh", code: "PCT" },
        ],
      },
      {
        name: "Văn Giang (Ecopark)",
        code: "HY-VG",
        center: [20.9697, 105.9358],
        bounds: [
          [20.9850, 105.9200],
          [20.9880, 105.9550],
          [20.9500, 105.9600],
          [20.9480, 105.9250],
          [20.9850, 105.9200],
        ],
        wards: [
          { name: "SwanLake Ecopark", code: "SLE" },
          { name: "Grand Park Ecopark", code: "GPE" },
          { name: "Cửu Cao", code: "CC" },
        ],
      },
    ],
  },

  // ─── 2. TP. HỒ CHÍ MINH (MIỀN NAM) ─────────────────────────────────────────
  {
    name: "TP. Hồ Chí Minh",
    code: "HCM",
    region: "south",
    regionName: "Miền Nam",
    center: [10.7769, 106.7009],
    zoom: 12,
    bounds: [
      [10.8900, 106.6000],
      [10.9000, 106.8200],
      [10.7300, 106.8500],
      [10.6800, 106.7000],
      [10.7000, 106.5500],
      [10.8900, 106.6000],
    ],
    districts: [
      {
        name: "Quận 1",
        code: "HCM-Q1",
        center: [10.7769, 106.7009],
        bounds: [
          [10.7890, 106.6900],
          [10.7920, 106.7080],
          [10.7700, 106.7120],
          [10.7620, 106.6920],
          [10.7890, 106.6900],
        ],
        wards: [
          { name: "Bến Nghé", code: "BN" },
          { name: "Bến Thành", code: "BT" },
          { name: "Tân Định", code: "TD" },
          { name: "Phạm Ngũ Lão", code: "PNL" },
          { name: "Đa Kao", code: "DK" },
        ],
      },
      {
        name: "Bình Thạnh",
        code: "HCM-BT",
        center: [10.7951, 106.7220],
        bounds: [
          [10.8200, 106.6980],
          [10.8220, 106.7350],
          [10.7850, 106.7300],
          [10.7820, 106.6950],
          [10.8200, 106.6980],
        ],
        wards: [
          { name: "Phường 22 (Landmark 81)", code: "P22" },
          { name: "Phường 25", code: "P25" },
          { name: "Phường 19", code: "P19" },
          { name: "Phường 27 (Thanh Đa)", code: "P27" },
        ],
      },
      {
        name: "Thành phố Thủ Đức",
        code: "HCM-TD",
        center: [10.8350, 106.7700],
        bounds: [
          [10.8900, 106.7300],
          [10.8950, 106.8400],
          [10.7600, 106.8500],
          [10.7620, 106.7200],
          [10.8900, 106.7300],
        ],
        wards: [
          { name: "Linh Trung (Làng Đại Học)", code: "LT" },
          { name: "Thảo Điền", code: "TĐi" },
          { name: "An Khánh (Thủ Thiêm)", code: "AK" },
          { name: "Long Thạnh Mỹ (Vinhomes)", code: "LTM" },
          { name: "Tăng Nhơn Phú A", code: "TNPA" },
        ],
      },
      {
        name: "Bình Tân",
        code: "HCM-BTN",
        center: [10.7400, 106.6000],
        bounds: [
          [10.7650, 106.5800],
          [10.7700, 106.6200],
          [10.7100, 106.6250],
          [10.7050, 106.5750],
          [10.7650, 106.5800],
        ],
        wards: [
          { name: "An Lạc (Akari City)", code: "AL" },
          { name: "Tân Tạo", code: "TT" },
          { name: "Bình Trị Đông", code: "BTD" },
        ],
      },
    ],
  },

  // ─── 3. ĐÀ NẴNG (MIỀN TRUNG) ──────────────────────────────────────────────
  {
    name: "Đà Nẵng",
    code: "DN",
    region: "central",
    regionName: "Miền Trung",
    center: [16.0544, 108.2022],
    zoom: 12,
    bounds: [
      [16.1200, 108.1300],
      [16.1300, 108.2700],
      [16.0000, 108.2800],
      [15.9800, 108.1500],
      [16.1200, 108.1300],
    ],
    districts: [
      {
        name: "Ngũ Hành Sơn",
        code: "DN-NHS",
        center: [16.0354, 108.2458],
        bounds: [
          [16.0600, 108.2350],
          [16.0620, 108.2600],
          [15.9850, 108.2750],
          [15.9800, 108.2450],
          [16.0600, 108.2350],
        ],
        wards: [
          { name: "Khuê Mỹ", code: "KM" },
          { name: "Mỹ An", code: "MA" },
          { name: "Hòa Hải", code: "HH" },
          { name: "Hòa Quý", code: "HQ" },
        ],
      },
      {
        name: "Hải Châu",
        code: "DN-HC",
        center: [16.0600, 108.2150],
        bounds: [
          [16.0800, 108.2050],
          [16.0820, 108.2280],
          [16.0350, 108.2300],
          [16.0320, 108.2080],
          [16.0800, 108.2050],
        ],
        wards: [
          { name: "Thạch Thang", code: "TT" },
          { name: "Phước Ninh", code: "PN" },
          { name: "Hòa Cường Bắc", code: "HCB" },
        ],
      },
      {
        name: "Sơn Trà",
        code: "DN-ST",
        center: [16.0900, 108.2450],
        bounds: [
          [16.1350, 108.2300],
          [16.1400, 108.2800],
          [16.0600, 108.2600],
          [16.0550, 108.2350],
          [16.1350, 108.2300],
        ],
        wards: [
          { name: "An Hải Bắc", code: "AHB" },
          { name: "An Hải Tây", code: "AHT" },
          { name: "Phước Mỹ", code: "PM" },
        ],
      },
    ],
  },

  // ─── 4. HẢI PHÒNG (MIỀN BẮC) ──────────────────────────────────────────────
  {
    name: "Hải Phòng",
    code: "HP",
    region: "north",
    regionName: "Miền Bắc",
    center: [20.8449, 106.6881],
    zoom: 12,
    districts: [
      {
        name: "Hồng Bàng",
        code: "HP-HB",
        center: [20.8650, 106.6750],
        wards: [{ name: "Minh Khai", code: "MK" }, { name: "Hoàng Văn Thụ", code: "HVT" }],
      },
      {
        name: "Lê Chân",
        code: "HP-LC",
        center: [20.8450, 106.6800],
        wards: [{ name: "An Biên", code: "AB" }, { name: "Cát Dài", code: "CD" }],
      },
    ],
  },

  // ─── 5. BÌNH DƯƠNG (MIỀN NAM) ──────────────────────────────────────────────
  {
    name: "Bình Dương",
    code: "BD",
    region: "south",
    regionName: "Miền Nam",
    center: [10.9804, 106.6519],
    zoom: 12,
    districts: [
      {
        name: "TP. Thủ Dầu Một",
        code: "BD-TDM",
        center: [10.9804, 106.6519],
        wards: [{ name: "Phú Hòa", code: "PH" }, { name: "Chánh Nghĩa", code: "CN" }],
      },
      {
        name: "TP. Dĩ An",
        code: "BD-DA",
        center: [10.9083, 106.7725],
        wards: [{ name: "Dĩ An", code: "DA" }, { name: "Tân Đông Hiệp", code: "TDH" }],
      },
    ],
  },

  // ─── 6. KHÁNH HÒA / NHA TRANG (MIỀN TRUNG) ────────────────────────────────
  {
    name: "Nha Trang",
    code: "NT",
    region: "central",
    regionName: "Miền Trung",
    center: [12.2388, 109.1967],
    zoom: 13,
    districts: [
      {
        name: "Nha Trang City",
        code: "NT-CT",
        center: [12.2388, 109.1967],
        wards: [{ name: "Lộc Thọ", code: "LT" }, { name: "Vĩnh Nguyên", code: "VN" }],
      },
    ],
  },
];

export const OTHER_PROVINCES = [
  "Quảng Ninh",
  "Bắc Ninh",
  "Hưng Yên",
  "Hải Dương",
  "Thừa Thiên Huế",
  "Quảng Nam",
  "Đồng Nai",
  "Bà Rịa - Vũng Tàu",
  "Cần Thơ",
  "Long An",
];
