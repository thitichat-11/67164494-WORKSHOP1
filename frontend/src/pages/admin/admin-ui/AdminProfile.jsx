import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../../../assets/hero.png";

export default function AdminProfile() {
  const [open, setOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin"); // ค่าเริ่มต้นถ้าระบบดึงชื่อไม่เจอ
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 📌 ดึงชื่อ username ของคนที่ล็อกอินมาจาก localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setAdminName(storedUsername);
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // 📌 เคลียร์ข้อมูลใน localStorage ออกให้หมดตอน Logout
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("roleId");
    localStorage.removeItem("username");
    
    navigate("/signin");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen((prev) => !prev)}
      >
        <img
          src={profileImage}
          alt="Admin"
          className="w-9 h-9 rounded-full object-cover border-2 border-[#e4e0d8]"
        />
        {/* 📌 แสดงชื่อ Admin แบบ Dynamic */}
        <span className="text-sm font-medium text-[#1A1714]">{adminName}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1L5 5L9 1" stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-[4px] shadow-md z-50 py-1"
        >
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-[#1A1714] hover:bg-gray-50 flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}