"use client";

interface BadgeProps {
  text: string;
  color?: "red" | "green" | "yellow" | "blue";
}

export default function Badge({
  text,
  color = "blue",
}: BadgeProps) {
  const colors = {
    red: "bg-red-500/20 text-red-400",

    green: "bg-green-500/20 text-green-400",

    yellow: "bg-yellow-500/20 text-yellow-400",

    blue: "bg-blue-500/20 text-blue-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[color]}`}
    >
      {text}
    </span>
  );
}