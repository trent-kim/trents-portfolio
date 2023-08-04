import React, { useRef } from "react";
import groq from "groq";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { createClient } from "next-sanity";

import Layout from "../components/layout";
import Footer from "../components/Footer";
import useMousePosition from "../hooks/useMousePosition";

const About = ({ about, theme, setTheme }) => {
  const { x, y } = useMousePosition();

  const imageDesRef = useRef(null);
  const imageMouseEnter = () => {
    about[0]?.image?.description &&
      (imageDesRef.current.style.display = "flex");
  };
  const imageMouseLeave = () => {
    imageDesRef.current.style.display = "none";
  };
  return (
    <Layout theme={theme} setTheme={setTheme}>
      <div className="w-[1300px] px-md pb-md flex flex-wrap gap-x-md">
        <div className="md:flex gap-x-md gap-y-lg mt-[77px]">
          {/* About Card */}
          <div className="w-full md:w-[calc((1/2*100%)-6px)] xl:w-[calc((1/3*100%)-8px)]">
            <div className="md:sticky md:top-[77px] pt-lg md:py-lg">
              <div className="group p-md border border-secondary flex flex-col bg-primary gap-md">
                {/* Home Button */}
                <Link
                  href={`/`}
                  className="hover:bg-primary bg-secondary w-[30px] h-[30px] border border-secondary rounded-full"
                ></Link>
                {/* / Home Button */}
                {/* Title */}
                <div className="font-serif text-4xl text-secondary">
                  {about[0].title}
                </div>
                {/* / Title */}
                {/* Description */}
                <div className="font-sans text-sm text-secondary">
                  <PortableText
                    value={about[0].bio}
                    components={ptComponents}
                  />
                </div>
                {/* / Description */}
                {/* Links */}
                <div>
                  <div className="font-serif text-xl text-secondary">Links</div>
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
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={"http://trentkim.space/trent-kim-cv.pdf"}
                      className="hover:text-primary"
                    >
                      Resume
                    </Link>
                  </div>
                </div>
                {/* / Links */}
                {/* Features */}
                <div>
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
                <div>
                  <div className="font-serif text-xl text-secondary">
                    Education
                  </div>
                  <div className="font-sans text-sm text-secondary">
                    {about[0].education.map((school) => (
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
              </div>
            </div>
          </div>
          {/* /About Card */}
          {/* Image */}
          <div className="mb-lg flex flex-col gap-y-lg w-full md:w-[calc((1/2*100%)-6px)] xl:w-[calc((2/3*100%)-4px)] my-lg">
            <Image
              src={urlFor(about[0]?.image).url()}
              alt=""
              width={1000}
              height={1000}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              onMouseEnter={() => {
                imageMouseEnter();
              }}
              onMouseLeave={() => {
                imageMouseLeave();
              }}
            />
            {/* Image Description */}
            <div
              ref={imageDesRef}
              style={{ left: `calc(${x}px + 22px)`, top: `${y}px` }}
              className="fixed hidden p-md border border-secondary z-20 bg-primary flex-col gap-md max-w-[calc((1/2*100%)-6px)] xl:max-w-[calc((1/3*100%)-8px)]"
            >
              <div className="font-sans text-sm text-secondary">
                {about[0]?.image?.description}
              </div>
            </div>
            {/* / Image Description */}
          </div>
          {/* / Image */}
        </div>
        <Footer about={about}></Footer>
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

// image url builder
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

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

// queries
const aboutQuery = groq`*[_type == 'about']{
  _id,
  title,
  bio,
  contacts[],
  featuredIn[],
  education[],
  madeWith[],
  typefacesUsed[],
  updated,
  image
}`;

export async function getStaticProps() {
  const about = await client.fetch(aboutQuery);
  return {
    props: {
      about,
    },
  };
}

export default About;