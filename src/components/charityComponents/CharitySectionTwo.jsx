import Image from "next/image";
import React from "react";

function CharitySectionTwo() {
  return (
    <section className="relative bg-[url('/about/about-sec-2-bg.jpg')] bg-no-repeat bg-cover md:px-10 xl:px-22 overflow-x-hidden">
      <div className="container">
        <div className="relative flex flex-col lg:flex-row items-center gap-8 xl:gap-[11.7%]">
          <div className="flex-1/2 flex flex-col gap-8 px-4 lg:px-0 pt-10">
            <Image
              src="/icon-1.svg"
              alt="About Section Image"
              width={80}
              height={104}
              className="w-[90px] h-[90px] object-cover -ml-2"
            />
            <h2 className="text-text text-3xl lg:text-4xl relative">
              Fashion That Fights
              <span className="block relative lg:left-[35%]">for her</span>
            </h2>
            <div className="flex flex-col gap-3">
              <p>
                This isn’t just fashion—it’s a movement. antiromantic stands
                with women. We invest in <strong>global</strong> and{" "}
                <strong>local organizations</strong> that fight for{" "}
                <strong>
                  gender equity, support survivors, and amplify female voices.
                </strong>{" "}
                Behind our collections is a commitment to change. From rural
                artisans to urban entrepreneurs, our charity partnerships help
                women write new chapters of independence and success. Your
                purchase plays a part in her story. And that’s something worth
                wearing.
              </p>
            </div>
          </div>
          <div className="flex-1/2 flex flex-col gap-4 self-start">
            <Image
              src="/charity/sec-1-a.png"
              alt="About Section Image"
              width={500}
              height={300}
              className="w-auto h-[50vh] object-contain self-start"
            />
            <Image
              src="/charity/sec-1-b.png"
              alt="About Section Image"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CharitySectionTwo;
