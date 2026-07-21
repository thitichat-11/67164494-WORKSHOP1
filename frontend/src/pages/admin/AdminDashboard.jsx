import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminProfile from "./admin-ui/AdminProfile";
import ErrorBoundary from "../../components/ErrorBoundary";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, PieChart, Pie, Cell,
  LineChart, Line, Legend
} from "recharts";
import {
  fetchDashboardStats,
  fetchSalesData,
  fetchOrderStatus,
  fetchRecentOrders,
  fetchTopProducts,
  fetchRevenueByCategory,
  fetchTopCustomers,
  fetchPaymentMethodStats,
  fetchInventoryValue,
  fetchAverageOrderValue,
} from "../../api/adminApi";

const statusColors = {
  Processing: { bg: "#FAEBD9", color: "#A6713B" },
  Shipped:    { bg: "#EEF4ED", color: "#3C7741" },
  Delivered:  { bg: "#E2F1E0", color: "#2D612A" },
  Cancelled:  { bg: "#FAEAEA", color: "#A73937" },
  pending: { bg: "#FAEBD9", color: "#A6713B" },
  shipped: { bg: "#EEF4ED", color: "#3C7741" },
  delivered: { bg: "#E2F1E0", color: "#2D612A" },
  cancelled: { bg: "#FAEAEA", color: "#A73937" },
  completed: { bg: "#E2F1E0", color: "#2D612A" },
  refunded:  { bg: "#FAF9F6", color: "#CAB18B" },
};

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "20px 22px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};

const pill = (bg, color, label) => (
  <span style={{ padding: "4px 10px", borderRadius: 9999, backgroundColor: bg, color, fontSize: 12, fontWeight: 500 }}>
    {label}
  </span>
);

