import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import API from "../services/api";

const FALLBACK_PROJECTS = [
  {
    title: "AstroVerse",
    description: "AI-powered astrology platform with kundali generation, personalized predictions and modern UI.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB", "AI"],
    githubLink: "https://github.com/",
    liveLink: "https://example.com",
  },
  {
    title: "Event Booking Platform",
    description: "Modern event booking application with role-based authentication and ticket management.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    technologies: ["MERN", "JWT", "Tailwind"],
    githubLink: "https://github.com/",
    liveLink: "https://example.com",
  },
  {
    title: "AI Portfolio System",
    description: "Dynamic full stack portfolio management system with admin dashboard and cloud image uploads.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    technologies: ["React", "Express", "MongoDB"],
    githubLink: "https://github.com/",
    liveLink: "https://example.com",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get("/projects");
        setProjects(data.length > 0 ? data : FALLBACK_PROJECTS);
      } catch { setProjects(FALLBACK_PROJECTS); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  return (
    <section id="projects" className="section-gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container-inner">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <span className="section-label">Featured Projects</span>
          <h2 className="section-heading">Things I've Built</h2>
          <p className="section-subtitle">
            A selection of projects that showcase my skills across the full stack.
          </p>
        </motion.div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "5rem 0" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", border: "4px solid var(--accent)", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
          </div>
        ) : (
          <div className="grid-3col">
            {projects.map((project, index) => (
              <ProjectCard key={project._id || index} project={project} />
            ))}
          </div>
        )}

      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
};

export default Projects;