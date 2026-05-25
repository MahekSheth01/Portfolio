import {
  FaMoon,
  FaSun,
} from "react-icons/fa";

import {
  useTheme,
} from "../context/ThemeContext";


const ThemeToggle = () => {

  const {
    theme,
    toggleTheme,
  } = useTheme();


  return (

    <button
      onClick={toggleTheme}
      className="
      p-3
      rounded-full
      border
      cursor-pointer
      transition
      duration-300
      "
      style={{
        borderColor:
          "var(--border)",
        backgroundColor:
          "var(--bg-secondary)",
      }}
    >

      {
        theme === "light"
        ? <FaMoon />
        : <FaSun />
      }

    </button>

  );

};

export default ThemeToggle;