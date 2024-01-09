"use client";
import { Button } from "@/components/ui/button";
import { onFollow } from "@/actions/follow";
import { useTransition } from "react";

interface ActionsProps {
  isFollowing: boolean;
}

export const Actions = ({ isFollowing }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      onFollow("123");
    });
  };
  return (
    <Button
      disabled={isPending || isFollowing}
      variant="primary"
      onClick={onClick}
    >
      Follow
    </Button>
  );
};
