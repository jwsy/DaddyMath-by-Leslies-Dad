import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImagePickerProps {
  selected: string;
  onSelect: (image: string) => void;
}

const images = [
  { id: 'kitten', label: '🐱 Kitten' },
  { id: 'bunny', label: '🐰 Bunny' },
  { id: 'strawberry', label: '🍓 Strawberry' }
];

export default function ImagePicker({ selected, onSelect }: ImagePickerProps) {
  return (
    <div className="flex gap-2">
      {images.map(({ id, label }) => (
        <Button
          key={id}
          variant={selected === id ? "default" : "outline"}
          onClick={() => onSelect(id)}
          className={cn(
            "text-lg",
            selected === id && "bg-purple-500 hover:bg-purple-600"
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
