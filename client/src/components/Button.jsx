import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-neutral-900 hover:bg-neutral-800 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg shadow-sm outline-none ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
