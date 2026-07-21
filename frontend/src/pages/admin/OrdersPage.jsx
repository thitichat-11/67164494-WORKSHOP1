import { useEffect, useMemo, useState, useRef } from "react";
import { adminApi } from "../../api/adminApi";
import AdminProfile from "./admin-ui/AdminProfile";
import AlertModal from "./admin-ui/AlertModal";

// Mock Data
const fallbackOrders = [
  {
    order_id: 1042, id: "#SL-1042", customerName: "Praewa Suksan",
    date: "10 Jul 2026", items: "1 ชิ้น", total: "$900",
    status: "Processing", tracking: "—",
    itemsList: [
      { name: "SALA Girls Don't Cry Dress", qty: 1, price: "$900", color: "Black", size: "M" },
    ],
    shipping: { address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110", phone: "089-112-3345" },
  },
  {
    order_id: 1041, id: "#SL-1041", customerName: "John Doe",
    date: "09 Jul 2026", items: "2 ชิ้น", total: "$480",
    status: "Shipped", tracking: "TH092841",
    itemsList: [
      { name: "SALA Plaid Wool-Blend Jacket", qty: 1, price: "$310", color: "Brown", size: "L" },
      { name: "SALA Silk Wrap Blouse", qty: 1, price: "$170", color: "White", size: "S" },
    ],
    shipping: { address: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500", phone: "081-234-5678" },
  },
  {
    order_id: 1040, id: "#SL-1040", customerName: "Emma Wilson",
    date: "07 Jul 2026", items: "1 ชิ้น", total: "$890",
    status: "Delivered", tracking: "TH092774",
    itemsList: [
      { name: "SALA Patchwork Cotton Shirtdress", qty: 1, price: "$890", color: "Blue", size: "M" },
    ],
    shipping: { address: "789 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310", phone: "065-779-9021" },
  },
  {
    order_id: 1039, id: "#SL-1039", customerName: "Natthapong Chai",
    date: "06 Jul 2026", items: "1 ชิ้น", total: "$310",
    status: "Cancelled", tracking: "—",
    itemsList: [
      { name: "SALA Pleated Midi Skirt", qty: 1, price: "$310", color: "Black", size: "S" },
    ],
    shipping: { address: "321 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400", phone: "092-441-7789" },
  },
  {
    order_id: 1038, id: "#SL-1038", customerName: "Mia Torres",
    date: "04 Jul 2026", items: "3 ชิ้น", total: "$560",
    status: "Delivered", tracking: "TH092810",
    itemsList: [
      { name: "SALA Leather Saddle Bag", qty: 1, price: "$220", color: "Brown", size: "-" },
      { name: "SALA Silk Wrap Blouse", qty: 1, price: "$170", color: "Pink", size: "M" },
      { name: "SALA Girls Don't Cry Dress", qty: 1, price: "$170", color: "White", size: "S" },
    ],
    shipping: { address: "654 ถนนพหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900", phone: "098-556-2210" },
  },
  {
    order_id: 1037, id: "#SL-1037", customerName: "John Doe",
    date: "03 Jul 2026", items: "1 ชิ้น", total: "$410",
    status: "Processing", tracking: "—",
    itemsList: [
      { name: "SALA Silk Wrap Blouse", qty: 1, price: "$410", color: "Red", size: "M" },
    ],
    shipping: { address: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500", phone: "081-234-5678" },
  },
  {
    order_id: 1036, id: "#SL-1036", customerName: "Praewa Suksan",
    date: "01 Jul 2026", items: "2 ชิ้น", total: "$1,240",
    status: "Shipped", tracking: "TH092488",
    itemsList: [
      { name: "SALA Girls Don't Cry Dress", qty: 1, price: "$900", color: "Pink", size: "S" },
      { name: "SALA Leather Saddle Bag", qty: 1, price: "$340", color: "Black", size: "-" },
    ],
    shipping: { address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110", phone: "089-112-3345" },
  },
];

// ── Modal Component: ดูรายการสินค้า ──
function OrderItemsModal({ open, order, onClose }) {
  if (!open || !order) return null;
  const items = order.itemsList || [];

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 9999,
    }} onClick={onClose}>
      <div style={{
        backgroundColor: "#ffffff", borderRadius: "12px", padding: "28px 32px",
        width: "100%", maxWidth: "500px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        maxHeight: "80vh", overflow: "auto",
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1A1714", margin: 0 }}>
            รายการสินค้า — {order.id}
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#999", padding: 0 }}>
            <i className="bi bi-x" />
          </button>
        </div>
        <div style={{ borderBottom: "1px solid #f0ede8", paddingBottom: "8px", marginBottom: "12px", display: "grid", gridTemplateColumns: "2fr 0.5fr 1fr 0.8fr", gap: "8px", fontSize: "11px", color: "#999", fontWeight: 500 }}>
          <div>สินค้า</div>
          <div>จำนวน</div>
          <div>ราคา</div>
          <div>สี/ขนาด</div>
        </div>
        {items.map((item, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "2fr 0.5fr 1fr 0.8fr", gap: "8px",
            padding: "10px 0", borderBottom: i < items.length - 1 ? "1px solid #f8f5f0" : "none",
            fontSize: "13px", color: "#333",
          }}>
            <div style={{ fontWeight: 500, color: "#1A1714" }}>{item.name}</div>
            <div>{item.qty}</div>
            <div>{item.price}</div>
            <div>{item.color} / {item.size}</div>
          </div>
        ))}
        <div style={{ marginTop: "16px", textAlign: "right", fontSize: "15px", fontWeight: 700, color: "#1A1714" }}>
          รวม: {order.total}
        </div>
      </div>
    </div>
  );
}

// ── Modal Component: พิมพ์ใบเสร็จ ──
function ReceiptModal({ open, order, onClose }) {
  if (!open || !order) return null;
  const items = order.itemsList || [];

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 9999,
    }} onClick={onClose}>
      <div style={{
        backgroundColor: "#ffffff", borderRadius: "12px", padding: "32px",
        width: "100%", maxWidth: "400px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.08em" }}>SALA</div>
          <div style={{ fontSize: "10px", color: "#999", letterSpacing: "0.2em", marginTop: "4px" }}>ATELIER</div>
          <div style={{ fontSize: "16px", fontWeight: 600, marginTop: "16px", color: "#1A1714" }}>ใบเสร็จรับเงิน</div>
        </div>
        <div style={{ borderBottom: "1px dashed #ddd", paddingBottom: "12px", marginBottom: "12px", fontSize: "12px", color: "#666" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span>เลขที่:</span><span style={{ fontWeight: 500 }}>{order.id}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span>วันที่:</span><span>{order.date}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>ลูกค้า:</span><span>{order.customerName}</span>
          </div>
        </div>
        <div style={{ borderBottom: "1px dashed #ddd", paddingBottom: "12px", marginBottom: "12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 0.5fr 1fr", gap: "4px", fontSize: "11px", color: "#999", marginBottom: "6px" }}>
            <div>รายการ</div><div>จำนวน</div><div style={{ textAlign: "right" }}>ราคา</div>
          </div>
          {items.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 0.5fr 1fr", gap: "4px", fontSize: "12px", color: "#333", marginBottom: "4px" }}>
              <div>{item.name}</div><div>{item.qty}</div><div style={{ textAlign: "right" }}>{item.price}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 700, color: "#1A1714" }}>
          <span>รวมทั้งสิ้น</span><span>{order.total}</span>
        </div>
        <button onClick={onClose}
          style={{
            width: "100%", marginTop: "20px", padding: "10px 0", backgroundColor: "#1A1714",
            color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer",
          }}
        >ปิด</button>
      </div>
    </div>
  );
}

