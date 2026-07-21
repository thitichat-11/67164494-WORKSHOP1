import { useState, useRef, useEffect } from "react";
import AdminProfile from "./admin-ui/AdminProfile";
import AlertModal from "./admin-ui/AlertModal";

const customersData = [
  { id: 1, name: "John Doe",        email: "john.doe@gmail.com",    phone: "081-234-5678", orders: 12, spent: "$4,860", tier: "VIP",    joined: "14 Feb 2025", status: "active" },
  { id: 2, name: "Praewa Suksan",   email: "praewa.s@gmail.com",    phone: "089-112-3345", orders: 7,  spent: "$2,310", tier: "Member", joined: "02 Jun 2025", status: "active" },
  { id: 3, name: "Emma Wilson",     email: "emma.w@mail.com",       phone: "065-779-9021", orders: 3,  spent: "$1,120", tier: "New",    joined: "28 May 2026", status: "suspended" },
  { id: 4, name: "Natthapong Chai", email: "natthapong.c@mail.com", phone: "092-441-7789", orders: 19, spent: "$7,940", tier: "VIP",    joined: "19 Nov 2024", status: "active" },
  { id: 5, name: "Mia Torres",      email: "mia.torres@mail.com",   phone: "098-556-2210", orders: 5,  spent: "$1,860", tier: "Member", joined: "11 Mar 2025", status: "active" },
];

const getTierBadge = (tier) => {
  switch (tier) {
    case "VIP":    return "bg-[#EADCC4] text-[#6D5233]";
    case "Member": return "bg-[#D6E9D3] text-[#3F6D3A]";
    case "New":    return "bg-[#F6DCDB] text-[#8E3D3B]";
    default:       return "bg-gray-100 text-gray-500";
  }
};

const getStatusBadge = (status) => {
  if (status === "active") return "bg-[#E2F1E0] text-[#2D612A]";
  return "bg-[#FAEAEA] text-[#A73937]";
};

function ActionDropdown({ customer, onView, onToggleStatus, onChangeTier, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex justify-center" ref={ref}>
      <button
        className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 text-gray-500"
        onClick={() => setOpen((prev) => !prev)}
      >
        <i className="bi bi-three-dots text-sm" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-[4px] shadow-md z-50 py-1">
          <button
            className="w-full text-left px-4 py-2 text-sm text-[#1A1714] hover:bg-gray-50 flex items-center gap-2"
            onClick={() => { setOpen(false); onView(customer); }}
          >
            <i className="bi bi-eye text-gray-500" /> ดูรายละเอียด
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-[#1A1714] hover:bg-gray-50 flex items-center gap-2"
            onClick={() => { setOpen(false); onToggleStatus(customer); }}
          >
            <i className={"bi " + (customer.status === "active" ? "bi-pause-circle" : "bi-play-circle") + " text-gray-500"} />
            {customer.status === "active" ? "ระงับการใช้งาน" : "เปิดใช้งาน"}
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-[#1A1714] hover:bg-gray-50 flex items-center gap-2"
            onClick={() => { setOpen(false); onChangeTier(customer); }}
          >
            <i className="bi bi-award text-gray-500" /> เปลี่ยนระดับสมาชิก
          </button>
          <hr className="my-1 border-gray-100" />
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            onClick={() => { setOpen(false); onDelete(customer); }}
          >
            <i className="bi bi-trash text-red-500" /> ลบ
          </button>
        </div>
      )}
    </div>
  );
}

