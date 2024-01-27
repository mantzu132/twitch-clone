import { useMemo } from "react";
import { Hint } from "@/components/hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isFollowersOnly: boolean;
  isDelayed: boolean;
}

export const ChatInfo = ({ isFollowersOnly, isDelayed }: ChatInfoProps) => {
  const label = useMemo(() => {
    if (isDelayed && isFollowersOnly) {
      return "Chat is delayed and followers only";
    } else if (isDelayed) {
      return "Chat is delayed";
    } else if (isFollowersOnly) {
      return "Chat is followers only";
    } else {
      return "";
    }
  }, [isDelayed, isFollowersOnly]);

  const hint = useMemo(() => {
    if (isDelayed && isFollowersOnly) {
      return "Chat is on delay mode and only followers can send messages.";
    } else if (isDelayed) {
      return "Chat is on delay mode.";
    } else if (isFollowersOnly) {
      return "Only followers can send messages in this chat.";
    } else {
      return "";
    }
  }, [isDelayed, isFollowersOnly]);

  return (
    <div
      className="p-1 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center
    gap-x-2"
    >
      <Hint label={label}>
        <Info className="h-4 w-4" />{" "}
      </Hint>

      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