// ── Modal Component: ข้อมูลจัดส่ง ──
function ShippingModal({ open, order, onClose }) {
  if (!open || !order) return null;
  const sh = order.shipping || {};

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 9999,
    }} onClick={onClose}>
      <div style={{
        backgroundColor: "#ffffff", borderRadius: "12px", padding: "28px 32px",
        width: "100%", maxWidth: "400px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1A1714", margin: "0 0 20px", textAlign: "center" }}>
          ข้อมูลการจัดส่ง
        </h3>
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "11px", color: "#999", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>คำสั่งซื้อ</div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#1A1714" }}>{order.id}</div>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "11px", color: "#999", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>ที่อยู่จัดส่ง</div>
          <div style={{ fontSize: "13px", color: "#333", lineHeight: 1.5 }}>{sh.address || "—"}</div>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "11px", color: "#999", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>เบอร์โทรติดต่อ</div>
          <div style={{ fontSize: "13px", color: "#333" }}>{sh.phone || "—"}</div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", color: "#999", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>เลขติดตามพัสดุ</div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#1A1714" }}>{order.tracking || "—"}</div>
        </div>
        <button onClick={onClose}
          style={{
            width: "100%", padding: "10px 0", backgroundColor: "#1A1714",
            color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer",
          }}
        >ปิด</button>
      </div>
    </div>
  );
}

