import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import { Piazzolla, IBM_Plex_Sans } from "next/font/google";
import { useRouter } from 'next/router'

import Seo from "../components/Seo";
import Loading from '../components/Loading';

// Typefaces
const piazzolla = Piazzolla({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const App = ({ Component, pageProps }) => {
  // If routing, set loading to true. If not, set loading to false.
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true)
      console.log("Url:", url)
    }

    const handleRouteChangeComplete = (url) => {
      setLoading(false)
      console.log("End:", loading)
    }

    const handleRouteChangeError = (url) => {
      setLoading(false)
      console.log("Error:", loading)
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router.events])

  // Set theme based on the number of times the theme button in Nav has been clicked
  const [theme, setTheme] = useState(0);
  
  useEffect(() => {
    if (theme === 3) {
      setTheme(0);
    }
  }, [theme]);

  if (loading) return <Loading/>

  return (
    <>
      <Seo></Seo>
      <style jsx global>
        {`
          :root {
            --piazzolla-font: ${piazzolla.style.fontFamily};
            --ibmPlexSans-font: ${ibmPlexSans.style.fontFamily};
          }
          html {
            background-color: ${theme === 0
              ? "#F5F5F5"
              : theme === 1
              ? "#FFFFFF"
              : "#1E1E1E"};
          }
        `}
      </style>
      
          <Component theme={theme} setTheme={setTheme} {...pageProps} />
    </>
  );
};

export default App;
