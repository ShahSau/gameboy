import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Star,
  Calendar,
  Monitor,
  User,
  Building2,
  ArrowLeft,
  Play,
  Heart,
  Loader2,
} from "lucide-react";
import { getDetails, getRecommendedGames } from "@/api/fetchApi";
import { Game } from "@/types/GameDetails";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    data: game,
    isLoading: isGameLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["game", id],
    queryFn: () => {
      if (!id) throw new Error("Game ID is required");
      return getDetails({ id: parseInt(id) });
    },
    enabled: !!id,
  });

  const { data: recommendedGames, isLoading: isRecommendedLoading } = useQuery({
    queryKey: ["recommendedGames"],
    queryFn: getRecommendedGames,
    staleTime: 1000 * 60 * 25,
  });

  useEffect(() => {
    if (game) {
      const storedFavorites = sessionStorage.getItem("favorites");
      if (storedFavorites) {
        const favorites: Game[] = JSON.parse(storedFavorites);
        const exists = favorites.some((fav) => fav.id === game.id);
        setIsFavorite(exists);
      }
    }
  }, [game]);

  const toggleFavorite = () => {
    if (!game) return;

    const storedFavorites = sessionStorage.getItem("favorites");
    let favorites: Game[] = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== game.id);
      setIsFavorite(false);
    } else {
      favorites.push(game);
      setIsFavorite(true);
    }
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const displayedRelatedGames =
    recommendedGames?.filter((g) => g.id !== game?.id).slice(0, 6) || [];

  if (isGameLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading game details...</p>
        </div>
      </div>
    );
  }

  if (isError || !game) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-destructive">Error</h2>
        <p className="text-muted-foreground">
          {(error as Error)?.message || "Failed to load details"}
        </p>
        <Button onClick={() => navigate("/search")}>Back to Search</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/search")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left - Images */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              {game.screenshots && game.screenshots.length > 0 ? (
                <img
                  src={game.screenshots[selectedImage]?.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {game.screenshots && game.screenshots.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {game.screenshots.map((screenshot, index) => (
                  <button
                    key={screenshot.id}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary scale-105"
                        : "border-transparent hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={screenshot.image}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Game Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-4xl font-bold">{game.title}</h1>
              </div>
              <Badge variant="secondary" className="text-sm">
                {game.status}
              </Badge>
            </div>

            <p className="text-lg text-muted-foreground">
              {game.short_description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <div>
                  <p className="text-xs">Release Date</p>
                  <p className="font-semibold text-foreground">
                    {game.release_date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Monitor className="h-5 w-5" />
                <div>
                  <p className="text-xs">Platform</p>
                  <p className="font-semibold text-foreground">
                    {game.platform}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-5 w-5" />
                <div>
                  <p className="text-xs">Developer</p>
                  <p className="font-semibold text-foreground">
                    {game.developer}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-5 w-5" />
                <div>
                  <p className="text-xs">Publisher</p>
                  <p className="font-semibold text-foreground">
                    {game.publisher}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => window.open(game.game_url, "_blank")}
              >
                Play Now
              </Button>

              <Button
                size="lg"
                variant={isFavorite ? "secondary" : "outline"}
                onClick={toggleFavorite}
                className={isFavorite ? "text-red-500 hover:text-red-600" : ""}
              >
                <Heart
                  className={`h-5 w-5 mr-2 ${isFavorite ? "fill-current" : ""}`}
                />
                {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
              </Button>
            </div>

            <Badge variant="outline" className="text-sm px-4 py-2">
              {game.genre}
            </Badge>
          </div>
        </div>

        {/* Trailer Section (Mocked) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Game Trailer</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Card className="cursor-pointer group hover:shadow-glow transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={game.thumbnail}
                      alt="Trailer thumbnail"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                      <div className="bg-primary rounded-full p-6 group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-12 w-12 text-primary-foreground fill-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Game Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">About {game.title}</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {game.description}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* System Requirements */}
        {game.minimum_system_requirements && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              Minimum System Requirements
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">OS</p>
                    <p className="font-semibold">
                      {game.minimum_system_requirements.os}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Processor</p>
                    <p className="font-semibold">
                      {game.minimum_system_requirements.processor}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Memory</p>
                    <p className="font-semibold">
                      {game.minimum_system_requirements.memory}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Graphics</p>
                    <p className="font-semibold">
                      {game.minimum_system_requirements.graphics}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Storage</p>
                    <p className="font-semibold">
                      {game.minimum_system_requirements.storage}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* People Also Viewed */}
        <section>
          <h2 className="text-3xl font-bold mb-6">People Also Viewed</h2>
          {isRecommendedLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {displayedRelatedGames.map((relatedGame) => (
                <GameCard
                  key={relatedGame.id}
                  id={relatedGame.id}
                  title={relatedGame.title}
                  thumbnail={relatedGame.thumbnail}
                  platform={relatedGame.platform}
                  release_date={relatedGame.release_date}
                  genre={relatedGame.genre}
                  short_description={relatedGame.short_description}
                  onClick={() => {
                    navigate(`/game/${relatedGame.id}`);
                    window.scrollTo(0, 0);
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default GameDetails;
