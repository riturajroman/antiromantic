import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Menu({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-white z-40 transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Close button - moved to top for better visibility */}
      <button
        onClick={onClose}
        className="absolute top-16 right-16 text-3xl text-black hover:opacity-70 transition-opacity z-50 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer"
      >
        <X />
      </button>

      <div className="container1 h-full">
        <div className="flex flex-col md:flex-row relative h-full">
          {/* Left side - Menu */}
          <div className="w-full md:w-[30%] bg-[url('/bg-img.png')] bg-no-repeat bg-cover flex flex-col justify-center items-start p-8 md:p-16 min-h-screen md:min-h-full">
            <nav className="flex flex-col space-y-4 md:space-y-6 w-full">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-[#736C5F]">
                shop
              </h2>
              <Link
                href="#"
                className="text-lg md:text-xl text-[#736C5F] hover:opacity-70 transition-opacity hover:underline w-fit"
              >
                all
              </Link>
              <Link
                href="#"
                className="text-lg md:text-xl text-[#736C5F] hover:opacity-70 transition-opacity hover:underline w-fit"
              >
                tops
              </Link>
              <Link
                href="#"
                className="text-lg md:text-xl text-[#736C5F] hover:opacity-70 transition-opacity hover:underline w-fit"
              >
                bottoms
              </Link>
              <Link
                href="#"
                className="text-lg md:text-xl text-[#736C5F] hover:opacity-70 transition-opacity hover:underline w-fit"
              >
                dresses
              </Link>
              <Link
                href="#"
                className="text-lg md:text-xl text-[#736C5F] hover:opacity-70 transition-opacity hover:underline w-fit"
              >
                set
              </Link>

              <div className="mt-4 space-y-3 md:space-y-4">
                <Link
                  href="#"
                  className="text-xl md:text-2xl text-[#736C5F] hover:opacity-70 transition-opacity block hover:underline w-fit"
                >
                  collection
                </Link>
                <Link
                  href="#"
                  className="text-xl md:text-2xl text-[#736C5F] hover:opacity-70 transition-opacity block hover:underline w-fit"
                >
                  about
                </Link>
                <Link
                  href="#"
                  className="text-xl md:text-2xl text-[#736C5F] hover:opacity-70 transition-opacity block hover:underline w-fit"
                >
                  contact
                </Link>
              </div>
            </nav>
          </div>

          {/* Right side - Image (hidden on mobile) */}
          <div className="hidden md:block md:w-[70%] relative">
            <Image
              src="/hero-right.png"
              alt="Menu Image"
              width={700}
              height={475}
              className="w-full h-screen object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
