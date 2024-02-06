import { getCurrentUser } from "@/lib/auth-service";
import db from "@/lib/db";

export const getSearch = async (term?: string) => {
  let LoggedInUserId;
  try {
    const LoggedInUser = await getCurrentUser();
    LoggedInUserId = LoggedInUser?.id;
  } catch {
    LoggedInUserId = null;
  }

  let streams;

  if (LoggedInUserId) {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
        NOT: [
          {
            user: {
              Blocking: {
                some: {
                  blockedId: LoggedInUserId,
                },
              },
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
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
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
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
