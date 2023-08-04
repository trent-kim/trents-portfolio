import React from "react";
import Link from "next/link";

const Nav = ({ about, theme, setTheme }) => {
  return (
    <nav className="flex fixed justify-center w-full  z-30 mt-md px-md">
      <div className="p-md flex justify-between w-[1276px] border border-secondary bg-primary">
        {/* Home Button */}
        <Link
          href="/"
          className="group font-serif text-xl text-secondary  m-[0]"
        >
          Tr
          <span className="absolute group-hover:rotate-[-15deg] transition-transform origin-bottom duration-500 ease-[cubic-bezier(.55,1.9,.32,.56)]">
            e
          </span>
          <span className="text-primary">e</span>n
          <span className="absolute group-hover:rotate-[-11deg] transition-transform origin-bottom duration-500 ease-[cubic-bezier(.55,1.9,.32,.56)]">
            t
          </span>
          <span className="text-primary">t</span> K
          <span className="inline-block">
            <span className="absolute top-[1px] block group-hover:translate-y-[2.2px] transition-transform duration-500 ease-[cubic-bezier(.55,1.9,.32,.56)]">
              .
            </span>
            <span className="block">ı</span>
          </span>
          m
        </Link>
        {/* / Home Button */}
        {/* Left Side */}
        <div className="flex items-center gap-md">
          {/* About Button */}
          <Link
            target="_blank"
            rel="noreferrer"
            href={about[0].contacts[0].url}
          >
            <button className="font-sans text-sm text-secondary border border-secondary rounded-full h-[30px] px-md hover:bg-secondary hover:text-primary">
              Get in touch
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
