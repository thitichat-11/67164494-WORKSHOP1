import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MainPage = () => {
  const [salapicks, setSalapicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentUserId = 1;

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";

    const fetchSalapicks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/salapicks?userId=${userId}`,
        );
        const data = await response.json();

        const formattedData = data.map((item) => ({
          ...item,
          colors:
            typeof item.colors === "string"
              ? JSON.parse(item.colors)
              : item.colors || [],
          sizes:
            typeof item.sizes === "string"
              ? JSON.parse(item.sizes)
              : item.sizes || [],
          // กำหนด default fallback เผื่อไม่มีรูป
          image:
            item.image || "https://via.placeholder.com/300x400?text=No+Image",
        }));

        setSalapicks(formattedData.slice(0, 3));
      } catch (error) {
        console.error("Error fetching SALA picks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalapicks();
  }, []);

  //กดปุ่มหัวใจ เพิ่มลง Wishlist แล้วเด้งไปหน้า WishlistPage
  const handleAddToWishlist = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUserId,
          product_id: productId,
        }),
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        navigate("/wishlistpage");
      } else {
        const errorData = await response.json();
        console.error("สาเหตุที่ไม่สามารถเพิ่มลง Wishlist ได้:", errorData);
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  return (
    <div className="w-full">
      {/*  SALA Spring/Summer 2026   */}
      <div
        className="relative flex flex-col items-center justify-end h-screen bg-gray-800 bg-cover bg-top pb-16"
        style={{
          backgroundImage:
            "url('https://thethaovanhoa.mediacdn.vn/372676912336973824/2023/4/30/anh1-16828206782291592328729.jpg')",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-xl md:text-base text-white mb-1">
            SALA Spring/Summer 2026
          </h1>

          <h2 className="text-2xl md:text-4xl text-white mb-4 tracking-wide">
            IN HER OWN LANGUAGE
          </h2>

          <Link
            to="/seemoreinher"
            className="bg-[#D9D9D9] text-black py-2 px-2 text-xs font-bold tracking-wider"
          >
            SEE MORE
          </Link>
        </div>
      </div>

      {/*  SALA Spring Summer 2026   */}
      <div
        className="relative flex flex-col items-center justify-end h-screen bg-black bg-cover bg-top pb-16"
        style={{
          backgroundImage:
            "url('https://f.ptcdn.info/315/084/000/lwreqf75iX3B2T26hbm-s.jpg')",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-xl md:text-base text-white mb-1 tracking-widest">
            SALA
          </h1>

          <h2 className="text-2xl md:text-4xl text-white mb-4 tracking-widest">
            SPRING SUMMER 2026
          </h2>

          <Link
            to="/seemorespring"
            className="bg-[#D9D9D9] text-black py-2 px-2 text-xs font-bold tracking-wider"
          >
            SEE MORE
          </Link>
        </div>
      </div>

      {/* SALA Pick - Dynamic Product Grid */}
      <div className="min-h-screen text-neutral-900 font-sans">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-10">Loading SALA Picks...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12">
              {salapicks.map((product) => (
                <Link
                  to={`/pickitem/${product.id}`}
                  key={product.id}
                  className="flex flex-col gap-2 group relative text-decoration-none text-neutral-900"
                >
                  <div className="w-full aspect-[3/4] overflow-hidden bg-neutral-100 cursor-pointer">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* แท็ก และ ปุ่มหัวใจ */}
                  <div className="flex justify-between items-start mt-1">
                    <span className="font-semibold italic text-[15px] tracking-wider text-neutral-900">
                      {product.tag}
                    </span>

                    <button
                      onClick={(e) => {
                        e.preventDefault(); // ป้องกันไม่ให้คลิกแล้วลิงก์ไปหน้าสินค้า
                        e.stopPropagation(); // หยุดอีเวนต์ไม่ให้ส่งต่อไปยัง Link
                        handleAddToWishlist(product.id);
                      }}
                      className={`${product.liked ? "text-red-500" : "text-neutral-900"} hover:text-red-500 hover:opacity-50 transition-all z-10 relative p-1`}
                      aria-label="Wishlist toggle"
                    >
                      {product.liked ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-heart-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* ชื่อสินค้า */}
                  <h3 className="font-normal text-[15px] tracking-wide text-neutral-950 leading-snug cursor-pointer line-clamp-2">
                    {product.name}
                  </h3>

                  {/* ราคา */}
                  <span
                    className="font-bold"
                    style={{ fontSize: "14px", color: "#000000" }}
                  >
                    {product.price}
                  </span>

                  {/* สี และ ไซส์ */}
                  <div className="flex justify-between items-center mt-auto pt-2 ">
                    <div className="flex gap-1">
                      {product.colors &&
                        product.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="border border-neutral-300 w-3 h-3 rounded-none"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                    </div>

                    <div className="flex gap-2 text-[10px] text-neutral-400 font-medium tracking-wider">
                      {product.sizes &&
                        product.sizes.map((size, idx) => (
                          <span key={idx} className="text-neutral-700">
                            {size}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SPRING SUMMER 2026 banner */}
      <div
        className="relative flex flex-col items-center justify-end h-screen bg-black bg-cover bg-top pb-16"
        style={{
          backgroundImage:
            "url('https://cms.dmpcdn.com/musicarticle/2025/07/01/8a8dde40-5649-11f0-a96d-d544ead4b115_webp_original.webp')",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-xl md:text-base text-white mb-1 tracking-widest">
            SALA
          </h1>

          <h2 className="text-2xl md:text-4xl text-white mb-4 tracking-widest">
            SPRING SUMMER 2026
          </h2>

          <Link
            to="/salapick"
            className="bg-[#D9D9D9] text-black py-2 px-2 text-xs font-bold tracking-wider"
          >
            SEE MORE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
