"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "@/components/stream-player/video";
import { Stream, User } from "@prisma/client";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "@/components/stream-player/chat";
import { ChatToggle } from "@/components/stream-player/chat-toggle";

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

  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }
  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-10 lg:grid-cols-3 2xl:grid-cols-6 h-full auto-rows-min ",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2",
        )}
      >
        <div className="relative col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar ">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
        <div
          className={cn(
            "col-span-1 bg-background h-screen-minus-80",
            collapsed && "hidden",
          )}
        >
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-10 lg:grid-cols-3 2xl:grid-cols-6 h-full ">
      <div className="relative space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar ">
        <VideoSkeleton />
      </div>

      <div className="col-span-1 bg-background h-screen-minus-80">
        <ChatSkeleton />
      </div>
    </div>
  );
};
