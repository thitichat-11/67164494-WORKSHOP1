import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminProfile from "./admin-ui/AdminProfile";
import { fetchCategories, createProduct } from "../../api/adminApi";

const adminTabs = [
  { label: "รายการสินค้า",    to: "/Admin/Products"   },
  { label: "จัดการหมวดหมู่", to: "/Admin/Category"   },
  { label: "เพิ่มสินค้า",    to: "/Admin/AddProduct" },
];

export default function AddProduct() {
  const navigate = useNavigate();

  // ── Form State ──
  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  // ── Variants State ──
  const [variants, setVariants] = useState([
    { color: "Black", size: "M", code: "SL-001-BLK-M", stock_quantity: 0 },
    { color: "White", size: "S", code: "SL-001-WHT-S", stock_quantity: 0 },
  ]);

  // ── Images State ──
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // ── Submit State ──
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ── Load Categories ──
  useEffect(() => {
    fetchCategories()
      .then((cats) => {
        if (Array.isArray(cats)) setCategories(cats);
      })
      .catch(() => {});
  }, []);

  // ── Variant Handlers ──
  const updateVariant = (index, field, value) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };

  const addVariant = () =>
    setVariants((v) => [...v, { color: "", size: "", code: "", stock_quantity: 0 }]);

  const removeVariant = (i) =>
    setVariants((v) => v.filter((_, idx) => idx !== i));

  // ── Image Handlers ──
  const removeImage = (i) => setImages((v) => v.filter((_, idx) => idx !== i));

  const setPrimaryImage = (i) =>
    setImages((v) => v.map((img, idx) => ({ ...img, isPrimary: idx === i })));

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      isPrimary: images.length === 0,
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  // ── Submit Handler ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name.trim()) {
      setError("กรุณากรอกชื่อสินค้า");
      return;
    }
    if (!basePrice || Number(basePrice) <= 0) {
      setError("กรุณากรอกราคาที่ถูกต้อง");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        base_price: Number(basePrice),
        category_id: categoryId ? Number(categoryId) : null,
        description: description.trim() || null,
        variants: variants
          .filter((v) => v.color && v.size && v.code)
          .map((v) => ({
            color: v.color,
            size: v.size,
            code: v.code,
            stock_quantity: Number(v.stock_quantity) || 0,
          })),
        images: images.map((img) => ({
          img_url: img.name, // In real app, upload to server first
          is_primary: img.isPrimary ? 1 : 0,
        })),
      };

      const res = await createProduct(payload);
      alert("เพิ่มสินค้าสำเร็จ! 🚀");
      navigate("/Admin/Products");
    } catch (err) {
      setError(
        "ไม่สามารถเพิ่มสินค้าได้: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* ─── Top Header ─── */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1714] m-0">เพิ่มสินค้าใหม่</h2>
          <p className="text-xs text-[#A59E91] mt-1">ADD NEW PRODUCT</p>
        </div>
        <AdminProfile />
      </div>

      {/* ─── Tab Navigation ─── */}
      <div className="flex gap-4 mb-6">
        {adminTabs.map((tab) => {
          const isActive = tab.to === "/Admin/AddProduct";
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={`text-sm font-medium rounded-[4px] px-6 py-[10px] transition-colors no-underline ${
                isActive
                  ? "bg-[#1A1714] text-white"
                  : "bg-white text-[#1A1714] border border-[#E5E7EB] hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </NavLink>
          );
        })}
      </div>

      {/* ─── Error Message ─── */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
          {error}
        </div>
      )}

      {/* ─── Main Form ─── */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-[4px] p-8 max-w-[840px] w-full">
          {/* Card Header */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#1A1714] m-0">เพิ่มสินค้าใหม่</h3>
            <p className="text-xs text-[#666] mt-1">กรอกข้อมูลสินค้าที่ต้องการเพิ่ม</p>
          </div>

          {/* ═══ Section 1: Basic Info ═══ */}
          <section>
            <div className="flex items-center gap-2 border-t border-gray-200 pt-6 mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1A1714] shrink-0">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              <span className="text-sm font-bold text-[#1A1714]">ข้อมูลสินค้าพื้นฐาน</span>
            </div>

            {/* ชื่อสินค้า */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-[#1A1714] mb-1">ชื่อสินค้า *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F6F3EC] border border-[#E5E7EB] rounded-[4px] px-3 py-[10px] text-sm outline-none focus:ring-1 focus:ring-[#1A1714]/20 placeholder:text-gray-400"
                placeholder="กรอกชื่อสินค้า"
              />
            </div>

            {/* ราคา + หมวดหมู่ */}
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-xs font-medium text-[#1A1714] mb-1">ราคาเริ่มต้น *</label>
                <input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="w-full bg-[#F6F3EC] border border-[#E5E7EB] rounded-[4px] px-3 py-[10px] text-sm outline-none focus:ring-1 focus:ring-[#1A1714]/20 placeholder:text-gray-400"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1A1714] mb-1">หมวดหมู่สินค้า *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-[#F6F3EC] border border-[#E5E7EB] rounded-[4px] px-3 py-[10px] text-sm outline-none appearance-none focus:ring-1 focus:ring-[#1A1714]/20"
                >
                  <option value="">— เลือกหมวดหมู่ —</option>
                  {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* รายละเอียด */}
            <div>
              <label className="block text-xs font-medium text-[#1A1714] mb-1">รายละเอียดสินค้า</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-24 bg-[#F6F3EC] border border-[#E5E7EB] rounded-[4px] p-3 text-sm outline-none resize-none focus:ring-1 focus:ring-[#1A1714]/20 placeholder:text-gray-400"
                placeholder="รายละเอียดสินค้า"
              />
            </div>
          </section>

          {/* ═══ Section 2: Variants ═══ */}
          <section className="border-t border-gray-200 mt-8 pt-8">
            <div className="flex items-center gap-2 mb-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1A1714] shrink-0">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span className="text-sm font-bold text-[#1A1714]">ตัวเลือกสินค้า</span>
            </div>
            <p className="text-xs text-[#666] mb-4">เพิ่มสี ขนาด และ SKU สำหรับสินค้า</p>

            <div
              className="grid gap-3 px-1 mb-2 text-xs font-medium text-[#1A1714]"
              style={{ gridTemplateColumns: "1fr 1fr 1.5fr 0.8fr 32px" }}
            >
              <div>สี *</div>
              <div>ขนาด *</div>
              <div>SKU/Barcode *</div>
              <div>จำนวน</div>
              <div className="text-center">การดำเนินการ</div>
            </div>

            {variants.map((v, i) => (
              <div
                key={i}
                className="grid gap-3 items-center mb-2"
                style={{ gridTemplateColumns: "1fr 1fr 1.5fr 0.8fr 32px" }}
              >
                <input
                  className="w-full bg-[#F6F3EC] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-sm outline-none placeholder:text-gray-400"
                  placeholder="สี"
                  value={v.color}
                  onChange={(e) => updateVariant(i, "color", e.target.value)}
                />
                <input
                  className="w-full bg-[#F6F3EC] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-sm outline-none placeholder:text-gray-400"
                  placeholder="ขนาด"
                  value={v.size}
                  onChange={(e) => updateVariant(i, "size", e.target.value)}
                />
                <input
                  className="w-full bg-[#F6F3EC] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-sm outline-none placeholder:text-gray-400"
                  placeholder="SKU/Barcode"
                  value={v.code}
                  onChange={(e) => updateVariant(i, "code", e.target.value)}
                />
                <input
                  className="w-full bg-[#F6F3EC] border border-[#E5E7EB] rounded-[4px] px-3 py-2 text-sm outline-none placeholder:text-gray-400"
                  type="number"
                  value={v.stock_quantity}
                  onChange={(e) => updateVariant(i, "stock_quantity", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeVariant(i)}
                  className="w-8 h-8 bg-white border border-[#E5E7EB] rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-gray-50 shrink-0"
                  title="ลบตัวเลือก"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addVariant}
              className="w-fit mt-3 px-4 py-2 bg-[#F6F3EC] border border-[#E5E7EB] rounded-[4px] text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              เพิ่มตัวเลือก
            </button>
          </section>

          {/* ═══ Section 3: Images ═══ */}
          <section className="border-t border-gray-200 mt-8 pt-8">
            <div className="flex items-center gap-2 mb-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1A1714] shrink-0">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span className="text-sm font-bold text-[#1A1714]">รูปภาพสินค้า</span>
            </div>
            <p className="text-xs text-[#666] mb-4">เลือกรูปภาพจากอุปกรณ์ โดยเลือกรูปหลัก 1 รูป</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />

            <button
              type="button"
              onClick={triggerFileInput}
              className="w-full mb-4 px-4 py-6 bg-[#F6F3EC] border-2 border-dashed border-[#D5CFC0] rounded-[4px] text-sm flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#A59E91]">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span className="text-[#A59E91] font-medium">คลิกเพื่อเลือกรูปภาพ หรือลากวางที่นี่</span>
              <span className="text-[#C0B8A8] text-xs">รองรับไฟล์ JPG, PNG, WEBP</span>
            </button>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {images.map((img, i) => (
                  <div key={i} className="relative group rounded-[4px] overflow-hidden border border-[#E5E7EB]" style={{ aspectRatio: "1/1" }}>
                    <img src={img.url} alt={img.name || `รูปที่ ${i + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button type="button" onClick={() => setPrimaryImage(i)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${img.isPrimary ? "bg-[#CAB18B] text-white" : "bg-white/80 text-gray-700 hover:bg-white"}`}
                        title={img.isPrimary ? "รูปหลัก" : "ตั้งเป็นรูปหลัก"}
                      >
                        {img.isPrimary ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="5"/></svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/></svg>
                        )}
                      </button>
                      <button type="button" onClick={() => removeImage(i)}
                        className="w-8 h-8 rounded-full bg-red-500/80 text-white flex items-center justify-center hover:bg-red-500 transition-colors" title="ลบรูป"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                    {img.isPrimary && (
                      <div className="absolute top-1 left-1 bg-[#CAB18B] text-white text-[10px] px-2 py-0.5 rounded-sm font-medium">รูปหลัก</div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
                      <p className="text-white text-[10px] truncate">{img.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {images.length === 0 && (
              <div className="text-center text-xs text-[#A59E91] py-2">ยังไม่มีรูปภาพที่เลือก</div>
            )}

            <div className="text-xs text-[#A59E91] mt-1">
              {images.length > 0 ? `เลือกแล้ว ${images.length} รูป` : "ยังไม่มีการเลือกรูปภาพ"}
            </div>
          </section>

          {/* ═══ Footer Actions ═══ */}
          <div className="flex gap-4 pt-8 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-[10px] bg-[#1A1714] text-white rounded-[4px] text-sm font-medium flex items-center gap-2 cursor-pointer hover:bg-[#2d2620] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {isSubmitting ? "กำลังบันทึก..." : "บันทึกสินค้า"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/Admin/Products")}
              className="px-6 py-[10px] bg-white text-[#1A1714] border border-[#E5E7EB] rounded-[4px] text-sm cursor-pointer hover:bg-gray-50 transition-colors"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
