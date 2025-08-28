import React from "react";

function AboutPageHeader({ heading, imageUrl }) {
  return (
    <section
      className={`relative w-full min-h-[500px] pt-[49px] bg-no-repeat bg-cover overflow-x-hidden`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h1 className="text-3xl font-bold text-white absolute top-[65%] right-[20%] right-class">
        {heading}
      </h1>
    </section>
  );
}

export default AboutPageHeader;
