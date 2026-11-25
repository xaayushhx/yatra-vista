"use client";

import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
  className?: string;
  useImage?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = "md",
  showWordmark = true,
  className = "",
  useImage = true,
}) => {
  // Dimensions calibrated for prominent, high-fidelity luxury presentation
  const dimensions = {
    sm: { icon: 42, text: "text-xl", sub: "text-[8.5px]", gap: "gap-2.5" },
    md: { icon: 54, text: "text-2xl sm:text-[28px]", sub: "text-[10px]", gap: "gap-3" },
    lg: { icon: 68, text: "text-3xl sm:text-4xl", sub: "text-xs", gap: "gap-4" },
    xl: { icon: 84, text: "text-5xl", sub: "text-sm", gap: "gap-5" },
  }[size];

  return (
    <div className={`flex items-center ${dimensions.gap} select-none ${className}`}>
      {/* Globe & Soaring Plane Emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        {useImage ? (
          <Image
            src="/yatra-vista-emblem.png"
            alt="Yatra Vista Emblem"
            width={dimensions.icon}
            height={dimensions.icon}
            priority
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
          />
        ) : (
          <svg
            width={dimensions.icon}
            height={dimensions.icon}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Globe Circles & Grid Lines */}
            <circle cx="45" cy="55" r="32" stroke="#FFFFFF" strokeWidth="4.5" fill="none" />
            <ellipse cx="45" cy="55" rx="16" ry="32" stroke="#FFFFFF" strokeWidth="4" fill="none" />
            <line x1="13" y1="55" x2="77" y2="55" stroke="#FFFFFF" strokeWidth="4" />
            <path d="M19 40 Q45 46 71 40" stroke="#FFFFFF" strokeWidth="3.5" fill="none" />
            <path d="M19 70 Q45 64 71 70" stroke="#FFFFFF" strokeWidth="3.5" fill="none" />

            {/* Ascending Airplane Overlay */}
            <g transform="translate(18, 5) scale(0.95)">
              <path
                d="M48 10 
                   C49 8, 52 8, 54 10 
                   L58 20 
                   L78 30 
                   C80 31, 80 34, 78 35 
                   L59 38 
                   L57 52 
                   L66 58 
                   C67 59, 67 61, 65 61 
                   L53 59 
                   L47 67 
                   C46 68, 44 68, 43 67 
                   L41 57 
                   L33 55 
                   L30 40 
                   L48 35 
                   L46 22 
                   Z"
                fill="#FFFFFF"
                stroke="#004d5d"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        )}
      </div>

      {/* Dual-Color Wordmark: Yatra (White) + Vista (Coral) */}
      {showWordmark && (
        <div className="flex flex-col justify-center leading-none">
          <div className={`font-bold tracking-tight font-sans ${dimensions.text} flex items-baseline gap-1`}>
            <span className="text-white drop-shadow-sm font-extrabold tracking-tight">Yatra</span>
            <span className="text-[#ff696b] tracking-normal font-extrabold">Vista</span>
          </div>
          <span className={`uppercase font-mono tracking-[0.24em] text-[#a8d5dd] mt-1 font-semibold ${dimensions.sub} whitespace-nowrap`}>
            Luxury Goa Travel
          </span>
        </div>
      )}
    </div>
  );
};
