import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

const Footer = ({ projects, categoryName }) => {
  const projectRef = useRef({});

  useEffect(() => {
    let match = false;
    categoryName !== null &&
      (categoryName.innerText === "All"
        ? projects.map(
            ({}, i) => (projectRef.current[i].style.display = "block")
          )
        : projects.map(({ categories }, i) => (
            <>
              {categories.map((category) =>
                category === categoryName.innerText
                  ? ((projectRef.current[i].style.display = "block"),
                    (match = true))
                  : !match && (projectRef.current[i].style.display = "none")
              )}
              ;{(match = false)}
            </>
          )));
  }, [projects, categoryName]);

  return (
    <div className="flex flex-col justify-center mb-lg">
      <div className="flex flex-wrap gap-x-md gap-y-lg">
        {projects.length > 0 &&
          projects.map(({ _id, title, slug, year, introduction }, i) => (
            <Link
              key={_id}
              ref={(element) => (projectRef.current[i] = element)}
              href={`/project/${encodeURIComponent(slug.current)}`}
              className="w-full md:w-[calc((1/2*100%)-6px)] xl:w-[calc((1/3*100%)-8px)] bg-primary"
            >
              <div className="group p-md border border-secondary flex flex-col gap-md">
                <div className="group-hover:bg-secondary w-[30px] h-[30px] border border-secondary rounded-full"></div>
                <div className="font-serif text-4xl text-secondary">
                  {title}
                </div>
                <div className="font-serif text-xl text-secondary">{year}</div>
                <div className="font-sans text-sm text-secondary">
                  {introduction}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Footer;
