import Image from "next/image";
import React from "react";

function HomeSectionFour() {
  return (
    <section className="relative bg-[url('/bg-img.png')] bg-no-repeat bg-cover">
      <div className="container">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:min-h-[200vh]">
          {/* Left Section - Sticky */}
          <div className="flex relative w-full h-max lg:sticky lg:top-0 lg:self-start md:items-center">
            <Image
              src="/home/product1.png"
              alt="image"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
            <h2 className="text-[#817C73] text-xl md:text-3xl absolute top-[30%] md:top-[35%] left-[2%] md:left-[6%]">
              exclusive <span className="ml-8 block">linen shirt</span>
            </h2>
          </div>
          {/* Right Section - Scrollable */}
          <div className="p-4 md:p-10 lg:p-20 flex flex-col gap-8 lg:gap-14 lg:min-h-[200vh] md:justify-center">
            <p className="text-text text-base md:max-w-[60%]">
              Our thoughtfully crafted pieces embrace both ease and elegance,
              making self-care part of your everyday wear.
            </p>
            <div className="flex flex-col gap-8 items-center w-full h-auto">
              <div className="relative flex items-center justify-center">
                <Image
                  src="/home/product2.png"
                  alt="image"
                  width={500}
                  height={500}
                  className="w-auto h-[50vh] object-cover"
                />
              </div>
              <div className="relative flex items-center justify-center">
                <Image
                  src="/home/product3.png"
                  alt="image"
                  width={500}
                  height={500}
                  className="w-auto h-[50vh] object-cover"
                />
              </div>
              <div className="relative flex items-center justify-center">
                <Image
                  src="/home/product2.png"
                  alt="image"
                  width={500}
                  height={500}
                  className="w-auto h-[50vh] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSectionFour;
