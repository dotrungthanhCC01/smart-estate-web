// ─── Mock Property Data ────────────────────────────────────────────────────────
// Centralized mock data matching diverse customer segments (Students, Families, Investors, Luxury)

export type PropertyType = "apartment" | "house" | "villa" | "land" | "office" | "shophouse" | "student_room";
export type ListingType = "buy" | "rent";
export type PropertyStatus = "active" | "pending" | "sold" | "rented";
export type TargetSegment = "student" | "family" | "luxury" | "investor";

export interface PropertyRoomImage {
  name: string;
  url: string;
}

export interface Property {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  price: number;           // VND — in billions for buy, in millions/month for rent
  priceUnit: string;       // "tỷ" | "triệu/tháng" | "nghìn/tháng"
  priceDisplay: string;    // formatted string e.g. "4.5 Tỷ" or "18 Triệu/tháng"
  listingType: ListingType;
  propertyType: PropertyType;
  targetSegment?: TargetSegment;
  status: PropertyStatus;
  area: number;            // m²
  bedrooms: number;
  bathrooms: number;
  parking?: number;        // garage / parking slots
  floors?: number;
  direction?: string;      // "Đông", "Tây", "Nam", "Bắc", "Đông Nam"
  legalStatus?: string;    // "Sổ hồng", "Sổ đỏ", "Hợp đồng mua bán"
  city: string;
  district: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;          // e.g. 4.8, 4.9
  reviewCount: number;
  projectedIrr?: string;   // e.g. "12.5%"
  estPayout?: string;      // e.g. "45 Triệu/tháng"
  progressFunded?: string; // e.g. "75%"
  images: string[];
  roomImages?: PropertyRoomImage[];
  thumbnailUrl: string;
  isFeatured: boolean;
  isPopular: boolean;
  isNew: boolean;
  agentName: string;
  agentPhone: string;
  agentAvatar: string;
  agentTitle: string;
  postedAt: string;        // ISO date string
  viewCount: number;
  amenities: string[];
}

