"use server";

import { getCurrentUser } from "@/lib/auth-service";
import { v4 } from "uuid";
import { getUserById } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";
import { AccessToken } from "livekit-server-sdk";

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    self = await getCurrentUser();
  } catch {
    // if we are logged out
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }

  const theStreamer = await getUserById(hostIdentity);

  if (!theStreamer) {
    throw new Error("Streamer not found");
  }

  //is the current user blocked from watching this stream by the streamer?
  const isBlocked = await isBlockedByUser(theStreamer.id);
  if (isBlocked) {
    throw new Error("Streamer has blocked you");
  }

  // is the streamer trying to watch themselves?
  const isHost = theStreamer.id === self.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
    },
  );

  token.addGrant({
    room: theStreamer.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return token.toJwt();
};
