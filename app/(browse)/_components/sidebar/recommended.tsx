"use client";
import { User } from "@prisma/client";
import { useSidebar } from "@/store/use-sidebar";
import {
  UserItem,
  UserItemSkeleton,
} from "@/app/(browse)/_components/sidebar/user-item";
import { Skeleton } from "@/components/ui/skeleton";

interface RecommendedProps {
  data: User[];
}
export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0; //Recommended label

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul>
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageURL}
            isLive={true}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <>
      <div className="pl-6 mb-4">
        <p className="text-sm text-muted-foreground">Recommended</p>
      </div>
      <ul className="px-2">
        {[...Array(5)].map((_, i) => (
          <UserItemSkeleton key={i} />
        ))}
      </ul>
    </>
  );
};
