"use client";

import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { VerifiedMark } from "@/components/verified-mark";
import { useMediaQuery } from "usehooks-ts";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import { Actions, ActionsSkeleton } from "@/components/stream-player/actions";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  hostImageUrl: string;
  isFollowing: boolean;
  streamName: string;
}

export const Header = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  hostImageUrl,
  isFollowing,
  streamName,
}: HeaderProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const avatarSize = isLargeScreen ? "lg" : "medium";
  const hostParticipant = useRemoteParticipant(hostIdentity);
  const hostIsLive = !!hostParticipant;
  const participants = useParticipants();
  const isViewerHost = viewerIdentity === `host-${hostIdentity}`;
  const participantCount = participants.length - 1;
  const participantLabel = participantCount === 1 ? "viewer" : "viewers";

  return (
    <div className="p-3 lg:pl-5 flex items-center lg:flex-row gap-x-2.5 flex-wrap sm:flex-nowrap ">
      <div className="py-4">
        <UserAvatar
          username={hostName}
          imageUrl={hostImageUrl}
          isLive={true}
          showBadge={true}
          size={avatarSize}
        />
      </div>
      <div className="">
        <div className="flex gap-x-1.5">
          <p className="font-semibold lg:text-lg">{hostName}</p>
          <VerifiedMark />
        </div>
        <p className="max-lg:text-sm">{streamName}</p>
        {hostIsLive ? (
          <div className="font-semibold text-rose-500 flex gap-x-1">
            <div className="flex items-center justify-center">
              <UserIcon className="h-4 w-4" />
            </div>
            <p className="max-lg:text-sm">{`${participantCount} ${participantLabel}`}</p>
          </div>
        ) : (
          <p className="max-lg:text-sm text-muted-foreground">Offline</p>
        )}
      </div>
      <Actions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isViewerHost}
      />
    </div>
  );
};
export const HeaderSkeleton = () => {
  return (
    <div className="p-3 lg:pl-5 flex items-center lg:flex-row gap-x-2.5 flex-wrap sm:flex-nowrap ">
      <div className="py-4">
        <UserAvatarSkeleton size="medium" />
      </div>
      <div className="">
        <div className="flex gap-x-1.5">
          <Skeleton className="w-[77px] h-[19px] mb-1" />
        </div>
        <Skeleton className="w-[84px] h-[19px] mb-1" />

        <Skeleton className="w-[50px] h-[19px] mb-1" />
      </div>
      <ActionsSkeleton />
    </div>
  );
};
