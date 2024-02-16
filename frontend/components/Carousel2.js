import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import MuxPlayer from "@mux/mux-player-react"; 
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

import useMousePosition from "../hooks/useMousePosition";

const CarouselTwo = ({ projects, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState();
  const thumbnailRef = useRef({});
  const newWorkRef = useRef(null);
  const { x, y } = useMousePosition();

  const [isLoading, setIsLoading] = useState(true);

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
      thumbnailRef.current[currentIndex].style.visibility = "hidden";
      thumbnailRef.current[currentIndex - 1].style.visibility = "visible";
      setCurrentIndex(currentIndex - 1);
    } else {
      thumbnailRef.current[currentIndex].style.visibility = "hidden";
      thumbnailRef.current[length - 1].style.visibility = "visible";
      setCurrentIndex(length - 1);
    }
  };

  const next = () => {
    // clearInterval();
    if (currentIndex < length - 1) {
      thumbnailRef.current[currentIndex].style.visibility = "hidden";
      thumbnailRef.current[currentIndex + 1].style.visibility = "visible";
      setCurrentIndex(currentIndex + 1);
    } else {
      thumbnailRef.current[currentIndex].style.visibility = "hidden";
      thumbnailRef.current[0].style.visibility = "visible";
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
          ? ((currentThumbnail.style.visibility = "hidden"),
            (nextThumbnail.style.visibility = "visible"),
            setCurrentIndex(currentIndex + 1))
          : ((currentThumbnail.style.visibility = "hidden"),
            (firstThumbnail.style.visibility = "visible"),
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
    <div className="flex justify-center items-center p-md border border-secondary bg-primary">
      <div className="w-full relative">
        {projects.map(({ title, thumbnail, slug }, i) => {
          return (
            <div key={i} className="group/item first:relative absolute min-w-full first:visible invisible z-10 top-[0px]">
              {i === 0 && (
                <div
                  ref={newWorkRef}
                  className="font-serif text-xl text-secondary border border-secondary p-md bg-primary absolute animate-bounce top-[-15px] z-10"
                >
                  New work
                </div>
              )}

              <Link
                className={`${
                  theme === 2
                    ? "hover:cursor-upArrowDark"
                    : "hover:cursor-upArrow"
                } flex justify-center aspect-[14/8]`}
                href={`/project/${encodeURIComponent(slug.current)}`}
                onMouseEnter={() => {
                  thumbnailMouseEnter();
                }}
                onMouseLeave={() => {
                  thumbnailMouseLeave();
                }}
              >
                {thumbnail.image ? (
                  <>
                  {isLoading && (
                    <Image
                      src={generateLQIPUrl(thumbnail.image)}
                      alt=""
                      width={1000}
                      height={1000}
                      style={{
                        maxWidth: "",
                        height: "",
                      }}
                      className="object-contain"
                      quality={1} // This is for the LQIP
                    />
                  )}
                 <Image
                  ref={(element) => (thumbnailRef.current[i] = element)}
                  src={urlFor(thumbnail.image).url()}
                  onLoad={() => setIsLoading(false)}
                  width={1000}
                  height={1000}
                  style={{
                    maxWidth: "",
                    height: "",
                  }}
                  className="object-contain"
                  alt=""
                />
                </>
                ) : (
                <MuxPlayer
                  ref={(element) => (thumbnailRef.current[i] = element)}
                  className="h-full"
                  loop
                  autoPlay="muted"
                  preload="none"
                  streamType="on-demand"
                  playbackId={thumbnail.video}
                  metadata={{ video_title: title }}
                />
                )}
              </Link>
            </div>
          );
        })}
      
      <div className="absolute w-full h-full flex top-[0px]">
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

// Function to generate LQIP URL
function generateLQIPUrl(image) {
  return urlFor(image)
    .width(20) // Set a low width for LQIP
    .url();
}

export default CarouselTwo;