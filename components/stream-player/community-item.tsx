"use client";
import stringToColor from "string-to-color";
import { useTransition } from "react";
import { toast } from "sonner";
import { onBlock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { MinusCircle } from "lucide-react";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const isViewerHost = hostName === viewerName;
  const isParticipantHost = hostName === participantName;
  const color = stringToColor(participantName || "");
  const [isPending, startTransition] = useTransition();

  const handleBlock = async () => {
    if (!participantName || isViewerHost || !isParticipantHost) return;
    try {
      startTransition(async () => {
        await onBlock(participantIdentity);
      });
      toast.success(`Blocked user ${participantName} !`);
    } catch (error) {
      toast.error("Block failed");
    }
  };

  return (
    <div className="p-2 flex group items-center justify-between rounded-md text-sm hover:bg-white/5 w-full">
      <p className="text-sm" style={{ color: color }}>
        {participantName}
      </p>

      {!(participantName === viewerName) && (
        <Button
          variant="ghost"
          size="sm"
          className="hidden group-hover:block"
          onClick={handleBlock}
          disabled={isPending}
        >
          <MinusCircle className="h-4 w-4 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
};
