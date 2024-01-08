import { getUserfromDB } from "@/lib/auth-service";
import db from "@/lib/db";

export const getRecommended = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const self = await getUserfromDB();

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
