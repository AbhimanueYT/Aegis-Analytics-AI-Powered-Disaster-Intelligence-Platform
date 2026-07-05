"use client";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="mb-8">

      <h1 className="text-4xl font-bold text-white">
        {title}
      </h1>

      <p className="text-gray-400 mt-2">
        {description}
      </p>

    </div>
  );
}