import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
  params: {
    username: string;
  };
}
const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.Stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlockedByOtherUser = await isBlockedByUser(user.id);

  if (isBlockedByOtherUser) {
    notFound();
  }
  return (
    <StreamPlayer user={user} isFollowing={isFollowing} stream={user.Stream} />
  );
};

export default UserPage;
