import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';

interface ProgressTrackerProps {
  progress: number;
}

export default function ProgressTracker({ progress }: ProgressTrackerProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
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
  );
}
