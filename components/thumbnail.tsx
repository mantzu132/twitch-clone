import { UserAvatar } from "@/components/user-avatar";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LiveBadge } from "@/components/live-badge";

interface ThumbnailProps {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
}

export const Thumbnail = ({
  src,
  fallback,
  isLive,
  username,
}: ThumbnailProps) => {
  let content;
  if (!src) {
    content = (
      <div className="relative bg-background flex justify-center items-center h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md ">
        <UserAvatar
          imageUrl={fallback}
          username={username}
          isLive={false}
          size={"lg"}
          // showBadge={true}
        />
        <div className="absolute top-0 left-0 p-2">
          {isLive && <LiveBadge />}
        </div>
      </div>
    );
  } else {
    content = (
      <div className="relative w-full aspect-video transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
        <Image src={src} fill alt={"thumbnail"} className="object-cover " />
        <div className="absolute top-0 left-0 p-2">
          {isLive && <LiveBadge />}
        </div>
      </div>
    );
  }
  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div
        className={cn(
          "rounded-md absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center",
          isLive ? "bg-rose-500" : "bg-blue-600",
        )}
      ></div>
      {content}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return (
    <div className="aspect-video relative rounded-md">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
