import React, { useState, useEffect } from "react";
import Signin from "./Signin";

const WishlistPage = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const currentUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  /* ตรวจสอบว่าผู้ใช้ล็อกอินแล้วหรือไม่ */
  const isLoggedIn =
    currentUserId && currentUserId !== "null" && token && token !== "null";

  const fetchWishlist = async () => {
    /* ถ้ายังไม่ล็อกอิน ไม่ต้องยิง API ให้หยุดการทำงานเลยคับคุนแม่ */
    if (!isLoggedIn) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/wishlist/${currentUserId}`,
      );
      if (!response.ok) {
        throw new Error("ดึงข้อมูล Wishlist ล้มเหลว");
      }
      const data = await response.json();
      setWishlistData(data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isLoggedIn]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/wishlist/${currentUserId}/${productId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setWishlistData(wishlistData.filter((item) => item.id !== productId));
      } else {
        console.error("ไม่สามารถลบสินค้าได้");
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  /* กำลังโหลดข้อมูลนะ ถึงจะเรียกตัวนี้คับบบ */
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-neutral-500 font-sans">
        กำลังโหลด Wishlist ของคุณ...
      </div>
    );
  }

  /* กรณีที่ยังไม่ได้ล็อกอิน เพิ่งกด Logout */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-16 px-4 md:px-8 flex flex-col items-center">
        <h1 className="text-center text-2xl tracking-widest mb-8 uppercase text-black">
          Wishlist
        </h1>
        <div className="text-center py-12 flex flex-col items-center gap-4">
          <p className="text-neutral-500 text-sm">
            คุณยังไม่ได้เข้าสู่ระบบ กรุณาเข้าสู่ระบบเพื่อดู Wishlist ของคุณ
          </p>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-6 py-2 bg-black text-white text-sm font-semibold tracking-widest hover:bg-neutral-800 transition-colors"
          >
            SIGN IN
          </button>
        </div>

        {/* เรียกใช้ Modal */}
        <Signin
          isOpen={isLoginModalOpen}
          onClose={() => {
            setIsLoginModalOpen(false);
            // รีเฟรชหน้าเบาๆ เพื่อให้ useEffect ทำงานใหม่ดึงข้อมูลเมื่อล็อกอินเสร็จ
            if (localStorage.getItem("userId")) {
              window.location.reload();
            }
          }}
        />
      </div>
    );
  }

  /* ล็อกอินแล้วถึงจะดูได้นะคับบ*/
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 relative">
      <h1 className="text-center text-2xl tracking-widest mb-8 uppercase text-black">
        Wishlist
      </h1>

      {wishlistData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-500 text-sm mb-4">
            ไม่มีสินค้าใน Wishlist ของคุณ
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {wishlistData.map((item) => (
            <div key={item.id} className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[3/4] overflow-hidden mb-4 bg-neutral-100">
                {item.imgSrc ? (
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center text-neutral-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <span className="italic text-[15px] text-black">
                    {item.tag || "New Arrivals"}
                  </span>

                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    aria-label="Remove from wishlist"
                    className="text-red-500 hover:opacity-70 transition-opacity p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-red-500"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </button>
                </div>

                <h3 className="text-base text-black mt-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[14px] text-black mt-0">{item.price}</p>

                <div className="mt-auto pt-6">
                  <span className="italic text-[12px] text-[#40CD38] font-bold">
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
