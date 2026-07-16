import React from "react";

const springImages = [
  "https://image.msscdn.net/thumbnails/global_images/goods_img/20250819/5335185/5335185_17585043408372_big.jpg",
  "https://img.shoplineapp.com/media/image_clips/6908d482fa93bd00144f634a/original.jpeg?1762186369=&owner_id=57ff39d96170695338f65200",
  "https://image.msscdn.net/images/goods_img/20250819/5335153/5335153_17585088810345_500.jpg",
  "https://preview.redd.it/231120-winter-for-polo-ralph-lauren-v0-v3oro4ftre1c1.jpg?width=640&crop=smart&auto=webp&s=eca3091107c798f86fa9439f2412ab634e95c7e4",
  "https://pbs.twimg.com/media/G_4hhThW4AAob3q.jpg",
  "https://www.fashionchingu.com/wp-content/uploads/2024/04/Black-Double-Layers-Pleated-Skirt-Winter-Aespa-Idol-1-500x685.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh2BztG-llbah2Woxke1HMGpd9Aaseyzw4wQGmdHww3-EBW8vcbZ9kzPA&s=10",
  "https://pbs.twimg.com/media/HGFRo0LXkAAw05g.jpg",
  "https://pbs.twimg.com/media/HL4ImN7aIAAj88s.jpg",
  "https://valiram247.com/cdn/shop/files/C2971FBCCB3D4E2DB053D3A1C54CE725.jpg?v=1755830996",
  "https://files.vogue.co.th/uploads/Karina_X_MLB_(13).webp",
  "https://pbs.twimg.com/media/GqZOLiEXwAAA4cK.jpg",
];

const SeeMoreSpring = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 ">
      {/* 
       
      */}
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {springImages.map((src, index) => (
          <div
            key={index}
            className="w-full aspect-[3/4] overflow-hidden bg-gray-200"
          >
            <img
              src={src}
              alt={`Spring style ${index + 1}`}
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeMoreSpring;
