"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("[data-cursor='hover']") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer subtle halo */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-coral-500/40 mix-blend-screen"
        animate={{
          x: mousePosition.x - (isHovered ? 28 : 16),
          y: mousePosition.y - (isHovered ? 28 : 16),
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          backgroundColor: isHovered ? "rgba(255, 105, 107, 0.16)" : "rgba(255, 105, 107, 0.04)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.5 }}
      />
      {/* Inner pinpoint dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-2 w-2 rounded-full bg-coral-400"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 600 }}
      />
    </>
  );
};
