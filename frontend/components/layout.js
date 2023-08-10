import React from "react";


import Nav from "./Nav";


export default function Layout({ children, theme, setTheme }) {
  // Styles for main children
  const styles = {
    divClass: "bg-background flex justify-center",
  };

  return (
    <main
      className={`${styles.divClass} ${
        theme === 0
          ? "theme-first"
          : theme === 1
          ? "theme-second"
          : "theme-third"
      }`}
    >
      
        {children}
    </main>
  );
}
