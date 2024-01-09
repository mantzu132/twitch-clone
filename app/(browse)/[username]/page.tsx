import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "@/app/(browse)/[username]/_components/actions";

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
  return (
    <div>
      <p>HELLO FROM COMPONENT user-page {user.username}</p>
      <p>HELLO FROM COMPONENT user-page {user.id}</p>
      <p>is following {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
