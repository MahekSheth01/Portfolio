import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaRocket, FaDownload } from "react-icons/fa";

const stats = [
  { icon: <FaCode />,       number: "5+",       title: "Projects Built"        },
  { icon: <FaLaptopCode />, number: "15+",      title: "Technologies Learned"  },
  { icon: <FaRocket />,     number: "6 Months", title: "Internship Experience" },
];

const highlights = [
  "Full Stack MERN Developer",
  "Java & DSA Enthusiast",
  "AI & ML Explorer",
  "Open Source Contributor",
];

const About = () => {
  return (
    <section id="about" className="section-gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container-inner">

        {/* ── TITLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-heading">My Journey</h2>
          <p className="section-subtitle">
            A passionate developer who loves turning ideas into elegant digital experiences.
          </p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="about-grid">

          {/* LEFT — IMAGE + TAGS */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}
          >
            {/* AVATAR */}
            <div style={{ position: "relative" }}>
              <div style={{
                width: "clamp(200px, 35vw, 320px)",
                height: "clamp(200px, 35vw, 320px)",
                borderRadius: "2rem",
                overflow: "hidden",
                border: "3px solid var(--accent)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                backgroundColor: "var(--bg-primary)",
              }}>
                <img
                  src="/Profile.jpeg"
                  alt="Mahek Sheth"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML =
                      `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;font-weight:800;color:var(--accent)">M</div>`;
                  }}
                />
              </div>

              {/* FLOATING BADGE */}
              <div style={{
                position: "absolute",
                bottom: "-1rem",
                right: "-1rem",
                backgroundColor: "var(--accent)",
                color: "#fff",
                padding: "0.6rem 1.1rem",
                borderRadius: "9999px",
                fontSize: "0.8rem",
                fontWeight: 700,
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                whiteSpace: "nowrap",
              }}>
                🚀 Available for work
              </div>
            </div>

            {/* HIGHLIGHT TAGS */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center" }}>
              {highlights.map((tag, i) => (
                <span key={i} style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-primary)",
                  opacity: 0.85,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — TEXT + STATS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
          >
            <div>
              <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 700, lineHeight: 1.35, marginBottom: "1rem" }}>
                Passionate About Building Digital Experiences
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", lineHeight: 1.85, opacity: 0.75 }}>
                  I'm <strong>Mahek Sheth</strong>, a Full Stack MERN Developer passionate about creating
                  modern, responsive and user-friendly web applications.
                </p>
                <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", lineHeight: 1.85, opacity: 0.75 }}>
                  I enjoy turning ideas into real digital products that are not only visually
                  engaging but also solve practical problems.
                </p>
                <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", lineHeight: 1.85, opacity: 0.75 }}>
                  Currently focused on MERN stack development, AI-powered applications and
                  creating interactive user experiences.
                </p>
              </div>
            </div>

            {/* STAT CARDS */}
            <div className="stats-grid">
              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: "1.5rem",
                    borderRadius: "1.25rem",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--bg-primary)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ fontSize: "1.75rem", color: "var(--accent)" }}>
                    {item.icon}
                  </div>
                  <h4 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800 }}>
                    {item.number}
                  </h4>
                  <p style={{ opacity: 0.65, fontSize: "0.85rem", lineHeight: 1.4 }}>
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA BUTTON */}
            <div>
              <a
                href="/resume.pdf"
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.875rem 1.75rem",
                  borderRadius: "9999px",
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  transition: "opacity 0.2s, transform 0.2s",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <FaDownload /> Download Resume
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* SCOPED RESPONSIVE STYLES */}
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .about-grid > *:first-child {
          order: 1;
        }
        .about-grid > *:last-child {
          order: 2;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr 1.2fr;
            gap: 4rem;
          }
          .about-grid > *:first-child {
            order: unset;
          }
          .about-grid > *:last-child {
            order: unset;
          }
        }
        @media (min-width: 1024px) {
          .about-grid {
            gap: 5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;