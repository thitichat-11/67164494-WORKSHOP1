import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Signin from "./Signin";

const SaLaPick = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/salapicks");
        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลสินค้าได้");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // เมื่อกดปุ่มหัวใจ
  const handleAddToWishlist = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    const currentUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (
      !currentUserId ||
      currentUserId === "null" ||
      !token ||
      token === "null"
    ) {
      setIsLoginModalOpen(true);
      return;
    }

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-neutral-500 font-sans">
        กำลังโหลดข้อมูลสินค้า...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 font-sans">
        เกิดข้อผิดพลาด: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen text-neutral-900 font-sans relative">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12">
          {products.map((product) => (
            <Link
              to={`/pickitem/${product.id}`}
              key={product.id}
              className="flex flex-col gap-2 group relative text-decoration-none text-dark"
            >
              {/* รูปภาพสินค้า */}
              <div className="w-full aspect-[3/4] overflow-hidden bg-neutral-100 cursor-pointer">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center text-neutral-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* หมวดหมู่ (Tag) และ ปุ่มหัวใจ */}
              <div className="flex justify-between items-start mt-1">
                <span className="font-semibold italic text-[15px] tracking-wider text-neutral-900">
                  {product.tag}
                </span>
                <button
                  onClick={(e) => handleAddToWishlist(e, product.id)}
                  className="text-neutral-900 hover:text-red-500 transition-colors p-1 relative z-10"
                  aria-label="Add to wishlist"
                >
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
                </button>
              </div>

              {/* ชื่อสินค้า */}
              <h3 className="font-normal text-[15px] tracking-wide text-neutral-950 leading-snug cursor-pointer line-clamp-2">
                {product.name}
              </h3>

              {/* ราคา */}
              <span className="font-bold text-[14px] text-black">
                {product.price}
              </span>

              {/* สี และ ไซส์ */}
              <div className="flex justify-between items-center mt-auto pt-2">
                <div className="flex gap-1">
                  {product.colors &&
                    product.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="border border-neutral-300 w-3 h-3"
                        style={{ backgroundColor: color }}
                        title={`Color: ${color}`}
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

        {products.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <p className="text-neutral-600 text-sm">ไม่มีสินค้าในขณะนี้</p>
          </div>
        )}
      </div>

      {/*Signin Modal*/}
      <Signin
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default SaLaPick;
