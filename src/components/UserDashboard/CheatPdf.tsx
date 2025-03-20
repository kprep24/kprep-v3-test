"use client"

import React, { useState } from "react";

interface CheatPdfProps {
  title: string;
  subtitle: string;
  link: string;
}

const CheatPdf: React.FC<CheatPdfProps> = ({ title, subtitle, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a href={link} target="_blank">
      <div        className="flex flex-col   items-center w-56 border-2 border-[#74AA63] dark:border-[#5D8CAB] rounded-lg shadow-md relative cursor-pointer transition-transform duration-300 hover:scale-105"

        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="/cheat-light.png"
          alt={title}
          className={`w-56 h-48 dark:hidden block object-contain m-2  `}
        />
        <img
          src="/cheat-dark.png"
          alt={title}
          className={`w-56 h-48 hidden dark:block object-contain m-2 transition-transform duration-300`}
        />
        <div className="text-center mt-2 border-t-2 border-[#74AA63] dark:border-[#5D8CAB] p-2 w-56">
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
      </div>

    </a>
  );
};

export default CheatPdf;
