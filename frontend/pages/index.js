import React, { useState } from "react";
import groq from "groq";
import { createClient } from "next-sanity";

import Layout from "../components/layout";
import Filter from "../components/Filter";
import ProjectCards from "../components/ProjectCards";
import Carousel from "../components/Carousel";
import CarouselTwo from "../components/Carousel2";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import About from "../components/About";

const Home = ({ projects, categories, about, theme, setTheme }) => {
  // Track the current category to filter by.
  const [categoryName, setCategoryName] = useState(null);

  return (
    <Layout theme={theme} setTheme={setTheme}>
      <Nav about={about} theme={theme} setTheme={setTheme}></Nav>
      <div className="w-[1300px] px-md pb-md mt-[77px]">
        <About 
        about={about}
        theme={theme}
        setTheme={setTheme}
        >
        </About>
        <div className="w-full my-lg">
          <CarouselTwo projects={projects} theme={theme}></CarouselTwo>
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
  introduction,
  bio,
  contacts[],
  featuredIn[],
  education[],
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
