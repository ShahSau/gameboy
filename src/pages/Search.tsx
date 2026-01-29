import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import GameCard from "@/components/GameCard";
import GameCardSkeleton from "@/components/skeletons/GameCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FilterX, Loader2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getFilteredGames } from "@/api/fetchApi"; // Import the real function

// Hook to debounce search input
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const Search = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");

  const ITEMS_PER_PAGE = 12;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const {
    data: allGames = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["games", selectedCategory, selectedPlatform, sortBy],
    queryFn: () =>
      getFilteredGames({
        category: selectedCategory,
        platform: selectedPlatform,
        sort: sortBy,
      }),
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });

  const filteredGames = useMemo(() => {
    if (!allGames) return [];

    return allGames.filter((game) => {
      const matchesSearch = game.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        (game.genre &&
          selectedTags.some(
            (tag) => game.genre.toLowerCase() === tag.toLowerCase(),
          ));

      return matchesSearch && matchesTags;
    });
  }, [allGames, debouncedSearch, selectedTags]);

  const displayedGames = filteredGames.slice(0, visibleCount);
  const hasMore = visibleCount < filteredGames.length;

  const fetchMoreData = () => {
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    }, 500);
  };

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [
    debouncedSearch,
    selectedCategory,
    selectedPlatform,
    selectedTags,
    sortBy,
  ]);

  const availableTags = [
    "MMORPG",
    "Shooter",
    "Strategy",
    "MOBA",
    "Racing",
    "Sports",
    "Social",
    "Sandbox",
    "Open-World",
    "Survival",
    "PvP",
    "PvE",
    "Pixel",
    "Voxel",
    "Zombie",
    "Turn-Based",
    "First-Person",
    "Third-Person",
    "Top-Down",
    "Tank",
    "Space",
    "Sailing",
    "Side-Scroller",
    "Superhero",
    "Permadeath",
    "Card",
    "Battle-Royale",
    "MMO",
    "MMOFPS",
    "MMOTPS",
    "3D",
    "2D",
    "Anime",
    "Fantasy",
    "Sci-Fi",
    "Fighting",
    "Action-RPG",
    "Action",
    "Military",
    "Martial-Arts",
    "Flight",
    "Low-Spec",
    "Tower-Defense",
    "Horror",
    "MMORTS",
  ];

  const categories = [
    "mmorpg",
    "shooter",
    "strategy",
    "moba",
    "racing",
    "sports",
    "social",
    "sandbox",
    "open-world",
    "survival",
    "pvp",
    "pve",
    "pixel",
    "voxel",
    "zombie",
    "turn-based",
    "first-person",
    "third-person",
    "top-down",
    "tank",
    "space",
    "sailing",
    "side-scroller",
    "superhero",
    "permadeath",
    "card",
    "battle-royale",
    "mmo",
    "mmofps",
    "mmotps",
    "3d",
    "2d",
    "anime",
    "fantasy",
    "sci-fi",
    "fighting",
    "action-rpg",
    "action",
    "military",
    "martial-arts",
    "flight",
    "low-spec",
    "tower-defense",
    "horror",
    "mmorts",
  ];


  // --- Handlers ---
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSelectedCategory("all");
    setSelectedPlatform("all");
    setSortBy("relevance");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedPlatform !== "all" ||
    selectedTags.length > 0 ||
    sortBy !== "relevance" ||
    searchQuery !== "";

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-destructive">
          Error loading games. <br />
          <span className="text-sm text-muted-foreground">
            {(error as any)?.response?.status === 404
              ? "No games found for this category."
              : (error as Error).message}
          </span>
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <div className="container mx-auto px-4 py-8 overflow-x-hidden">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name..."
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
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Platform Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Platform</label>
              <Select
                value={selectedPlatform}
                onValueChange={setSelectedPlatform}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="pc">PC (Windows)</SelectItem>
                  <SelectItem value="browser">Web Browser</SelectItem>
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
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="release-date">Release Date</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-3 h-12 overflow-y-auto p-1">
              {availableTags.slice(0, 15).map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:scale-105"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2">
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Fetching games from library...</span>
            </div>
          ) : (
            <h2 className="text-2xl font-bold">
              {filteredGames.length > 0
                ? `Found ${filteredGames.length} games`
                : "No games found"}
            </h2>
          )}
        </div>

        {isLoading && visibleCount === ITEMS_PER_PAGE ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <GameCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-hidden">
            <InfiniteScroll
              dataLength={displayedGames.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <div className="flex justify-center w-full py-4 mt-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              }
              endMessage={
                displayedGames.length > 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    You've reached the end of the list!
                  </p>
                )
              }
              style={{ overflow: "visible" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedGames.map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    thumbnail={game.thumbnail}
                    short_description={game.short_description}
                    genre={game.genre}
                    platform={game.platform}
                    release_date={game.release_date}
                    onClick={() => navigate(`/game/${game.id}`)}
                  />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
