import { motion } from 'framer-motion';

interface CelebrationProps {
  show: boolean;
}

const particles = Array.from({ length: 50 }); // Increased number of particles
const colors = ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C', '#FF6B6B'];
const shapes = ['●', '■', '★', '♦', '✶'];

export default function Celebration({ show }: CelebrationProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => {
        const randomX = Math.random() * 200 - 100; // -100 to 100
        const randomY = -(Math.random() * 50 + 50); // -100 to -50
        const randomScale = 0.5 + Math.random() * 1.5;
        const randomDelay = Math.random() * 0.2;
        const randomDuration = 0.6 + Math.random() * 0.4;
        const randomRotation = Math.random() * 360;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        return (
          <motion.div
            key={i}
            initial={{
              opacity: 1,
              scale: 0,
              x: '50%',
              y: '50%',
              rotate: 0
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, randomScale, randomScale],
              x: ['50%', `calc(50% + ${randomX}px)`, `calc(50% + ${randomX * 2}px)`],
              y: ['50%', `calc(50% + ${randomY}px)`, `calc(50% + ${randomY * 3}px)`],
              rotate: randomRotation
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: "easeOut"
            }}
            className="absolute text-2xl"
            style={{ color }}
          >
            {shape}
          </motion.div>
        );
      })}
    </div>
  );
}