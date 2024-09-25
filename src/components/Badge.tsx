import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "gray";
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "blue" }) => {
  const variantClasses = {
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`text-xs inline-block font-medium me-2 px-3 py-1.5 rounded-full ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
