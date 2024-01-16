import { getCurrentUser } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "@/app/(dashboard)/u/[username]/chat/_components/toggle-card";

const ChatPage = async () => {
  const self = await getCurrentUser();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable chat"
          currentValue={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Make chat followers only"
          currentValue={stream.isChatFollowersOnly}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay chat"
          currentValue={stream.isChatDelayed}
        />
      </div>
    </div>
  );
};

export default ChatPage;
