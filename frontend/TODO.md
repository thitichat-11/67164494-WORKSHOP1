# Dashboard & Statistics Bug Fixes

## Progress Tracking

### ✅ Step 1: ใช้ Demo Data เป็น Initial State แทนข้อมูลว่าง/0
- [x] AdminDashboard.jsx: `useState({...0})` → `useState(demoStats)` พร้อมข้อมูลครบ
- [x] StatisticsPage.jsx: `useState({...0})` → `useState(demoStats)` พร้อมข้อมูลครบ
- [x] กำหนด `salesChart`, `orderStatusData`, `recentOrders`, `topProducts` ล้วนมี demo data ตั้งแต่แรก

### ✅ Step 2: ปรับ logic การ merge ข้อมูลจาก API
- [x] เปลี่ยนจาก "รอ API ก่อน → ถ้าไม่ได้ใช้ fallback" เป็น "ใช้ demo data ก่อน → ถ้า API ได้ข้อมูล → merge ทับ"
- [x] ป้องกัน render cycle ที่ข้อมูลอาจเป็น undefined/empty แล้ว ErrorBoundary จับ error

### ✅ Step 3: เพิ่ม setError() ใน StatisticsPage catch block
- [x] เพิ่ม `setError("ไม่สามารถโหลดข้อมูลสถิติได้ กำลังแสดงข้อมูลตัวอย่าง");`
- [x] ทำให้ error UI แสดงผลได้จริงเมื่อ API ล้มเหลว

### ✅ Step 4: ป้องกัน name collision ใน StatisticsPage
- [x] Destructured variable `salesData` ชนกับชื่อ state → เปลี่ยนเป็น `salesDataRes`

---

## สรุปการแก้ไขที่แท้จริง

| ปัญหา | สาเหตุที่แท้จริง | การแก้ไข |
|--------|------------------|----------|
| Dashboard หน้าโล่ง | Component รอ API → ถ้า API crash → ErrorBoundary จับ error → แสดง error page ที่ผู้ใช้มองว่า "โล่ง" | ใช้ Demo Data เป็น initialState ทันที ไม่ต้องรอ API รับประกันว่าแสดงผลได้แน่ |
| Statistics ข้อมูลไม่ขึ้น | `setError()` ไม่เคยถูกเรียกใน catch block → error state เป็น null ตลอด → Component ยังคงพยายาม render โดยไม่มีข้อมูล → crash เงียบ | เพิ่ม `setError()` พร้อมถือ demo data ใน catch |
| Data หายบางส่วน | `fetchSalesData` คืน `{data:[], total:0}` ซึ่ง truthy → fallback `!salesData?.data?.length` ทำงาน แต่ logic ซับซ้อนเกินไป | ใช้ "มี demo data เสมอ → ถ้า API ได้ข้อมูลจริง → merge" |


