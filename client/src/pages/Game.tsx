import { useState, useEffect } from "react";
import EquationDisplay from "@/components/game/EquationDisplay";
import NumberGrid from "@/components/game/NumberGrid";
import ImagePicker from "@/components/game/ImagePicker";
import ProgressTracker from "@/components/game/ProgressTracker";
import Celebration from "@/components/game/Celebration";
import TrophyCelebration from "@/components/game/TrophyCelebration";
import { generateProblem } from "@/lib/gameLogic";
import { playSound } from "@/lib/sounds";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  CircleCheckBig,
  CornerDownRight,
  RotateCw,
} from "lucide-react";

export default function Game() {
  const [problem, setProblem] = useState(generateProblem());
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedEmojiA, setSelectedEmojiA] = useState("bunny");
  const [selectedEmojiB, setSelectedEmojiB] = useState("strawberry");
  const [progress, setProgress] = useState(0);
  const [totalPuzzles, setTotalPuzzles] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "grouped">("grid");
  const [showCelebration, setShowCelebration] = useState(false);
  const [showTrophy, setShowTrophy] = useState(false);

  const handleNewProblem = () => {
    playSound("click");
    setShowAnswer(false);
    setShowCelebration(false);
    setProblem(generateProblem());
  };

  const handleRevealAnswer = () => {
    const isCorrect = true; // The answer is always correct in this educational context
    playSound(isCorrect ? "success" : "click");
    setShowAnswer(true);
    if (isCorrect) {
      setShowCelebration(true);
      setTotalPuzzles((prev) => prev + 1);
      setProgress((p) => {
        const newProgress = p + 1;
        if (newProgress === 10) {
          setShowTrophy(true);
          setTimeout(() => setShowTrophy(false), 3000);
          return 0;
        }
        return newProgress;
      });
    }
  };

  const toggleView = () => {
    playSound("click");
    setViewMode((v) => (v === "grid" ? "grouped" : "grid"));
  };

  useEffect(() => {
    // Initialize audio context on first user interaction
    const handler = () => {
      playSound("click");
      window.removeEventListener("click", handler);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "v":
          toggleView();
          break;
        case "n":
          handleNewProblem();
          break;
        case "c":
          if (!showAnswer) handleRevealAnswer();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showAnswer]);

  // Reset celebration after animation
  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  return (
    <div className="min-h-screen bg-purple-50 p-3 md:p-8 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Top section with emoji picker and progress */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 md:mb-6">
          <ImagePicker
            selectedA={selectedEmojiA}
            selectedB={selectedEmojiB}
            onSelectA={setSelectedEmojiA}
            onSelectB={setSelectedEmojiB}
          />
          <ProgressTracker progress={progress} totalPuzzles={totalPuzzles} />
        </div>

        {/* Main game area */}
        <div className="flex-1 flex flex-col relative">
          <Celebration show={showCelebration} />
          <TrophyCelebration show={showTrophy} totalStars={totalPuzzles} />

          <EquationDisplay
            problem={problem}
            showAnswer={showAnswer}
            className="equationdisplay mb-2"
          />

          <NumberGrid
            problem={problem}
            viewMode={viewMode}
            emojiA={selectedEmojiA}
            emojiB={selectedEmojiB}
            showAnswer={showAnswer}
            className="numbergrid min-h-0 mb-2"
          />

          {/* Control buttons */}
          <div className="controlbuttons flex flex-1 flex-wrap gap-1 justify-center">
            <Button
              size="lg"
              variant="outline"
              onClick={toggleView}
              className="flex-1 sm:flex-none min-w-[120px]"
            >
              {viewMode === "grid" ? (
                <CornerDownRight className="mr-2 h-5 w-5" />
              ) : (
                <ArrowUpDown className="mr-2 h-5 w-5" />
              )}
              {viewMode === "grid" ? "Together" : "Two"}
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleNewProblem}
              className="flex-1 sm:flex-none min-w-[120px]"
            >
              <RotateCw className="mr-2 h-5 w-5" />
              New
            </Button>

            <Button
              size="lg"
              onClick={handleRevealAnswer}
              disabled={showAnswer}
              className="flex-1 sm:flex-none min-w-[120px]"
            >
              <CircleCheckBig className="mr-2 h-5 w-5" />
              Check
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
