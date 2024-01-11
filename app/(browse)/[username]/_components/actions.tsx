"use client";
import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`You are now following ${data.following.username}`);
        })
        .catch(() => {
          toast.error("Failed to follow the user");
        });
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          toast.success(`You have unfollowed ${data.following.username}`);
        })
        .catch(() => {
          toast.error("Failed to un-follow the user");
        });
    });
  };
  return (
    <Button
      disabled={isPending}
      variant="primary"
      onClick={() => {
        isFollowing ? handleUnfollow() : handleFollow();
      }}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
