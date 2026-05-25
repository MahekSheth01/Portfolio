import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSearchPlus } from "react-icons/fa";

const GalleryModal = ({ item, closeModal }) => {
  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handleKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [closeModal]);

  return (
    <AnimatePresence>
      {item && (
        // BACKDROP
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(0,0,0,0.92)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          {/* MODAL CARD */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "56rem",        // 896px — large modal
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              borderRadius: "1.5rem",
              overflow: "hidden",
              backgroundColor: "var(--bg-secondary)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* ── CLOSE BUTTON ── */}
            <button
              onClick={closeModal}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 10,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                backgroundColor: "rgba(0,0,0,0.55)",
                color: "#fff",
                backdropFilter: "blur(6px)",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.8)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.55)"}
            >
              <FaTimes />
            </button>

            {/* ── FULL IMAGE — object-contain so nothing is cropped ── */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                maxHeight: "65vh",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "65vh",
                  objectFit: "contain",   // ← shows FULL image, no cropping
                  display: "block",
                }}
              />
            </div>

            {/* ── INFO STRIP ── */}
            <div style={{ padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <h2 style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: 700, marginBottom: "0.375rem" }}>
                  {item.title}
                </h2>
                {item.description && (
                  <p style={{ opacity: 0.7, fontSize: "0.9rem", lineHeight: 1.65, maxWidth: "40rem" }}>
                    {item.description}
                  </p>
                )}
              </div>

              {/* OPEN FULL SIZE in new tab */}
              <a
                href={item.image}
                target="_blank"
                rel="noopener noreferrer"
                title="Open full size"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "9999px",
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  flexShrink: 0,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <FaSearchPlus />
                Full Size
              </a>
            </div>
          </motion.div>

          {/* CLICK OUTSIDE HINT */}
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginTop: "1rem" }}>
            Click outside or press ESC to close
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;