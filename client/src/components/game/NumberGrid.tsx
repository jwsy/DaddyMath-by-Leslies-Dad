import { cn } from "@/lib/utils";

interface NumberGridProps {
  problem: {
    a: number;
    b: number;
    sum: number;
  };
  viewMode: "grid" | "grouped";
  emojiA: string;
  emojiB: string;
  showAnswer: boolean;
  className?: string;
}

const emojiMap = {
  bunny: "🐰",
  bear: "🐻",
  puppy: "🐶",
  kitten: "",
  hamster: "🐹",
  sunflower: "🌻",
  strawberry: "🍓",
};

export default function NumberGrid({
  problem,
  viewMode,
  emojiA,
  emojiB,
  showAnswer,
  className,
}: NumberGridProps) {
  const items = Array.from({
    length: showAnswer ? problem.sum : problem.a + problem.b,
  });
  const numberedRow = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className={cn("relative w-full overflow-x-auto pb-2", className)}>
      <div className="min-w-[300px]">
        {/* Numbered row */}
        <div className="grid grid-cols-10 gap-1 md:gap-2 mb-1 md:mb-2">
          {numberedRow.map((num) => (
            <div
              key={`num-${num}`}
              className="aspect-square flex items-center justify-center text-sm md:text-lg font-bold text-purple-600"
            >
              {num}
            </div>
          ))}
        </div>

        <div>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-10 gap-1 md:gap-2">
              {items.map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg shadow-sm flex items-center justify-center text-[1.25rem] leading-none h-[32px] w-[32px] sm:h-[48px] sm:w-[48px] sm:text-[1.75rem] md:h-[64px] md:w-[64px] md:text-[2.25rem] ${i < problem.a ? "bg-purple-100" : "bg-pink-100"}`}
                >
                  {
                    emojiMap[
                      i < problem.a ? emojiA : (emojiB as keyof typeof emojiMap)
                    ]
                  }
                </div>
              ))}
              {items.length < 11 &&
                Array.from({ length: 20 - items.length }).map((_, i) => (
                  <div
                    key={`blank-${i}`}
                    className="aspect-square rounded-lg bg-white shadow-sm flex items-center justify-center text-[1.25rem] leading-none h-[32px] w-[32px] sm:h-[48px] sm:w-[48px] sm:text-[1.75rem] md:h-[64px] md:w-[64px] md:text-[2.25rem]"
                  >
                    {" "}
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1 md:gap-2">
              {/* First number row */}
              <div className="grid grid-cols-10 gap-1 md:gap-2">
                {problem.a === 0
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={`blank-a${i}`}
                        className="aspect-square rounded-lg bg-purple-100 shadow-sm flex items-center justify-center text-[1.25rem] leading-none h-[32px] w-[32px] sm:h-[48px] sm:w-[48px] sm:text-[1.75rem] md:h-[64px] md:w-[64px] md:text-[2.25rem]"
                      >
                        {" "}
                      </div>
                    ))
                  : Array.from({ length: Math.min(problem.a, 10) }).map(
                      (_, i) => (
                        <div
                          key={`a${i}`}
                          className="aspect-square rounded-lg bg-purple-100 shadow-sm flex items-center justify-center text-[1.25rem] leading-none h-[32px] w-[32px] sm:h-[48px] sm:w-[48px] sm:text-[1.75rem] md:h-[64px] md:w-[64px] md:text-[2.25rem]"
                        >
                          {emojiMap[emojiA as keyof typeof emojiMap]}
                        </div>
                      ),
                    )}
              </div>
              {/* Second number row */}
              <div className="grid grid-cols-10 gap-1 md:gap-2">
                {problem.b === 0
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={`blank-b${i}`}
                        className="aspect-square rounded-lg bg-pink-100 shadow-sm flex items-center justify-center text-[1.25rem] leading-none h-[32px] w-[32px] sm:h-[48px] sm:w-[48px] sm:text-[1.75rem] md:h-[64px] md:w-[64px] md:text-[2.25rem]"
                      >
                        {" "}
                      </div>
                    ))
                  : Array.from({ length: Math.min(problem.b, 10) }).map(
                      (_, i) => (
                        <div
                          key={`b${i}`}
                          className="aspect-square rounded-lg bg-pink-100 shadow-sm flex items-center justify-center text-[1.25rem] leading-none h-[32px] w-[32px] sm:h-[48px] sm:w-[48px] sm:text-[1.75rem] md:h-[64px] md:w-[64px] md:text-[2.25rem]"
                        >
                          {emojiMap[emojiB as keyof typeof emojiMap]}
                        </div>
                      ),
                    )}
              </div>
              {/* Overflow row if needed */}
              {(problem.a > 10 || problem.b > 10) && (
                <div className="grid grid-cols-10 gap-1 md:gap-2">
                  {Array.from({ length: Math.max(problem.a - 10, 0) }).map(
                    (_, i) => (
                      <div
                        key={`overflow_a${i}`}
                        className="aspect-square rounded-lg bg-purple-100 shadow-sm flex items-center justify-center text-[1.25rem] leading-none h-[32px] w-[32px] sm:h-[48px] sm:w-[48px] sm:text-[1.75rem] md:h-[64px] md:w-[64px] md:text-[2.25rem]"
                      >
                        {emojiMap[emojiA as keyof typeof emojiMap]}
                      </div>
                    ),
                  )}
                  {Array.from({ length: Math.max(problem.b - 10, 0) }).map(
                    (_, i) => (
                      <div
                        key={`overflow_b${i}`}
                        className="aspect-square rounded-lg bg-pink-100 shadow-sm flex items-center justify-center text-[1.25rem] leading-none h-[32px] w-[32px] sm:h-[48px] sm:w-[48px] sm:text-[1.75rem] md:h-[64px] md:w-[64px] md:text-[2.25rem]"
                      >
                        {emojiMap[emojiB as keyof typeof emojiMap]}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
