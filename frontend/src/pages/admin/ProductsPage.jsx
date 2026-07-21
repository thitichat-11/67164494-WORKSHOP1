import { useEffect, useMemo, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import StatusBadge from "./admin-ui/StatusBadge";
import TableWrapper from "./admin-ui/TableWrapper";
import { fetchProducts, fetchCategories, updateProduct, deleteProduct } from "../../api/adminApi";
import AdminProfile from "./admin-ui/AdminProfile";
import AlertModal from "./admin-ui/AlertModal";


const ProductsPage = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: "", message: "", type: "alert" });

  // Edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", category: "", price: "", categoryId: "" });

  // Detail modal
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailTarget, setDetailTarget] = useState(null);

  // Categories for edit
  const [categories, setCategories] = useState([]);

  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((c) => {
      map[c.category_name] = c.category_id;
    });
    return map;
  }, [categories]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));

  const adminTabs = [
    { label: "รายการสินค้า", to: "/Admin/Products" },
    { label: "จัดการหมวดหมู่", to: "/Admin/Category" },
    { label: "เพิ่มสินค้า", to: "/Admin/AddProduct" },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [productsRes, cats] = await Promise.all([
          fetchProducts(),
          fetchCategories().catch(() => []),
        ]);
        setCategories(Array.isArray(cats) ? cats : []);
        setProducts(Array.isArray(productsRes) ? productsRes : []);
      } catch {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const rowsData = useMemo(() => {
    return products.map((p) => ({
      id: p.product_id || p.id || p.name,
      name: p.name,
      category: p.category_name || p.category_slug || "-",
      categoryId: p.category_id,
      stock: p.total_stock ?? p.total_stock_units ?? p.stock_quantity ?? 0,
      price: formatCurrency(p.base_price),
      raw: p,
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return rowsData.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);

      const stock = Number(p.stock ?? 0);
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "out" && stock <= 0) ||
        (stockFilter === "low" && stock > 0 && stock <= 10) ||
        (stockFilter === "in" && stock > 10);

      return matchesQuery && matchesStock;
    });
  }, [rowsData, searchQuery, stockFilter]);

  const showAlert = (title, message, type) => {
    if (type === undefined) type = "alert";
    setAlertConfig({ title, message, type });
    setAlertOpen(true);
  };

  const handleViewDetail = (p) => {
    setDetailTarget(p);
    setDetailModalOpen(true);
  };

  const handleEdit = (p) => {
    setEditTarget(p);
    setEditForm({
      name: p.name,
      category: p.category,
      price: String(p.raw.base_price ?? 0),
      categoryId: p.categoryId || "",
    });
    setEditModalOpen(true);
  };

  const saveEdit = async () => {
    if (!editTarget) return;

    const categoryId = categoryMap[editForm.category] || editForm.categoryId || null;

    try {
      const payload = {
        name: editForm.name || editTarget.name,
        base_price: Number(editForm.price) || 0,
        category_id: categoryId,
        description: editTarget.raw?.description || null,
      };

      const res = await updateProduct(editTarget.id, payload);

      // Update local state with response
      setProducts((prev) =>
        prev.map((x) => {
          const xid = x.product_id || x.id || x.name;
          if (xid === editTarget.id) {
            const updated = res.product || {};
            return {
              ...x,
              name: updated.name || editForm.name,
              category_name: updated.category_name || editForm.category,
              base_price: Number(editForm.price) || x.base_price,
              category_id: categoryId || x.category_id,
            };
          }
          return x;
        })
      );
      showAlert("แก้ไขสำเร็จ", 'แก้ไขสินค้า "' + editForm.name + '" เรียบร้อยแล้ว', "alert");
    } catch (err) {
      showAlert("เกิดข้อผิดพลาด", "ไม่สามารถแก้ไขสินค้าได้: " + (err.response?.data?.message || err.message), "alert");
    }
    setEditModalOpen(false);
    setEditTarget(null);
  };

  const handleDelete = (p) => {
    setAlertConfig({
      title: "ยืนยันการลบสินค้า",
      message: 'คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า "' + p.name + '"? การกระทำนี้ไม่สามารถย้อนกลับได้',
      type: "danger",
      onConfirmAction: async () => {
        try {
          await deleteProduct(p.id);
          setProducts((prev) =>
            prev.filter((x) => (x.product_id || x.id || x.name) !== p.id)
          );
          showAlert("ลบสำเร็จ", 'ลบสินค้า "' + p.name + '" เรียบร้อยแล้ว', "alert");
        } catch (err) {
          showAlert("เกิดข้อผิดพลาด", "ไม่สามารถลบสินค้าได้: " + (err.response?.data?.message || err.message), "alert");
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
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex justify-between items-center">
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, margin: 0, color: "#000000" }}>สินค้าทั้งหมด</h1>
          <p style={{ fontSize: "11px", color: "#999", letterSpacing: "0.2em", margin: "5px 0 0" }}>PRODUCTS MANAGEMENT</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ position: "relative" }}>
            <i className="bi bi-search" style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "#aaa", fontSize: "13px" }} />
            <input
              type="text"
              placeholder="ค้นหา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "34px", paddingRight: "14px", paddingTop: "8px", paddingBottom: "8px", border: "1px solid #e4e0d8", borderRadius: "8px", backgroundColor: "#ffffff", fontSize: "13px", outline: "none", width: "200px", color: "#333" }}
            />
          </div>
          <AdminProfile />
        </div>
      </div>

      {/* ─── Tab Navigation ─── */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {adminTabs.map((tab) => {
            const isActive = tab.to === "/Admin/Products";
            return (
              <NavLink key={tab.to} to={tab.to}
                className={"text-sm font-medium rounded-[4px] px-6 py-[10px] transition-colors no-underline " + (isActive ? "bg-[#1A1714] text-white" : "bg-white text-[#1A1714] border border-[#E5E7EB] hover:bg-gray-50")}
              >{tab.label}</NavLink>
            );
          })}
        </div>
        <button type="button" className="bg-[#1A1714] text-white px-5 py-2 rounded text-sm flex items-center gap-2" onClick={() => window.location.href = "/SALA/Admin/AddProduct"}>
          <i className="bi bi-plus" /> เพิ่มสินค้าใหม่
        </button>
      </div>

      {/* Search + stock filter */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative group">
          <input type="text" placeholder="ค้นหาชื่อสินค้าหรือหมวดหมู่..." className="bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm w-64 outline-none focus:ring-2 focus:ring-[#1A1714]/10 transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1A1714]"><i className="bi bi-search" /></span>
        </div>
        <div className="flex gap-2 items-center">
          {[
            { value: "all", label: "ทั้งหมด" },
            { value: "out", label: "หมด" },
            { value: "low", label: "สต็อกต่ำ" },
            { value: "in", label: "มีสินค้า" },
          ].map((t) => (
            <button key={t.value} type="button" onClick={() => setStockFilter(t.value)}
              className={"px-4 py-1.5 rounded-full text-sm font-medium transition-colors border " + (stockFilter === t.value ? "bg-[#CAB18B] text-white border-[#CAB18B]" : "bg-white text-[#1A1714] border-gray-200 hover:bg-gray-50")}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {/* Products table */}
      <TableWrapper colHeaders={["ชื่อ", "หมวดหมู่", "ราคา", "สถานะสต็อก", "จัดการ"]} colTemplate="2fr 1fr 1fr 1fr 100px">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">กำลังโหลด...</div>
        ) : (
          filteredProducts.map((p) => {
            const stock = Number(p.stock ?? 0);
            const stockType = stock <= 0 ? "out" : stock <= 10 ? "low" : "in";
            return (
              <ProductRow key={p.id} product={p} stockType={stockType}
                onViewDetail={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })
        )}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="p-8 text-center text-gray-500">ไม่พบรายการสินค้า</div>
        )}
      </TableWrapper>

      {/* ── Detail Modal ── */}
      {detailModalOpen && detailTarget && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 9999,
        }} onClick={() => { setDetailModalOpen(false); setDetailTarget(null); }}>
          <div style={{
            backgroundColor: "#ffffff", borderRadius: "12px", padding: "28px 32px",
            width: "100%", maxWidth: "420px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1A1714", margin: "0 0 16px", textAlign: "center" }}>
              รายละเอียดสินค้า
            </h3>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", color: "#999", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.1em" }}>ชื่อสินค้า</div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#1A1714" }}>{detailTarget.name}</div>
            </div>
            <div style={{ marginBottom: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "11px", color: "#999", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.1em" }}>หมวดหมู่</div>
                <div style={{ fontSize: "13px", color: "#333" }}>{detailTarget.category}</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "#999", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.1em" }}>ราคา</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1714" }}>{detailTarget.price}</div>
              </div>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <div>
                <div style={{ fontSize: "11px", color: "#999", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.1em" }}>สต็อกคงเหลือ</div>
                <div style={{ fontSize: "13px", color: "#333" }}>{detailTarget.stock} ชิ้น</div>
              </div>
            </div>
            <button onClick={() => { setDetailModalOpen(false); setDetailTarget(null); }}
              style={{ width: "100%", padding: "10px 0", backgroundColor: "#1A1714", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer", marginTop: "8px" }}
            >ปิด</button>
          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editModalOpen && editTarget && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 9999,
        }} onClick={() => { setEditModalOpen(false); setEditTarget(null); }}>
          <div style={{
            backgroundColor: "#ffffff", borderRadius: "12px", padding: "28px 32px",
            width: "100%", maxWidth: "420px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1A1714", margin: "0 0 16px", textAlign: "center" }}>
              แก้ไขสินค้า
            </h3>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "#1A1714", display: "block", marginBottom: "4px" }}>ชื่อสินค้า</label>
              <input type="text" value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #E5E7EB", borderRadius: "6px", fontSize: "13px", outline: "none" }}
              />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "#1A1714", display: "block", marginBottom: "4px" }}>หมวดหมู่</label>
              <select value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #E5E7EB", borderRadius: "6px", fontSize: "13px", outline: "none", background: "#fff" }}
              >
                {categories.length > 0 ? categories.map((cat) => (
                  <option key={cat.category_id} value={cat.category_name}>{cat.category_name}</option>
                )) : (
                  <>
                    <option value="Dresses">Dresses</option>
                    <option value="Tops">Tops</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Skirts">Skirts</option>
                    <option value="Accessories">Accessories</option>
                  </>
                )}
              </select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "#1A1714", display: "block", marginBottom: "4px" }}>ราคา</label>
              <input type="number" value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #E5E7EB", borderRadius: "6px", fontSize: "13px", outline: "none" }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => { setEditModalOpen(false); setEditTarget(null); }}
                style={{ flex: 1, padding: "10px 0", backgroundColor: "#ffffff", color: "#1A1714", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
              >ยกเลิก</button>
              <button onClick={saveEdit}
                style={{ flex: 1, padding: "10px 0", backgroundColor: "#1A1714", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
              >บันทึก</button>
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
        confirmText={alertConfig.type === "danger" ? "ลบสินค้า" : alertConfig.type === "confirm" ? "ยืนยัน" : "ตกลง"}
        cancelText="ยกเลิก"
      />
    </div>
  );
};

// ── Product Row with Action Dropdown ──
function ProductRow({ product, stockType, onViewDetail, onEdit, onDelete }) {
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
    <div className="grid gap-4 px-4 py-4 border-b border-[#f3eee6] items-center hover:bg-[#FAF9F6] transition-colors"
      style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 100px" }}>
      <div className="font-semibold text-[#1A1714] truncate">{product.name}</div>
      <div className="text-gray-600">{product.category}</div>
      <div className="text-[#1A1714] font-medium">{product.price}</div>
      <div><StatusBadge type="stock" value={stockType} /></div>
      <div className="relative" ref={ref}>
        <button className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 text-gray-500"
          onClick={() => setOpen((prev) => !prev)}
        ><i className="bi bi-three-dots text-sm" /></button>
        {open && (
          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-[4px] shadow-md z-50 py-1">
            <button className="w-full text-left px-4 py-2 text-sm text-[#1A1714] hover:bg-gray-50 flex items-center gap-2"
              onClick={() => { setOpen(false); onViewDetail(product); }}
            ><i className="bi bi-eye text-gray-500" /> ดูรายละเอียด</button>
            <button className="w-full text-left px-4 py-2 text-sm text-[#1A1714] hover:bg-gray-50 flex items-center gap-2"
              onClick={() => { setOpen(false); onEdit(product); }}
            ><i className="bi bi-pencil text-gray-500" /> แก้ไข</button>
            <hr className="my-1 border-gray-100" />
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              onClick={() => { setOpen(false); onDelete(product); }}
            ><i className="bi bi-trash text-red-500" /> ลบ</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;

