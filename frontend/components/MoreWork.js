import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

import useWindowWidth from "../hooks/useWindowWidth";

const MoreWork = ({ projects, currentSlug }) => {
  const projectRef = useRef({});
  const [currentProject, setCurrentProject] = useState();
  const { width } = useWindowWidth();

  useEffect(() => {
    projects.map(
      ({}, i) => (
        // If the slug of the current project page matches, then set this project as the current project.
        // So the following functions know which project to hide and which ones to display.
        currentSlug.current === projects[i].slug.current &&
          setCurrentProject(i),
        // If the window width is xl, display the previous project and the next two projects.
        width > 1280 &&
          (currentProject === 0
            ? ((projectRef.current[currentProject].style.display = "none"),
              i <= currentProject + 3
                ? (projectRef.current[i].style.display = "block")
                : (projectRef.current[i].style.display = "none"),
                console.log("first"))

            : currentProject === projects.length - 1
                ? (((i === 0) || (i === 1) || (i === currentProject - 1))
                  ? (projectRef.current[i].style.display = "block")
                  : (projectRef.current[i].style.display = "none"),
                  console.log("second"))

                : currentProject === projects.length - 2
                  ? (((i === 0) || (i === currentProject - 1) || (i === currentProject + 1))
                    ? (projectRef.current[i].style.display = "block")
                    : (projectRef.current[i].style.display = "none"),
                    console.log("third"))

                  : ((i === currentProject - 1) || (i === currentProject + 1) || (i === currentProject + 2))
                    ? (projectRef.current[i].style.display = "block")
                    : (projectRef.current[i].style.display = "none")
          ),
            
        // If the window width is md, display the previous project and the next project.
        width < 1280 &&
          width > 768 &&
          (currentProject === 0
            ? ((projectRef.current[currentProject].style.display = "none"),
              i <= currentProject + 2
                ? (projectRef.current[i].style.display = "block")
                : (projectRef.current[i].style.display = "none"),
                console.log("first"))

            : currentProject === projects.length - 1
                ? (((i === 0) || (i === currentProject - 1))
                  ? (projectRef.current[i].style.display = "block")
                  : (projectRef.current[i].style.display = "none"),
                  console.log("second"))

                : ((i === currentProject - 1) || (i === currentProject + 1))
                  ? (projectRef.current[i].style.display = "block")
                  : (projectRef.current[i].style.display = "none")
          ),
        // If the window width is sm, display the next project.
        width < 768 &&
        (currentProject === projects.length - 1
              ? i === 0
                ? (projectRef.current[i].style.display = "block")
                : (projectRef.current[i].style.display = "none")

              : i === currentProject + 1
                ? (projectRef.current[i].style.display = "block")
                : (projectRef.current[i].style.display = "none")
        ),
        // Hide the current project
        currentProject &&
          (projectRef.current[currentProject].style.display = "none")
      )
    );
  }, [projects, currentProject, setCurrentProject, width]);

  return (
    <div className="w-full">
      <div className="p-md mb-lg flex bg-primary w-full border border-secondary font-serif text-xl text-secondary">
        More work
      </div>
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
                <div className="group p-md border border-secondary flex flex-col gap-lg">
                  <div className="group-hover:bg-secondary w-[30px] h-[30px] border border-secondary rounded-full"></div>
                  <div className="font-serif text-4xl text-secondary">
                    {title}
                  </div>
                  <div className="font-serif text-xl text-secondary">
                    {year}
                  </div>
                  <div className="font-sans text-sm text-secondary">
                    {introduction}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MoreWork;
