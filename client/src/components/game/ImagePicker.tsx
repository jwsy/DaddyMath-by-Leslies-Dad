import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImagePickerProps {
  selectedA: string;
  selectedB: string;
  onSelectA: (emoji: string) => void;
  onSelectB: (emoji: string) => void;
}

const emojis = [
  { id: 'bear', label: '🐻' },
  { id: 'dog', label: '🐕' },
  { id: 'hamster', label: '🐹' },
  { id: 'sunflower', label: '🌻' }
];

export default function ImagePicker({ selectedA, selectedB, onSelectA, onSelectB }: ImagePickerProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold text-purple-600">A:</span>
        <div className="flex gap-2">
          {emojis.map(({ id, label }) => (
            <Button
              key={`a-${id}`}
              variant={selectedA === id ? "default" : "outline"}
              onClick={() => onSelectA(id)}
              className={cn(
                "text-xl w-12 h-12",
                selectedA === id && "bg-purple-500 hover:bg-purple-600"
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-lg font-bold text-purple-600">B:</span>
        <div className="flex gap-2">
          {emojis.map(({ id, label }) => (
            <Button
              key={`b-${id}`}
              variant={selectedB === id ? "default" : "outline"}
              onClick={() => onSelectB(id)}
              className={cn(
                "text-xl w-12 h-12",
                selectedB === id && "bg-purple-500 hover:bg-purple-600"
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}