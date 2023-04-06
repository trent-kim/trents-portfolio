import React, { useState, useEffect, useRef } from "react";
import groq from "groq";
import Head from "next/head";

import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
// import { PortableText } from "@portabletext/react";
import { createClient } from "next-sanity";

import Layout from "../components/layout";
import Nav from "../components/Nav";
import Filter from "../components/Filter";
import ProjectCards from "../components/ProjectCards";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

const Home = ({ projects, categories, about, theme, setTheme }) => {
  const [categoryName, setCategoryName] = useState(null);

  // const [theme, setTheme] = useState(0);

  // useEffect(() => {
  //   if (theme === 3) {
  //     setTheme(0);
  //   }
  // }, [theme]);

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <div className="w-[1300px] px-md pb-md">
        <div className="w-full sticky mt-[77px]">
          <Carousel projects={projects} theme={theme}></Carousel>
        </div>
        <Filter
          categories={categories}
          setCategoryName={setCategoryName}
        ></Filter>
        <ProjectCards
          projects={projects}
          categoryName={categoryName}
        ></ProjectCards>
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
const projectQuery = groq`*[_type == 'project']{
  _id,
  title,
  slug,
  year,
  "categories": categories[]->name,
  introduction,
  thumbnail
} | order(_updatedAt asc) | order(year desc)`;

const categoryQuery = groq`*[_type == 'category']{
  _id,
  name,
  orderNumber
} | order(orderNumber asc)`;

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

export async function getStaticProps() {
  const projects = await client.fetch(projectQuery);
  const categories = await client.fetch(categoryQuery);
  const about = await client.fetch(aboutQuery);
  return {
    props: {
      projects,
      categories,
      about,
    },
  };
}

export default Home;
