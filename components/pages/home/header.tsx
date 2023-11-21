import React from "react";

const Header = ({
  heading,
  subheading,
  variant = "big",
}: {
  heading: string;
  subheading: string;
  variant?: "big" | "small";
}) => {
  const sizeClass = variant === "big" ? "text-[9.8rem]" : "text-[5rem]";
  const spacingClass = variant === "big" ? "-mt-6" : "";
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className={`font-extrabold capitalize ${sizeClass} text-main-500`}>
        {heading}
      </h1>
      <p className={`max-w-xl ${spacingClass} text-lg font-medium text-center`}>
        {subheading}
      </p>
    </div>
  );
};

export default Header;
