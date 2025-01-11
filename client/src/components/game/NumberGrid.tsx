import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NumberGridProps {
  problem: {
    a: number;
    b: number;
    sum: number;
  };
  viewMode: 'grid' | 'grouped';
  imageType: string;
  showAnswer: boolean;
  className?: string;
}

const imageUrls = {
  kitten: "https://images.unsplash.com/photo-1723115891740-8adcc7e16436",
  bunny: "https://images.unsplash.com/photo-1663043501785-05d17c625253",
  strawberry: "https://images.unsplash.com/photo-1611784601600-ac6f688effdb"
};

export default function NumberGrid({ problem, viewMode, imageType, showAnswer, className }: NumberGridProps) {
  const items = Array.from({ length: showAnswer ? problem.sum : problem.a + problem.b });

  // Create numbered row array 1-10
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
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src={imageUrls[i < problem.a ? imageType : 'strawberry' as keyof typeof imageUrls]}
                    alt="number item"
                    className="w-full h-full object-cover"
                  />
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
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={imageUrls[imageType as keyof typeof imageUrls]}
                      alt="first number item"
                      className="w-full h-full object-cover"
                    />
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
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={imageUrls['strawberry' as keyof typeof imageUrls]}
                      alt="second number item"
                      className="w-full h-full object-cover"
                    />
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