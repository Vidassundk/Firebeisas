// src/components/Typography.tsx

import { cn } from "../../util/cn";
import React, { ReactNode } from "react";

interface TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "b"
    | "link"
    | "label"
    | "error"; // Include "error" as an option
  className?: string;
  children: ReactNode;
  href?: string; // Only needed for "link"
  htmlFor?: string; // Only needed for "label"
}

const Typography: React.FC<TypographyProps> = ({
  variant = "h1",
  className,
  children,
  href,
  htmlFor,
}) => {
  // Map "error" to a valid tag (e.g., <p>)
  const Tag: React.ElementType =
    variant === "link"
      ? "a"
      : variant === "label"
      ? "label"
      : variant === "error"
      ? "p" // Error should be rendered as a paragraph
      : variant;

  const variantClass = (() => {
    switch (variant) {
      case "h1":
        return "text-4xl md:text-6xl font-bold tracking-tighter";
      case "h2":
        return "text-3xl md:text-5xl font-semibold tracking-tight";
      case "h3":
        return "text-2xl md:text-4xl font-semibold tracking-normal";
      case "h4":
        return "text-xl md:text-3xl font-medium tracking-normal";
      case "h5":
        return "text-lg md:text-2xl font-medium tracking-normal";
      case "h6":
        return "text-base md:text-xl font-medium tracking-normal";
      case "p":
        return "text-base md:text-lg font-normal leading-relaxed";
      case "b":
        return "font-bold";
      case "link":
        return "font-bold underline text-blue-600 hover:text-blue-800";
      case "label":
        return "font-semibold text-sm text-gray-600 pb-1 block";
      case "error":
        return "text-sm text-red-500"; // Style for the error variant
      default:
        return "";
    }
  })();

  const combinedClassName = cn(variantClass, className);

  // Handle "link" variant
  if (variant === "link" && href) {
    return (
      <a className={combinedClassName} href={href}>
        {children}
      </a>
    );
  }

  // Handle "label" variant with htmlFor
  if (variant === "label") {
    return (
      <label className={combinedClassName} htmlFor={htmlFor}>
        {children}
      </label>
    );
  }

  // Handle all other variants including "error"
  return <Tag className={combinedClassName}>{children}</Tag>;
};

export default Typography;