// ── Action Dropdown ──
function OrderActionDropdown({ order, onViewDetails, onViewItems, onPrintReceipt, onViewShipping, onDelete }) {
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
    <div className="relative flex justify-end" ref={ref}>
      <button
        className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 text-gray-500"
        onClick={() => setOpen((prev) => !prev)}
      >
        <i className="bi bi-three-dots text-sm" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-[4px] shadow-md z-50 py-1">
          <button className="w-full text-left px-4 py-2 text-sm text-[#1A1714] hover:bg-gray-50 flex items-center gap-2"
            onClick={() => { setOpen(false); onViewDetails(order); }}>
            <i className="bi bi-info-circle text-gray-500" /> รายละเอียด
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-[#1A1714] hover:bg-gray-50 flex items-center gap-2"
            onClick={() => { setOpen(false); onViewItems(order); }}>
            <i className="bi bi-box-seam text-gray-500" /> ดูสินค้าในออเดอร์
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-[#1A1714] hover:bg-gray-50 flex items-center gap-2"
            onClick={() => { setOpen(false); onPrintReceipt(order); }}>
            <i className="bi bi-receipt text-gray-500" /> พิมพ์ใบเสร็จ
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-[#1A1714] hover:bg-gray-50 flex items-center gap-2"
            onClick={() => { setOpen(false); onViewShipping(order); }}>
            <i className="bi bi-truck text-gray-500" /> ข้อมูลจัดส่ง
          </button>
          <hr className="my-1 border-gray-100" />
          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            onClick={() => { setOpen(false); onDelete(order); }}>
            <i className="bi bi-trash text-red-500" /> ลบ
          </button>
        </div>
      )}
    </div>
  );
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState("ทั้งหมด");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: "", message: "", type: "alert" });
  const [itemsModal, setItemsModal] = useState({ open: false, order: null });
  const [receiptModal, setReceiptModal] = useState({ open: false, order: null });
  const [shippingModal, setShippingModal] = useState({ open: false, order: null });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        if (!mounted) return;
        setIsLoading(true);
        const res = await adminApi.get("/api/orders");
        if (!mounted) return;
        const ordersData = Array.isArray(res.data) ? res.data : [];
        setOrders(ordersData.length > 0 ? ordersData : fallbackOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        if (!mounted) return;
        setOrders(fallbackOrders);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const showAlert = (title, message, type) => {
    if (type === undefined) type = "alert";
    setAlertConfig({ title, message, type });
    setAlertOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Processing": return "bg-[#FAEBD9] text-[#A6713B]";
      case "Shipped":    return "bg-[#EEF4ED] text-[#3C7741]";
      case "Delivered":  return "bg-[#E2F1E0] text-[#2D612A]";
      case "Cancelled":  return "bg-[#FAEAEA] text-[#A73937]";
      default:           return "bg-gray-100 text-gray-500";
    }
  };

  const statusMap = useMemo(() => ({
    ทั้งหมด: null,
    ดำเนินการ: "Processing",
    จัดส่ง: "Shipped",
    ยกเลิก: "Cancelled",
    "จัดส่งเสร็จ": "Delivered",
  }), []);

  const filteredOrders = useMemo(() => {
    const desired = statusMap[activeTab] ?? null;
    return orders.filter((o) => {
      const status = o.status || o.order_status || o.state;
      if (!desired) return true;
      return status === desired;
    });
  }, [orders, activeTab, statusMap]);

  const normalizeRow = (order) => {
    const rowStatus = order.order_status || order.status || order.state;
    const displayStatus = {
      'pending': 'Processing',
      'shipped': 'Shipped',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    }[rowStatus] || rowStatus;

    return {
      key: order.id || `#SL-${order.order_id}` || `${order.customer}-${order.date}`,
      id: order.id || `#SL-${order.order_id}`,
      customer: order.customer || order.customerName,
      date: order.date,
      items: order.itemsList?.length || order.items?.length || 0,
      total: order.total,
      status: displayStatus,
      tracking: order.tracking || '—',
    };
  };

  const tabs = [
    { key: "ทั้งหมด", label: "ทั้งหมด" },
    { key: "ดำเนินการ", label: "ดำเนินการ" },
    { key: "จัดส่ง", label: "จัดส่ง" },
    { key: "ยกเลิก", label: "ยกเลิก" },
    { key: "จัดส่งเสร็จ", label: "จัดส่งเสร็จ" },
  ];

  const handleViewDetails = (order) => {
    const r = normalizeRow(order);
    showAlert(
      "รายละเอียดคำสั่งซื้อ",
      "เลขคำสั่งซื้อ: " + r.id + "\nลูกค้า: " + r.customer + "\nวันที่: " + r.date + "\nยอดรวม: " + r.total + "\nสถานะ: " + r.status + "\nเลขติดตาม: " + r.tracking,
      "alert"
    );
  };

  const handleDelete = (order) => {
    setAlertConfig({
      title: "ยืนยันการลบคำสั่งซื้อ",
      message: 'คุณแน่ใจหรือไม่ว่าต้องการลบคำสั่งซื้อ ' + (order.id || order.order_id) + '? การกระทำนี้ไม่สามารถย้อนกลับได้',
      type: "danger",
      onConfirmAction: () => {
        setOrders((prev) => prev.filter((o) => (o.id || o.order_id) !== (order.id || order.order_id)));
        showAlert("ลบสำเร็จ", "ลบคำสั่งซื้อ " + (order.id || order.order_id) + " เรียบร้อยแล้ว", "alert");
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
    <div>
      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, margin: 0, color: "#000000" }}>คำสั่งซื้อ</h1>
          <p style={{ fontSize: "11px", color: "#999", letterSpacing: "0.2em", margin: "5px 0 0" }}>ORDERS MANAGEMENT</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ position: "relative" }}>
            <i className="bi bi-search" style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#aaa", fontSize: "13px" }} />
            <input type="text" placeholder="ค้นหา..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ paddingLeft: "34px", paddingRight: "14px", paddingTop: "8px", paddingBottom: "8px", border: "1px solid #e4e0d8", borderRadius: "8px", backgroundColor: "#ffffff", fontSize: "13px", outline: "none", width: "200px", color: "#333" }} />
          </div>
          <AdminProfile />
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={"px-5 py-1.5 rounded-full text-sm font-medium transition-colors " + (activeTab === tab.key ? "bg-[#CAB18B] text-white" : "bg-white text-[#1A1714] border border-gray-200 hover:bg-gray-50")}
          >{tab.label}</button>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-[#1A1714]">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">เลขคำสั่งซื้อ</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">ลูกค้า</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">วันที่</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">จำนวน</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">ยอดรวม</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">สถานะ</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-center">เลขติดตาม</th>
              <th className="py-4 px-6 font-medium text-gray-500 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr><td colSpan={8} className="py-10 text-center text-gray-500">กำลังโหลด...</td></tr>
            ) : (
              filteredOrders.map((order) => {
                const row = normalizeRow(order);
                return (
                  <tr key={row.key} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6 text-center font-medium">{row.id}</td>
                    <td className="py-4 px-6 text-center">{row.customer}</td>
                    <td className="py-4 px-6 text-center">{row.date || "—"}</td>
                    <td className="py-4 px-6 text-center">{typeof row.items === "number" ? `${row.items} ชิ้น` : (row.items || "—")}</td>
                    <td className="py-4 px-6 text-center font-medium">{row.total}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={"px-3 py-1 rounded-full text-xs font-medium " + getStatusBadge(row.status)}>{row.status}</span>
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500">{row.tracking}</td>
                    <td className="py-4 px-6 text-right">
                      <OrderActionDropdown
                        order={order}
                        onViewDetails={handleViewDetails}
                        onViewItems={(o) => setItemsModal({ open: true, order: o })}
                        onPrintReceipt={(o) => setReceiptModal({ open: true, order: o })}
                        onViewShipping={(o) => setShippingModal({ open: true, order: o })}
                        onDelete={handleDelete}
                      />
                    </td>
                  </tr>
                );
              })
            )}
            {!isLoading && filteredOrders.length === 0 && (
              <tr><td colSpan={8} className="py-10 text-center text-gray-500">ไม่พบรายการคำสั่งซื้อ</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Modals ── */}
      <OrderItemsModal open={itemsModal.open} order={itemsModal.order} onClose={() => setItemsModal({ open: false, order: null })} />
      <ReceiptModal open={receiptModal.open} order={receiptModal.order} onClose={() => setReceiptModal({ open: false, order: null })} />
      <ShippingModal open={shippingModal.open} order={shippingModal.order} onClose={() => setShippingModal({ open: false, order: null })} />

      {/* ── Alert Modal ── */}
      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleConfirmWrapper}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        confirmText={alertConfig.type === "danger" ? "ลบคำสั่งซื้อ" : alertConfig.type === "confirm" ? "ยืนยัน" : "ตกลง"}
        cancelText="ยกเลิก"
      />
    </div>
  );
}

