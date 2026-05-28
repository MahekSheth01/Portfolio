import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border)", paddingTop: "5rem", paddingBottom: "2.5rem", width: "100%" }}>
      <div className="container-inner">

        {/* TOP ROW */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "2.5rem", marginBottom: "3rem" }}>

          {/* BRAND */}
          <div style={{ maxWidth: "20rem" }}>
            <h2 style={{ color: "var(--accent)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>
              Mahek Sheth
            </h2>
            <p style={{ opacity: 0.65, lineHeight: 1.75, fontSize: "0.95rem" }}>
              Full Stack MERN Developer focused on building modern, scalable
              and aesthetic digital experiences.
            </p>
          </div>

          {/* NAV LINKS */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 2rem" }}>
            {["Home", "About", "Skills", "Projects", "Gallery", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                style={{ color: "inherit", textDecoration: "none", opacity: 0.7, fontSize: "0.95rem", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => e.target.style.opacity = 0.7}
              >
                {item}
              </a>
            ))}
          </div>

          {/* SOCIALS */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a href="https://github.com/MahekSheth01" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-primary)", fontSize: "1.5rem", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/mahek-sheth-23726023b/" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-primary)", fontSize: "1.5rem", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              <FaLinkedin />
            </a>
          </div>

        </div>

        {/* BOTTOM */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ opacity: 0.55, fontSize: "0.875rem" }}>
            © 2026 Mahek Sheth. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            style={{ padding: "0.75rem", borderRadius: "9999px", backgroundColor: "var(--accent)", color: "#fff", border: "none", cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;