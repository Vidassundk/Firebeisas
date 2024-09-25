import React from "react";
import { cn } from "../util/cn";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  styleType: "google" | "github" | "login" | "error";
  arrow?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  styleType,
  arrow = false,
  type = "button",
  className = "",
  disabled = false,
  href,
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
    disabled: "cursor-not-allowed opacity-50 bg-gray-300 text-gray-400",
  };

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          buttonStyles[styleType],
          disabled && buttonStyles["disabled"],
          className
        )}
        target="_blank"
        rel="noopener noreferrer"
        onClick={disabled ? (e) => e.preventDefault() : undefined}
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

  return (
    <button
      type={type}
      className={cn(
        buttonStyles[styleType],
        disabled && buttonStyles["disabled"],
        className
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
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
