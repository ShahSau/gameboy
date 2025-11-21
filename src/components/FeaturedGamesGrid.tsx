import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MostPlayedCard from "@/components/MostPlayedCard";
import RecentlyAddedCard from "@/components/RecentlyAddedCard";
import MostPlayedCardSkeleton from "@/components/skeletons/MostPlayedCardSkeleton";
import RecentlyAddedCardSkeleton from "@/components/skeletons/RecentlyAddedCardSkeleton";
import { getRecentGames, getMostPlayedGames } from "@/api/fetchApi";

const FeaturedGamesGrid = () => {
  const navigate = useNavigate();

  const { data: mostPlayedGames = [], isLoading: loadingMostPlayed } = useQuery({
    queryKey: ['mostPlayedGames'],
    queryFn: getMostPlayedGames,
    staleTime: 1000 * 60 * 15, 
  });

  const { data: recentlyAddedGames = [], isLoading: loadingRecent } = useQuery({
    queryKey: ['recentGames'],
    queryFn: getRecentGames,
    staleTime: 1000 * 60 * 15,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column - Most Played Today */}
        <div className="lg:col-span-5">
          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Most Played Today</h2>
            <p className="text-muted-foreground">Top games with the highest player count right now</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {loadingMostPlayed ? (
              Array.from({ length: 6 }).map((_, index) => (
                <MostPlayedCardSkeleton key={index} />
              ))
            ) : (
              mostPlayedGames.slice(0,6).map((game, index) => (
                <motion.div 
                  key={game.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <MostPlayedCard {...game} onClick={() => navigate(`/game/${game.id}`)}/>
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
        </div>

        {/* Right Column - Recently Added */}
        <div className="lg:col-span-7">
          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Recently Added</h2>
            <p className="text-muted-foreground">Latest games added to our collection</p>
          </div>

          <div className="space-y-4">
            {loadingRecent ? (
              Array.from({ length: 8 }).map((_, index) => (
                <RecentlyAddedCardSkeleton key={index} />
              ))
            ) : (
              recentlyAddedGames.slice(0,8).map((game, index) => (
                <motion.div 
                  key={game.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <RecentlyAddedCard {...game} onClick={() => navigate(`/game/${game.id}`)}/>
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
        </div>
      </div>
    </div>
  );
};

export default FeaturedGamesGrid;