# EduMarket

Nền tảng học trực tuyến hiện đại với giao diện thân thiện và hệ thống gợi ý thông minh.

## 🚀 Tính năng chính

### 🔍 Tìm kiếm và lọc thông minh
- Tìm kiếm theo tên khóa học, mô tả, giảng viên, và thẻ tag
- Lọc theo khoảng giá (dưới 500k, 500k-1M, trên 1M)
- Lọc theo danh mục và cấp độ
- Hiển thị số lượng kết quả tìm kiếm

### ❤️ Quản lý yêu thích
- Đánh dấu khóa học yêu thích
- Trang quản lý danh sách yêu thích
- Gợi ý dựa trên sở thích

### 📈 Lịch sử xem
- Theo dõi lịch sử xem khóa học
- Đếm số lần xem mỗi khóa học
- Giới hạn tối đa 10 khóa học gần đây

### 🤖 AI Chat Bot
- Trợ lý ảo hỗ trợ người dùng
- Trả lời câu hỏi về khóa học
- Gợi ý khóa học phù hợp

### 🎯 Gợi ý thông minh
- Dựa trên khoá học yêu thích của người dùng.
- Kết hợp với lịch sử xem nhiều nhất, có tính đến tần suất truy cập.
- Xác suất lỗi API giả lập: mô phỏng tình huống API thất bại (20%), giúp kiểm tra UI fallback.
- Hiệu ứng loading skeleton: tạo trải nghiệm tải dữ liệu thực tế khi chờ phản hồi từ “AI”.

### 🌓 Dark/Light Mode
- Chế độ tối/sáng
- Theo dõi thiết lập hệ thống
- Lưu trữ preference người dùng

## 🛠️ Công nghệ sử dụng

### Frontend
- **Next.js 14** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### State Management
- **React Context API** - Quản lý state toàn cục
- **React Hooks** - useState, useEffect, useContext, useMemo, useRef

### Styling & UI
- **Tailwind CSS** - Responsive design
- **Custom CSS** - Scrollbar, gradient, animations
- **Lexend Font** - Typography
- **Shadcn/ui** - UI components

### Authentication (Ready)
- **NextAuth.js** - Authentication framework
- **Session management** - User session handling

### Database (Ready)
- **PostgreSQL** - Database
- **TypeORM** - ORM framework
- **TypeORM Naming Strategies** - Snake case naming

## 📁 Cấu trúc dự án

```
├── app/                             # Routing & page structure
│   ├── (auth)/                      # Authentication pages
│   │   ├── forgot-password/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── layout.tsx              # Auth layout
│   ├── (root)/                     # Root-level pages
│   │   ├── (home)/                 # Home page
│   │   │   └── page.tsx
│   │   ├── product/                # Product-related pages
│   │   │   ├── favourites/         # Favorite products page
│   │   │   └── history/            # Viewing history page
│   │   └── layout.tsx             # Root layout
│   ├── api/                        # API route handlers (if using App Router)
│   ├── favicon.ico                 # App icon
│   ├── globals.css                 # Global CSS
│   └── layout.tsx                  # App-wide layout
│
├── components/                     # UI & logic-based components
│   ├── card/                       # Card display components
│   │   ├── AISuggestions.tsx
│   │   └── ProductCard.tsx
│   ├── chat/                       # AI chatbot
│   │   └── ChatBot.tsx
│   ├── container/                  # Layout containers
│   │   └── AuthContainer.tsx
│   ├── form/                       # Form handling
│   │   ├── FavoriteProductForm.tsx
│   │   ├── HistoryProductForm.tsx
│   │   └── HomeForm.tsx
│   ├── modal/                      # Modal windows
│   │   └── ProductModal.tsx
│   ├── shared/                     # Reusable shared components
│   │   ├── error/
│   │   ├── filter/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── loader/
│   │   ├── navbar/
│   │   └── search/
│   └── ui/                         # Atomic UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── menubar.tsx
│       ├── select.tsx
│       ├── skeleton.tsx
│       └── sonner.tsx
│
├── constants/                      # App constants (e.g. filters)
│   ├── filter.tsx
│   └── index.tsx
│
├── contexts/                       # React context providers
│   ├── ClientContext.tsx
│   ├── ProductContext.tsx
│   └── ThemeProvider.tsx
│
├── database/                       # Data schema or ORM models
│   └── user.entity.ts
│
├── lib/                            # Logic and utilities
│   ├── action/                     # Server actions
│   │   └── auth.action.ts
│   ├── api/                        # API calling functions
│   │   ├── fetchAIResponse.ts
│   │   ├── fetchProduct.ts
│   │   ├── fetchSuggestion.ts
│   │   └── fetchUser.ts
│   └── util/                       # Utilities
│       ├── filter.ts
│       ├── index.ts
│       └── postgresql.ts
│
├── public/                         # Public static files
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   └── mock/                       # Mock data for dev
│       ├── aiResponse.json
│       ├── product.json
│       └── user.json
│
├── styles/                         # Standalone CSS files
│   └── theme.css
│
├── types/                          # Global TypeScript types
│   ├── ai-response.d.ts
│   ├── authjs.d.ts
│   ├── index.d.ts
│   ├── product.d.ts
│   └── toast.d.ts
│
├── .gitignore
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Thiết kế UI/UX

### Màu sắc
- **Primary Blue**: Các tone xanh dương từ 100-900
- **Dark Theme**: Gam màu tối chuyên nghiệp
- **Light Theme**: Gam màu sáng dễ nhìn

### Typography
- **Font chính**: Lexend (Google Fonts)
- **Font phụ**: Geist Sans & Geist Mono

### Components
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton loading
- **Error Handling**: Toast notifications
- **Modal System**: Product detail modal

## 🔧 Cài đặt và chạy dự án

### Prerequisites
```bash
Node.js >= 18
npm hoặc yarn
```

### Clone repository
```bash
git clone <repository-url>
cd edumarket
```

### Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### Chạy development server
```bash
npm run dev
# hoặc
yarn dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

### Build production
```bash
npm run build
npm start
```

## 🗃️ Cấu trúc dữ liệu

### Product Interface
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  rating: number;
  reviews: number;
  instructor: string;
  duration: string;
  students: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  createdAt: string;
  isPopular?: boolean;
  isBestseller?: boolean;
}
```

### User Behavior
```typescript
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    favorites: string[];
    viewHistory: { productId: string; viewCount: number }[];
  }
```

## 🌐 Deployment

Dự án đã được deploy và có thể truy cập tại: [Link deployment](https://e-commercial-platform.vercel.app/)

### Deployment Features
- **Static Site Generation**: Tối ưu hiệu suất
- **Responsive Design**: Hoạt động trên mọi thiết bị
- **SEO Optimized**: Meta tags và structured data
- **Performance**: Fast loading

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Screen**: 1400px+

## 🔮 Tính năng tương lai

### Phase 2
- [ ] Hệ thống thanh toán
- [ ] Video streaming
- [ ] Progress tracking
- [ ] Certificate generation

### Phase 3
- [ ] Social features
- [ ] Course creation tools
- [ ] Advanced analytics
- [ ] Mobile app

## 📝 License

Dự án này được phát triển bởi **Junie Vu**.

## 📞 Liên hệ

- **Developer**: Junie Vu
- **Email**: junievu2004@gmail.com
- **GitHub**: https://github.com/Vhquynhanh

---
