import React from "react";

const collections = [
  {
    title: "SALA Fall 2026",
    src: "https://assets.vogue.com/photos/696a9d66337d423cb7f34dc9/master/w_2560%2Cc_limit/00001-ralph-lauren-fall-2026-menswear-credit-gorunway.jpg",
  },
  {
    title: "SALA Fall 2025",
    src: "https://wwd.com/wp-content/uploads/2025/04/Ralph-Lauren-s25-rtw-runway-MO-001.jpg?w=1024",
  },
  {
    title: "SALA Spring 2026",
    src: "https://wwd.com/wp-content/uploads/2025/10/polo-ralph-lauren-spring-2026-ctsy-20.jpg?crop=0px%2C0px%2C1332px%2C1775px&resize=555%2C740",
  },
];

const SearchPage = () => {
  return (
    <div className="min-h-screen text-neutral-800 p-6 md:p-12 lg:p-16 flex flex-col items-center ">
      <header className="max-w-2xl w-full mb-20 mt-4">
        <div className="flex items-center justify-center py-2 border-b border-black">
          <svg
            className="w-4 h-4 text-black mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="WHAT ARE YOU LOOKING FOR?"
            className="w-full bg-transparent text-xs tracking-widest placeholder-[#505050] text-neutral-800 focus:outline-none uppercase"
          />
        </div>

        <div className="flex flex-wrap items-center  gap-x-8 gap-y-2 py-4 text-sm font-medium tracking-wide uppercase">
          <span className="text-black">TRENDING SEARCHES:</span>
          {["DRESS", "BLOUSE", "PANTS", "SKIRT", "JACKET"].map((tag) => (
            <span
              key={tag}
              className="text-black hover:text-neutral-600 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <main className="max-w-5xl w-full px-4">
        <h2 className="text-base font-serif tracking-widest text-neutral-900 uppercase mb-8">
          SALA COLLECTION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {collections.map((item, index) => (
            <div key={index} className="flex flex-col items-start w-full">
              <div className="w-full aspect-[3/4] overflow-hidden bg-neutral-100">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              </div>

              <p className="mt-4 text-[15px] font-serif text-neutral-900 tracking-wide">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
