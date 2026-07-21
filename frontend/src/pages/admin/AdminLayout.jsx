import React from "react";
import { NavLink } from "react-router-dom";
import profileImage from "../../assets/hero.png";

const menuItems = [
  { label: "Dashboard",   to: "/Admin/Dashboard", icon: "bi-grid-1x2" },
  { label: "ตารางสถิติ", to: "/Admin/Statistics", icon: "bi-bar-chart-line" },
  { label: "สินค้า",     to: "/Admin/Products",   icon: "bi-box-seam" },
  { label: "ลูกค้า",     to: "/Admin/Customers",  icon: "bi-people" },
  { label: "คำสั่งซื้อ",  to: "/Admin/Orders",     icon: "bi-bag-check" },
];

const AdminLayout = ({ children }) => {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'Inter', 'Noto Sans Thai', sans-serif",
    }}>

      {/* ─── Sidebar ─── */}
      <aside style={{
        width: "260px",
        minWidth: "260px",
        backgroundColor: "#1e1b16",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "32px 22px",
      }}>

        {/* Top: Logo + Nav */}
        <div>
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.08em" }}>SALA</div>
            <div style={{ fontSize: "10px", color: "#6b5e50", letterSpacing: "0.22em", marginTop: "4px" }}>ATELIER ADMIN</div>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  backgroundColor: isActive ? "#3a2e22" : "transparent",
                  color: isActive ? "#ffffff" : "#8a7d6e",
                  transition: "background-color 0.15s, color 0.15s",
                })}
              >
                <i className={`bi ${item.icon}`} style={{ fontSize: "15px" }} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom: User Profile */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          paddingTop: "20px",
          borderTop: "1px solid #2d2620",
        }}>
          <img
            src={profileImage}
            alt="profile"
            style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }}
          />
          <div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>Admin</div>
            <div style={{ fontSize: "11px", color: "#6b5e50" }}>Administrator</div>
          </div>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main style={{
        flex: 1,
        backgroundColor: "#fdfbf7",
        padding: "36px 40px",
        overflowY: "auto",
      }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
