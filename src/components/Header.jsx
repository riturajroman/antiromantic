"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Menu from "./Menu";

function Header({ textcolor = "#F7F5EB" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full px-4 py-2 md:px-10 flex items-center h-[49px] ${
          isScrolled ? "scrolled" : ""
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex cursor-pointer" onClick={toggleMenu}>
              <Image
                className="w-[120px] sm:w-[150px] md:w-[200px] h-auto object-contain"
                src="/logo.svg"
                alt="logo"
                width={254}
                height={41}
              />
            </div>
            <div className="flex gap-3 md:gap-6 items-center">
              <button
                className={`text-[${
                  isScrolled ? "#F7F5EB" : textcolor
                }] text-[12px] md:text-lg cursor-pointer`}
              >
                wishlist(0)
              </button>
              <button
                className={`text-[${
                  isScrolled ? "#F7F5EB" : textcolor
                }] text-[12px] md:text-lg cursor-pointer`}
              >
                cart(0)
              </button>
              <button
                className={`text-[${
                  isScrolled ? "#F7F5EB" : textcolor
                }] text-[12px] md:text-lg cursor-pointer`}
              >
                sign in
              </button>
            </div>
          </div>
        </div>
      </header>

      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}

export default Header;
