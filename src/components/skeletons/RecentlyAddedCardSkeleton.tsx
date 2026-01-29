import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RecentlyAddedCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentlyAddedCardSkeleton;
