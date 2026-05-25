import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Java Developer",
  "AI Enthusiast",
  "Creative Problem Solver",
];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "5rem", paddingBottom: "5rem" }}>

      {/* BG BLOBS */}
      <div style={{ position: "absolute", top: 40, left: 0, width: 300, height: 300, borderRadius: "50%", filter: "blur(80px)", opacity: 0.18, backgroundColor: "var(--accent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 40, right: 0, width: 400, height: 400, borderRadius: "50%", filter: "blur(80px)", opacity: 0.1, backgroundColor: "var(--accent)", pointerEvents: "none" }} />

      <div className="container-inner" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }} className="hero-grid">

          {/* TEXT — order 2 on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            style={{ textAlign: "center", order: 2 }}
            className="hero-text"
          >
            <p style={{ color: "var(--accent)", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Hello, I'm
            </p>

            <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.25rem" }}>
              Mahek Sheth
            </h1>

            <motion.h2
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: 600, color: "var(--accent)", marginBottom: "1.5rem" }}
            >
              {roles[currentRole]}
            </motion.h2>

            <p style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: 1.75, opacity: 0.75, marginBottom: "2.5rem", maxWidth: "38rem", marginLeft: "auto", marginRight: "auto" }}>
              I build modern, scalable and visually engaging web applications
              using the MERN stack and modern technologies.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={() => scrollTo("projects")}
                style={{ padding: "0.875rem 2rem", borderRadius: "9999px", fontWeight: 600, fontSize: "1rem", backgroundColor: "var(--accent)", color: "#fff", border: "none", cursor: "pointer", transition: "opacity 0.2s, transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo("contact")}
                style={{ padding: "0.875rem 2rem", borderRadius: "9999px", fontWeight: 600, fontSize: "1rem", backgroundColor: "transparent", color: "var(--text-primary)", border: "2px solid var(--border)", cursor: "pointer", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Contact Me
              </button>
            </div>
          </motion.div>

          {/* PHOTO — order 1 on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            style={{ display: "flex", justifyContent: "center", order: 1 }}
          >
            <div style={{
              width: "clamp(14rem, 30vw, 22rem)",
              height: "clamp(14rem, 30vw, 22rem)",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid var(--accent)",
              backgroundColor: "var(--bg-secondary)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
              flexShrink: 0,
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
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-text { text-align: left !important; order: 1 !important; }
          .hero-text p, .hero-text h2 { margin-left: 0 !important; }
          .hero-text > div { justify-content: flex-start !important; }
          .hero-text p:nth-child(4) { margin-left: 0 !important; margin-right: 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;