const iconMap = {
  "bi-graph-up-arrow": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  "bi-cart-check": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  ),
  "bi-people": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  "bi-box-seam": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  "bi-clock-history": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  "bi-exclamation-triangle": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    revenueChange: "+0%",
    todayOrders: 0,
    ordersChange: "0",
    totalCustomers: 0,
    newCustomersThisMonth: 0,
    totalProducts: 0,
    outOfStockProducts: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    totalOrders: 0,
  });
  const [salesChart, setSalesChart] = useState({ data: [], total: 0 });
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [orderStatusTotal, setOrderStatusTotal] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [revenueByCategory, setRevenueByCategory] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [inventoryValue, setInventoryValue] = useState({ totalValue: 0, totalItems: 0, productCount: 0 });
  const [avgOrderValue, setAvgOrderValue] = useState({ today: 0, month: 0, allTime: 0 });

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const [statsData, salesData, statusData, ordersData, productsData, categoryData, customersData, paymentData, inventoryData, avgOrderData] = await Promise.all([
          fetchDashboardStats(),
          fetchSalesData(selectedPeriod),
          fetchOrderStatus(),
          fetchRecentOrders(),
          fetchTopProducts(),
          fetchRevenueByCategory(),
          fetchTopCustomers(),
          fetchPaymentMethodStats(),
          fetchInventoryValue(),
          fetchAverageOrderValue(),
        ]);

        // Ensure all values have fallbacks
        setStats({
          totalRevenue: statsData?.totalRevenue ?? 0,
          monthlyRevenue: statsData?.monthlyRevenue ?? 0,
          revenueChange: statsData?.revenueChange ?? "+0%",
          todayOrders: statsData?.todayOrders ?? 0,
          ordersChange: statsData?.ordersChange ?? "0",
          totalCustomers: statsData?.totalCustomers ?? 0,
          newCustomersThisMonth: statsData?.newCustomersThisMonth ?? 0,
          totalProducts: statsData?.totalProducts ?? 0,
          outOfStockProducts: statsData?.outOfStockProducts ?? 0,
          pendingOrders: statsData?.pendingOrders ?? 0,
          lowStockProducts: statsData?.lowStockProducts ?? 0,
          totalOrders: statsData?.totalOrders ?? 0,
        });
        setSalesChart(salesData || { data: [], total: 0 });
        setOrderStatusData(statusData?.data || []);
        setOrderStatusTotal(statusData?.total || 0);
        setRecentOrders(ordersData || []);
        setTopProducts(productsData || []);
        setRevenueByCategory(categoryData?.data || []);
        setTopCustomers(customersData || []);
        setPaymentMethods(paymentData || []);
        setInventoryValue(inventoryData || { totalValue: 0, totalItems: 0, productCount: 0 });
        setAvgOrderValue(avgOrderData || { today: 0, month: 0, allTime: 0 });
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        setError(err.response?.data?.message || "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่อ");
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, [selectedPeriod]);

  const formatCurrency = (value) => {
    const num = Number(value);
    if (num >= 1000000) return `฿${(num / 1000000).toFixed(1)}M`;
    return `฿${num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const summaryCards = [
    {
      title: "รายได้รวม",
      value: formatCurrency(stats.totalRevenue),
      change: `${stats.revenueChange} จากเดือนก่อน`,
      up: !stats.revenueChange.startsWith("-"),
      icon: "bi-graph-up-arrow",
    },
    {
      title: "คำสั่งซื้อวันนี้",
      value: stats.todayOrders.toString(),
      change: `${stats.ordersChange} จากเมื่อวาน`,
      up: !stats.ordersChange.startsWith("-") && stats.ordersChange !== "0",
      icon: "bi-cart-check",
    },
    {
      title: "ลูกค้าทั้งหมด",
      value: stats.totalCustomers.toLocaleString(),
      change: `+${stats.newCustomersThisMonth} ใหม่เดือนนี้`,
      up: true,
      icon: "bi-people",
    },
    {
      title: "สินค้าทั้งหมด",
      value: stats.totalProducts.toString(),
      change: `${stats.outOfStockProducts} รายการหมดสต็อก`,
      up: null,
      icon: "bi-box-seam",
    },
    {
      title: "ออเดอร์รอดำเนินการ",
      value: stats.pendingOrders.toString(),
      change: "รอการยืนยัน",
      up: null,
      icon: "bi-clock-history",
    },
    {
      title: "สินค้าใกล้หมด",
      value: stats.lowStockProducts.toString(),
      change: "ต้องการเติมสต็อก",
      up: false,
      icon: "bi-exclamation-triangle",
    },
  ];

  const getChartData = () => {
    const data = salesChart.data || [];
    const total = salesChart.total || 0;
    switch (selectedPeriod) {
      case "month": return { data, title: "ยอดขายรายเดือน", total: formatCurrency(total) };
      case "year":  return { data, title: "ยอดขายรายปี",    total: formatCurrency(total) };
      default:      return { data, title: "ยอดขายรายสัปดาห์", total: formatCurrency(total) };
    }
  };

  const chartInfo = getChartData();

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
    <ErrorBoundary title="Dashboard โหลดไม่สำเร็จ" message="เกิดข้อผิดพลาดในการแสดงแดชบอร์ด กรุณาลองใหม่อีกครั้ง">
      <div style={{ fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column", gap: "28px" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, margin: 0, color: "#000000", fontFamily: "'Lora', serif" }}>Dashboard</h1>
            <p style={{ fontSize: "11px", color: "#999", letterSpacing: "0.2em", margin: "5px 0 0" }}>ADMIN OVERVIEW</p>
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
              <i className="bi bi-search" style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#aaa", fontSize: "13px" }} />
              <input
                type="text"
                placeholder="ค้นหา..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: "34px", paddingRight: "14px", paddingTop: "8px", paddingBottom: "8px", border: "1px solid #e4e0d8", borderRadius: "8px", backgroundColor: "#ffffff", fontSize: "13px", outline: "none", width: "200px", color: "#333" }}
              />
            </div>
            <AdminProfile />
          </div>
        </div>

        {/* ── Summary Cards (6 Cards) ── */}
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {summaryCards.map((c) => (
            <div key={c.title} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ fontSize: "12px", color: "#666", fontWeight: 500 }}>{c.title}</div>
                <div style={{ color: c.up === true ? "#22a06b" : c.up === false ? "#d14343" : "#CAB18B", width: "32px", height: "32px", borderRadius: "8px", backgroundColor: c.up === true ? "#EEF4ED" : c.up === false ? "#FAEAEA" : "#FAF9F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {iconMap[c.icon]}
                </div>
              </div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#000", marginBottom: "6px" }}>{c.value}</div>
              <div style={{ fontSize: "12px", color: c.up === true ? "#22a06b" : c.up === false ? "#d14343" : "#999" }}>
                {c.change}
              </div>
            </div>
          ))}
        </div>

        {/* ── Chart Row: Bar Chart + Pie Chart ── */}
        <div className="chart-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "20px" }}>

          {/* Bar Chart */}
          <div style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "#000" }}>{chartInfo.title}</div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "#1A1714" }}>{chartInfo.total}</div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartInfo.data} barSize={28} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f0ede8" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "#f5f0e8" }}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e4e0d8", fontSize: "13px", backgroundColor: "#fff" }}
                  formatter={(v) => [typeof v === 'number' ? `฿${v.toLocaleString()}` : v, "ยอดขาย"]}
                />
                <Bar dataKey="sales" fill="#CAB18B" radius={[6, 6, 0, 0]} label={{ position: "top", formatter: (v) => typeof v === 'number' ? `฿${v.toLocaleString()}` : v, fill: "#1A1714", fontSize: 11, fontWeight: 500 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Order Status */}
          <div style={cardStyle}>
            <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "12px", color: "#000" }}>
              สถานะคำสั่งซื้อ
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={60}
                    dataKey="value"
                    stroke="none"
                    isAnimationActive={false}
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || '#CAB18B'} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e4e0d8", fontSize: "13px", backgroundColor: "#fff" }}
                    formatter={(v, name) => [v, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                {orderStatusData.map((item) => (
                  <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: item.color }} />
                      <span style={{ fontSize: "12px", color: "#666" }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#1A1714" }}>{item.value}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #f0ede8", paddingTop: "8px", marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "#666", fontWeight: 500 }}>รวมทั้งหมด</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#1A1714" }}>{orderStatusTotal}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Row: Recent Orders + Top Products ── */}
        <div className="bottom-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "20px" }}>

          {/* Recent Orders */}
          <div style={cardStyle}>
            <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#000" }}>คำสั่งซื้อล่าสุด</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1.5fr", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #f0ede8", marginBottom: "4px" }}>
              {["เลขคำสั่งซื้อ", "ลูกค้า", "ยอดรวม", "สถานะ"].map((h) => (
                <div key={h} style={{ fontSize: "11px", color: "#999", fontWeight: 500 }}>{h}</div>
              ))}
            </div>
            {recentOrders.map((o, i) => {
              const s = statusColors[o.status] ?? { bg: "#FAF9F6", color: "#666" };
              return (
                <div
                  key={o.id}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1.5fr", gap: "8px", padding: "12px 0", borderBottom: i < recentOrders.length - 1 ? "1px solid #f8f5f0" : "none", alignItems: "center" }}
                >
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "#000" }}>{o.id}</div>
                  <div style={{ fontSize: "12px", color: "#333" }}>{o.customer}</div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#000" }}>{o.total}</div>
                  <div>{pill(s.bg, s.color, o.status)}</div>
                </div>
              );
            })}
          </div>

          {/* Top Products */}
          <div style={cardStyle}>
            <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#000" }}>สินค้าขายดีที่สุด</div>
            {topProducts.map((p, i) => (
              <div
                key={p.name}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: i === 0 ? 0 : "12px", paddingBottom: "12px", borderBottom: i < topProducts.length - 1 ? "1px solid #f0ede8" : "none" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#CAB18B", flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "12px", fontWeight: 500, color: "#000", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                    <div style={{ fontSize: "10px", color: "#999", marginTop: "2px" }}>ขายแล้ว {p.sold} ชิ้น</div>
                  </div>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#000", flexShrink: 0 }}>{p.revenue}</div>
              </div>
            ))}
            <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f0ede8" }}>
              <button
                style={{ width: "100%", padding: "8px 0", backgroundColor: "#FAF9F6", border: "1px solid #eee7da", borderRadius: "8px", fontSize: "12px", color: "#666", cursor: "pointer", transition: "background-color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0ece4")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FAF9F6")}
                onClick={() => navigate("/Admin/Products")}
              >
                ดูสินค้าทั้งหมด →
              </button>
            </div>
          </div>

        </div>

        {/* ── Additional Metrics Row ── */}
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
        <div className="category-payment-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px" }}>

          {/* Revenue by Category */}
          <div style={cardStyle}>
            <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#000" }}>รายได้ตามหมวดหมู่สินค้า</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {revenueByCategory.length > 0 ? (
                revenueByCategory.map((cat, i) => {
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

        {/* ── Top Customers ── */}
        <div style={cardStyle}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#000" }}>ลูกค้าที่มีการใช้จ่ายมากที่สุด</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #f0ede8", marginBottom: "4px" }}>
            {["ลูกค้า", "อีเมล", "คำสั่งซื้อ", "ยอดใช้จ่าย", ""].map((h) => (
              <div key={h} style={{ fontSize: "11px", color: "#999", fontWeight: 500 }}>{h}</div>
            ))}
          </div>
          {topCustomers.length > 0 ? (
            topCustomers.map((c, i) => (
              <div
                key={c.email}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "8px", padding: "12px 0", borderBottom: i < topCustomers.length - 1 ? "1px solid #f8f5f0" : "none", alignItems: "center" }}
              >
                <div style={{ fontSize: "12px", fontWeight: 500, color: "#000" }}>{c.name}</div>
                <div style={{ fontSize: "12px", color: "#666", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {c.email}
                </div>
                <div style={{ fontSize: "12px", color: "#333" }}>{c.orders}</div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#1A1714" }}>{c.spent}</div>
                <div></div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: "12px", color: "#999", textAlign: "center", padding: "20px" }}>ไม่พบข้อมูล</div>
          )}
        </div>


        <style>{`
          @media (max-width: 1100px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .chart-grid  { grid-template-columns: 1fr !important; }
            .bottom-grid { grid-template-columns: 1fr !important; }
            .additional-metrics { grid-template-columns: 1fr !important; }
            .category-payment-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 600px) {
            .stats-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashboard;
