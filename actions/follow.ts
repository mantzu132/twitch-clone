"use server";

import { getCurrentUser } from "@/lib/auth-service";
import db from "@/lib/db";

import { revalidatePath } from "next/cache";
import { followUser, unfollowUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
  try {
    const theFollow = await followUser(id);
    revalidatePath("/");
    if (theFollow) {
      revalidatePath(`/@${theFollow.following.username}`);
    }

    return theFollow;
  } catch (error) {
    console.error("Error in onFollow:", error);
    throw error;
  }
};
export const onUnfollow = async (id: string) => {
  try {
    const theUnfollow = await unfollowUser(id); // the returned (un)follow object

    revalidatePath("/");

    if (theUnfollow) {
      revalidatePath(`/${theUnfollow.following.username}`);
    }

    return theUnfollow;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
