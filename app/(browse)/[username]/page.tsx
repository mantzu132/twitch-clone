import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "@/app/(browse)/[username]/_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
  params: {
    username: string;
  };
}
const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);
  if (!user) {
    // TODO: FIX STYLING FOR 404 PAGE
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlockedByOtherUser = await isBlockedByUser(user.id);

  if (isBlockedByOtherUser) {
    notFound();
  }
  return (
    <div>
      <p>HELLO FROM COMPONENT user-page {user.username}</p>
      <p>HELLO FROM COMPONENT user-page {user.id}</p>
      <p>is following {`${isFollowing}`}</p>
      <p> is blocked: {`${isBlockedByOtherUser}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
};

export default UserPage;
