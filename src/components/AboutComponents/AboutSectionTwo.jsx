import Image from "next/image";
import React from "react";

function AboutSectionTwo() {
  return (
    <section className="relative bg-[url('/about/about-sec-2-bg.jpg')] bg-no-repeat bg-cover md:px-10 xl:px-22 overflow-x-hidden">
      <div className="container">
        <div className="relative flex flex-col lg:flex-row items-center gap-8 xl:gap-[12%]">
          <div className="flex-1/2 flex flex-col gap-4 self-start">
            <Image
              src="/about/about-sec-2a.png"
              alt="About Section Image"
              width={500}
              height={300}
              className="w-auto h-[50vh] object-contain self-end"
            />
            <Image
              src="/about/about-sec-2b.png"
              alt="About Section Image"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1/2 flex flex-col gap-8 px-4 lg:px-0">
            <Image
              src="/about/about-sec-2-icon.svg"
              alt="About Section Image"
              width={80}
              height={104}
              className="w-fit h-[80px] object-cover"
            />
            <h2 className="text-text text-3xl lg:text-4xl relative">
              A LITTLE ROMANCE FOR YOU,
              <span className="block relative lg:left-[53%]">from you</span>
            </h2>
            <div className="flex flex-col gap-3">
              <p>
                Antiromantic is about the kind of love that starts from within.
                It's in the way you wear your favourite things, the ease of
                being yourself, and the little details that make all the
                difference in your everyday life. That's why it's time to
                rethink what love looks like. For us, it starts with{" "}
                <strong>you</strong>.
              </p>
              <p>
                Designed for slow mornings to late nights, work to weekends -
                Antiromantic moves with you. What you wear should feel as good
                as it looks. After all, clothing is self-care too
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSectionTwo;
