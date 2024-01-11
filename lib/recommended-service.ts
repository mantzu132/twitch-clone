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

  let users: User[] = [];

  if (LoggedInUserId) {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        id: {
          not: LoggedInUserId,
        },
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
