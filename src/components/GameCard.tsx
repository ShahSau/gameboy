import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { LazyImage } from "react-lazy-images";
import { motion } from "framer-motion";

interface GameCardProps {
  id: number;
  title: string;
  coverImage: string;
  rating?: number;
  platforms?: string[];
  releaseDate?: string;
  onClick?: () => void;
}

const GameCard = ({ title, coverImage, rating, platforms, releaseDate, onClick }: GameCardProps) => {
  return (
    <Card
      className="group cursor-pointer overflow-hidden border-border bg-card hover:shadow-glow transition-all duration-300 hover:border-primary/50"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <div className="w-full h-full transition-transform duration-300 group-hover:scale-110">
          <LazyImage
            src={coverImage}
            alt={title}
            placeholder={({ ref }) => (
              <motion.div 
                ref={ref} 
                className="w-full h-full bg-muted"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            actual={({ imageProps }) => (
              <img
                {...imageProps}
                className="w-full h-full object-cover object-center"
              />
            )}
          />
        </div>
        {rating && (
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 z-10">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-2 relative z-10">
        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {platforms?.slice(0, 3).map((platform, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-muted hover:bg-primary/20 transition-colors">
              {platform}
            </Badge>
          ))}
        </div>
        {releaseDate && <p className="text-xs text-muted-foreground">{releaseDate}</p>}
      </CardContent>
    </Card>
  );
};

export default GameCard;
