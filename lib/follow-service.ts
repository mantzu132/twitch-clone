import { getCurrentUser } from "@/lib/auth-service";
import db from "@/lib/db";
import { getUserByUsername } from "@/lib/user-service";

// IS THE CURRENT LOGGED IN USER FOLLOWING THIS OTHER USER WITH PROVIDED ID.
export const isFollowingUser = async (id: string) => {
  try {
    const self = await getCurrentUser();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

// FOLLOW THE USER WITH PROVIDED ID
export const followUser = async (id: string) => {
  const self = await getCurrentUser();

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already following");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
};

// UNFOLLOW THE USER WITH PROVIDED ID
export const unfollowUser = async (id: string) => {
  const self = await getCurrentUser();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot unfollow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following");
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};

// GET ALL OF THE USERS THAT THE CURRENT LOGGED IN USER IS FOLLOWING
export const getFollowedUsers = async () => {
  try {
    const self = await getCurrentUser();

    const followedUsers = db.follow.findMany({
      where: {
        followerId: self.id,
      },
      include: {
        following: true,
      },
    });
    return followedUsers;
  } catch {
    return [];
  }
};
