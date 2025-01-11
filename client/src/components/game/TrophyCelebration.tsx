
import { motion } from "framer-motion";

interface TrophyCelebrationProps {
  show: boolean;
  totalStars: number;
}

export default function TrophyCelebration({ show, totalStars }: TrophyCelebrationProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: 50 }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
    >
      <div className="bg-white/90 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg">
        <div className="text-6xl mb-4">🏆</div>
        <div className="text-xl font-bold text-center">
          Congratulations on {totalStars} ⭐s!
        </div>
      </div>
    </motion.div>
  );
}
