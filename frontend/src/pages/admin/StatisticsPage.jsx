import { useState, useEffect } from "react";
import AdminProfile from "./admin-ui/AdminProfile";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, LineChart, Line,
  PieChart, Pie, Cell, Legend, AreaChart, Area, Label
} from "recharts";
import {
  fetchDashboardStats,
  fetchSalesData,
  fetchRecentOrders,
  fetchOrderStatus,
} from "../../api/adminApi";

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "20px 22px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};

const StatisticsPage = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesData, setSalesData] = useState([
    { label: 'จันทร์', sales: 2400 },
    { label: 'อังคาร', sales: 1398 },
    { label: 'พุธ', sales: 9800 },
    { label: 'พฤหัสบดี', sales: 3908 },
    { label: 'ศุกร์', sales: 4800 },
    { label: 'เสาร์', sales: 3800 },
    { label: 'อาทิตย์', sales: 4300 },
  ]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    revenueChange: "+0%",
    todayOrders: 0,
    ordersChange: "0",
  });

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
        const [statsData, salesData, ordersData, statusData] = await Promise.all([
          fetchDashboardStats(),
          fetchSalesData("week"),
          fetchRecentOrders(),
          fetchOrderStatus(),
        ]);
        setStats(statsData);
        setSalesData(salesData.data || []);
        setRecentOrders(ordersData);
        setOrderStatusData(statusData.data || []);
      } catch (err) {
        console.error("Failed to load statistics:", err);
        setError("ไม่สามารถโหลดข้อมูลสถิติได้");
      } finally {
        setLoading(false);
      }
    };
    loadStatistics();
  }, []);

  const statsCards = [
    { title: "ยอดขายรวม", value: formatCurrency(stats.totalRevenue), change: stats.revenueChange, up: !stats.revenueChange.startsWith("-") },
    { title: "คำสั่งซื้อวันนี้", value: stats.todayOrders, change: stats.ordersChange, up: !stats.ordersChange.startsWith("-") },
    { title: "ยอดขายเดือนนี้", value: formatCurrency(stats.monthlyRevenue), change: "จากยอดรวม", up: true },
    { title: "คำสั่งซื้อรวม", value: recentOrders.length.toString(), change: "ในระบบ", up: true },
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
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, margin: 0, color: "#000000" }}>
            ตารางสถิติ
          </h1>
          <p style={{ fontSize: "11px", color: "#999", letterSpacing: "0.2em", margin: "5px 0 0" }}>
            DASHBOARD OVERVIEW
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
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
            ยอดขายรายสัปดาห์
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
              <Bar dataKey="sales" fill="#CAB18B" radius={[6, 6, 0, 0]}>
                <Label dataKey="sales" position="top" formatter={(v) => `฿${v.toLocaleString()}`} fill="#1A1714" fontSize={11} fontWeight={500} />
              </Bar>
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
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order, i) => (
                    <tr key={order.id} style={{ borderBottom: i < recentOrders.length - 1 ? "1px solid #f8f5f0" : "none" }}>
                      <td style={{ padding: "12px 0", color: "#000", fontWeight: 500 }}>{order.id}</td>
                      <td style={{ padding: "12px 0", color: "#333" }}>{order.customer}</td>
                      <td style={{ padding: "12px 0", textAlign: "right", color: "#000", fontWeight: 600 }}>{order.total}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ padding: "20px 0", textAlign: "center", color: "#999" }}>
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

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .chart-grid  { grid-template-columns: 1fr !important; }
          .bottom-section { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 500px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default StatisticsPage;
