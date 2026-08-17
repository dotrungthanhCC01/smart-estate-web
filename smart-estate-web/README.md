# 🏢 Smart Estate Web - Nền Tảng Bất Động Sản Thông Minh

Dự án Frontend cho hệ thống Quản lý & Giao dịch Bất động sản Thông minh (Smart Estate). 
Ứng dụng được xây dựng theo kiến trúc **Feature-Driven Architecture**, tối ưu hóa hiệu năng, giao diện hiện đại và khả năng mở rộng.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Core**: React 19, TypeScript, Vite
- **UI & Styling**: Tailwind CSS v4, Shadcn UI, Lucide Icons
- **State Management**: Jotai (Global state), TanStack Query v5 (Server state)
- **Routing**: React Router DOM v7
- **Form & Validation**: React Hook Form, Zod
- **Map & Spatial**: Leaflet, React Leaflet (Tìm kiếm nhà đất trên bản đồ)
- **Schedule & Calendar**: FullCalendar (Đặt lịch xem nhà & Quản lý lịch hẹn)
- **Drag & Drop**: @dnd-kit (Bảng Kanban quản lý quy trình giao dịch & Lead)
- **Realtime**: Socket.io Client (Nhắn tin môi giới & Thông báo biến động giá)
- **HTTP Client**: Axios

---

## 📂 Cấu Trúc Dự Án Theo Tính Năng (Feature-Driven Structure)

Dự án tổ chức mã nguồn trong `src/` theo từng **Mô-đun tính năng (Feature)**:

```text
src/
├── assets/                  # Hình ảnh, font chữ, style toàn cục
├── components/              # Các UI component tái sử dụng chung
│   ├── ui/                  # Component từ Shadcn UI (Button, Dialog, Input...)
│   ├── common/              # Layout chung (Header, Footer, ProtectedRoute...)
│   └── form/                # Component Form bọc sẵn Zod & React-Hook-Form
├── config/                  # Hằng số, API URL, định tuyến
├── features/                # 🚀 CÁC MÔ-ĐUN TÍNH NĂNG CHÍNH
│   ├── auth/                # Đăng nhập, Đăng ký, Phân quyền người dùng
│   ├── properties/          # Quản lý & Lọc Bất động sản + Bản đồ Leaflet
│   ├── appointments/        # Lịch hẹn xem nhà + Tích hợp FullCalendar
│   ├── pipeline/            # Quản lý tiến độ giao dịch (Kanban Dnd-kit)
│   ├── chat/                # Chat Realtime giữa Khách hàng & Môi giới (Socket.io)
│   └── dashboard/           # Báo cáo doanh thu & Thống kê dành cho Admin/Agent
├── hooks/                   # Custom Hooks dùng chungToàn dự án (useDebounce,...)
├── layouts/                 # Khung Layout trang (MainLayout, DashboardLayout,...)
├── lib/                     # Khởi tạo Axios, QueryClient, Socket connection
├── routes/                  # Cấu hình danh sách đường dẫn (AppRouter)
├── store/                   # State toàn cục với Jotai (authAtom, themeAtom)
└── types/                   # Định nghĩa dữ liệu chung toàn ứng dụng
```

👉 Xem hướng dẫn chi tiết về cấu trúc và nguyên tắc code tại: [src/README.md](file:///d:/ltwnc/smart-estate-web/src/README.md)

---

## 🚀 Hướng Dẫn Khởi Chạy

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Chạy môi trường phát triển (Dev)
```bash
npm run dev
```

### 3. Build sản phẩm (Production)
```bash
npm run build
```
