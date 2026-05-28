import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaRocket, FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "../services/api";

const stats = [
  { icon: <FaCode />,       number: "5+",       title: "Projects Built"        },
  { icon: <FaLaptopCode />, number: "15+",      title: "Technologies Learned"  },
  { icon: <FaRocket />,     number: "6 Months", title: "Internship Experience" },
];

const About = () => {
  const [resumeLink, setResumeLink] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await API.get("/settings");
        if (data?.resumeLink) setResumeLink(data.resumeLink);
      } catch {
        // silently ignore
      }
    };
    fetchSettings();
  }, []);

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

          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 700, lineHeight: 1.35 }}>
              Passionate About Building Digital Experiences
            </h3>
            <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", lineHeight: 1.85, opacity: 0.75 }}>
              I'm <strong>Mahek Sheth</strong>, a Full Stack MERN Developer passionate about
              creating modern, responsive and user-friendly web applications.
            </p>
            <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", lineHeight: 1.85, opacity: 0.75 }}>
              I enjoy turning ideas into real digital products that are not only visually
              engaging but also solve practical problems.
            </p>
            <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", lineHeight: 1.85, opacity: 0.75 }}>
              Currently focused on MERN stack development, AI-powered applications and
              creating interactive user experiences.
            </p>

            {/* DOWNLOAD RESUME — only shown if resumeLink is set in admin */}
            {resumeLink && (
              <div style={{ marginTop: "0.5rem" }}>
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
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
            )}
          </motion.div>

          {/* RIGHT — STATS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.25rem" }}
          >
            {stats.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: "1.75rem 1.5rem",
                  borderRadius: "1.5rem",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-primary)",
                }}
              >
                <div style={{ fontSize: "2rem", color: "var(--accent)", marginBottom: "1rem" }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "0.4rem" }}>
                  {item.number}
                </h4>
                <p style={{ opacity: 0.65, fontSize: "0.85rem", lineHeight: 1.4 }}>
                  {item.title}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1.2fr 1fr;
            gap: 4rem;
          }
        }
        @media (min-width: 1024px) {
          .about-grid { gap: 5rem; }
        }
      `}</style>
    </section>
  );
};

export default About;