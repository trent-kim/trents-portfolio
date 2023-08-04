import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full absolute flex items-center justify-center">
    <div
        className="font-serif text-xl text-secondary border border-secondary p-md bg-primary absolute animate-bounce"
    >
        Loading
    </div>
    </div>
  );
};

export default Loader;
