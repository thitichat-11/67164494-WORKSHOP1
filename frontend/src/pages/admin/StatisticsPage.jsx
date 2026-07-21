import { useState } from "react";
import AdminProfile from "./admin-ui/AdminProfile";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip,
} from "recharts";

const weeklyData = [
  { day: "จ",  sales: 3200 },
  { day: "อ",  sales: 4100 },
  { day: "พ",  sales: 2800 },
  { day: "พฤ", sales: 5200 },
  { day: "ศ",  sales: 4800 },
  { day: "ส",  sales: 3900 },
  { day: "อา", sales: 2100 },
];

const recentOrders = [
  { name: "Praewa Suksan",  orderId: "#SOL-1042", amount: "$900" },
  { name: "John Doe",       orderId: "#SOL-1041", amount: "$1,200" },
  { name: "Emma Wilson",    orderId: "#SOL-1040", amount: "$650" },
  { name: "Anan Phomma",   orderId: "#SOL-1039", amount: "$2,100" },
  { name: "Narin Chaiwan", orderId: "#SOL-1038", amount: "$480" },
];

const statsCards = [
  { title: "ยอดขายรวม",       value: "$4,120", change: "+12.4%", up: true  },
  { title: "จำนวนคำสั่งซื้อ",   value: "138",    change: "+8.2%",  up: true  },
  { title: "ลูกค้าใหม่",        value: "24",     change: "-3.1%",  up: false },
  { title: "อัตรา Conversion",  value: "3.6%",   change: "+0.5%",  up: true  },
];

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "20px 22px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};

const StatisticsPage = () => {
  const [search, setSearch] = useState("");

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
            <div style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>{c.title}</div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#000", marginBottom: "8px" }}>{c.value}</div>
            <div style={{ fontSize: "12px", color: c.up ? "#22a06b" : "#d14343" }}>
              {c.change} จากเดือนก่อน
            </div>
          </div>
        ))}
      </div>

      {/* ── Chart + Recent Orders ── */}
      <div className="chart-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>

        <div style={cardStyle}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "20px", color: "#000" }}>
            ยอดขายรายสัปดาห์
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} barSize={30} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#f0ede8" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "#f5f0e8" }}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e4e0d8", fontSize: "13px" }}
                formatter={(v) => [`$${v.toLocaleString()}`, "ยอดขาย"]}
              />
              <Bar dataKey="sales" fill="#ebdfc9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#000" }}>
            คำสั่งซื้อล่าสุด
          </div>
          {recentOrders.map((order, i) => (
            <div
              key={order.orderId}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: i === 0 ? 0 : "14px",
                paddingBottom: "14px",
                borderBottom: i < recentOrders.length - 1 ? "1px solid #f0ede8" : "none",
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "#000" }}>{order.name}</div>
                <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>{order.orderId}</div>
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#000" }}>{order.amount}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .chart-grid  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 500px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default StatisticsPage;
