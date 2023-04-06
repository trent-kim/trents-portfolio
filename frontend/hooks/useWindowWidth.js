import { useEffect, useState } from "react";

// export default function useWindowWidth() {
//   const [windowWidth, setWindowWidth] = useState({ ww: null});

//   useEffect(() => {
//     const windowWidthHandler = () => {
//     //   const {window.innerWidth} = event
//       setWindowWidth({ww: window.innerWidth});
//     };
//     document.addEventListener("windowAdjust", windowWidthHandler);

//     return () => {
//         document.addEventListener("windowAdjust", windowWidthHandler);
//     };
//   }, []);

//   return windowWidth;
// }



export default function useWindowWidth() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowWidth, setWindowWidth] = useState({
      width: undefined
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowWidth({
          width: window.innerWidth
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowWidth;
  }
  