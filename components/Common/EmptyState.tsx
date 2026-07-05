"use client";

import { FileSearch } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: string;
}

export default function EmptyState({
  title,
  message,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl bg-[#32353B] border border-[#40444D] p-12 text-center">

      <FileSearch
        className="mx-auto text-gray-500"
        size={60}
      />

      <h2 className="mt-6 text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-2 text-gray-400">
        {message}
      </p>

    </div>
  );
}