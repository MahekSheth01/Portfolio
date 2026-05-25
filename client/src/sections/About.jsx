import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaRocket } from "react-icons/fa";

const stats = [
  { icon: <FaCode />, number: "5+", title: "Projects Built" },
  { icon: <FaLaptopCode />, number: "15+", title: "Technologies Learned" },
  { icon: <FaRocket />, number: "6 Months", title: "Internship experience" },
];

const About = () => {
  return (
    <section id="about" className="section-gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container-inner">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-heading">My Journey</h2>
          <p className="section-subtitle">
            A passionate developer who loves turning ideas into elegant digital experiences.
          </p>
        </motion.div>

        {/* CONTENT GRID */}
        <div className="grid-2col" style={{ alignItems: "center" }}>

          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.875rem)", fontWeight: 700, lineHeight: 1.3 }}>
              Passionate About Building Digital Experiences
            </h3>
            <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", lineHeight: 1.8, opacity: 0.75 }}>
              I'm Mahek Sheth, a Full Stack MERN Developer passionate about creating modern,
              responsive and user-friendly web applications.
            </p>
            <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", lineHeight: 1.8, opacity: 0.75 }}>
              I enjoy turning ideas into real digital products that are not only visually
              engaging but also solve practical problems.
            </p>
            <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", lineHeight: 1.8, opacity: 0.75 }}>
              Currently focused on MERN stack development, AI-powered applications and
              creating interactive user experiences.
            </p>
          </motion.div>

          {/* RIGHT — STATS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}
          >
            {stats.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: "2rem",
                  borderRadius: "1.5rem",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-primary)",
                }}
              >
                <div style={{ fontSize: "2rem", color: "var(--accent)", marginBottom: "1rem" }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.4rem" }}>{item.number}</h4>
                <p style={{ opacity: 0.65, fontSize: "0.95rem" }}>{item.title}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;