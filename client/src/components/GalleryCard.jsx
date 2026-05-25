import { motion } from "framer-motion";

const GalleryCard = ({ item, onClick }) => {
  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(item)}
      className="cursor-pointer rounded-3xl overflow-hidden border p-3 sm:p-4 w-full"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border)",
        rotate: item.rotate,
      }}
    >
      {/* IMAGE */}
      <div className="overflow-hidden rounded-2xl">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 sm:h-60 md:h-56 lg:h-64 object-cover transition duration-500 hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="pt-4">
        <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">{item.title}</h3>
        <p className="opacity-70 text-xs sm:text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
};

export default GalleryCard;