import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

import useWindowWidth from "../hooks/useWindowWidth";

const MoreWork = ({ projects, currentSlug }) => {
  const projectRef = useRef({});
  const [currentProject, setCurrentProject] = useState();
// let windowWidth = window.innerWidth;
  const {width} = useWindowWidth();
//   console.log(width)

  useEffect(() => {

    projects.map(({}, i) => (
        // console.log(currentSlug.current === projects[i].slug.current),
        currentSlug.current === projects[i].slug.current && setCurrentProject(i),
        // console.log('ya', i > currentProject - 1 || i < currentProject + 1),
        width > 1280 && (
            currentProject === 0 ? (
                projectRef.current[currentProject].style.display = "none",
                i < currentProject + 4 ? (projectRef.current[i].style.display = "block") : (projectRef.current[i].style.display = "none")
            ) : (
                i < currentProject || i < currentProject + 3 ? (projectRef.current[i].style.display = "block") : (projectRef.current[i].style.display = "none")
            )
        ),
        width < 1280 && width > 768 && (
            currentProject === 0 ? (
                projectRef.current[currentProject].style.display = "none",
                i < currentProject + 3 ? (projectRef.current[i].style.display = "block") : (projectRef.current[i].style.display = "none")
            ) : (
                i < currentProject || i < currentProject + 2 ? (projectRef.current[i].style.display = "block") : (projectRef.current[i].style.display = "none")
            )
        ),
        width < 768 && (
            projectRef.current[currentProject].style.display = "none",
            i < currentProject + 2 ? (projectRef.current[i].style.display = "block") : (projectRef.current[i].style.display = "none")
        ),
        
        // (i > currentProject - 1 || i < currentProject + 1 && (projectRef.current[i].style.display = "none"))
        
        currentProject && (projectRef.current[currentProject].style.display = "none")
    ))
    
    
}, [projects, currentProject, setCurrentProject, width]);
          
        // : projects.map(({ categories }, i) => (
        //     <>
        //       {categories.map((category) =>
        //         category === categoryName.innerText
        //           ? ((projectRef.current[i].style.display = "block"),
        //             (match = true))
        //           : !match && (projectRef.current[i].style.display = "none")
        //       )}
        //       ;{(match = false)}
        //     </>
        //   )));

  return (
    <div className="w-full">
    <div className="p-md mb-lg flex bg-primary w-full border border-secondary font-serif text-xl">
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
    </div>
  );
};

export default MoreWork;