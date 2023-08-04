import React, { useState, useRef } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

const NavTwo = ({ about }) => {
  const aboutRef = useRef(null);
  const [toggle, setToggle] = useState(false);

  const handleButton = () => {
    setToggle(!toggle);

    toggle
      ? (aboutRef.current.style.maxHeight = "0px")
      : (aboutRef.current.style.maxHeight = "800px");
  };
  return (
    <div className="relative">
    <nav className="flex flex-col justify-center relative w-full  mt-md border border-secondary bg-primary px-md pt-md overflow-hidden">
      {/* Top - Nav */}
      
      {/* / Top - Nav */}
      {/* Middle - Introduction */}
      <div
        className="font-serif text-4xl text-secondary mb-lg">
        {about[0].introduction}
      </div>
      {/* / Middle - Introduction */}
      {/* Bottom - About */}
      <div
        className="max-h-[0px] transition-max-h ease-in-out duration-[0.25s]"
        ref={aboutRef}
      >
        {/* Description */}
        <div className="font-serif text-4xl text-secondary mb-lg">
          <PortableText
            value={about[0].bio}
            components={ptComponents}
          />
        </div>
        {/* / Description */}
        <div className="flex flex-wrap mb-lg gap-lg ">
          {/* Features */}
          <div className="w-full md:w-[calc((1/3*100%)-16px)]">
            <div className="font-serif text-xl text-secondary">
              Featured in
            </div>
            <div className="font-sans text-sm text-secondary">
              {about[0].featuredIn.map((feature) => (
                <div key={feature.url}>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={feature.url}
                    className="underline hover:text-primary"
                  >
                    {feature.name}
                  </Link>
                  , {feature.year}
                  <br></br>
                </div>
              ))}
            </div>
          </div>
          {/* / Features */}
          {/* Education */}
          <div className="w-full md:w-[calc((1/3*100%)-16px)]">
            <div className="font-serif text-xl text-secondary">
              Education
            </div>
            <div className="font-sans text-sm text-secondary">
              {about[0].education?.map((school) => (
                <div key={school.url}>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={school.url}
                    className="underline hover:text-primary"
                  >
                    {school.name}
                  </Link>
                  ,&nbsp;
                  <br></br>
                  {school.degree}, {school.year}
                </div>
              ))}
            </div>
          </div>
          {/* / Education */}
          {/* Contact */}
          <div className="w-full md:w-[calc((1/3*100%)-16px)]">
            <div className="font-serif text-xl text-secondary">Contact</div>
            <div className="font-sans text-sm text-secondary underline">
              {about[0].contacts.map((contact) => (
                <Link
                  key={contact.url}
                  target="_blank"
                  rel="noreferrer"
                  href={contact.url}
                  className="hover:text-primary"
                >
                  {contact.type}
                  <br></br>
                </Link>
              ))}
              {/* <Link
                target="_blank"
                rel="noreferrer"
                href={"http://trentkim.space/trent-kim-cv.pdf"}
                className="hover:text-primary"
              >
                Resume
              </Link> */}
            </div>
          </div>
          {/* / Contact */}
        </div>
      </div>
      {/* Bottom - About */}
      {/* Read Button */}
      <div className="bg-primary pb-md">
      <button 
        className="font-sans text-sm text-secondary border border-secondary rounded-full h-[30px] px-md hover:bg-secondary hover:text-primary"
        onClick={() => {
          handleButton();
        }}
      >
        {toggle ? "Read less" : "Read more"}
      </button>
      </div>
      {/* / Read Button */}
    </nav>
    <div
    className="font-serif text-xl text-secondary border border-secondary p-md bg-primary absolute animate-bounce bottom-[-20px] right-md"
  >
    Open to work
  </div>
  </div>
  );
};

// portable text
const ptComponents = {
  types: {
    image: ({ value, isInline }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit("max").auto("format")}
          style={{ display: isInline ? "inline-block" : "block" }}
        />
      );
    },
  },
};

export default NavTwo;