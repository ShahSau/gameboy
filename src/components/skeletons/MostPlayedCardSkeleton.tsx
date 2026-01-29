import { Skeleton } from "@/components/ui/skeleton";

const MostPlayedCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg h-48 bg-muted">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default MostPlayedCardSkeleton;
