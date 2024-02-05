"use client";
import { User } from "@prisma/client";
import Link from "next/link";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultCardProps {}

interface ResultCardProps {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    // <ResultCardSkeleton />
    <Link href={`/${data.user.username}`}>
      <div className="space-y-4">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageURL}
          isLive={data.isLive}
          username={data.user.username}
        />
        <div className="flex gap-x-2 items-center">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageURL}
            isLive={data.isLive}
            // showBadge={true}
          />
          <div>
            <div>{data.name}</div>
            <p className="text-ellipsis text-muted-foreground whitespace-nowrap">
              {data.user.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-2 items-center">
        <UserAvatarSkeleton />
        <div className="">
          <Skeleton className="h-4 w-20 mb-2" />

          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
};
