import { getStreams } from "@/lib/feed-service";
import {
  ResultCard,
  ResultCardSkeleton,
} from "@/app/(browse)/_components/result-card";
import { Skeleton } from "@/components/ui/skeleton";

export const Results = async () => {
  const data = await getStreams();
  return (
    <div className="text-lg font-semibold mb-4">
      <h2 className="mb-2">Streams we think you'll like</h2>

      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">No streams found.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((stream) => (
          <ResultCard key={stream.id} data={stream} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  const emptyArray = new Array(10).fill(null);
  return (
    <div className="text-lg font-semibold mb-4">
      <h2 className="mb-2">
        <Skeleton className="h-4 w-40" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {emptyArray.map(() => (
          <ResultCardSkeleton />
        ))}
      </div>
    </div>
  );
};
