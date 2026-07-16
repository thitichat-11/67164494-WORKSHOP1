import React from "react";

const wishlistData = [
  {
    id: 1,
    imgSrc: "https://pbs.twimg.com/media/Gwg8FWgbEAoiOma.jpg", // ใส่ URL รูปชุดเดรสสีดำ
    tag: "New Arrivals",
    title: "SALA Girls Don't Cry Dress",
    price: "$900",
    status: "In Stock",
  },
  {
    id: 2,
    imgSrc:
      "https://i.redd.it/231120-winter-for-polo-ralph-lauren-v0-nptqp4ftre1c1.jpg?width=1080&format=pjpg&auto=webp&s=7859eee89dc76758d5b8f94877e6a3765341592c", // ใส่ URL รูปเสื้อลายสก็อต
    tag: "New Arrivals",
    title: "SALA Plaid Wool-Blend Twill Shirt Jacket",
    price: "$480",
    status: "In Stock",
  },
  {
    id: 3,
    imgSrc:
      "https://files.vogue.co.th/uploads/Winter_Aespa_Ralph_Lauren_Brand_Ambassador_-_2.jpg", // ใส่ URL รูปชุดเดรสลายแพทช์เวิร์ค
    tag: "New Arrivals",
    title: "SALA Patchwork Cotton Shirtdress",
    price: "$890",
    status: "In Stock",
  },
];

const WishlistPage = () => {
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 ">
      
      <h1 className="text-center text-2xl tracking-widest mb-8 uppercase text-black">
  Wishlist
</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
        {wishlistData.map((item) => (
          <div key={item.id} className="flex flex-col group cursor-pointer">
            <div className="w-full aspect-[3/4] overflow-hidden mb-4">
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <span className="italic text-[15px] text-black">
                  {item.tag}
                </span>

                <button
                  aria-label="Remove from wishlist"
                  className="text-black hover:text-gray-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </button>
              </div>

              <h3 className="text-base text-black mt-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-[14px]  text-black mt-0">{item.price}</p>

              <div className="mt-auto pt-6">
                <span className="italic text-[12px] text-[#40CD38] font-bold">
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
