import Image from "next/image";
import React from "react";

function AboutSectionFive() {
  return (
    <section className="relative px-4 md:px-10 bg-[url('/about/section-5-bg.svg')] bg-cover bg-center bg-no-repeat py-20">
      <div className="container">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center xl:max-w-[80%] xl:gap-[15%] mx-auto">
          <div className="relative flex items-center justify-center">
            <Image
              src="/about/section-5-img.png"
              alt="Section 5 Icon"
              width={500}
              height={500}
              className="w-full lg:w-auto h-full lg:h-[70vh] object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-text text-3xl lg:text-4xl relative">
              the <span className="block ml-10">lovebird</span>
            </h2>
            <div className="flex flex-col gap-3">
              <p className="text-[#13120F] text-base 2xl:text-xl">
                The lovebird holding a rose embodies Antiromantic’s essence.
                Traditionally, lovebirds are seen in pairs, symbolizing
                companionship.
              </p>
              <p className="text-[#13120F] text-base 2xl:text-xl">
                But here, we flip the meaning the lovebird stands on its own,
                confident, and in full bloom. It isn’t about turning away from
                love but making space for it in a way that feels right. Because
                romance, like everything else, is yours to define.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSectionFive;
