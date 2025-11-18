import { useState, useEffect } from "react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import GameCardSkeleton from "@/components/skeletons/GameCardSkeleton";
import { useNavigate } from "react-router-dom";
  
const Favorites = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock favorites - will be replaced with localStorage/Supabase
  const favorites = [
    {
      id: 2,
      title: "The Witcher 3",
      coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=800&fit=crop",
      rating: 9.5,
      platforms: ["PC", "PS5", "Xbox"],
      releaseDate: "May 2015"
    },
    {
      id: 3,
      title: "Elden Ring",
      coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop",
      rating: 9.2,
      platforms: ["PC", "PS5", "Xbox"],
      releaseDate: "Feb 2022"
    },
  ];

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

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground">Start exploring and add games to your collection!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <GameCardSkeleton key={index} />
              ))
            ) : (
              favorites.map((game, index) => (
                <motion.div 
                  key={game.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <GameCard 
                    key={game.id} 
                    {...game} 
                    onClick={() => navigate(`/game/${game.id}`)}
                  />
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
