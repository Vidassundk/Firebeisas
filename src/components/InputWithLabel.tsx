import React, { forwardRef } from "react";
import Typography from "./Typography";

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, name, error, ...rest }, ref) => {
    return (
      <div>
        <Typography variant="label" htmlFor={name}>
          {label}
        </Typography>
        <input
          id={name}
          name={name}
          ref={ref}
          className={`border rounded-lg px-3 py-2 mt-1 text-sm w-full ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...rest} // Spread the rest of the props (including from React Hook Form's register)
        />
        {error ? (
          <Typography variant="error" className="mt-1">
            {error}
          </Typography>
        ) : (
          <Typography variant="error" className="invisible mt-1">
            Error Placeholder
          </Typography>
        )}
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel"; // For better debugging in React dev tools

export default InputWithLabel;
