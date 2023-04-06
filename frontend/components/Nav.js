import React from "react";
import Link from "next/link";

const Nav = ({ theme, setTheme }) => {
  return (
    <nav className="flex fixed justify-center w-full  z-30 mt-md px-md">
      <div className="p-md flex justify-between w-[1276px] border border-secondary bg-primary">
        <Link href="/" className="font-serif text-4xl text-secondary hover:text-primary">
          Trent Kim
        </Link>
        <div className="flex items-center gap-md">
          <Link href="/about">
            <button className="font-sans text-sm text-secondary border border-secondary rounded-full h-[30px] px-md hover:bg-secondary hover:text-primary">
              About
            </button>
          </Link>
          <div
            onClick={() => {
              setTheme(theme + 1);
            }}
            className="w-[30px] h-[30px] border border-secondary rounded-full hover:bg-secondary cursor-pointer"
          ></div>
        </div>
        {/* </div> */}
      </div>
    </nav>
  );
};

export default Nav;
