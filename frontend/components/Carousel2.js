import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

import useMousePosition from "../hooks/useMousePosition";

const CarouselTwo = ({ projects, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState();
  const thumbnailRef = useRef({});
  const newWorkRef = useRef(null);
  const { x, y } = useMousePosition();

  const [runInterval, setRunInterval] = useState(true);

  // If its the first thumbnail, show 'New work' label
  const projectsLength = projects.length;

  useEffect(() => {
    setLength(projectsLength);
    if (currentIndex === 0) {
      newWorkRef.current.style.display = "block";
    } else {
      newWorkRef.current.style.display = "none";
    }
  }, [projectsLength, currentIndex]);

  // Show previous and next thumbnail on click and hide the current; set the 'currentIndex' of the thumbnails
  const prev = () => {
    // clearInterval();
    if (currentIndex > 0) {
      thumbnailRef.current[currentIndex].style.display = "none";
      thumbnailRef.current[currentIndex - 1].style.display = "block";
      setCurrentIndex(currentIndex - 1);
    } else {
      thumbnailRef.current[currentIndex].style.display = "none";
      thumbnailRef.current[length - 1].style.display = "block";
      setCurrentIndex(length - 1);
    }
  };

  const next = () => {
    // clearInterval();
    if (currentIndex < length - 1) {
      thumbnailRef.current[currentIndex].style.display = "none";
      thumbnailRef.current[currentIndex + 1].style.display = "block";
      setCurrentIndex(currentIndex + 1);
    } else {
      thumbnailRef.current[currentIndex].style.display = "none";
      thumbnailRef.current[0].style.display = "block";
      setCurrentIndex(0);
    }
  };

  // When hovering over each thumbnail, show the description box
  const thumbnailDesRef = useRef(null);
  const thumbnailMouseEnter = () => {
    thumbnailDesRef.current.style.display = "flex";
  };
  const thumbnailMouseLeave = () => {
    thumbnailDesRef.current.style.display = "none";
  };

  // Styles for previous and next hover areas
  const leftRightStyles = { divClass: "w-1/3 h-full z-20" };
  let currentThumbnail = thumbnailRef.current[currentIndex];
  let nextThumbnail = thumbnailRef.current[currentIndex + 1];
  let firstThumbnail = thumbnailRef.current[0];

  useEffect(() => {
    if (runInterval) {
      const interval = setInterval(() => {
        currentIndex < length - 1
          ? ((currentThumbnail.style.display = "none"),
            (nextThumbnail.style.display = "block"),
            setCurrentIndex(currentIndex + 1))
          : ((currentThumbnail.style.display = "none"),
            (firstThumbnail.style.display = "block"),
            setCurrentIndex(0));
      }, 5000);
      return () => clearInterval(interval);
    } else {
      setRunInterval(false);
    }
  }, [
    length,
    currentIndex,
    runInterval,
    currentThumbnail,
    nextThumbnail,
    firstThumbnail,
  ]);

  return (
    <div className="flex justify-center items-center p-md relative border border-secondary bg-primary">
      <div className="w-full relative">
        {projects.map(({ thumbnail, slug }, i) => {
          return (
            <div key={i} className="group/item relative min-w-full z-10">
              {i === 0 && (
                <div
                  ref={newWorkRef}
                  className="font-serif text-xl text-secondary border border-secondary p-md bg-primary absolute animate-bounce top-[-20px]"
                >
                  New work
                </div>
              )}

              <Link
                className={`${
                  theme === 2
                    ? "hover:cursor-upArrowDark"
                    : "hover:cursor-upArrow"
                }`}
                href={`/project/${encodeURIComponent(slug.current)}`}
                onMouseEnter={() => {
                  thumbnailMouseEnter();
                }}
                onMouseLeave={() => {
                  thumbnailMouseLeave();
                }}
              >
                <Image
                  eager
                  ref={(element) => (thumbnailRef.current[i] = element)}
                  src={urlFor(thumbnail).url()}
                  width={1000}
                  height={1000}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  className="group-first/item:block hidden w-full"
                  alt=""
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="absolute w-full h-full flex">
        <div
          className={`${leftRightStyles.divClass} ${
            theme === 2
              ? "hover:cursor-leftArrowDark"
              : "hover:cursor-leftArrow"
          }`}
          onClick={() => {
            prev();
            setRunInterval(false);
          }}
        ></div>
        <div className=" h-[0px] w-1/3"></div>
        <div
          className={`${leftRightStyles.divClass} ${
            theme === 2
              ? "hover:cursor-rightArrowDark"
              : "hover:cursor-rightArrow"
          }`}
          onClick={() => {
            next();
            setRunInterval(false);
          }}
        ></div>
      </div>
      <div
        ref={thumbnailDesRef}
        style={{ left: `calc(${x}px + 42px)`, top: `${y}px` }}
        className="fixed hidden p-md border border-secondary z-20 bg-primary flex-col gap-md"
      >
        <div className="font-sans text-sm text-secondary">
          {currentIndex + 1}/{length}
        </div>
        <div className="font-sans text-sm text-secondary">
          {projects[currentIndex].title}
        </div>
      </div>
    </div>
  );
};

// sanity client
const client = createClient({
  projectId: "jdq7aeh0",
  dataset: "production",
  apiVersion: "2023-03-27",
  useCdn: true,
});

// image url builder
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

export default CarouselTwo;
