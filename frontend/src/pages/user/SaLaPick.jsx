import React from 'react';

// demo ของตังมา เดี๋ยวเปลี่ยน
const SaLaPickProducts = [
  {
    id: 1,
    tag: 'New Arrivals',
    name: 'SALA Good Baby Blue Plaid Coat',
    price: '$700',
    image: 'https://i.redd.it/231120-winter-for-polo-ralph-lauren-v0-nptqp4ftre1c1.jpg?width=1080&format=pjpg&auto=webp&s=7859eee89dc76758d5b8f94877e6a3765341592c',
    colors: ['#2C3E50'],
    liked: true
  },
  {
    id: 2,
    tag: 'Loungewear',
    name: 'SALA Cloudknit Beret Set',
    price: '$430',
    image: 'https://preview.redd.it/aespa-winter-has-been-selected-as-polo-ralph-laurens-v0-dte258y55e1c1.jpg?width=1080&crop=smart&auto=webp&s=3706a1f5d38e5b57f59751753dc7645ca25181f0',
    colors: ['#EFE3D0', '#8B5A2B'],
    liked: true
  },
  {
    id: 3,
    tag: 'New Arrivals',
    name: 'SALA Sunday Polo Shirt',
    price: '$310',
    image: 'https://pbs.twimg.com/media/HMsX-54WMAAV_tz.jpg',
    colors: ['#F2C9C9'],
    liked: true
  },
  {
    id: 4,
    tag: 'Outerwear',
    name: 'SALA Midnight Draped Slip Dress',
    price: '$620',
    image: 'https://img-highend.okezone.com/library/2023/11/21/master_winter_polo_ralph_lauren_2_Yqk5w9izpr.jpeg',
    colors: ['#1C2833'],
    liked: true
  },
  {
    id: 5,
    tag: 'Denim',
    name: 'SALA Tailored Blazer & Denim Set',
    price: '$540',
    image: 'https://i.pinimg.com/736x/da/67/d8/da67d87da6a9da1801f7eae25f2394aa.jpg',
    colors: ['#0B1220', '#3B4A63'],
    liked: true
  },
  {
    id: 6,
    tag: 'New Arrivals',
    name: 'SALA Knit Beret Two-Piece',
    price: '$470',
    image: 'https://www.pusspussmagazine.com/wp-content/uploads/2025/02/image00003.jpg',
    colors: ['#D9CBB8'],
    liked: true
  },
  {
    id: 7,
    tag: 'New Arrivals',
    name: 'SALA Plaid Wool-Blend Twill Shirt Jacket',
    price: '$480',
    image: 'https://i.redd.it/240911-winter-for-cosmopolitan-korea-x-polo-ralph-lauren-v0-zyji6jyec3od1.jpg?width=1080&format=pjpg&auto=webp&s=5341aa266eb4b8b1f6d88eab43c740daa1f73293',
    colors: ['#8B5A2B'],
    liked: true
  },
  {
    id: 8,
    tag: 'New Arrivals',
    name: 'SALA WINTERFELL SWEATER',
    price: '$400',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWwjJIp_0_E-93lpakxX_MYmQNxas3WR-7dCEqLadGw29pV196ugbGi3M&s=10',
    colors: ['#F5E6D3', '#1C2833'],
    liked: true
  },
  {
    id: 9,
    tag: 'New Arrivals',
    name: 'SALA PINKSUMMER POLO SHIRT',
    price: '$390',
    image: 'https://biz.chosun.com/resizer/v2/N3WQSGQDEQQBRLV67AF63AGWL4.jpg?auth=f4c15e1957f94af4c68a6434c8f6985c79b1fd34adafeb75a13e91d3600405ec&width=530&height=686&smart=true',
    colors: ['#F2C9C9'],
    liked: true
  },
  {
    id: 10,
    tag: 'New Arrivals',
    name: 'SALA Rainy Night Double-Breasted Coat',
    price: '$560',
    image: '',
    colors: ['#A07855'],
    liked: true
  },
  {
    id: 11,
    tag: 'Loungewear',
    name: 'SALA Oatmeal Cable Knit Cardigan',
    price: '$355',
    image: '',
    colors: ['#D9CBB8', '#3B3B3B'],
    liked: true
  },
  {
    id: 12,
    tag: 'New Arrivals',
    name: 'SALA Girls Don\'t Cry Dress',
    price: '$900',
    image: '',
    colors: ['#000000'],
    liked: true
  },
  {
    id: 13,
    tag: 'Outerwear',
    name: 'SALA Camel Wrap Trench Coat',
    price: '$680',
    image: 'https://files.vogue.co.th/uploads/Winter_Aespa_Ralph_Lauren_Brand_Ambassador_-_COVER_VERTICAL.jpg',
    colors: ['#C19A6B'],
    liked: true
  },
  {
    id: 14,
    tag: 'Denim',
    name: 'SALA Cropped Straight Jeans',
    price: '$290',
    image: 'https://cdn-images.farfetch-contents.com/29/66/49/29/29664929_58766828_1000.jpg',
    colors: ['#3B4A63'],
    liked: true
  },
  {
    id: 15,
    tag: 'New Arrivals',
    name: 'SALA Satin Slip Cami Top',
    price: '$220',
    image: 'https://pbs.twimg.com/media/F_VlGB9WsAA_dws.jpg',
    colors: ['#8B5A2B', '#000000'],
    liked: true
  },
  {
    id: 16,
    tag: 'New Arrivals',
    name: 'SALA Blush Ruffle Polo Shirt',
    price: '$390',
    image: 'https://www.pusspussmagazine.com/wp-content/uploads/2025/02/image00003.jpg',
    colors: ['#F2C9C9'],
    liked: true
  },
  {
    id: 17,
    tag: 'New Arrivals',
    name: 'SALA Charcoal Wool Overshirt',
    price: '$510',
    image: 'https://i.pinimg.com/736x/1c/67/cd/1c67cd0258983b097b438ebc048d7e7f.jpg',
    colors: ['#2C3E50', '#000000'],
    liked: true
  },
  {
    id: 18,
    tag: 'Loungewear',
    name: 'SALA Ivory Knit Beret Set',
    price: '$400',
    image: 'https://files.vogue.co.th/uploads/Winter_Aespa_Ralph_Lauren_Brand_Ambassador_-_COVER_VERTICAL.jpg',
    colors: ['#F5E6D3'],
    liked: true
  }
];

