import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NumberGridProps {
  problem: {
    a: number;
    b: number;
    sum: number;
  };
  viewMode: 'grid' | 'grouped';
  emojiA: string;
  emojiB: string;
  showAnswer: boolean;
  className?: string;
}

const emojiMap = {
  'bear': '🐻',
  'dog': '🐕',
  'hamster': '🐹',
  'sunflower': '🌻'
};

export default function NumberGrid({ problem, viewMode, emojiA, emojiB, showAnswer, className }: NumberGridProps) {
  const items = Array.from({ length: showAnswer ? problem.sum : problem.a + problem.b });
  const numberedRow = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className={cn("relative", className)}>
      {/* Numbered row */}
      <div className="grid grid-cols-10 gap-2 mb-2">
        {numberedRow.map((num) => (
          <div key={`num-${num}`} className="aspect-square flex items-center justify-center text-lg font-bold text-purple-600">
            {num}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-10 gap-2">
              {items.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-square rounded-lg bg-white shadow-sm flex items-center justify-center text-3xl"
                >
                  {emojiMap[i < problem.a ? emojiA : emojiB as keyof typeof emojiMap]}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* First number row */}
              <div className="grid grid-cols-10 gap-2">
                {Array.from({ length: problem.a }).map((_, i) => (
                  <motion.div
                    key={`a${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-square rounded-lg bg-white shadow-sm flex items-center justify-center text-3xl"
                  >
                    {emojiMap[emojiA as keyof typeof emojiMap]}
                  </motion.div>
                ))}
              </div>
              {/* Second number row */}
              <div className="grid grid-cols-10 gap-2">
                {Array.from({ length: problem.b }).map((_, i) => (
                  <motion.div
                    key={`b${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-square rounded-lg bg-white shadow-sm flex items-center justify-center text-3xl"
                  >
                    {emojiMap[emojiB as keyof typeof emojiMap]}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}