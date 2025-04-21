import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImagePickerProps {
  selectedA: string;
  selectedB: string;
  onSelectA: (emoji: string) => void;
  onSelectB: (emoji: string) => void;
}

const emojis = [
  { id: "bunny", label: "🐰" },
  { id: "bear", label: "🐻" },
  { id: "otter", label: "🦦" },
  { id: "puppy", label: "🐶" },
  { id: "kitten", label: "🐈" },
  { id: "hamster", label: "🐹" },
  { id: "sunflower", label: "🌻" },
  { id: "strawberry", label: "🍓" },
];

export default function ImagePicker({
  selectedA,
  selectedB,
  onSelectA,
  onSelectB,
}: ImagePickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-cednter gap-2">
        <span className="text-base font-bold text-purple-600 w-4">A:</span>
        <div className="flex gap-1 flex-wrap">
          {emojis.map(({ id, label }) => (
            <Button
              key={`a-${id}`}
              variant={selectedA === id ? "default" : "outline"}
              onClick={() => onSelectA(id)}
              className={cn(
                "text-[1.25rem] leading-none w-10 h-10 p-0",
                selectedA === id && "bg-purple-500 hover:bg-purple-600",
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-pink-600 w-4">B:</span>
        <div className="flex gap-1 flex-wrap">
          {emojis.map(({ id, label }) => (
            <Button
              key={`b-${id}`}
              variant={selectedB === id ? "default" : "outline"}
              onClick={() => onSelectB(id)}
              className={cn(
                "text-[1.25rem] leading-none w-10 h-10 p-0",
                selectedB === id && "bg-pink-500 hover:bg-pink-600",
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
