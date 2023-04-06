import React from "react";
import Link from "next/link";

const Footer = ({ about }) => {
  return (
    <div className="p-md flex bg-primary w-full border border-secondary z-20">
      <div className="flex flex-col gap-lg">
        <div>
          <div className="font-serif text-xl text-secondary">Links</div>
          <div className="font-sans text-sm text-secondary underline">
            {about[0]?.contacts?.map((contact) => (
              <Link
                key={contact.url}
                target="_blank"
                rel="noreferrer"
                href={contact.url}
              >
                {contact.type}
                <br></br>
              </Link>
            ))}
            <Link
              target="_blank"
              rel="noreferrer"
              href={"http://trentkim.com/trent-kim-cv.pdf"}
            >
              Resume
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-lg">
          <div>
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
          <div>
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
          <div>
            <div className="font-serif text-xl text-secondary ">
              Last updated
            </div>
            <div className="font-sans text-sm text-secondary">
              {about[0]?.updated}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
