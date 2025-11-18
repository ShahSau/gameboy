import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import GameCard from "@/components/GameCard";
import GameCardSkeleton from "@/components/skeletons/GameCardSkeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, FilterX } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

// Mock data for all games
const generateMockGames = (count: number, offset: number = 0) => {
  const games = [];
  const titles = ["The Witcher 3", "Elden Ring", "God of War", "Red Dead Redemption 2", "Horizon Zero Dawn", "Ghost of Tsushima", "Arena Breakout", "Skate", "PUBG Battlegrounds", "Valorant", "Apex Legends", "Fortnite"];
  const images = [
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop",
  ];
  const platforms = [["PC", "PS5", "Xbox"], ["PC", "PS5"], ["PS5", "PS4"], ["PC", "Xbox"], ["PC"], ["Mobile"]];
  const categories = ["Action", "RPG", "Adventure", "Shooter", "Battle Royale", "MMORPG", "Fighting", "Racing"];
  const tags = ["Multiplayer", "Singleplayer", "Co-op", "PvP", "Open World", "Story Rich", "Fantasy", "Sci-Fi"];
  
  for (let i = 0; i < count; i++) {
    const index = (offset + i) % titles.length;
    games.push({
      id: offset + i + 1,
      title: `${titles[index]} ${offset + i > 11 ? Math.floor((offset + i) / 12) : ''}`.trim(),
      coverImage: images[index],
      rating: 8.5 + Math.random() * 1.2,
      platforms: platforms[Math.floor(Math.random() * platforms.length)],
      releaseDate: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Math.floor(Math.random() * 12)]} ${2015 + Math.floor(Math.random() * 9)}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      tags: [tags[Math.floor(Math.random() * tags.length)], tags[Math.floor(Math.random() * tags.length)]],
    });
  }
  return games;
};

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popularity");
  
  const [games, setGames] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const availableTags = ["Multiplayer", "Singleplayer", "Co-op", "PvP", "Open World", "Story Rich", "Fantasy", "Sci-Fi", "Horror", "Survival"];
  const categories = ["Action", "RPG", "Adventure", "Shooter", "Battle Royale", "MMORPG", "Fighting", "Racing", "Strategy", "Puzzle"];
  const platforms = ["PC", "PS5", "PS4", "Xbox", "Mobile", "Switch"];

  // Fetch more data for infinite scroll
  const fetchMoreData = () => {
    if (games.length >= 100) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const newGames = generateMockGames(12, page * 12);
      setGames([...games, ...newGames]);
      setPage(page + 1);
    }, 500);
  };
  
  useEffect(() => {
    setGames(generateMockGames(12, 0));
    setPage(1);
    setHasMore(true);
  }, []);

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Filter games based on all criteria
  const getFilteredGames = () => {
    let filtered = [...games];

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(game => game.category === selectedCategory);
    }

    // Filter by platform
    if (selectedPlatform !== "all") {
      filtered = filtered.filter(game => game.platforms.includes(selectedPlatform));
    }

    // Filter by tags (game must have at least one of the selected tags)
    if (selectedTags.length > 0) {
      filtered = filtered.filter(game =>
        selectedTags.some(tag => game.tags.includes(tag))
      );
    }

    // Sort games
    switch (sortBy) {
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "release-date":
        filtered.sort((a, b) => {
          const dateA = new Date(a.releaseDate);
          const dateB = new Date(b.releaseDate);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case "popularity":
      default:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  };

  const filteredGames = getFilteredGames();
  const hasActiveFilters = selectedCategory !== "all" || selectedPlatform !== "all" || selectedTags.length > 0 || sortBy !== "popularity";

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSelectedCategory("all");
    setSelectedPlatform("all");
    setSortBy("popularity");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <div className="container mx-auto px-4 py-8 overflow-x-hidden">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery}
            placeholder="Search for games..."
          />
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="gap-2"
              >
                <FilterX className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Platform Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Platform</label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  {platforms.map(platform => (
                    <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="release-date">Release Date</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-3">
              {availableTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-base font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {hasActiveFilters ? `Found ${filteredGames.length} games` : `All Games (${games.length})`}
          </h2>
        </div>

        <div className="overflow-x-hidden">
          <InfiniteScroll
            dataLength={games.length}
            next={fetchMoreData}
            hasMore={hasMore && !hasActiveFilters}
            loader={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <GameCardSkeleton key={index} />
                ))}
              </div>
            }
            endMessage={
              hasActiveFilters ? null : (
                <p className="text-center text-muted-foreground py-8">
                  You've seen all games!
                </p>
              )
            }
            style={{ overflow: 'visible' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <GameCard 
                    key={game.id} 
                    {...game} 
                    onClick={() => navigate(`/game/${game.id}`)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-muted-foreground text-lg">
                    No games found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Search;
