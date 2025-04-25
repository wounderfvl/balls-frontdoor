"use client";

import { useState } from "react";

type AuthInputProps = {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  icon?: string;
};

export default function AuthInput({
  name,
  type,
  placeholder,
  required,
  icon,
}: {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  icon?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`auth-input-group ${isFocused ? "focused" : ""}`}>
      {icon && <span className={`auth-input-icon ${icon}`}></span>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="auth-input"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
