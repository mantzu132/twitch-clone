import { currentUser } from "@clerk/nextjs";
import db from "@/lib/db";

export const getCurrentUser = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { externalUserId: self.id },
  });

  if (!user) {
    throw new Error("Couldn't find that user in our DB");
  }

  return user;
};
