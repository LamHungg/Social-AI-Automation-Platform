# Social AI Automation Platform (META FLOW)

Hệ thống quản lý tương tác đa kênh (Facebook Fanpage & Instagram Business), tự động hóa phản hồi bằng AI, quản lý Lead CRM và giám sát hiệu suất thời gian thực.

---

## 🏗️ Kiến trúc & Công nghệ

### 1. Frontend (`frontend/`)
- **Framework**: Angular 18 (Standalone Components, Signals & Modern Control Flow)
- **Styling**: Vanilla CSS Design System (Dark sleek theme, Meta Blue tokens, Glassmorphism)
- **Kiến trúc nghiệp vụ gồm 8 màn hình cốt lõi**:
  1. **Dashboard (`Tổng quan`)**: Theo dõi KPI, biểu đồ tương tác 7 ngày, hàng đợi khẩn cấp & nhật ký realtime.
  2. **Unified Inbox (`Inbox hợp nhất`)**: Bố cục 3 cột (Danh sách hội thoại, Chat canvas đa kênh với gợi ý AI, CRM Sidebar).
  3. **Comment Center (`Trung tâm bình luận`)**: Phân loại ý định khách hàng bằng AI Intent (`ASK_PRICE`, `PHONE_LEAD`, `COMPLAINT`), trả lời tự động & gửi DM riêng.
  4. **Automation Builder (`Trình dựng kịch bản`)**: Visual Node Flow (Trigger -> AI Condition -> Action Pipeline) kèm Live Simulator.
  5. **Lead CRM (`Khách hàng & Lead`)**: Phân hạng khách hàng (`HOT`, `WARM`), tính điểm tiềm năng (AI Score) và quản lý phễu.
  6. **AI Agent Config (`Cấu hình AI`)**: Huấn luyện Persona, System Prompt, quy tắc chuyển giao CSKH (Fallback & Handover) và Sandbox test trực tiếp.
  7. **Channel Connections (`Kênh kết nối`)**: Quản lý kết nối Facebook Page & Instagram Business, giám sát Webhook Health.
  8. **Analytics (`Báo cáo & Phân tích`)**: Phễu chuyển đổi (Conversion Funnel), chỉ số chất lượng dịch vụ SLA & CSAT.

### 2. Backend & Database (Theo tài liệu thiết kế chi tiết)
- **Core Backend**: Java 21 + Spring Boot 3
- **Database**: Oracle Database
- **Caching & Lock**: Redis
- **Message Broker / Async**: RabbitMQ / Kafka / DB Outbox
- **AI Integration**: OpenAI / Anthropic / Gemini API

---

## 🚀 Hướng dẫn khởi chạy Frontend

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt thư viện (nếu chưa cài)
npm install

# Khởi chạy máy chủ phát triển
npm start
```

Ứng dụng sẽ hoạt động tại: `http://localhost:4200/`
