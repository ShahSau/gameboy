import { Badge } from "@/components/ui/badge";
import { LazyImage } from "react-lazy-images";
import { HomePageGames } from "@/types/homepageGames";

const RecentlyAddedCard = ({ title, short_description, thumbnail, genre, onClick }: HomePageGames) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden hover:shadow-glow transition-all duration-300 flex flex-col sm:flex-row-reverse gap-0 sm:gap-4 group cursor-pointer" onClick={onClick}>
      <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden bg-muted transition-transform duration-300 group-hover:scale-110">
        <LazyImage
          src={thumbnail}
          alt={title}
          placeholder={({ ref }) => (
            <div ref={ref} className="w-full h-full bg-muted animate-pulse" />
          )}
          actual={({ imageProps }) => (
            <img 
              {...imageProps}
              className="w-full h-full object-cover"
            />
          )}
        />
      </div>
      
      <div className="flex-1 p-4 sm:py-6 sm:pl-6 flex flex-col justify-center">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm sm:text-base line-clamp-2">
          {short_description}
        </p>
        <div>
          <Badge variant="secondary" className="bg-muted text-foreground hover:bg-muted/80">
            {genre}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default RecentlyAddedCard;
