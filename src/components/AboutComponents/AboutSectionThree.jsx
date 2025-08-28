import Image from "next/image";
import React from "react";

function AboutSectionThree() {
  return (
    <section className="relative bg-[url('/about/section-3-bg.jpg')] bg-no-repeat bg-cover md:px-10 xl:px-22 overflow-x-hidden py-16 -mt-1">
      <div className="container">
        <div className="relative flex flex-col-reverse lg:flex-row lg:items-center gap-8 xl:gap-[12%]">
          <div className="flex-1/2 flex flex-col gap-8 px-4 lg:px-10">
            <Image
              src="/about/home-sec-3-icon.svg"
              alt="About Section Image"
              width={80}
              height={104}
              className="w-fit h-[80px] object-cover"
            />
            <h2 className="text-text text-3xl lg:text-4xl relative">
              positioning
            </h2>
            <div className="flex flex-col gap-3 ">
              <p>
                Love isn’t something you chase, it’s something you choose. And
                that choice should always include your wardrobe.
              </p>
              <p>
                Thoughtfully crafted in small batches, using natural fabrics and
                responsible practices — we take the silhouettes you know and
                rework them with details that make them unmistakably yours.
                These are the pieces that bring you comfort, ones you keep
                coming back to, ones that feel like home. Antiromantic is made
                to be worn, loved, and lived in—not just for a season, but for
                years to come. Because the things you love should love you back.
              </p>
            </div>
          </div>
          <div className="flex-1/2 flex items-center justify-baseline lg:justify-end">
            <Image
              src="/about/section-3-img.png"
              alt="About Section Image"
              width={500}
              height={300}
              className="w-full lg:w-fit lg:h-[70vh] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSectionThree;
