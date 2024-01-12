import { currentUser } from "@clerk/nextjs";
import db from "@/lib/db";

// GETS CURRENTLY LOGGED IN USER FROM DATABASE
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

// GIVEN A USERNAME, IT CHECKS IF THAT USERNAME IS THE CURRENTLY LOGGED IN USER. IF YES, IT WILL RETURN THAT USER FROM DB.
// (FOR CREATOR DASHBOARD)
export const getSelfbyUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }

  return user;
};
