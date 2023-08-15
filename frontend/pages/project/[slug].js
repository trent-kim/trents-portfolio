import React, { useState, useRef } from "react";
import groq from "groq";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { createClient } from "next-sanity";

import Layout from "../../components/layout";
import Nav from "../../components/Nav"
import MoreWork from "../../components/MoreWork";
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

const Project = ({ project, projects, about, theme, setTheme }) => {
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
      {about && <Nav about={about} theme={theme} setTheme={setTheme}></Nav>}
      <div className="w-[1300px] px-md pb-md flex flex-wrap gap-x-md">
        <div className="lg:flex gap-x-md gap-y-lg mt-[68px]">
          {/* Project Card */}
          <div className="w-full lg:w-[calc((1/2*100%)-6px)] xl:w-[calc((1/3*100%)-8px)]">
            <div className="lg:sticky lg:top-[68px] pt-lg lg:py-lg">
              <div className="group p-md border border-secondary flex flex-col bg-primary gap-lg">
                {/* Home Button */}
                <Link
                  href={`/#projects`}
                  className="hover:bg-primary bg-secondary w-[30px] h-[30px] border border-secondary rounded-full"
                ></Link>
                {/* / Home Button */}
                {/* Title */}
                <div className="font-serif text-4xl text-secondary">
                  {project?.title}
                </div>
                {/* / Title */}
                {/* Year */}
                <div className="font-serif text-xl text-secondary">
                  {project?.year}
                </div>
                {/* / Year */}
                <div className="flex flex-col gap-md">
                  {/* Introduction */}
                  <div className="font-sans text-sm text-secondary">
                    {project?.introduction}
                  </div>
                  {/* / Introduction */}
                  {/* Description */}
                  <div className="font-sans text-sm text-secondary">
                    <PortableText
                      value={project?.description}
                      components={ptComponents}
                    />
                  </div>
                  {/* /Description */}
                </div>
                {/* Details */}
                <div className="flex flex-wrap flex-col sm:flex-row gap-lg">
                  {/* Made with */}
                  <div className="w-full sm:w-[calc((1/3*100%)-16px)] xl:w-[calc((1/2*100%)-12px)]">
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
                  {/* / Made with */}
                  {/* Categories */}
                  <div className="w-full sm:w-[calc((1/3*100%)-16px)] xl:w-[calc((1/2*100%)-12px)]">
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
                  {/* /Categories */}
                  {/* Collaborators */}
                  <>
                    {project?.collaborators && (
                      <div className="w-full sm:w-[calc((1/3*100%)-16px)] xl:w-[calc((1/2*100%)-12px)]">
                        <div className="font-serif text-xl text-secondary ">
                          Collaborators
                        </div>
                        {project?.collaborators?.map((collaborator, i) =>
                          collaborator?.url ? (
                            <div
                              key={i}
                              className="font-sans text-sm text-secondary underline"
                            >
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
                            <div
                              key={i}
                              className="font-sans text-sm text-secondary"
                            >
                              {collaborator.name}
                              <br></br>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </>
                  {/* / Collaborators */}
                </div>
                {/* / Details */}
                {/* Links */}
                <div className="flex gap-md">
                {project?.links &&
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
                  ))}
                  </div>
                {/* / Links */}
              </div>
            </div>
          </div>
          {/* /Project Card */}
          {/* Images */}
          <div className="border border-secondary bg-primary p-md mb-lg flex flex-col gap-y-lg w-full lg:w-[calc((1/2*100%)-6px)] xl:w-[calc((2/3*100%)-4px)] my-lg">
            {project?.images?.map((image, i) => (
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
            ))}
            {/* Image Descriptions */}
            <div
              ref={imageDesRef}
              style={{ left: `calc(${x}px + 22px)`, top: `${y}px` }}
              className="fixed hidden p-md border border-secondary mr-md z-20 bg-primary flex-col gap-md max-w-[calc((1/2*100%)-6px)] xl:max-w-[calc((1/3*100%)-8px)]"
            >
              <div className="font-sans text-sm text-secondary">
                {project?.images[currentIndex]?.description &&
                  project?.images[currentIndex]?.description}
              </div>
            </div>
            {/* / Image Descriptions */}
          </div>
          {/* / Images */}
        </div>
        {projects && (
          <MoreWork projects={projects} currentSlug={project?.slug}></MoreWork>
        )}
        {about && <Footer about={about}></Footer>}
      </div>
    </Layout>
  );
};

// sanity client
const client = createClient({
  projectId: "jdq7aeh0",
  dataset: "production",
  apiVersion: "2023-03-27",
  useCdn: true,
});

// queries
const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    year,
    "categories": categories[]->name,
    madeWith,
    collaborators,
    introduction,
    description,
    links[],
    images
  }`;

const projectsQuery = groq`*[_type == 'project']{
  _id,
  title,
  slug,
  year,
  "categories": categories[]->name,
  introduction,
  thumbnail
} | order(_updatedAt asc) | order(year desc)`;

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
  const projects = await client.fetch(projectsQuery);
  const about = await client.fetch(aboutQuery);
  return {
    props: {
      project,
      projects,
      about,
    },
  };
}

export default Project;