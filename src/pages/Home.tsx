import { useState, useEffect } from "react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import MostPlayedCard from "@/components/MostPlayedCard";
import RecentlyAddedCard from "@/components/RecentlyAddedCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import GameCardSkeleton from "@/components/skeletons/GameCardSkeleton";
import MostPlayedCardSkeleton from "@/components/skeletons/MostPlayedCardSkeleton";
import RecentlyAddedCardSkeleton from "@/components/skeletons/RecentlyAddedCardSkeleton";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock data - will be replaced with API calls

  const trendingGames = [
    {
      id: 1,
      title: "Horizon Zero Dawn",
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop",
      rating: 8.9,
      platforms: ["PS5", "PC"],
      releaseDate: "Feb 2017",
    },
    {
      id: 2,
      title: "The Witcher 3",
      coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=800&fit=crop",
      rating: 9.5,
      platforms: ["PC", "PS5", "Xbox"],
      releaseDate: "May 2015",
    },
    {
      id: 3,
      title: "Elden Ring",
      coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop",
      rating: 9.2,
      platforms: ["PC", "PS5", "Xbox"],
      releaseDate: "Feb 2022",
    },
    {
      id: 4,
      title: "God of War",
      coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=800&fit=crop",
      rating: 9.4,
      platforms: ["PS5", "PC"],
      releaseDate: "Apr 2018",
    },
    {
      id: 5,
      title: "Red Dead Redemption 2",
      coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&h=800&fit=crop",
      rating: 9.7,
      platforms: ["PC", "PS4", "Xbox"],
      releaseDate: "Oct 2018",
    },
    {
      id: 6,
      title: "Horizon Zero Dawn",
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop",
      rating: 8.9,
      platforms: ["PS5", "PC"],
      releaseDate: "Feb 2017",
    },
    {
      id: 7,
      title: "Ghost of Tsushima",
      coverImage: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&h=800&fit=crop",
      rating: 9.0,
      platforms: ["PS5", "PS4"],
      releaseDate: "Jul 2020",
    },
    {
      id: 8,
      title: "The Witcher 3",
      coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=800&fit=crop",
      rating: 9.5,
      platforms: ["PC", "PS5", "Xbox"],
      releaseDate: "May 2015",
    },
  ];

  const mostPlayedGames = [
    {
      id: 8,
      title: "Arena Breakout",
      coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=800&fit=crop",
      rating: 8.8,
      platforms: ["PC", "Mobile"],
      releaseDate: "Jul 2023",
    },
    {
      id: 9,
      title: "Skate",
      coverImage: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&h=800&fit=crop",
      rating: 8.5,
      platforms: ["PC", "Xbox"],
      releaseDate: "Sep 2023",
    },
    {
      id: 10,
      title: "PUBG Battlegrounds",
      coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop",
      rating: 8.9,
      platforms: ["PC", "PS5", "Xbox"],
      releaseDate: "Mar 2017",
    },
    {
      id: 11,
      title: "Valorant",
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop",
      rating: 8.7,
      platforms: ["PC"],
      releaseDate: "Jun 2020",
    },
    {
      id: 12,
      title: "Apex Legends",
      coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&h=800&fit=crop",
      rating: 8.8,
      platforms: ["PC", "PS5", "Xbox"],
      releaseDate: "Feb 2019",
    },
    {
      id: 13,
      title: "Fortnite",
      coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=800&fit=crop",
      rating: 8.6,
      platforms: ["PC", "PS5", "Xbox", "Mobile"],
      releaseDate: "Jul 2017",
    },
  ];

  const recentlyAddedGames = [
    {
      id: 14,
      title: "Blue Protocol: Star Resonance",
      description: "A free-to-play open-world anime MMORPG.",
      coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=400&fit=crop",
      genre: "MMORPG",
    },
    {
      id: 15,
      title: "2XKO",
      description: "A free-to-play 2v2 fighting game set in the League of Legends universe.",
      coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop",
      genre: "Fighting",
    },
    {
      id: 16,
      title: "Blade & Soul Heroes",
      description: "A free-to-play collectible action MMORPG set in the Blade & Soul universe.",
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop",
      genre: "MMORPG",
    },
    {
      id: 17,
      title: "Warborne Above Ashes",
      description: "A free-to-play PvP-centric MMO.",
      coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=400&fit=crop",
      genre: "MMO",
    },
    {
      id: 18,
      title: "Eternal Return",
      description: "A free-to-play battle royale with MOBA elements.",
      coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
      genre: "Battle Royale",
    },
    {
      id: 19,
      title: "Lost Ark",
      description: "A free-to-play action RPG with stunning visuals.",
      coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=400&fit=crop",
      genre: "Action RPG",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm opacity-20"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=1080&fit=crop)`,
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div 
            className="space-y-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-muted-foreground whitespace-nowrap">
              Browse the best free to play games
            </h1>
            <div className="group relative w-fit mx-auto transition-transform duration-300 active:scale-95">
              <Button size="lg" className="relative z-10 rounded-lg bg-gradient-to-br from-primary to-accent p-0.5 duration-300 group-hover:scale-110"
                onClick={() => navigate("/search")}
              >
                <span className="block rounded-md  px-8 py-3 font-semibold text-foreground duration-300 ">
                  Browse Games
                </span>
              </Button>
              <span className="pointer-events-none absolute -inset-4 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-primary to-accent opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Games Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Trending Now</h2>
          <p className="text-muted-foreground">The hottest games everyone's playing</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <GameCardSkeleton key={index} />
            ))
          ) : (
            trendingGames.map((game, index) => (
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
        
        <div className="mt-6 flex justify-end">
          <Link to="/search" className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Most Played Today */}
          <div className="lg:col-span-5">
            <div className="mb-6 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Most Played Today</h2>
              <p className="text-muted-foreground">Top games with the highest player count right now</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <MostPlayedCardSkeleton key={index} />
                ))
              ) : (
                mostPlayedGames.map((game, index) => (
                  <motion.div 
                    key={game.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <MostPlayedCard {...game}  onClick={() => navigate(`/game/${game.id}`)}/>
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
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <RecentlyAddedCardSkeleton key={index} />
                ))
              ) : (
                recentlyAddedGames.map((game, index) => (
                  <motion.div 
                    key={game.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <RecentlyAddedCard {...game}  onClick={() => navigate(`/game/${game.id}`)}/>
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

      {/* Footer */}
      <footer className="relative border-t border-border/50 mt-20 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            {/* <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GameBoy
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-secondary"></div>
            </div> */}

            {/* <p className="text-foreground/80 max-w-md mx-auto">Discover your next favorite game</p> */}

            <div className="pt-6">
              <p>© {new Date().getFullYear()} GameBoy. Discover your next favorite game.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
