import React, { useState, useRef } from "react";
import groq from "groq";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { createClient } from "next-sanity";

import Layout from "../../components/layout";
import Footer from "../../components/Footer";
import useMousePosition from "../../hooks/useMousePosition";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit("max").auto("format")}
        />
      );
    },
  },
};

const Project = ({ project, about, theme, setTheme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { x, y } = useMousePosition();

  const imageDesRef = useRef(null);
  const imageMouseEnter = (i) => {
    setCurrentIndex(i);
    project?.images[i]?.description &&
      (imageDesRef.current.style.display = "flex");
  };
  const imageMouseLeave = () => {
    imageDesRef.current.style.display = "none";
  };

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <div className="w-[1300px] px-md pb-md flex flex-wrap gap-x-md">
        {/* <div className="flex mt-[77px] sticky top-[77px] border w-full md:w-[calc((1/2*100%)-6px)] xl:w-[calc((1/3*100%)-8px)]"> */}
        {/* <div className="flex flex-wrap gap-x-md gap-y-lg mt-lg"> */}
        {/* Project Card */}
        <div className="mt-[77px] md:sticky md:top-[77px] w-full md:w-[calc((1/2*100%)-6px)] xl:w-[calc((1/3*100%)-8px)]  md:h-[100px]">
          <div className="group p-md border border-secondary flex flex-col bg-primary gap-md mt-lg">
            <Link
              href={`/`}
              className="hover:bg-primary bg-secondary w-[30px] h-[30px] border border-secondary rounded-full"
            ></Link>
            <div className="font-serif text-4xl text-secondary">
              {project?.title}
            </div>
            <div className="font-serif text-xl text-secondary">
              {project?.year}
            </div>
            <div className="font-sans text-sm text-secondary">
              {project?.introduction}
            </div>
            <div className="font-sans text-sm text-secondary">
              <PortableText
                value={project?.description}
                components={ptComponents}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-lg">
              <div>
                <div className="font-serif text-xl text-secondary ">
                  Made with
                </div>
                <div className="font-sans text-sm text-secondary">
                  {project?.madeWith?.map((i) => (
                    <div key={i}>
                      {i}
                      <br></br>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-serif text-xl text-secondary ">
                  Category
                </div>
                <div className="font-sans text-sm text-secondary">
                  {project?.categories?.map((category, i) => (
                    <div key={i}>
                      {category}
                      <br></br>
                    </div>
                  ))}
                </div>
              </div>
              <div>
              {project?.collaborators && (
                <>
                <div className="font-serif text-xl text-secondary ">
                  Collaborators
                </div>
                <div className="font-sans text-sm text-secondary">
                  
                    {project?.collaborators?.map((collaborator, i) => (
                      collaborator?.url ? (
                        <div key={i} className="font-sans text-sm text-secondary underline">
                          <Link
                            target="_blank"
                            rel="noreferrer"
                            href={collaborator.url}
                          >
                            {collaborator.name}
                            <br></br>
                          </Link>
                        </div>
                      ) : (
                        <div key={i}>
                          {collaborator.name}
                          <br></br>
                        </div>
                      )
                    ))}
                </div>
                </>
              )}
              </div>
              
            </div>
            {project?.links && (
              project?.links?.map((link, i) => (
              <div key={link.url}>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={`${link.url}`}
                >
                  <button className="font-sans text-sm text-secondary border border-secondary rounded-full h-[30px] px-md hover:bg-secondary hover:text-primary z-30">
                    {link.label}
                  </button>
                </Link>
              </div>
              ))
            )}
          </div>
        </div>
        {/* /Project Card */}

        {/* </div> */}
        {/* </div> */}
        <div className="mb-lg md:mt-[101px] flex flex-col gap-y-lg w-full md:w-[calc((1/2*100%)-6px)] xl:w-[calc((2/3*100%)-4px)]">
          {project?.images?.map((image, i) => (
            // <div  className=" border absolute w-full h-full">
            <Image
              key={i}
              src={urlFor(image).url()}
              alt=""
              width={1000}
              height={1000}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              onMouseEnter={() => {
                imageMouseEnter(i);
              }}
              onMouseLeave={() => {
                imageMouseLeave();
              }}
            />
            // </div>
          ))}
          <div
            ref={imageDesRef}
            style={{ left: `calc(${x}px + 22px)`, top: `${y}px` }}
            className="fixed hidden p-md border border-secondary z-20 bg-primary flex-col gap-md max-w-[calc((1/2*100%)-6px)] xl:max-w-[calc((1/3*100%)-8px)]"
          >
            <div className="font-sans text-sm text-secondary">
              {project?.images[currentIndex]?.description &&
                project?.images[currentIndex]?.description
              }
            </div>
          </div>
        </div>
        {about && (
        <Footer about={about}></Footer>
        )}
      </div>
    </Layout>
  );
};

const client = createClient({
  projectId: "jdq7aeh0",
  dataset: "production",
  apiVersion: "2023-03-27",
  useCdn: true,
});

const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    year,
    "categories": categories[]->name,
    madeWith,
    collaborators,
    introduction,
    description,
    links[],
    images
  }`;

const aboutQuery = groq`*[_type == 'about']{
    _id,
    title,
    bio,
    contacts[],
    featuredIn[],
    madeWith[],
    typefacesUsed[],
    updated
  }`;

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "project" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const project = await client.fetch(projectQuery, { slug });
  const about = await client.fetch(aboutQuery);
  return {
    props: {
      project,
      about,
    },
  };
}

export default Project;
