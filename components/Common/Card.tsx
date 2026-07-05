"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function Card({
  children,
  title,
  subtitle,
}: CardProps) {
  return (
    <div className="rounded-3xl bg-[#32353B] border border-[#40444D] p-6 shadow-lg">

      {(title || subtitle) && (

        <div className="mb-6">

          {title && (
            <h2 className="text-2xl font-bold text-white">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="text-gray-400 mt-1">
              {subtitle}
            </p>
          )}

        </div>

      )}

      {children}

    </div>
  );
}