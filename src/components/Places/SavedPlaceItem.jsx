import { motion } from 'framer-motion';

export default function SavedPlaceItem({ place, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: [1, 1.1, 1] }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, scale: [1, 0] }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onDelete(place)}
      className="bg-orange-100 px-4 py-2 rounded cursor-pointer min-w-fit hover:brightness-95 md:px-5 md:py-3 "
    >
      <h2 className="m-0 text-black md:text-3xl">{place.content}</h2>
    </motion.div>
  );
}
