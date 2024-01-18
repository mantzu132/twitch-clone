import { getCurrentUser } from "@/lib/auth-service";
import db from "@/lib/db";
import { User } from "@prisma/client";

export const getRecommended = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  let LoggedInUserId;
  try {
    const LoggedInUser = await getCurrentUser();
    LoggedInUserId = LoggedInUser?.id;
  } catch {
    LoggedInUserId = null;
  }

  let users: (User & { Stream: { isLive: boolean } | null })[];

  if (LoggedInUserId) {
    users = await db.user.findMany({
      where: {
        NOT: [
          {
            id: LoggedInUserId,
          },
          {
            following: {
              some: {
                followerId: LoggedInUserId,
              },
            },
          },
          {
            Blocking: {
              some: {
                blockedId: LoggedInUserId,
              },
            },
          },
        ],
      },
      include: {
        Stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        Stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
