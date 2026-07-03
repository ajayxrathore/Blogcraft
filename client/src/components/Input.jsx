import React, { useId } from "react";

function Input({ label, type = "text", className = "", ref, ...props }) {
  const id = useId();
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          className="inline-block text-sm font-medium text-neutral-700 pl-0.5"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-3.5 py-2.5 rounded-lg bg-neutral-50/50 text-neutral-900 placeholder-neutral-400 border border-neutral-300 outline-none transition-all duration-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:bg-white text-sm ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
}

export default Input;
