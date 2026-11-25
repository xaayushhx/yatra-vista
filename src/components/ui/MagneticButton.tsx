"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 20,
  className,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  type = "button",
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX / strength, y: middleY / strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-coral-400 via-coral-500 to-coral-600 text-white font-semibold shadow-[0_0_25px_rgba(255,105,107,0.3)] hover:shadow-[0_0_35px_rgba(255,105,107,0.5)] hover:brightness-110",
    secondary:
      "bg-[#003642] text-white hover:text-coral-300 border border-white/15 hover:border-coral-500/50 hover:bg-[#004d5d]",
    outline:
      "bg-transparent text-coral-400 border border-coral-500/50 hover:bg-coral-500/10 hover:border-coral-400",
    ghost: "bg-transparent text-sand-200 hover:text-white hover:bg-white/5",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs tracking-wider uppercase",
    md: "px-6 py-3.5 text-xs tracking-widest uppercase font-medium",
    lg: "px-8 py-4 text-sm tracking-widest uppercase font-semibold",
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", damping: 15, stiffness: 150, mass: 0.1 }}
      className="inline-block"
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full transition-all duration-300 select-none overflow-hidden group disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">{children}</span>
        <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 ease-out group-hover:translate-x-full" />
      </button>
    </motion.div>
  );
};