export const MOCK_PROPERTIES: Property[] = [
  // ─── Luxury / Penthouse ───
  {
    id: "prop-001",
    title: "Riverside Luxury Penthouse Retreat",
    tagline: "Căn hộ Penthouse view 360° sông Sài Gòn",
    description:
      "Căn hộ cao cấp 3 phòng ngủ view toàn cảnh sông Sài Gòn và trung tâm tài chính. Thiết kế phong cách Nordic tối giản, sàn gỗ sồi nhập khẩu, hệ thống Smart Home điều khiển bằng giọng nói, hồ bơi vô cực và vườn trên không riêng biệt.",
    price: 15.8,
    priceUnit: "tỷ",
    priceDisplay: "15.8 Tỷ",
    listingType: "buy",
    propertyType: "apartment",
    targetSegment: "luxury",
    status: "active",
    area: 165,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    direction: "Đông Nam",
    legalStatus: "Sổ hồng trao tay",
    city: "TP. Hồ Chí Minh",
    district: "Bình Thạnh",
    address: "Tòa tháp Landmark Plus, 208 Nguyễn Hữu Cảnh, Bình Thạnh",
    lat: 10.7951,
    lng: 106.7220,
    rating: 4.9,
    reviewCount: 38,
    projectedIrr: "14.2%",
    estPayout: "65 Triệu/tháng",
    progressFunded: "88%",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    roomImages: [
      { name: "Phòng khách Panorama", url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80" },
      { name: "Không gian Bếp & Bar", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" },
      { name: "Phòng tắm Jacuzzi", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" },
      { name: "Phòng ngủ Master", url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80" },
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: true,
    isNew: false,
    agentName: "Nguyễn Văn Hùng",
    agentPhone: "0901 234 567",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    agentTitle: "Giám đốc tư vấn đầu tư BĐS",
    postedAt: "2026-08-20T09:00:00Z",
    viewCount: 1540,
    amenities: ["Hồ bơi vô cực", "Phòng Gym 5 sao", "Sân đỗ trực thăng", "Bảo vệ 24/7", "Smart Home", "View sông"],
  },

  // ─── Student / Young Professional ───
  {
    id: "prop-007",
    title: "Studio Hiện Đại Gần ĐH Quốc Gia & Làng Đại Học",
    tagline: "Phòng Studio full nội thất, giờ giấc tự do",
    description:
      "Căn Studio tiện nghi 28m² dành riêng cho sinh viên và người mới đi làm. Đã trang bị sẵn máy lạnh Inverter, tủ lạnh, bếp từ, máy giặt riêng, bàn học/làm việc rộng rãi, wifi cáp quang tốc độ cao 500Mbps, khóa vân tay và an ninh 24/7.",
    price: 4.2,
    priceUnit: "triệu/tháng",
    priceDisplay: "4.2 Triệu/tháng",
    listingType: "rent",
    propertyType: "student_room",
    targetSegment: "student",
    status: "active",
    area: 28,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    direction: "Đông Nam",
    city: "TP. Hồ Chí Minh",
    district: "Thành phố Thủ Đức",
    address: "Đường số 6, Phường Linh Trung, TP. Thủ Đức (Cạnh KTX Khu B ĐHQG)",
    lat: 10.8756,
    lng: 106.7981,
    rating: 4.9,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    ],
    roomImages: [
      { name: "Góc ngủ & bàn học", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" },
      { name: "Khu vực bếp nấu", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" },
      { name: "Phòng tắm khép kín", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" },
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: true,
    isNew: true,
    agentName: "Trần Anh Tuấn",
    agentPhone: "0968 112 233",
    agentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    agentTitle: "Quản lý chuỗi trọ sinh viên Smart Home",
    postedAt: "2026-08-23T02:00:00Z",
    viewCount: 3820,
    amenities: ["Wifi tốc độ cao", "Khóa vân tay", "Máy giặt riêng", "Camera 24/7", "Gần trường ĐH", "Không chung chủ"],
  },

  // ─── Student / Young Professional (Hà Nội) ───
  {
    id: "prop-008",
    title: "Phòng Căn Hộ Mini Cầu Giấy — Gần ĐH Quốc Gia HN",
    tagline: "Căn hộ mini ban công thoáng mát, full đồ",
    description:
      "Căn hộ mini 35m² ngay trung tâm Cầu Giấy, cách ĐH Quốc Gia, Sư Phạm 500m. Có gác lửng cao, ban công đón ánh sáng tự nhiên, trang bị máy sấy quần áo, bếp từ âm, an ninh tuyệt đối thẻ từ ra vào.",
    price: 5.0,
    priceUnit: "triệu/tháng",
    priceDisplay: "5.0 Triệu/tháng",
    listingType: "rent",
    propertyType: "student_room",
    targetSegment: "student",
    status: "active",
    area: 35,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    direction: "Nam",
    city: "Hà Nội",
    district: "Cầu Giấy",
    address: "Ngõ 175 Xuân Thủy, Phường Dịch Vọng Hậu, Cầu Giấy",
    lat: 21.0369,
    lng: 105.7831,
    rating: 4.8,
    reviewCount: 29,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    ],
    roomImages: [
      { name: "Phòng ngủ & Gác lửng", url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80" },
      { name: "Góc làm việc", url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" },
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isPopular: true,
    isNew: true,
    agentName: "Nguyễn Minh Đức",
    agentPhone: "0977 889 900",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    agentTitle: "Quản lý BĐS cho thuê Cầu Giấy",
    postedAt: "2026-08-22T14:00:00Z",
    viewCount: 2190,
    amenities: ["Gần trạm Metro", "Thẻ từ thang máy", "Ban công riêng", "Giờ giấc tự do", "Máy giặt sấy"],
  },

  // ─── Young Family / Mid-tier Apartment ───
  {
    id: "prop-009",
    title: "Căn Hộ Gia Đình Trẻ 2PN Akari City Võ Văn Kiệt",
    tagline: "Tổ ấm an cư Nhật Bản, tiện ích trường học chuẩn quốc tế",
    description:
      "Căn hộ 2 phòng ngủ 60m² thiết kế tối ưu công năng phong cách Nhật Bản. Khuôn viên an toàn khép kín có trường mầm non, công viên sân chơi trẻ em, hồ bơi và trung tâm thương mại nội khu.",
    price: 3.1,
    priceUnit: "tỷ",
    priceDisplay: "3.1 Tỷ",
    listingType: "buy",
    propertyType: "apartment",
    targetSegment: "family",
    status: "active",
    area: 60,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    direction: "Đông",
    legalStatus: "Sổ hồng lâu dài",
    city: "TP. Hồ Chí Minh",
    district: "Bình Tân",
    address: "Đại lộ Võ Văn Kiệt, Phường An Lạc, Bình Tân",
    lat: 10.7259,
    lng: 106.6083,
    rating: 4.8,
    reviewCount: 35,
    projectedIrr: "11.2%",
    estPayout: "12 Triệu/tháng",
    progressFunded: "94%",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    ],
    roomImages: [
      { name: "Phòng khách gia đình", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80" },
      { name: "Bếp gia đình", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" },
      { name: "Phòng ngủ em bé", url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80" },
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: true,
    isNew: true,
    agentName: "Lê Hoàng Yến",
    agentPhone: "0938 123 987",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    agentTitle: "Chuyên viên tư vấn căn hộ gia đình",
    postedAt: "2026-08-23T00:30:00Z",
    viewCount: 1980,
    amenities: ["Trường mầm non", "Khu vui chơi trẻ em", "Hồ bơi Nhật Bản", "Bảo vệ 24/7", "Siêu thị WinMart"],
  },

  // ─── Beachfront Villa ───
  {
    id: "prop-002",
    title: "Golden Meadows Beachfront Villa",
    tagline: "Dinh thự ven biển phân khu thượng lưu",
    description:
      "Biệt thự đơn lập 6 phòng ngủ nằm ngay bờ biển với bãi cát riêng dài 40m. Kiến trúc nhiệt đới hiện đại mở tối đa với kính Low-E tràn viền, sân vườn cảnh quan Nhật Bản và hồ bơi điện phân muối 120m².",
    price: 48.5,
    priceUnit: "tỷ",
    priceDisplay: "48.5 Tỷ",
    listingType: "buy",
    propertyType: "villa",
    targetSegment: "luxury",
    status: "active",
    area: 450,
    bedrooms: 6,
    bathrooms: 6,
    parking: 3,
    floors: 3,
    direction: "Nam",
    legalStatus: "Sổ hồng vĩnh viễn",
    city: "Đà Nẵng",
    district: "Ngũ Hành Sơn",
    address: "Đại lộ Võ Nguyên Giáp, Phường Khuê Mỹ, Ngũ Hành Sơn",
    lat: 16.0354,
    lng: 108.2458,
    rating: 5.0,
    reviewCount: 24,
    projectedIrr: "16.8%",
    estPayout: "120 Triệu/tháng",
    progressFunded: "95%",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
    roomImages: [
      { name: "Phòng khách sân vườn", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
      { name: "Khu vực Bếp & Bar", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" },
      { name: "Phòng tắm view biển", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" },
      { name: "Phòng ngủ Tổng thống", url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80" },
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: true,
    isNew: false,
    agentName: "Trần Thị Lan",
    agentPhone: "0912 345 678",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    agentTitle: "Giám đốc kinh doanh BĐS nghỉ dưỡng",
    postedAt: "2026-08-18T08:00:00Z",
    viewCount: 4210,
    amenities: ["Hồ bơi riêng", "Bãi biển riêng", "Sân tennis", "Garage 3 xe", "Phòng rượu vang", "Bảo vệ 24/7"],
  },

  // ─── Rent / Studio ───
  {
    id: "prop-003",
    title: "Cityscape Luxury Loft & Workspace",
    tagline: "Căn hộ Studio thông minh tiện nghi",
    description:
      "Căn hộ phong cách Scandinavian tối ưu hóa không gian sống với đầy đủ nội thất cao cấp: giường gấp thông minh, sofa da Ý, bếp điện từ Bosch và khu vực làm việc chill view trọn công viên cây xanh 14ha.",
    price: 16.5,
    priceUnit: "triệu/tháng",
    priceDisplay: "16.5 Triệu/tháng",
    listingType: "rent",
    propertyType: "apartment",
    targetSegment: "family",
    status: "active",
    area: 68,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    direction: "Đông",
    city: "TP. Hồ Chí Minh",
    district: "Thành phố Thủ Đức",
    address: "Masteri Thảo Điền, 159 Xa Lộ Hà Nội, Thảo Điền, TP. Thủ Đức",
    lat: 10.8019,
    lng: 106.7340,
    rating: 4.8,
    reviewCount: 52,
    projectedIrr: "11.5%",
    estPayout: "16.5 Triệu/tháng",
    progressFunded: "60%",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    ],
    roomImages: [
      { name: "Phòng khách Chill", url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80" },
      { name: "Góc làm việc", url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" },
      { name: "Bếp ăn ấm cúng", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" },
      { name: "Phòng ngủ Master", url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80" },
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: true,
    isNew: true,
    agentName: "Lê Quang Minh",
    agentPhone: "0923 456 789",
    agentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    agentTitle: "Chuyên viên tư vấn cho thuê cao cấp",
    postedAt: "2026-08-22T10:00:00Z",
    viewCount: 1890,
    amenities: ["Hồ bơi tràn bờ", "Phòng Gym", "Wifi tốc độ cao", "Nội thất cao cấp", "Gần ga Metro"],
  },

  // ─── Eco House ───
  {
    id: "prop-004",
    title: "EcoPark SwanLake Forest Villa",
    tagline: "Nhà phố sinh thái bên hồ thiên nga",
    description:
      "Nhà phố sinh thái 4 tầng liền kề công viên khoáng nóng tự nhiên. Thiết kế không gian mở hòa mình vào thiên nhiên, tầng áp mái có sân BBQ ngoài trời với góc nhìn toàn cảnh đảo ngọc Ecopark.",
    price: 13.6,
    priceUnit: "tỷ",
    priceDisplay: "13.6 Tỷ",
    listingType: "buy",
    propertyType: "house",
    targetSegment: "family",
    status: "active",
    area: 145,
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    floors: 4,
    direction: "Tây Nam",
    legalStatus: "Sổ hồng vĩnh viễn",
    city: "Hà Nội",
    district: "Văn Giang (Ecopark)",
    address: "Khu đô thị Ecopark, Phân khu SwanLake, Hưng Yên",
    lat: 20.9697,
    lng: 105.9358,
    rating: 4.9,
    reviewCount: 31,
    projectedIrr: "13.8%",
    estPayout: "55 Triệu/tháng",
    progressFunded: "90%",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    ],
    roomImages: [
      { name: "Phòng khách sân thượng", url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80" },
      { name: "Bếp & Bàn tiệc", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" },
      { name: "Phòng ngủ Master", url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80" },
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isPopular: true,
    isNew: true,
    agentName: "Phạm Đình Khoa",
    agentPhone: "0934 567 890",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    agentTitle: "Trưởng phòng kinh doanh BĐS Hà Nội",
    postedAt: "2026-08-21T08:00:00Z",
    viewCount: 2310,
    amenities: ["Khoáng nóng Onsen", "Trường quốc tế", "Sân golf 18 lỗ", "Vườn nướng BBQ", "Hồ sinh thái"],
  },

  // ─── Rent / Luxury Apartment ───
  {
    id: "prop-005",
    title: "Cosy Modern Apartment for Rent",
    tagline: "Căn hộ cao cấp trung tâm Quận 1",
    description:
      "Căn hộ 2 phòng ngủ ấm cúng ngay trung tâm Quận 1. Đầy đủ tiện nghi chuẩn khách sạn 5 sao, sofa êm ái, TV màn hình phẳng 65 inch, máy pha cà phê cao cấp, dịch vụ dọn phòng hàng tuần và lễ tân hỗ trợ 24/7.",
    price: 22,
    priceUnit: "triệu/tháng",
    priceDisplay: "22 Triệu/tháng",
    listingType: "rent",
    propertyType: "apartment",
    targetSegment: "family",
    status: "active",
    area: 75,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    direction: "Nam",
    city: "TP. Hồ Chí Minh",
    district: "Quận 1",
    address: "Vinhomes Golden River, Số 2 Tôn Đức Thắng, Phường Bến Nghé, Quận 1",
    lat: 10.7818,
    lng: 106.7088,
    rating: 4.8,
    reviewCount: 45,
    projectedIrr: "10.2%",
    estPayout: "22 Triệu/tháng",
    progressFunded: "70%",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    ],
    roomImages: [
      { name: "Phòng khách hiện đại", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80" },
      { name: "Bếp & Bàn ăn", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" },
      { name: "Phòng tắm tiện nghi", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" },
      { name: "Phòng ngủ Master", url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80" },
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: true,
    isNew: true,
    agentName: "Nguyễn Thị Thu",
    agentPhone: "0945 678 901",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    agentTitle: "Chuyên viên quản lý BĐS cho thuê",
    postedAt: "2026-08-22T06:00:00Z",
    viewCount: 3120,
    amenities: ["Bến du thuyền", "Hồ bơi tràn", "Gym & Yoga", "Lễ tân 24/7", "Smart Key"],
  },

  // ─── Super Luxury Thu Thiem ───
  {
    id: "prop-006",
    title: "The Opera Residence Thu Thiem",
    tagline: "Tuyệt tác nghệ thuật kiến trúc Thủ Thiêm",
    description:
      "Căn hộ 3 phòng ngủ view triệu đô trực diện sông Sài Gòn và Nhà hát Nhạc vũ kịch Thành phố. Nội thất nhập khẩu Poliform & Miele danh giá, thang máy riêng tận cửa căn hộ.",
    price: 32.5,
    priceUnit: "tỷ",
    priceDisplay: "32.5 Tỷ",
    listingType: "buy",
    propertyType: "apartment",
    targetSegment: "luxury",
    status: "active",
    area: 138,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    direction: "Tây Nam",
    legalStatus: "Sổ hồng trao tay",
    city: "TP. Hồ Chí Minh",
    district: "Thành phố Thủ Đức",
    address: "The Metropole Thủ Thiêm, Phường An Khánh, TP. Thủ Đức",
    lat: 10.7765,
    lng: 106.7125,
    rating: 5.0,
    reviewCount: 19,
    projectedIrr: "15.5%",
    estPayout: "80 Triệu/tháng",
    progressFunded: "92%",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    ],
    roomImages: [
      { name: "Phòng khách Opera View", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
      { name: "Bếp đá hoa cương", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" },
      { name: "Phòng ngủ Panorama", url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80" },
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: false,
    isNew: true,
    agentName: "Võ Đức Thành",
    agentPhone: "0956 789 012",
    agentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    agentTitle: "Chuyên gia BĐS hạng sang Thủ Thiêm",
    postedAt: "2026-08-23T01:00:00Z",
    viewCount: 2900,
    amenities: ["Thang máy riêng", "Hồ bơi điện phân", "Phòng Golf 3D", "Sky Lounge", "Bãi xe thông minh"],
  },
];

export const CITIES = [
  "TP. Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Cần Thơ",
  "Hải Phòng",
  "Nha Trang",
  "Vũng Tàu",
  "Bình Dương",
];

export const PROPERTY_TYPES_OPTIONS = [
  { value: "apartment", label: "Căn hộ chung cư" },
  { value: "house", label: "Nhà phố, nhà riêng" },
  { value: "villa", label: "Biệt thự, Dinh thự" },
  { value: "student_room", label: "Trọ sinh viên / Studio mini" },
  { value: "land", label: "Đất nền dự án" },
  { value: "office", label: "Văn phòng làm việc" },
  { value: "shophouse", label: "Mặt bằng, Shophouse" },
];

export const PRICE_RANGES_BUY = [
  { label: "Dưới 2 tỷ", min: 0, max: 2 },
  { label: "2 – 5 tỷ", min: 2, max: 5 },
  { label: "5 – 10 tỷ", min: 5, max: 10 },
  { label: "10 – 20 tỷ", min: 10, max: 20 },
  { label: "Trên 20 tỷ", min: 20, max: 999 },
];

export const PRICE_RANGES_RENT = [
  { label: "Dưới 5 triệu (Sinh viên)", min: 0, max: 5 },
  { label: "5 – 10 triệu", min: 5, max: 10 },
  { label: "10 – 20 triệu", min: 10, max: 20 },
  { label: "20 – 40 triệu", min: 20, max: 40 },
  { label: "Trên 40 triệu", min: 40, max: 999 },
];
