import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <CardContent className="p-0">
        <Skeleton className="h-48 w-full" />
        <div className="p-6 space-y-3">
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCardSkeleton;
