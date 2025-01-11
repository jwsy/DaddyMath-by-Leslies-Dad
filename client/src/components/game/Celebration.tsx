import { motion } from "framer-motion";
import { useMemo } from "react";

interface CelebrationProps {
  show: boolean;
}

const PARTICLE_COUNT = 100;
const colors = [
  "#FF69B4",
  "#87CEEB",
  "#98FB98",
  "#DDA0DD",
  "#F0E68C",
  "#FF6B6B",
];
const shapes = ["●", "■", "★", "♦", "✶"];

export default function Celebration({ show }: CelebrationProps) {
  if (!show) return null;

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: 0.8 + Math.random() * 2,
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 0.5,
      rotation: Math.random() * 720,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
  }, []);

  return (
    // <div className="absolute inset-0 pointer-events-none overflow-hidden z-[9999]">
    <div className="absolute inset-0 pointer-events-none z-99">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            scale: 0,
            x: "50%",
            y: "50%",
            rotate: 0,
          }}
          animate={{
            opacity: [1, 1, 0],
            scale: [0, particle.scale, particle.scale],
            x: [
              "50%",
              `calc(50% + ${particle.x}px)`,
              `calc(50% + ${particle.x * 2}px)`,
            ],
            y: [
              "50%",
              `calc(50% + ${particle.y}px)`,
              `calc(50% + ${particle.y * 3}px)`,
            ],
            rotate: particle.rotation,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
          }}
          className="absolute text-3xl"
          style={{ color: particle.color }}
        >
          {particle.shape}
        </motion.div>
      ))}
    </div>
  );
}
