import { User } from "@prisma/client";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultCardProps {
  data: {
    user: User;
    id: string;
    name: string;
    isLive: boolean;
    thumbnailUrl: string | null;
    updatedAt: Date;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div
        className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg p-6 w-[400px] max-sm:w-[260px] relative
        bg-cover bg-center isolate
         after:absolute after:inset-0 after:bg-blue-950 after:-z-10 after:opacity-65 "
        style={{ backgroundImage: `url(${data.thumbnailUrl})` }}
      >
        <div className="flex items-center space-x-4">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageURL}
          />
          <div className="flex-1">
            <p className="text-lg font-semibold">{data.user.username}</p>
            <p className="text-gray-400 text-sm">{data.name}</p>
            <p className="text-gray-400 text-xs">
              {formatDistanceToNow(new Date(data.updatedAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-[400px] max-sm:w-[260px] relative">
      <div className="flex items-center space-x-4">
        <UserAvatarSkeleton />
        <div className="flex-1">
          <Skeleton className="w-full h-[20px]" />

          <Skeleton className="w-full h-[20px]" />

          <Skeleton className="w-full h-[16px]" />
        </div>
      </div>
    </div>
  );
};
