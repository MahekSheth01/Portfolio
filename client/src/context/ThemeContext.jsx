import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


// CREATE CONTEXT
const ThemeContext =
  createContext();


// PROVIDER
export const ThemeProvider = ({
  children,
}) => {

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme")
      || "light"
    );


  // APPLY THEME
  useEffect(() => {

    document.documentElement.className =
      theme;

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);


  // TOGGLE THEME
  const toggleTheme = () => {

    setTheme(
      theme === "light"
        ? "dark"
        : "light"
    );

  };


  return (

    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

};


// CUSTOM HOOK
export const useTheme = () =>
  useContext(ThemeContext);