export default function Customers() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState(customersData);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: "", message: "", type: "alert" });
  const [tierModalOpen, setTierModalOpen] = useState(false);
  const [tierTarget, setTierTarget] = useState(null);
  const [selectedTier, setSelectedTier] = useState("Member");

  const showAlert = (title, message, type) => {
    if (type === undefined) type = "alert";
    setAlertConfig({ title, message, type });
    setAlertOpen(true);
  };

  const handleView = (customer) => {
    showAlert(
      "รายละเอียดลูกค้า",
      "ชื่อ: " + customer.name + "\nอีเมล: " + customer.email + "\nเบอร์โทร: " + customer.phone + "\nคำสั่งซื้อ: " + customer.orders + " ครั้ง\nยอดใช้จ่าย: " + customer.spent + "\nระดับสมาชิก: " + customer.tier + "\nสถานะ: " + (customer.status === "active" ? "กำลังใช้งาน" : "ระงับการใช้งาน"),
      "alert"
    );
  };

  const handleToggleStatus = (customer) => {
    const newStatus = customer.status === "active" ? "suspended" : "active";
    const label = newStatus === "suspended" ? "ระงับการใช้งาน" : "เปิดใช้งาน";
    setAlertConfig({
      title: "ยืนยันการ" + label,
      message: "คุณแน่ใจหรือไม่ว่าต้องการ" + label + 'ของ "' + customer.name + '"?',
      type: "confirm",
      onConfirmAction: () => {
        setCustomers((prev) =>
          prev.map((c) => (c.id === customer.id ? { ...c, status: newStatus } : c))
        );
        showAlert("ดำเนินการสำเร็จ", label + 'ลูกค้า "' + customer.name + '" เรียบร้อยแล้ว', "alert");
      },
    });
    setAlertOpen(true);
  };

  const handleChangeTier = (customer) => {
    setTierTarget(customer);
    setSelectedTier(customer.tier);
    setTierModalOpen(true);
  };

  const confirmChangeTier = () => {
    if (tierTarget) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === tierTarget.id ? { ...c, tier: selectedTier } : c))
      );
      showAlert("เปลี่ยนระดับสมาชิกสำเร็จ", 'เปลี่ยนระดับสมาชิกของ "' + tierTarget.name + '" เป็น ' + selectedTier + " เรียบร้อยแล้ว", "alert");
    }
    setTierModalOpen(false);
    setTierTarget(null);
  };

  const handleDelete = (customer) => {
    setAlertConfig({
      title: "ยืนยันการลบลูกค้า",
      message: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลของ "' + customer.name + '"? การกระทำนี้ไม่สามารถย้อนกลับได้',
      type: "danger",
      onConfirmAction: () => {
        setCustomers((prev) => prev.filter((c) => c.id !== customer.id));
        showAlert("ลบสำเร็จ", 'ลบข้อมูลของ "' + customer.name + '" เรียบร้อยแล้ว', "alert");
      },
    });
    setAlertOpen(true);
  };

  const handleConfirmWrapper = () => {
    if (alertConfig.onConfirmAction) {
      alertConfig.onConfirmAction();
    }
  };

  return (
    <div className="flex flex-col">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, margin: 0, color: "#000000" }}>ลูกค้าทั้งหมด</h1>
          <p style={{ fontSize: "11px", color: "#999", letterSpacing: "0.2em", margin: "5px 0 0" }}>CUSTOMERS MANAGEMENT</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ position: "relative" }}>
            <i className="bi bi-search" style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#aaa", fontSize: "13px" }} />
            <input
              type="text"
              placeholder="ค้นหาลูกค้า..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "34px", paddingRight: "14px", paddingTop: "8px", paddingBottom: "8px", border: "1px solid #e4e0d8", borderRadius: "8px", backgroundColor: "#ffffff", fontSize: "13px", outline: "none", width: "200px", color: "#333" }}
            />
          </div>
          <AdminProfile />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-[#1A1714]">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="py-4 px-6 font-medium text-gray-500">ลูกค้า</th>
              <th className="py-4 px-6 font-medium text-gray-500">เบอร์โทร</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">คำสั่งซื้อ</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">ยอดใช้จ่าย</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">ระดับสมาชิก</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">สถานะ</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">ลงทะเบียน</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers
              .filter((c) => {
                const q = search.toLowerCase();
                return !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
              })
              .map((customer) => (
                <tr key={customer.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#EEE5D6] flex items-center justify-center text-xs font-bold text-[#5A4B3C] flex-shrink-0">
                        {customer.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{customer.name}</span>
                        <span className="text-xs text-gray-500">{customer.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm">{customer.phone}</td>
                  <td className="py-4 px-6 text-center text-sm">{customer.orders}</td>
                  <td className="py-4 px-6 text-center font-medium text-sm">{customer.spent}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={"px-3 py-1 rounded-full text-xs font-medium " + getTierBadge(customer.tier)}>
                      {customer.tier}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={"px-3 py-1 rounded-full text-xs font-medium " + getStatusBadge(customer.status)}>
                      {customer.status === "active" ? "กำลังใช้งาน" : "ระงับแล้ว"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center text-sm">{customer.joined}</td>
                  <td className="py-4 px-6">
                    <ActionDropdown
                      customer={customer}
                      onView={handleView}
                      onToggleStatus={handleToggleStatus}
                      onChangeTier={handleChangeTier}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ── Tier Change Modal ── */}
      {tierModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 9999,
        }} onClick={() => { setTierModalOpen(false); setTierTarget(null); }}>
          <div style={{
            backgroundColor: "#ffffff", borderRadius: "12px", padding: "28px 32px",
            width: "100%", maxWidth: "400px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1A1714", margin: "0 0 8px", textAlign: "center" }}>
              เปลี่ยนระดับสมาชิก
            </h3>
            <p style={{ fontSize: "13px", color: "#666", textAlign: "center", margin: "0 0 8px" }}>
              {tierTarget?.name}
            </p>
            <div style={{ margin: "20px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
              {["VIP", "Member", "New"].map((t) => (
                <label key={t} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 14px", border: "2px solid " + (selectedTier === t ? "#1A1714" : "#E5E7EB"),
                  borderRadius: "8px", cursor: "pointer", transition: "border-color 0.15s",
                }}>
                  <input
                    type="radio" name="tier" value={t}
                    checked={selectedTier === t}
                    onChange={() => setSelectedTier(t)}
                    style={{ accentColor: "#1A1714" }}
                  />
                  <span className={"px-3 py-0.5 rounded-full text-xs font-medium " + getTierBadge(t)}>{t}</span>
                </label>
              ))}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => { setTierModalOpen(false); setTierTarget(null); }}
                style={{
                  flex: 1, padding: "10px 0", backgroundColor: "#ffffff", color: "#1A1714",
                  border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAF9F6")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              >ยกเลิก</button>
              <button onClick={confirmChangeTier}
                style={{
                  flex: 1, padding: "10px 0", backgroundColor: "#1A1714", color: "#ffffff",
                  border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer",
                }}
              >ยืนยัน</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Alert Modal ── */}
      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleConfirmWrapper}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        confirmText={alertConfig.type === "danger" ? "ลบลูกค้า" : alertConfig.type === "confirm" ? "ยืนยัน" : "ตกลง"}
        cancelText="ยกเลิก"
      />
    </div>
  );
}

