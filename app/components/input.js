import React from "react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`pl-2 p-0 py-1 px-12 border border-[#85829e] text-[#84829e] rounded-md mb-4 outline-none ${className}`}
    />
  );
};

export default Input;
