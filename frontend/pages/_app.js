import '@/styles/globals.css'
import React, { useState, useEffect } from "react";
import { Piazzolla, IBM_Plex_Sans } from "next/font/google";

import Seo from "../components/Seo";

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
  const [theme, setTheme] = useState(0);

  useEffect(() => {
    if (theme === 3) {
      setTheme(0);
    }
  }, [theme]);

  const styles = {
    divClass: "bg-background",
  };
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
            background-color: ${
              theme === 0
                ? "#F5F5F5"
                : theme === 1
                ? "#FFFFFF"
                : "#1E1E1E"
            };
          }
        `}
      </style>
      <Component theme={theme} setTheme={setTheme} {...pageProps}/>
    </>
  );
}

export default App


