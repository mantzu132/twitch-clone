import { getSearch } from "@/lib/search-service";
import {
  ResultCard,
  ResultCardSkeleton,
} from "@/app/(browse)/search/_components/result-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
  term: any;
}

export const Results = async ({ term }: ResultsProps) => {
  const data = await getSearch(term);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Results for term &quot;{term}&quot;
      </h2>
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No results found. Try searching for something else
        </p>
      )}
      <div className="flex gap-4 flex-wrap">
        {data.map((stream) => (
          <ResultCard data={stream} key={stream.id} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex gap-4 flex-wrap">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
