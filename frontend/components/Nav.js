import React from "react";
import Link from "next/link";

const Nav = ({ theme, setTheme }) => {
  return (
    <nav className="flex fixed justify-center w-full  z-30 mt-md px-md">
      <div className="p-md flex justify-between w-[1276px] border border-secondary bg-primary">
        {/* Home Button */}
        <Link
          href="/"
          className="font-serif text-4xl text-secondary hover:text-primary"
        >
          Trent Kim
        </Link>
        {/* / Home Button */}
        {/* Left Side */}
        <div className="flex items-center gap-md">
          {/* About Button */}
          <Link href="/about">
            <button className="font-sans text-sm text-secondary border border-secondary rounded-full h-[30px] px-md hover:bg-secondary hover:text-primary">
              About
            </button>
          </Link>
          {/* / About Button */}
          {/* Theme Button */}
          <div
            onClick={() => {
              setTheme(theme + 1);
            }}
            className="w-[30px] h-[30px] border border-secondary rounded-full hover:bg-secondary cursor-pointer"
          ></div>
          {/* / Theme Button */}
        </div>
        {/* / Left Side */}
      </div>
    </nav>
  );
};

export default Nav;
