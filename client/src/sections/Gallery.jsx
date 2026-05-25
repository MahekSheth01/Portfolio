import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GalleryCard from "../components/GalleryCard";
import GalleryModal from "../components/GalleryModal";
import API from "../services/api";

const FALLBACK_ITEMS = [
  { title: "Hackathon Participation", description: "Participated in university hackathon and built innovative project solutions.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", rotate: "-2deg" },
  { title: "Project Presentation", description: "Presented full stack project during college showcase event.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", rotate: "2deg" },
  { title: "Late Night Coding", description: "One of the many nights spent learning and building projects.", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80", rotate: "-3deg" },
  { title: "UI Design Journey", description: "Exploring modern UI/UX design and creative interfaces.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", rotate: "3deg" },
];

const ROTATIONS = ["-2deg", "2deg", "-3deg", "3deg", "-1deg", "1deg"];

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get("/achievements");
        setGalleryItems(data.length > 0
          ? data.map((item, i) => ({ ...item, rotate: ROTATIONS[i % ROTATIONS.length] }))
          : FALLBACK_ITEMS
        );
      } catch { setGalleryItems(FALLBACK_ITEMS); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  return (
    <section id="gallery" className="section-gap">
      <div className="container-inner">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <span className="section-label">Achievement Gallery</span>
          <h2 className="section-heading">Moments & Milestones</h2>
          <p className="section-subtitle">
            A glimpse into my journey through various projects, achievements, and memorable moments that have shaped my growth as a developer. Each card represents a unique experience and achievement along the way.
          </p>
        </motion.div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "5rem 0" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", border: "4px solid var(--accent)", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
          </div>
        ) : (
          <div className="grid-4col">
            {galleryItems.map((item, index) => (
              <GalleryCard key={item._id || index} item={item} onClick={setSelectedItem} />
            ))}
          </div>
        )}

      </div>

      <GalleryModal item={selectedItem} closeModal={() => setSelectedItem(null)} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
};

export default Gallery;