import Image from "next/image";
import React from "react";

function CharitySectionThree() {
  return (
    <section className="relative bg-[url('/charity/sec-2-bg.png')] bg-no-repeat bg-cover md:px-10 xl:px-22 overflow-x-hidden py-16 -mt-1">
      <div className="container">
        <div className="relative flex flex-col-reverse lg:flex-row lg:items-center gap-8 xl:gap-[19%]">
          <div className="flex-1/2 flex items-center justify-baseline lg:justify-start">
            <Image
              src="/charity/sec-2-img.png"
              alt="About Section Image"
              width={500}
              height={300}
              className="w-full lg:w-fit lg:h-[70vh] object-contain"
            />
          </div>
          <div className="flex-1/2 flex flex-col gap-8 px-4 lg:px-10">
            <Image
              src="/icon-1.svg"
              alt="About Section Image"
              width={80}
              height={104}
              className="w-[90px] h-[90px] object-cover -ml-2"
            />
            <h2 className="text-text text-3xl lg:text-4xl relative">
              Every stitch we sell{" "}
              <span className="block relative left-[30%]">
                carries strength
              </span>
            </h2>
            <div className="flex flex-col gap-3 ">
              <p>
                At antiromantic, we believe true luxury uplifts more than just
                style—it uplifts lives. That’s why a portion of every purchase
                supports <strong>women-led charities</strong> and{" "}
                <strong>initiatives around the world.</strong>
              </p>
              <p>
                We partner with trusted organizations to ensure transparency and
                real impact. When you choose antiromantic, you're not just
                wearing fashion— <strong>you’re wearing purpose.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CharitySectionThree;
