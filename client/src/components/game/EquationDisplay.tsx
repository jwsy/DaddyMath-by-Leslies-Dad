import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface EquationDisplayProps {
  problem: {
    a: number;
    b: number;
    sum: number;
  };
  showAnswer: boolean;
  className?: string;
}

export default function EquationDisplay({ problem, showAnswer, className }: EquationDisplayProps) {
  return (
    <div className={cn("text-center text-3xl sm:text-4xl md:text-6xl font-bold", className)}>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8"
      >
        <span className="text-purple-600">{problem.a}</span>
        <span className="text-pink-500">+</span>
        <span className="text-purple-600">{problem.b}</span>
        <span className="text-pink-500">=</span>
        {showAnswer ? (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-500"
          >
            {problem.sum}
          </motion.span>
        ) : (
          <span className="text-gray-300">?</span>
        )}
      </motion.div>
    </div>
  );
}