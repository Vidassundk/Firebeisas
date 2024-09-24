import React from "react";
import { cn } from "../../util/cn"; // Import your utility function

interface ButtonProps {
  label: string;
  onClick?: () => void;
  styleType: "google" | "github" | "login" | "error"; // Add "error" as a valid styleType
  arrow?: boolean; // Optional arrow
  type?: "button" | "submit" | "reset"; // Button type
  className?: string; // Custom class names
  disabled?: boolean; // Disabled state
  href?: string; // Optional link URL
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  styleType,
  arrow = false,
  type = "button",
  className = "",
  disabled = false, // Default disabled is false
  href, // Optional href for link
}) => {
  const buttonStyles = {
    google:
      "transition duration-200 border border-gray-200 text-gray-500 w-full py-3 px-5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block",
    github:
      "transition duration-200 w-full py-3 px-5 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset text-center",
    login:
      "transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-3 px-5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block",
    error:
      "transition duration-200 bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:shadow-sm focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-white w-full py-3 px-5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block",
    disabled: "cursor-not-allowed opacity-50 bg-gray-300 text-gray-400", // Styles for disabled state
  };

  // If href is provided, render an anchor tag
  if (href) {
    return (
      <a
        href={href}
        className={cn(
          buttonStyles[styleType],
          disabled && buttonStyles["disabled"], // Apply disabled styles if necessary
          className
        )}
        target="_blank"
        rel="noopener noreferrer" // Best practice for external links
        onClick={disabled ? (e) => e.preventDefault() : undefined} // Prevent default if disabled
      >
        <span className="inline-block mr-2">{label}</span>
        {arrow && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        )}
      </a>
    );
  }

  // Otherwise, render a button
  return (
    <button
      type={type}
      className={cn(
        buttonStyles[styleType],
        disabled && buttonStyles["disabled"], // Apply disabled styles if the button is disabled
        className
      )}
      onClick={disabled ? undefined : onClick} // Prevent click if disabled
      disabled={disabled} // Native HTML disabled prop
    >
      <span className="inline-block mr-2">{label}</span>
      {arrow && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4 inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      )}
    </button>
  );
};

export default Button;
