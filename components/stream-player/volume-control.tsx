"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Hint } from "@/components/hint";

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}
export const VolumeControl = ({
  onToggle,
  onChange,
  value,
}: VolumeControlProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? "Unmute" : "Mute";

  return (
    <div className="flex items-center justify-start w-28 ">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className=" text-white hover:bg-white/10 p-1.5 rounded-lg"
        >
          <Icon className="h-6 w-6" />
        </button>
      </Hint>

      <div className="flex-grow ">
        <Slider
          onValueChange={(valueArray) => onChange(valueArray[0])}
          value={[value]}
          max={10}
          step={1}
        />
      </div>
    </div>
  );
};
