import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import GameCardSkeleton from "@/components/skeletons/GameCardSkeleton";
import { Game } from "@/types/GameDetails";


const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = () => {
      try {
        const storedData = sessionStorage.getItem("favorites");
        
        if (storedData) {
          setFavorites(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Failed to parse favorites from storage", error);
      } finally {
        setLoading(false);
      }
    };

    // Small delay to prevent flickering if data loads too fast, 
    // and to allow the Skeleton animation to be seen briefly for smoothness
    const timer = setTimeout(fetchFavorites, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-10 w-10 text-accent fill-accent" />
            <h1 className="text-5xl font-bold">Your Favorites</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Games you've bookmarked for later
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <GameCardSkeleton key={index} />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl">
            <Heart className="h-20 w-20 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-2xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">Start exploring and add games to your collection!</p>
            <button 
              onClick={() => navigate('/search')}
              className="text-primary hover:underline font-medium"
            >
              Browse Games
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((game, index) => (
              <motion.div 
                key={game.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GameCard 
                  id={game.id} 
                  title={game.title}
                  thumbnail={game.thumbnail}
                  platform={game.platform} 
                  release_date={game.release_date}
                  genre={game.genre}
                  short_description={game.short_description}
                  onClick={() => navigate(`/game/${game.id}`)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;