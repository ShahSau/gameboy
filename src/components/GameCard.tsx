import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { HomePageGames } from "@/types/homepageGames";
import { useState } from "react";

const GameCard = ({
  title,
  thumbnail,
  platform,
  release_date,
  onClick,
}: HomePageGames) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Card
      className="group cursor-pointer overflow-hidden border-border bg-card hover:shadow-glow transition-all duration-300 hover:border-primary/50"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <div className="w-full h-full transition-transform duration-300 group-hover:scale-110">
          {!imageLoaded && (
            <motion.div
              className="absolute inset-0 w-full h-full bg-muted z-10"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
      <CardContent className="p-4 space-y-2 relative z-10">
        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="secondary"
            className="text-xs bg-muted hover:bg-primary/20 transition-colors"
          >
            {platform}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{release_date}</p>
      </CardContent>
    </Card>
  );
};

export default GameCard;
