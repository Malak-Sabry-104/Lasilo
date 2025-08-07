// components/HeroSection.tsx
import { motion } from "framer-motion";
import { SquarePlay } from "lucide-react";
import { useNavigate } from "react-router-dom";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-bl from-bg-[#0a0a0a] to-white/10 text-white py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 backdrop-blur-md bg-white/10" />
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-[-4rem] left-[-4rem] w-64 h-64 bg-purple-500 opacity-30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-4rem] right-[-4rem] w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-[140px] animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto text-center flex flex-col justify-center items-center space-y-6 px-4">
        <motion.p
          className="text-xs text-pink-400 uppercase tracking-widest font-pixel"
          custom={0}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          your communities, your spark
        </motion.p>

        <motion.h1
          className="text-2xl sm:text-4xl text-white leading-snug font-pixel"
          custom={1}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          LASILO: THE DEV-FRIENDLY PIXELVERSE
        </motion.h1>

        <motion.p
          className="text-xs text-gray-400 font-pixel max-w-md"
          custom={2}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Post. React. Build niche communities like it’s 1998 again.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center items-center gap-2 bg-pink-500/50 hover:bg-pink-500/60
           text-white text-xs px-6 py-3 rounded-lg shadow-md transition font-pixel"
          custom={3}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          onClick={() => navigate("/create")}
        >
          <SquarePlay size={14} /> START NOW
        </motion.button>
      </div>
    </section>
  );
}
