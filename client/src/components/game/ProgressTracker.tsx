
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ProgressTrackerProps {
  progress: number;
  totalPuzzles: number;
}

export default function ProgressTracker({ progress, totalPuzzles }: ProgressTrackerProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            {i < progress ? (
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            ) : (
              <Star className="w-8 h-8 text-gray-300" />
            )}
          </motion.div>
        ))}
      </div>
      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
        {totalPuzzles}
      </div>
    </div>
  );
}
