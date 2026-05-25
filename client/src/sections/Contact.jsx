import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import API from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setSuccess(""); setError("");
    try {
      await API.post("/messages", formData);
      setSuccess("Message sent successfully 🚀");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  const links = [
    { icon: <FaEnvelope />, label: "mahek@gmail.com", href: "mailto:mahek@gmail.com" },
    { icon: <FaGithub />, label: "github.com/maheksheth", href: "https://github.com" },
    { icon: <FaLinkedin />, label: "linkedin.com/in/maheksheth", href: "https://linkedin.com" },
  ];

  const inputStyle = {
    width: "100%",
    padding: "1rem",
    borderRadius: "0.875rem",
    outline: "none",
    fontSize: "0.95rem",
    border: "1px solid var(--border)",
    backgroundColor: "var(--bg-secondary)",
    color: "var(--text-primary)",
  };

  return (
    <section id="contact" className="section-gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container-inner">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <span className="section-label">Contact Me</span>
          <h2 className="section-heading">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind? I'd love to hear about it. Send me a message and let's build something great.
          </p>
        </motion.div>

        <div className="grid-2col" style={{ alignItems: "start" }}>

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <div>
              <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.875rem)", fontWeight: 700, lineHeight: 1.3, marginBottom: "1rem" }}>
                Let's Build Something Amazing
              </h3>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, opacity: 0.75 }}>
                I'm always open to discussing projects, collaborations and creative ideas.
                Whether you have a question or just want to say hi — my inbox is always open.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {links.map(({ icon, label, href }, i) => (
                <a key={i} href={href} target={href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none", color: "inherit" }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: "0.875rem", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "1.25rem", flexShrink: 0,
                    backgroundColor: "var(--bg-primary)", color: "var(--accent)",
                  }}>
                    {icon}
                  </div>
                  <span style={{ fontSize: "1rem", opacity: 0.8 }}>{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              display: "flex", flexDirection: "column", gap: "1rem",
              padding: "2rem", borderRadius: "1.5rem",
              border: "1px solid var(--border)", backgroundColor: "var(--bg-primary)",
              width: "100%",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-name-email">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
            </div>

            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required style={inputStyle} />

            <textarea name="message" rows={6} placeholder="Tell me about your project..." value={formData.message} onChange={handleChange} required style={{ ...inputStyle, resize: "none" }} />

            {success && <p style={{ color: "#22c55e", fontWeight: 500, fontSize: "0.9rem" }}>{success}</p>}
            {error && <p style={{ color: "#ef4444", fontWeight: 500, fontSize: "0.9rem" }}>{error}</p>}

            <button
              type="submit" disabled={loading}
              style={{
                width: "100%", padding: "1rem", borderRadius: "0.875rem", fontWeight: 700,
                fontSize: "1rem", backgroundColor: "var(--accent)", color: "#fff",
                border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>
          </motion.form>

        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-name-email { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;