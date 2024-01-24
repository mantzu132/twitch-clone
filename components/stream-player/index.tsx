"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import { Video } from "@/components/stream-player/video";
import { FullscreenControl } from "@/components/stream-player/fullscreen-control";
import { Stream, User } from "@prisma/client";

// type CustomStream = {
//   id: string;
//   isChatEnabled: boolean;
//   isChatDelayed: boolean;
//   isChatFollowersOnly: boolean;
//   isLive: boolean;
//   thumbnailUrl: string | null;
//   name: string;
// };
//
// type CustomUser = {
//   id: string;
//   username: string;
//   bio: string | null;
//   stream: CustomStream | null;
//   imageUrl: string;
//   _count: { followedBy: number };
// };

interface StreamPlayerProps {
  user: User;
  stream: Stream;
  isFollowing: boolean;
}
export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <div>Cannot watch stream</div>;
  }
  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={
          "grid grid-cols-1 lg:gap-y-10 lg:grid-cols-3 2xl:grid-cols-6 h-full"
        }
      >
        <div className="relative space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
        <p>Chat</p>
      </LiveKitRoom>
    </>
  );
};
