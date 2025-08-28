import Image from "next/image";
import React from "react";

function HomeSectionSix() {
  return (
    <section className="relative bg-[url('/home-sec-2-bg.png')] bg-no-repeat bg-cover px-4 md:px-10 py-20">
      <div className="container">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:max-w-[90%] mx-auto">
          <div className="flex gap-3 items-center">
            <Image
              src="/home/sec-six-icon.svg"
              alt="Background Image"
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-contain -top-1 relative"
            />
            <h2 className="text-[#817C73] text-xl xl:text-3xl">
              Unfiltered.{" "}
              <span className="block ml-12">Unapologetically You</span>
            </h2>
          </div>
          <div className="flex gap-3 items-center">
            <Image
              src="/home/sec-six-icon.svg"
              alt="Background Image"
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-contain -top-1 relative"
            />
            <h2 className="text-[#817C73] text-xl xl:text-3xl">
              Unfiltered.{" "}
              <span className="block ml-12">Unapologetically You</span>
            </h2>
          </div>
          <div className="flex gap-3 items-center">
            <Image
              src="/home/sec-six-icon.svg"
              alt="Background Image"
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-contain -top-1 relative"
            />
            <h2 className="text-[#817C73] text-xl xl:text-3xl">
              Unfiltered.{" "}
              <span className="block ml-12">Unapologetically You</span>
            </h2>
          </div>
        </div>
      </div>
      <Image
        src="/home/sec-six-bg-icon.png"
        alt="Background Image"
        width={300}
        height={300}
        className="absolute left-[13%] z-0 w-fit h-full top-0 object-contain opacity-70"
      />
    </section>
  );
}

export default HomeSectionSix;
