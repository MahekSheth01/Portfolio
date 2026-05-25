import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  const githubUrl = project.githubLink || project.github;
  const liveUrl = project.liveLink || project.live;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl overflow-hidden border shadow-lg flex flex-col h-full"
      style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
    >
      {/* IMAGE */}
      <div className="h-48 sm:h-56 md:h-60 overflow-hidden shrink-0" style={{ backgroundColor: "var(--bg-primary)" }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition duration-500 hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-5xl font-bold opacity-20"
            style={{ color: "var(--accent)" }}
          >
            {project.title?.charAt(0) || "P"}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-xl sm:text-2xl font-bold mb-3">{project.title}</h3>
        <p className="opacity-80 leading-relaxed mb-5 flex-1 text-sm sm:text-base">{project.description}</p>

        {/* TECH TAGS */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
          {(project.technologies || []).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm"
              style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)" }}
            >
              {typeof tech === "string" ? tech.trim() : tech}
            </span>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 flex-wrap">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-full text-sm transition duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              <FaGithub />
              GitHub
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-full border text-sm transition duration-300 hover:scale-105"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              <FaExternalLinkAlt />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;