import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const GameCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <CardContent className="p-0">
        <Skeleton className="w-full h-64" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>
          <Skeleton className="h-4 w-1/3" />
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCardSkeleton;
