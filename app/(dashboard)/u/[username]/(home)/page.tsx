import { getCurrentUser } from "@/lib/auth-service";
import { getUserByUsername } from "@/lib/user-service";
import { Index, StreamPlayer } from "@/components/stream-player";
import { currentUser } from "@clerk/nextjs";

interface CreatorPageProps {
  params: {
    username: string;
  };
}
const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.Stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.Stream} isFollowing />
    </div>
  );
};

export default CreatorPage;
