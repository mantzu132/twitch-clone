"use client";
import { useTransition } from "react";
import { onUnblock } from "@/actions/block";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
    try {
      startTransition(async () => {
        await onUnblock(userId);
      });
      toast.success(`Unblocked user !`);
    } catch (error) {
      toast.error("Unblock failed");
    }
  };
  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
