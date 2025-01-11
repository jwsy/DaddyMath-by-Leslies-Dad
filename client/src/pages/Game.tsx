import { useState, useEffect } from 'react';
import EquationDisplay from '@/components/game/EquationDisplay';
import NumberGrid from '@/components/game/NumberGrid';
import ImagePicker from '@/components/game/ImagePicker';
import ProgressTracker from '@/components/game/ProgressTracker';
import { generateProblem } from '@/lib/gameLogic';
import { playSound } from '@/lib/sounds';
import { Button } from '@/components/ui/button';
import { RotateCw, Eye, EyeOff } from 'lucide-react';

export default function Game() {
  const [problem, setProblem] = useState(generateProblem());
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedEmojiA, setSelectedEmojiA] = useState('bear');
  const [selectedEmojiB, setSelectedEmojiB] = useState('sunflower');
  const [progress, setProgress] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'grouped'>('grid');

  const handleNewProblem = () => {
    playSound('click');
    setShowAnswer(false);
    setProblem(generateProblem());
  };

  const handleRevealAnswer = () => {
    playSound('success');
    setShowAnswer(true);
    setProgress((p) => Math.min(p + 1, 5));
  };

  const toggleView = () => {
    playSound('click');
    setViewMode(v => v === 'grid' ? 'grouped' : 'grid');
  };

  useEffect(() => {
    // Initialize audio context on first user interaction
    const handler = () => {
      playSound('click');
      window.removeEventListener('click', handler);
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <ImagePicker
            selectedA={selectedEmojiA}
            selectedB={selectedEmojiB}
            onSelectA={setSelectedEmojiA}
            onSelectB={setSelectedEmojiB}
          />
          <ProgressTracker progress={progress} />
        </div>

        <EquationDisplay
          problem={problem}
          showAnswer={showAnswer}
          className="mb-8"
        />

        <NumberGrid
          problem={problem}
          viewMode={viewMode}
          emojiA={selectedEmojiA}
          emojiB={selectedEmojiB}
          showAnswer={showAnswer}
          className="mb-8"
        />

        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={toggleView}
          >
            {viewMode === 'grid' ? <Eye className="mr-2" /> : <EyeOff className="mr-2" />}
            {viewMode === 'grid' ? 'Group View' : 'Grid View'}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleNewProblem}
          >
            <RotateCw className="mr-2" />
            New Problem
          </Button>

          <Button
            size="lg"
            onClick={handleRevealAnswer}
            disabled={showAnswer}
          >
            Show Answer
          </Button>
        </div>
      </div>
    </div>
  );
}