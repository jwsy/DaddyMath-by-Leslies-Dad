import { motion } from 'framer-motion';

interface CelebrationProps {
  show: boolean;
}

const particles = Array.from({ length: 20 });

export default function Celebration({ show }: CelebrationProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => {
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 0.5 + Math.random() * 0.5;
        const randomRotation = Math.random() * 360;
        const emoji = ['✨', '🌟', '⭐', '🎉'][Math.floor(Math.random() * 4)];

        return (
          <motion.div
            key={i}
            initial={{
              opacity: 1,
              scale: 0,
              x: `${50}%`,
              y: '60%',
              rotate: 0
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, 1, 1],
              x: [`${50}%`, `${randomX}%`, `${randomX}%`],
              y: ['60%', '0%', '-20%'],
              rotate: randomRotation
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: "easeOut"
            }}
            className="absolute text-2xl"
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
