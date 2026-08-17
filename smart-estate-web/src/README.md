# Cấu trúc Thư mục `src/` (Feature-Driven Architecture)

Dự án **Smart Estate Web** áp dụng kiến trúc **Feature-Driven (Quản lý mã nguồn theo tính năng)**. 
Mỗi mô-đun nghiệp vụ (Feature) nằm gói gọn trong một thư mục riêng biệt, giúp code dễ bảo trì, dễ mở rộng và không bị phình to khi dự án phát triển.

---

## 📁 Sơ đồ Tổng quan Cấu trúc `src/`

```text
src/
├── assets/                  # Tài nguyên tĩnh (images, icons, styles toàn cục)
├── components/              # Các UI Component dùng chung (Global Reusable Components)
│   ├── ui/                  # Component từ Shadcn UI (Button, Dialog, Input, Card...)
│   ├── common/              # Layout chung, Header, Footer, Sidebar, ProtectedRoute...
│   └── form/                # Component làm việc với Form (FormInput, FormSelect...)
├── config/                  # Cấu trúc hằng số, biến môi trường, định tuyến URL
├── features/                # 🚀 TÍNH NĂNG CHÍNH CỦA DỰ ÁN (MODULE DRIVEN)
│   ├── auth/                # Xác thực & Phân quyền (Login, Register, Profile...)
│   ├── properties/          # Quản lý Bất động sản (Danh sách, Chi tiết, Bản đồ Leaflet)
│   ├── appointments/        # Đặt lịch xem nhà & Quản lý lịch (FullCalendar)
│   ├── pipeline/            # Quản lý tiến độ giao dịch, Lead (Kanban Dnd-kit)
│   ├── chat/                # Nhắn tin môi giới - khách hàng Realtime (Socket.io)
│   └── dashboard/           # Báo cáo thống kê (Admin & Agent Analytics)
├── hooks/                   # Custom Hooks toàn cục (useDebounce, useLocalStorage...)
├── layouts/                 # Thư mục chứa Layout màn hình (MainLayout, AuthLayout...)
├── lib/                     # Khởi tạo thư viện bên thứ 3 (axios, react-query, socket...)
├── routes/                  # Định tuyến ứng dụng (App Router, Private Routes)
├── store/                   # State toàn cục (Jotai Atoms: authAtom, themeAtom...)
└── types/                   # Định nghĩa Type / Interface dùng chung toàn hệ thống
```

---

## 🔍 Chi tiết Chức năng từng Thư mục

### 1. `features/` (Mô-đun Tính năng)
Mỗi thư mục con trong `features/` đại diện cho 1 nghiệp vụ logic độc lập của ứng dụng.

Cấu trúc chuẩn bên trong **mỗi feature** (ví dụ `features/properties/`):
- `api/`: Nơi gọi API, tạo các custom hook TanStack Query (`usePropertyQuery`, `useCreatePropertyMutation`).
- `components/`: Các UI Component **chỉ thuộc về riêng tính năng này** (ví dụ: `PropertyCard.tsx`, `PropertyFilterBar.tsx`, `PropertyMapView.tsx`).
- `hooks/`: Custom Hook riêng cho tính năng này.
- `pages/`: Các màn hình Route của tính năng (ví dụ: `ListPage.tsx`, `DetailPage.tsx`).
- `types/`: Type definitions riêng của tính năng (ví dụ: `Property`, `PropertyFilterParams`).

#### Các tính năng chính trong dự án:
- **`auth/`**: Đăng nhập, đăng ký, quên mật khẩu, cập nhật tài khoản.
- **`properties/`**: Danh sách nhà đất, lọc nâng cao, tích hợp **Leaflet / React-Leaflet** xem vị trí trên bản đồ.
- **`appointments/`**: Lịch xem nhà, tích hợp **FullCalendar** để theo dõi cuộc hẹn giữa Môi giới và Khách hàng.
- **`pipeline/`**: Quản lý trạng thái giao dịch & danh sách tiềm năng bằng quy trình Kanban kéo thả (**Dnd-kit**).
- **`chat/`**: Nhắn tin trực tiếp giữa khách hàng và nhà môi giới qua **Socket.io-client**.
- **`dashboard/`**: Báo cáo tổng quan, biểu đồ doanh thu, số liệu lượt xem bất động sản.

---

### 2. `components/` (Component Dùng chung)
- **`ui/`**: Các thành phần giao diện nguyên bản từ **Shadcn UI** (`button.tsx`, `dialog.tsx`, `popover.tsx`...). Không chứa logic nghiệp vụ.
- **`common/`**: Thành phần tái sử dụng ở nhiều trang khác nhau như `Header.tsx`, `Footer.tsx`, `Sidebar.tsx`, `LoadingSpinner.tsx`, `ProtectedRoute.tsx`.
- **`form/`**: Các thành phần Input bọc sẵn `react-hook-form` + `zod` để dựng form nhanh chóng.

---

### 3. `lib/` (Cấu hình Thư viện)
Chứa file thiết lập các thư viện ngoài để dùng lại dễ dàng:
- `axios.ts`: Khởi tạo Axios Instance kèm Interceptor gắn JWT Token.
- `react-query.ts`: Khởi tạo `QueryClient` cho TanStack Query.
- `socket.ts`: Kết nối Socket.io Client với backend.
- `utils.ts`: Hàm trợ giúp `cn()` để gộp class Tailwind CSS.

---

### 4. `store/` (Quản lý Trạng thái - Jotai)
Dùng **Jotai** để quản lý state nhẹ nhàng, linh hoạt:
- `auth.atom.ts`: Lưu thông tin đăng nhập user, accessToken.
- `theme.atom.ts`: Lưu cấu hình Giao diện Dark/Light.

---

### 5. `layouts/` & `routes/`
- **`layouts/`**: Chứa các khung layout chính như `MainLayout` (gồm Header + Content + Footer), `AuthLayout` (khung đăng nhập), `DashboardLayout` (kèm Sidebar điều hướng).
- **`routes/`**: File `app-router.tsx` chứa danh sách toàn bộ URL của trang web kết hợp với `react-router-dom`.

---

## 💡 Nguyên tắc Viết Code (Best Practices)

1. **Rule of Proximity (Tính gần gũi)**: Nếu component/hook/type chỉ dùng ở **1 feature**, hãy đặt nó trong thư mục của **feature đó**.
2. **Reuse Level Up**: Khi một component/hook trong feature bắt đầu được dùng ở tính năng thứ 2, hãy di chuyển nó ra thư mục dùng chung `src/components/common` hoặc `src/hooks/`.
3. **No Direct Inter-Feature Imports**: Tránh để 2 feature phụ thuộc lẫn nhau trực tiếp. Nếu cần chia sẻ dữ liệu, hãy qua `store/` hoặc `components/common/`.
