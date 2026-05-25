import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaReact, FaNodeJs, FaDatabase, FaGithub, FaFigma, FaJava, FaPython,
} from "react-icons/fa";
import {
  SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiTypescript,
  SiNextdotjs, SiPostman, SiRedux,
} from "react-icons/si";
import API from "../services/api";

const ICON_MAP = {
  react: <FaReact />, javascript: <SiJavascript />, typescript: <SiTypescript />,
  tailwind: <SiTailwindcss />, nodejs: <FaNodeJs />, express: <SiExpress />,
  mongodb: <SiMongodb />, github: <FaGithub />, figma: <FaFigma />,
  database: <FaDatabase />, java: <FaJava />, python: <FaPython />,
  nextjs: <SiNextdotjs />, postman: <SiPostman />, redux: <SiRedux />,
};

const FALLBACK_SKILLS = [
  { category: "frontend", name: "React",       icon: "react"       },
  { category: "frontend", name: "JavaScript",  icon: "javascript"  },
  { category: "frontend", name: "Tailwind CSS", icon: "tailwind"   },
  { category: "backend",  name: "Node.js",     icon: "nodejs"      },
  { category: "backend",  name: "Express.js",  icon: "express"     },
  { category: "backend",  name: "MongoDB",     icon: "mongodb"     },
  { category: "tools",    name: "GitHub",      icon: "github"      },
  { category: "tools",    name: "Figma",       icon: "figma"       },
  { category: "tools",    name: "Java",        icon: "java"        },
];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get("/skills");
        setSkills(data.length > 0 ? data : FALLBACK_SKILLS);
      } catch { setSkills(FALLBACK_SKILLS); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-gap">
      <div className="container-inner">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <span className="section-label">My Skills</span>
          <h2 className="section-heading">Technologies I Use</h2>
          <p className="section-subtitle">
            A curated set of tools and technologies I use to build modern applications.
          </p>
        </motion.div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "5rem 0" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", border: "4px solid var(--accent)", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {Object.entries(grouped).map(([category, catSkills], index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* CATEGORY HEADER */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1.375rem", fontWeight: 700, whiteSpace: "nowrap" }}>{category}</h3>
                  <div style={{ flex: 1, height: 1, backgroundColor: "var(--border)" }} />
                </div>

                {/* SKILLS GRID */}
                <div className="grid-4col">
                  {catSkills.map((skill, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        padding: "1.5rem",
                        borderRadius: "1.25rem",
                        border: "1px solid var(--border)",
                        backgroundColor: "var(--bg-secondary)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: "0.875rem",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontSize: "2.25rem", color: "var(--accent)" }}>
                        {ICON_MAP[skill.icon?.toLowerCase()] || ICON_MAP[skill.name?.toLowerCase()] || <FaDatabase />}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
};

export default Skills;