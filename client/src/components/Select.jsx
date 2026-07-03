import React, { useId } from "react";

function Select({ options, label, className = "", ref, ...props }) {
  const id = useId();

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="inline-block text-sm font-medium text-neutral-700 pl-0.5"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full px-3.5 py-2.5 rounded-lg bg-neutral-50/50 text-neutral-900 border border-neutral-300 outline-none transition-all duration-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:bg-white text-sm cursor-pointer ${className}`}
      >
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-white text-neutral-900"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
