import Image from "next/image";
import React from "react";
import NewsLetter from "./NewsLetter";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[url('/footer-bg.png')] bg-no-repeat bg-cover bg-bottom py-16 px-4 md:px-10">
      <div className="container">
        <div className="relative flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 lg:gap-20 lg:max-w-[60%] lg:mx-auto">
            <nav className="relative md:w-[20%]">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link className="text-text text-base lg:text-xl" href="#">
                    home{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[#B0ADA5] text-base lg:text-xl"
                    href="#"
                  >
                    about us
                  </Link>
                </li>
                <li>
                  <Link className="text-text text-base lg:text-xl" href="#">
                    shop
                  </Link>
                </li>
                <li>
                  <Link className="text-text text-base lg:text-xl" href="#">
                    collection{" "}
                  </Link>
                </li>
                <li>
                  <Link className="text-text text-base lg:text-xl" href="#">
                    contact
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center relative md:w-[55%]">
              <Image
                src="/home-sec-3-img.png"
                alt="Footer Logo"
                width={100}
                height={100}
                className="w-full md:h-[60vh] object-contain relative -left-1.5"
              />
            </div>
            <div className="relative w-[200px] md:w-[25%]">
              <NewsLetter />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-8 xl:px-10">
            <div className="flex flex-col">
              <Link className="text-[#5E5E5E] text-base" href="#">
                privacy policy
              </Link>
              <Link className="text-[#5E5E5E] text-base" href="#">
                terms and condition
              </Link>
            </div>
            <div className="flex md:items-center md:justify-center">
              <Image
                src="/footer-logo.svg"
                alt="Footer Logo"
                width={100}
                height={100}
                className="w-[150px] lg:w-[200px] h-auto object-contain"
              />
            </div>
            <div>
              <p className="text-text md:text-right">
                all rights reserved <br />
                copyright 2025 Antiromantic
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
