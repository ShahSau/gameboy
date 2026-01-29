import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GameCard from "@/components/GameCard";
import GameCardSkeleton from "@/components/skeletons/GameCardSkeleton";
import { getTradingGames } from "@/api/fetchApi";

const TrendingGamesSection = () => {
  const navigate = useNavigate();

  const { data: games = [], isLoading } = useQuery({
    queryKey: ['trendingGames'],
    queryFn: getTradingGames,
    staleTime: 1000 * 60 * 15,
  });

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Trending Now</h2>
        <p className="text-muted-foreground">The hottest games everyone's playing</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <GameCardSkeleton key={index} />
          ))
        ) : (
          games.slice(0, 12).map((game, index) => (
            <motion.div 
              key={game.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <GameCard 
                {...game} 
                onClick={() => navigate(`/game/${game.id}`)}
              />
            </motion.div>
          ))
        )}
      </div>
      
      <div className="mt-6 flex justify-end">
        <Link to="/search" className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default TrendingGamesSection;