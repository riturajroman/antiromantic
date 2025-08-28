import Image from "next/image";
import Link from "next/link";
import React from "react";

function HomeSectionThree() {
  return (
    <section className="relative bg-[url('/home-sec-3-bg.png')] bg-no-repeat bg-cover py-16 md:px-10">
      <div className="container flex items-center justify-center">
        <div className="relative flex flex-col lg:flex-row gap-4 lg:gap-16 bg-[url('/home-sec-3-bg-front.png')] bg-no-repeat bg-cover lg:w-[100%] x1280 xl:w-[72%] p-4 md:p-20">
          <div className="relative lg:w-[40%]">
            <Image
              src="/home-sec-3-img.png"
              alt="image"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="relative lg:w-[60%] flex flex-col gap-4">
            <h2 className="text-[#817C73] text-2xl">
              Fashion with a Heart: Empowering
              <span className="lg:block lg:ml-20">
                Women, One Purchase at a Time
              </span>
            </h2>
            <div className="flex flex-col gap-2">
              <p className="text-[#817C73] text-base lg:max-w-[80%]">
                At antiromantic, we believe true luxury uplifts more than just
                style—it uplifts lives. That’s why a portion of every purchase
                supports{" "}
                <span className="font-bold text-[#736C5F]">
                  women-led charities
                </span>{" "}
                and{" "}
                <span className="font-bold text-[#736C5F]">
                  initiatives around the world
                </span>
                .
              </p>
              <h3 className="text-[#817C73] text-lg underline">about us</h3>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#817C73] text-base lg:ml-20">
                We partner with trusted organizations to ensure transparency and
                real impact. When you choose [Your Brand Name], you're not just
                wearing fashion{" "}
                <span className="font-bold text-[#736C5F]">
                  you’re wearing purpose.
                </span>
              </p>
              <Link href="#" className="text-text underline lg:ml-20 w-fit">
                know more
              </Link>
            </div>
            <div className="flex gap-4 items-center justify-between mt-4">
              <div>
                <Image
                  src="/icon-1.svg"
                  alt="icon 1"
                  width={70}
                  height={70}
                  className="w-auto h-full object-cover"
                />
              </div>
              <div>
                <Image
                  src="/icon-1.svg"
                  alt="icon 2"
                  width={70}
                  height={70}
                  className="w-auto h-full object-cover"
                />
              </div>
              <div>
                <Image
                  src="/icon-1.svg"
                  alt="icon 1"
                  width={70}
                  height={70}
                  className="w-auto h-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* design-vectores-four-corners */}
          <div className="absolute -top-[1px] -left-[1px] pointer-events-none">
            <Image
              src="/sec-3-design.svg"
              alt="Design Vectors Four Corners"
              width={70}
              height={70}
              className="w-full h-[60px] object-contain"
            />
          </div>
          <div className="absolute -bottom-[1px] -left-[1.5px] pointer-events-none -rotate-91">
            <Image
              src="/sec-3-design.svg"
              alt="Design Vectors Four Corners"
              width={70}
              height={70}
              className="w-full h-[60px] object-contain"
            />
          </div>
          <div className="absolute -top-[1px] -right-[1.5px] pointer-events-none rotate-89">
            <Image
              src="/sec-3-design.svg"
              alt="Design Vectors Four Corners"
              width={70}
              height={70}
              className="w-full h-[60px] object-contain"
            />
          </div>
          <div className="absolute -bottom-[1px] -right-[1.5px] pointer-events-none rotate-181">
            <Image
              src="/sec-3-design.svg"
              alt="Design Vectors Four Corners"
              width={70}
              height={70}
              className="w-full h-[60px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSectionThree;
