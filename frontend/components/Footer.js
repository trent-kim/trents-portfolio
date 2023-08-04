import React from "react";
import Link from "next/link";

const Footer = ({ about }) => {
  return (
    <div className="p-md flex flex-col md:flex-auto bg-primary w-full border border-secondary z-20 justify-between gap-lg">
      {/* Title */}
      <div className="font-serif text-4xl text-secondary">
          Colophon
      </div>
      {/* / Title */}
      {/* Content */}
      <div className="flex md:flex-col md:gap-lg w-full">
        {/* Top */}
        <div className="flex flex-wrap w-full gap-lg">
          {/* Made With */}
          <div className="w-full md:w-[calc((1/3*100%)-16px)]">
            <div className="font-serif text-xl text-secondary ">Made with</div>
            <div className="font-sans text-sm text-secondary">
              {about[0]?.madeWith?.map((i) => (
                <div key={i}>
                  {i}
                  <br></br>
                </div>
              ))}
            </div>
          </div>
          {/* / Made With */}
          {/* Typefaces */}
          <div className="w-full md:w-[calc((1/3*100%)-16px)]">
            <div className="font-serif text-xl text-secondary ">Typefaces</div>
            <div className="font-sans text-sm text-secondary">
              {about[0]?.typefacesUsed?.map((i) => (
                <div key={i}>
                  {i}
                  <br></br>
                </div>
              ))}
            </div>
          </div>
          {/* / Typefaces */}
          {/* Last Updated */}
          <div className="w-full md:w-[calc((1/3*100%)-16px)]">
            <div className="font-serif text-xl text-secondary ">
              Last updated
            </div>
            <div className="font-sans text-sm text-secondary">
              {about[0]?.updated}
            </div>
          </div>
          {/* / Last Updated */}
        </div>
        {/* / Top */}
        {/* Bottom */}
        <div className="flex flex-wrap w-full gap-lg">
          {/* Contact */}
          <div className="w-full md:w-[calc((1/3*100%)-16px)]">
            <div className="font-serif text-xl text-secondary">Contact</div>
            <div className="font-sans text-sm text-secondary underline">
              {about[0]?.contacts?.map((contact) => (
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
          {/* Copyright */}
          <div className="w-full md:w-[calc((1/3*100%)-16px)]">
            <div className="font-serif text-xl text-secondary">
              Copyright &#169; 2023
            </div>
            <div className="font-sans text-sm text-secondary">
              Trent Kim
            </div>
          </div>
          {/* / Copyright */}
          <div className="w-full md:w-[calc((1/3*100%)-16px)] invisible">
          <div className="font-serif text-xl text-secondary">
              THIS IS FILLER
            </div>
            <div className="font-sans text-sm text-secondary">
              THIS IS FILLER
            </div>
          </div>
        </div>
        {/* / Bottom */}  
      </div>
      {/* / Content */}
    </div>
  );
};

export default Footer;