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
  
  return (
    <div className={cn("relative", className)}>
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
                    src={imageUrls[imageType as keyof typeof imageUrls]}
                    alt="number item"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex gap-8 justify-center">
              <div className="grid grid-cols-5 gap-2">
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
                      alt="number item"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: problem.b }).map((_, i) => (
                  <motion.div
                    key={`b${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={imageUrls[imageType as keyof typeof imageUrls]}
                      alt="number item"
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
