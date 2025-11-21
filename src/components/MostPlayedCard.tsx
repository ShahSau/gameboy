import { LazyImage } from "react-lazy-images";
import { HomePageGames } from "@/types/homepageGames";

const MostPlayedCard = ({ title, thumbnail, platform, release_date, onClick }: HomePageGames) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-lg h-48 bg-muted hover:shadow-glow transition-all duration-300" onClick={onClick}>
      <LazyImage
        src={thumbnail}
        alt={title}
        placeholder={({ ref }) => <div ref={ref} className="absolute inset-0 w-full h-full bg-muted animate-pulse" />}
        actual={({ imageProps }) => (
          <img
            {...imageProps}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
          />
        )}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="text-xs px-2 py-1 bg-muted/80 rounded text-muted-foreground">
          {platform}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{release_date}</p>
      </div>
    </div>
  );
};

export default MostPlayedCard;
