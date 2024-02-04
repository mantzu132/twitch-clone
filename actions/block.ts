"use server";
import { revalidatePath } from "next/cache";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { getCurrentUser } from "@/lib/auth-service";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);
export const onBlock = async (id: string) => {
  const self = await getCurrentUser();

  let blockedUser;
  try {
    blockedUser = await blockUser(id);
  } catch {
    // This Means users is a guest.
  }

  try {
    await roomService.removeParticipant(self.id, id);
  } catch {
    // This means user not in the room
  }

  revalidatePath(`/u/${self.username}/community`);

  return blockedUser;
};
export const onUnblock = async (id: string) => {
  try {
    const unblockedUser = await unblockUser(id);

    revalidatePath("/");

    if (unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`);
    }

    return unblockedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
