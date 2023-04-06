import React from "react";
import Nav from "./Nav";

export const siteTitle = "Jaehee Cheong";

export default function Layout({ children, theme, setTheme }) {
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
      <Nav theme={theme} setTheme={setTheme}></Nav>
      {children}
    </main>
  );
}
