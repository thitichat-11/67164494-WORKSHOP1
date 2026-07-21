import { useState, useEffect } from "react";
import AdminProfile from "./admin-ui/AdminProfile";
import ErrorBoundary from "../../components/ErrorBoundary";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, PieChart, Pie, Cell
} from "recharts";
import {
  fetchDashboardStats,
  fetchSalesData,
  fetchRecentOrders,
  fetchOrderStatus,
  fetchRevenueByCategory,
  fetchPaymentMethodStats,
  fetchAverageOrderValue,
  fetchInventoryValue,
} from "../../api/adminApi";

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "20px 22px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};

const statusColors = {
  Processing: { bg: "#FAEBD9", color: "#A6713B" },
  Shipped:    { bg: "#EEF4ED", color: "#3C7741" },
  Delivered:  { bg: "#E2F1E0", color: "#2D612A" },
  Cancelled:  { bg: "#FAEAEA", color: "#A73937" },
  pending:    { bg: "#FAEBD9", color: "#A6713B" },
  completed:  { bg: "#E2F1E0", color: "#2D612A" },
  cancelled:  { bg: "#FAEAEA", color: "#A73937" },
  refunded:   { bg: "#FAF9F6", color: "#CAB18B" },
};

const pill = (bg, color, label) => (
  <span style={{ padding: "4px 10px", borderRadius: 9999, backgroundColor: bg, color, fontSize: 12, fontWeight: 500 }}>
    {label}
  </span>
);

const StatisticsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [salesData, setSalesData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    revenueChange: "+0%",
    todayOrders: 0,
    ordersChange: "0",
    totalOrders: 0,
  });
  const [revenueByCategory, setRevenueByCategory] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [avgOrderValue, setAvgOrderValue] = useState({ today: 0, month: 0, allTime: 0 });
  const [inventoryValue, setInventoryValue] = useState({ totalValue: 0, totalItems: 0, productCount: 0 });

  const formatCurrency = (value) => {
    const num = Number(value);
    if (num >= 1000000) return `฿${(num / 1000000).toFixed(1)}M`;
    return `฿${num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  useEffect(() => {
    const loadStatistics = async () => {
      setLoading(true);
      setError(null);
      try {
        const [statsData, salesDataRes, ordersData, statusData, categoryData, paymentData, avgOrderData, inventoryData] = await Promise.all([
          fetchDashboardStats(),
          fetchSalesData(selectedPeriod),
          fetchRecentOrders(),
          fetchOrderStatus(),
          fetchRevenueByCategory(),
          fetchPaymentMethodStats(),
          fetchAverageOrderValue(),
          fetchInventoryValue(),
        ]);

        setStats(statsData);
        setSalesData(salesDataRes.data);
        setRecentOrders(ordersData);
        setOrderStatusData(statusData.data);
        setRevenueByCategory(categoryData?.data || []);
        setPaymentMethods(paymentData || []);
        setAvgOrderValue(avgOrderData || { today: 0, month: 0, allTime: 0 });
        setInventoryValue(inventoryData || { totalValue: 0, totalItems: 0, productCount: 0 });
      } catch (err) {
        console.error("Failed to load statistics:", err);
        setError(err.response?.data?.message || "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่อ");
      } finally {
        setLoading(false);
      }
    };
    loadStatistics();
  }, [selectedPeriod]);

  const periodLabels = { week: "รายสัปดาห์", month: "รายเดือน", year: "รายปี" };

  const statsCards = [
    { title: "ยอดขายรวม", value: formatCurrency(stats.totalRevenue), change: stats.revenueChange, up: !stats.revenueChange.startsWith("-") },
    { title: "คำสั่งซื้อวันนี้", value: stats.todayOrders, change: stats.ordersChange, up: !stats.ordersChange.startsWith("-") },
    { title: "ยอดขายเดือนนี้", value: formatCurrency(stats.monthlyRevenue), change: "จากยอดรวม", up: true },
    { title: "คำสั่งซื้อรวม", value: (stats.totalOrders || 0).toString(), change: "ในระบบ", up: true },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ border: "3px solid #f0ede8", borderTop: "3px solid #CAB18B", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#999", fontSize: "14px" }}>กำลังโหลดข้อมูล...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#d14343", fontSize: "14px", marginBottom: "12px" }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: "8px 20px", backgroundColor: "#1A1714", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}
          >
            โหลดใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary title="สถิติโหลดไม่สำเร็จ" message="เกิดข้อผิดพลาดในการแสดงหน้าสถิติ กรุณาลองใหม่อีกครั้ง">
      <div style={{ display: "flex", flexDirection: "column", gap: "28px", fontFamily: "'Inter', sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, margin: 0, color: "#000000", fontFamily: "'Lora', serif" }}>
            ตารางสถิติ
          </h1>
          <p style={{ fontSize: "11px", color: "#999", letterSpacing: "0.2em", margin: "5px 0 0" }}>
            DASHBOARD OVERVIEW
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Period filter */}
          <div style={{ display: "flex", gap: "4px", backgroundColor: "#f5f2ed", borderRadius: "8px", padding: "3px" }}>
            {[
              { label: "สัปดาห์", value: "week" },
              { label: "เดือน",   value: "month" },
              { label: "ปี",      value: "year" },
            ].map((p) => (
              <button
                key={p.value}
                onClick={() => setSelectedPeriod(p.value)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  backgroundColor: selectedPeriod === p.value ? "#1A1714" : "transparent",
                  color: selectedPeriod === p.value ? "#fff" : "#666",
                  transition: "all 0.15s",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <i className="bi bi-search" style={{
              position: "absolute", left: "11px", top: "50%",
              transform: "translateY(-50%)", color: "#aaa", fontSize: "13px",
            }} />
            <input
              type="text"
              placeholder="ค้นหา..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                paddingLeft: "34px", paddingRight: "14px",
                paddingTop: "8px", paddingBottom: "8px",
                border: "1px solid #e4e0d8", borderRadius: "8px",
                backgroundColor: "#ffffff", fontSize: "13px",
                outline: "none", width: "200px", color: "#333",
              }}
            />
          </div>
          <AdminProfile />
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {statsCards.map((c) => (
          <div key={c.title} style={cardStyle}>
            <div style={{ fontSize: "12px", color: "#666", marginBottom: "10px", fontWeight: 500 }}>{c.title}</div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#000", marginBottom: "8px" }}>{c.value}</div>
            <div style={{ fontSize: "12px", color: c.up ? "#22a06b" : "#d14343", fontWeight: 500 }}>
              {c.change}
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Section ── */}
      <div className="chart-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

        {/* Sales Chart */}
        <div style={cardStyle}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "20px", color: "#000" }}>
            ยอดขาย{periodLabels[selectedPeriod]}
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid vertical={false} stroke="#f0ede8" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "#f5f0e8" }}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e4e0d8", fontSize: "13px", backgroundColor: "#fff" }}
                formatter={(v) => [`฿${v.toLocaleString()}`, "ยอดขาย"]}
              />
              <Bar dataKey="sales" fill="#CAB18B" radius={[6, 6, 0, 0]} label={{ position: "top", formatter: (v) => `฿${v.toLocaleString()}`, fill: "#1A1714", fontSize: 11, fontWeight: 500 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie Chart */}
        <div style={cardStyle}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "20px", color: "#000" }}>
            สัดส่วนสถานะคำสั่งซื้อ
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "1px solid #e4e0d8", fontSize: "13px", backgroundColor: "#fff" }}
                formatter={(v) => [v, "จำนวน"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Recent Orders & Summary ── */}
      <div className="bottom-section" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

        {/* Recent Orders Table */}
        <div style={cardStyle}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#000" }}>
            คำสั่งซื้อล่าสุด
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f0ede8" }}>
                  <th style={{ padding: "10px 0", textAlign: "left", color: "#999", fontWeight: 500 }}>เลขที่</th>
                  <th style={{ padding: "10px 0", textAlign: "left", color: "#999", fontWeight: 500 }}>ลูกค้า</th>
                  <th style={{ padding: "10px 0", textAlign: "right", color: "#999", fontWeight: 500 }}>ยอดรวม</th>
                  <th style={{ padding: "10px 0", textAlign: "center", color: "#999", fontWeight: 500 }}>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order, i) => {
                    const s = statusColors[order.status] || statusColors.pending;
                    return (
                      <tr key={order.id} style={{ borderBottom: i < recentOrders.length - 1 ? "1px solid #f8f5f0" : "none" }}>
                        <td style={{ padding: "12px 0", color: "#000", fontWeight: 500 }}>{order.id}</td>
                        <td style={{ padding: "12px 0", color: "#333" }}>{order.customer}</td>
                        <td style={{ padding: "12px 0", textAlign: "right", color: "#000", fontWeight: 600 }}>{order.total}</td>
                        <td style={{ padding: "12px 0", textAlign: "center" }}>{pill(s.bg, s.color, order.status)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: "20px 0", textAlign: "center", color: "#999" }}>
                      ไม่พบรายการ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Status Summary */}
        <div style={cardStyle}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#000" }}>
            สรุปสถานะคำสั่งซื้อ
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {orderStatusData.map((item) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "#000" }}>{item.name}</span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#1A1714" }}>{item.value}</span>
                  </div>
                  <div style={{ height: "6px", backgroundColor: "#f0ede8", borderRadius: "3px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        backgroundColor: item.color,
                        width: `${(item.value / Math.max(...orderStatusData.map(d => d.value), 1)) * 100}%`,
                        transition: "width 0.3s ease"
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Additional Metrics Section ── */}
      <div className="additional-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>

        {/* Average Order Value */}
        <div style={cardStyle}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#000" }}>ค่าเฉลี่ยต่อคำสั่งซื้อ</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            <div style={{ backgroundColor: "#FAF9F6", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "10px", color: "#999", fontWeight: 500, marginBottom: "4px" }}>วันนี้</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1A1714" }}>
                ฿{avgOrderValue.today.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
            </div>
            <div style={{ backgroundColor: "#FAF9F6", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "10px", color: "#999", fontWeight: 500, marginBottom: "4px" }}>เดือนนี้</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1A1714" }}>
                ฿{avgOrderValue.month.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
            </div>
            <div style={{ backgroundColor: "#FAF9F6", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "10px", color: "#999", fontWeight: 500, marginBottom: "4px" }}>ทั้งหมด</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1A1714" }}>
                ฿{avgOrderValue.allTime.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Value */}
        <div style={cardStyle}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#000" }}>มูลค่าสินค้าคงคลัง</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            <div style={{ backgroundColor: "#FAF9F6", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "10px", color: "#999", fontWeight: 500, marginBottom: "4px" }}>มูลค่ารวม</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1A1714" }}>
                ฿{inventoryValue.totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
            </div>
            <div style={{ backgroundColor: "#FAF9F6", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "10px", color: "#999", fontWeight: 500, marginBottom: "4px" }}>จำนวนชิ้น</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1A1714" }}>
                {inventoryValue.totalItems.toLocaleString()}
              </div>
            </div>
            <div style={{ backgroundColor: "#FAF9F6", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "10px", color: "#999", fontWeight: 500, marginBottom: "4px" }}>จำนวนสินค้า</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1A1714" }}>
                {inventoryValue.productCount}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Revenue by Category & Payment Methods ── */}
      <div className="category-payment-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

        {/* Revenue by Category */}
        <div style={cardStyle}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#000" }}>รายได้ตามหมวดหมู่สินค้า</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {revenueByCategory.length > 0 ? (
              revenueByCategory.map((cat) => {
                const maxRevenue = Math.max(...revenueByCategory.map(c => c.revenue), 1);
                const percentage = (cat.revenue / maxRevenue) * 100;
                return (
                  <div key={cat.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 500, color: "#000" }}>{cat.name}</span>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#1A1714" }}>
                        ฿{cat.revenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div style={{ height: "8px", backgroundColor: "#f0ede8", borderRadius: "4px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          backgroundColor: "#CAB18B",
                          width: `${percentage}%`,
                          transition: "width 0.3s ease"
                        }}
                      />
                    </div>
                    <div style={{ fontSize: "10px", color: "#999", marginTop: "2px" }}>
                      {cat.orders} คำสั่งซื้อ
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ fontSize: "12px", color: "#999", textAlign: "center", padding: "20px" }}>ไม่พบข้อมูล</div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div style={cardStyle}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#000" }}>วิธีการชำระเงิน</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {paymentMethods.length > 0 ? (
              paymentMethods.map((pm) => (
                <div key={pm.method} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", fontWeight: 500, color: "#000", marginBottom: "2px" }}>
                      {pm.method}
                    </div>
                    <div style={{ fontSize: "10px", color: "#999" }}>
                      {pm.count} ธุรกรรม ({pm.percentage}%)
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#1A1714", textAlign: "right", minWidth: "70px" }}>
                    ฿{pm.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ fontSize: "12px", color: "#999", textAlign: "center", padding: "20px" }}>ไม่พบข้อมูล</div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .chart-grid  { grid-template-columns: 1fr !important; }
          .bottom-section { grid-template-columns: 1fr !important; }
          .additional-metrics { grid-template-columns: 1fr !important; }
          .category-payment-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 500px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      </div>
    </ErrorBoundary>
  );
};

export default StatisticsPage;
