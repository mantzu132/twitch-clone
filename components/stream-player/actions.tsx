"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { router } from "next/client";
import { useAuth } from "@clerk/nextjs";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionsProps {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
}

export const Actions = ({
  isFollowing,
  hostIdentity,
  isHost,
}: ActionsProps) => {
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`),
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`),
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  function toggleFollow() {
    if (!userId) {
      return router.push("/sign-in");
    }
    if (isHost) {
      return;
    }

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  return (
    // <ActionsSkeleton />
    <Button
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="max-sm:basis-full"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-9 max-sm:basis-full basis-1/6" />;
};