const sizes = ['XS', 'S', 'M', 'L'];

const SaLaPick = () => {
  return (
    <div className="min-h-screen text-neutral-900 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 py-12">


        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12">
          {SaLaPickProducts.map((product) => (
            <div key={product.id} className="flex flex-col gap-2 group relative">

              {/* รูป3:4 */}
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
                  className="text-neutral-900 hover:opacity-50 transition-opacity"
                  aria-label="Remove from wishlist"
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
              <h3 className="font-normal text-[15px] tracking-wide text-neutral-950 leading-snug cursor-pointer">
                {product.name}
              </h3>

              {/* ราคา */}
              <span
                className="font-bold"
                style={{ fontSize: '14px', color: '#000000' }}
              >
                {product.price}
              </span>

              {/* สี และ ไซส์ */}
              <div className="flex justify-between items-center mt-auto pt-2 ">
                <div className="flex gap-1">
                  {product.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="border border-neutral-300 w-3 h-3 rounded-none"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>

                <div className="flex gap-2 text-[10px] text-neutral-400 font-medium tracking-wider">
                  {sizes.map((size) => (
                    <span key={size} className="text-neutral-700">
                      {size}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* กรณีไม่มีสินค้าใน Wishlist (เผื่อใช้งานจริง) */}
        {SaLaPickProducts.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <p className="text-neutral-600 text-sm">Your wishlist is empty.</p>
            <a
              href="#shop"
              className="text-neutral-900 font-bold text-[13px] underline underline-offset-4"
            >
              Continue shopping →
            </a>
          </div>
        )}

      </div>
    </div>
  );
};

export default SaLaPick;