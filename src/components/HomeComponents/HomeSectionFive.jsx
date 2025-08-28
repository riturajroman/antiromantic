import Image from "next/image";
import React from "react";

function HomeSectionFive() {
  return (
    <section className="relative bg-[url('/home-sec-3-bg.png')] bg-no-repeat bg-cover bg-center h-screen md:h-[60vh] lg:h-screen flex items-center py-16 lg:py-0">
      <div className="container">
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-10 lg:max-w-[60%] mx-auto">
          <div className="flex items-center justify-center relative">
            <Image
              src="/home/sec-5-1.png"
              alt="image"
              width={500}
              height={500}
              className="w-auto lg:h-[50vh] object-cover"
            />
          </div>
          <div className="flex items-center justify-center relative -top-[25%] md:top-[25%]">
            <Image
              src="/home/sec-5-2.png"
              alt="image"
              width={500}
              height={500}
              className="w-auto lg:h-[50vh] object-cover"
            />
          </div>
          <div className="flex items-center justify-center relative">
            <Image
              src="/home/sec-5-3.png"
              alt="image"
              width={500}
              height={500}
              className="w-auto lg:h-[50vh] object-cover"
            />
          </div>
          <div className="flex items-center justify-center relative -top-[25%] md:top-[25%]">
            <Image
              src="/home/sec-5-4.png"
              alt="image"
              width={500}
              height={500}
              className="w-auto lg:h-[50vh] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSectionFive;
