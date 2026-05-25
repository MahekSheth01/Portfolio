import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 50,
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        backgroundColor: "rgba(30,27,24,0.85)",
      }}
    >
      <div
        className="container-inner"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", paddingBottom: "1rem" }}
      >
        {/* LOGO */}
        <button
          onClick={() => scrollTo("home")}
          style={{ color: "var(--accent)", fontSize: "1.35rem", fontWeight: 800, letterSpacing: "0.02em", flexShrink: 0, background: "none", border: "none", cursor: "pointer" }}
        >
          Mahek Sheth
        </button>

        {/* DESKTOP LINKS */}
        <ul style={{ display: "flex", alignItems: "center", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#fff", opacity: 0.85, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => e.target.style.opacity = 0.85}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* RIGHT */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <ThemeToggle />
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "#fff", display: "none" }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)", padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "0.75rem", borderRadius: "0.75rem", fontSize: "1rem", color: "var(--text-primary)", width: "100%" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;