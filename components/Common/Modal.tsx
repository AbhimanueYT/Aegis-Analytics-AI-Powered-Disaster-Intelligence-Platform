"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-lg rounded-3xl bg-[#32353B] border border-[#40444D] p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-white" />
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}