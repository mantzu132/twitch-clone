import { getCurrentUser } from "@/lib/auth-service";
import db from "@/lib/db";

export const getStreams = async () => {
  let userId;

  try {
    const self = await getCurrentUser();
    userId = self.id;
  } catch {
    // Means no user
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            Blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }
  return streams;
};
