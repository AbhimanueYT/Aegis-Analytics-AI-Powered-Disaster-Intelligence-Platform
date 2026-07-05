"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[#F7F3EC] text-[#26282D] hover:bg-white",

    secondary:
      "bg-[#32353B] text-white border border-[#45484F] hover:bg-[#3B3F46]",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props}
      className={clsx(
        "rounded-xl px-5 py-3 font-semibold transition-all duration-300 hover:scale-105",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}