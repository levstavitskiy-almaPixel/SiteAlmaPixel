import React from "react";

export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full max-w-[1100px] mx-auto px-5 sm:px-8 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
