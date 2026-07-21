import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AdminProfile from "./admin-ui/AdminProfile";
import AlertModal from "./admin-ui/AlertModal";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../../api/adminApi";

const adminTabs = [
  { label: "รายการสินค้า",    to: "/Admin/Products"   },
  { label: "จัดการหมวดหมู่", to: "/Admin/Category"   },
  { label: "เพิ่มสินค้า",    to: "/Admin/AddProduct" },
];

export default function CategoryPage() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: "", message: "", type: "alert" });

  // Edit Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editName, setEditName] = useState("");

  // Add Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addName, setAddName] = useState("");

  // Load categories from API
  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const cats = await fetchCategories();
      setCategories(Array.isArray(cats) ? cats : []);
    } catch {
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = categories.filter((cat) => {
    const q = search.toLowerCase().trim();
    return !q || (cat.category_name || "").toLowerCase().includes(q);
  });

  const showAlert = (title, message, type) => {
    if (type === undefined) type = "alert";
    setAlertConfig({ title, message, type });
    setAlertOpen(true);
  };

  // ── Edit ──
  const handleEditClick = (cat) => {
    setEditTarget(cat);
    setEditName(cat.category_name);
    setEditModalOpen(true);
  };

  const saveEdit = async () => {
    if (!editTarget || !editName.trim()) return;

    try {
      const res = await updateCategory(editTarget.category_id, {
        category_name: editName.trim(),
      });
      setCategories((prev) =>
        prev.map((c) =>
          c.category_id === editTarget.category_id
            ? { ...c, category_name: editName.trim() }
            : c
        )
      );
      showAlert("แก้ไขสำเร็จ", 'เปลี่ยนชื่อหมวดหมู่เป็น "' + editName.trim() + '" เรียบร้อยแล้ว', "alert");
    } catch (err) {
      showAlert("เกิดข้อผิดพลาด", "ไม่สามารถแก้ไขหมวดหมู่ได้: " + (err.response?.data?.message || err.message), "alert");
    }
    setEditModalOpen(false);
    setEditTarget(null);
    setEditName("");
  };

  // ── Add ──
  const handleAddClick = () => {
    setAddName("");
    setAddModalOpen(true);
  };

  const saveAdd = async () => {
    if (!addName.trim()) return;

    try {
      const res = await createCategory({ category_name: addName.trim() });
      // Reload to get fresh data
      await loadCategories();
      showAlert("เพิ่มสำเร็จ", 'เพิ่มหมวดหมู่ "' + addName.trim() + '" เรียบร้อยแล้ว', "alert");
    } catch (err) {
      showAlert("เกิดข้อผิดพลาด", "ไม่สามารถเพิ่มหมวดหมู่ได้: " + (err.response?.data?.message || err.message), "alert");
    }
    setAddModalOpen(false);
    setAddName("");
  };

  // ── Delete ──
  const handleDeleteClick = (cat) => {
    setAlertConfig({
      title: "ยืนยันการลบหมวดหมู่",
      message: 'คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่ "' + cat.category_name + '"? การกระทำนี้ไม่สามารถย้อนกลับได้',
      type: "danger",
      onConfirmAction: async () => {
        try {
          await deleteCategory(cat.category_id);
          setCategories((prev) => prev.filter((c) => c.category_id !== cat.category_id));
          showAlert("ลบสำเร็จ", 'ลบหมวดหมู่ "' + cat.category_name + '" เรียบร้อยแล้ว', "alert");
        } catch (err) {
          showAlert("เกิดข้อผิดพลาด", "ไม่สามารถลบหมวดหมู่ได้: " + (err.response?.data?.message || err.message), "alert");
        }
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
          <h1 style={{ fontSize: "26px", fontWeight: 700, margin: 0, color: "#000000" }}>จัดการหมวดหมู่</h1>
          <p style={{ fontSize: "11px", color: "#999", letterSpacing: "0.2em", margin: "5px 0 0" }}>CATEGORY MANAGEMENT</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ position: "relative" }}>
            <i className="bi bi-search" style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#aaa", fontSize: "13px" }} />
            <input
              type="text"
              placeholder="ค้นหาหมวดหมู่..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "34px", paddingRight: "14px", paddingTop: "8px", paddingBottom: "8px", border: "1px solid #e4e0d8", borderRadius: "8px", backgroundColor: "#ffffff", fontSize: "13px", outline: "none", width: "200px", color: "#333" }}
            />
          </div>
          <AdminProfile />
        </div>
      </div>

      {/* ─── Tab Navigation ─── */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          {adminTabs.map((tab) => {
            const isActive = tab.to === "/Admin/Category";
            return (
              <NavLink key={tab.to} to={tab.to}
                className={"text-sm font-medium rounded-[4px] px-6 py-[10px] transition-colors no-underline " + (isActive ? "bg-[#1A1714] text-white" : "bg-white text-[#1A1714] border border-[#E5E7EB] hover:bg-gray-50")}
              >{tab.label}</NavLink>
            );
          })}
        </div>
        <button className="bg-[#1A1714] text-white px-4 py-2 rounded text-sm flex items-center gap-2" onClick={handleAddClick}>
          <i className="bi bi-plus" /> เพิ่มหมวดหมู่
        </button>
      </div>

      {/* ── Table ── */}
      <div className="w-full bg-white rounded-sm overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
        <div className="grid items-center py-3 px-4 bg-[#FAF9F6] border-b border-gray-200 text-sm font-medium text-[#666]" style={{ gridTemplateColumns: "5% 80% 15%" }}>
          <div>#</div>
          <div>ชื่อหมวดหมู่</div>
          <div></div>
        </div>
        {isLoading ? (
          <div className="p-8 text-center text-gray-500 text-sm">กำลังโหลด...</div>
        ) : filteredCategories.length > 0 ? filteredCategories.map((cat) => (
          <div key={cat.category_id} className="grid items-center py-4 border-b border-gray-100 hover:bg-[#FAF9F6] transition-colors" style={{ gridTemplateColumns: "5% 80% 15%" }}>
            <div className="px-4 text-xs text-gray-400 font-mono">#{cat.category_id}</div>
            <div className="font-medium text-[#1A1714] text-sm">{cat.category_name}</div>
            <div className="flex gap-3 justify-end px-4">
              <button className="w-8 h-8 flex items-center justify-center border rounded-sm hover:bg-gray-50"
                onClick={() => handleEditClick(cat)}
              ><i className="bi bi-pencil text-gray-500 text-sm" /></button>
              <button className="w-8 h-8 flex items-center justify-center border rounded-sm hover:bg-red-50 text-red-500"
                onClick={() => handleDeleteClick(cat)}
              ><i className="bi bi-trash text-sm" /></button>
            </div>
          </div>
        )) : (
          <div className="p-8 text-center text-gray-500 text-sm">ไม่พบหมวดหมู่ที่ค้นหา</div>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {editModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 9999,
        }} onClick={() => { setEditModalOpen(false); setEditTarget(null); }}>
          <div style={{
            backgroundColor: "#ffffff", borderRadius: "12px", padding: "28px 32px",
            width: "100%", maxWidth: "400px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1A1714", margin: "0 0 16px", textAlign: "center" }}>
              แก้ไขหมวดหมู่
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "#1A1714", display: "block", marginBottom: "4px" }}>ชื่อหมวดหมู่</label>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #E5E7EB", borderRadius: "6px", fontSize: "14px", outline: "none" }}
                placeholder="กรอกชื่อหมวดหมู่"
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => { setEditModalOpen(false); setEditTarget(null); }}
                style={{ flex: 1, padding: "10px 0", backgroundColor: "#ffffff", color: "#1A1714", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAF9F6")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              >ยกเลิก</button>
              <button onClick={saveEdit}
                style={{ flex: 1, padding: "10px 0", backgroundColor: "#1A1714", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
              >บันทึก</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Modal ── */}
      {addModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 9999,
        }} onClick={() => { setAddModalOpen(false); }}>
          <div style={{
            backgroundColor: "#ffffff", borderRadius: "12px", padding: "28px 32px",
            width: "100%", maxWidth: "400px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1A1714", margin: "0 0 16px", textAlign: "center" }}>
              เพิ่มหมวดหมู่ใหม่
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "#1A1714", display: "block", marginBottom: "4px" }}>ชื่อหมวดหมู่</label>
              <input type="text" value={addName} onChange={(e) => setAddName(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #E5E7EB", borderRadius: "6px", fontSize: "14px", outline: "none" }}
                placeholder="กรอกชื่อหมวดหมู่ใหม่"
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => { setAddModalOpen(false); }}
                style={{ flex: 1, padding: "10px 0", backgroundColor: "#ffffff", color: "#1A1714", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAF9F6")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              >ยกเลิก</button>
              <button onClick={saveAdd}
                style={{ flex: 1, padding: "10px 0", backgroundColor: "#1A1714", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
              >เพิ่มหมวดหมู่</button>
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
        confirmText={alertConfig.type === "danger" ? "ลบหมวดหมู่" : alertConfig.type === "confirm" ? "ยืนยัน" : "ตกลง"}
        cancelText="ยกเลิก"
      />
    </div>
  );
}
