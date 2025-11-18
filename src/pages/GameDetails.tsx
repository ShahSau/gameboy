import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Star, Calendar, Monitor, User, Building2, ArrowLeft, Play, Heart } from "lucide-react";

// Mock data - replace with actual API call later
const generateMockGameDetails = (id: string) => {
  return {
    id: parseInt(id),
    title: "Call of Duty: Warzone",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    status: "Live",
    short_description: "A standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare.",
    description: "Call of Duty: Warzone is both a standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare. Warzone features two modes — the general 150-player battle royle, and Plunder. The latter mode is described as a race to deposit the most Cash. In both modes players can both earn and loot cash to be used when purchasing in-match equipment, field upgrades, and more. Both cash and XP are earned in a variety of ways, including completing contracts.\n\nAn interesting feature of the game is one that allows players who have been killed in a match to rejoin it by winning a 1v1 match against other felled players in the Gulag.\n\nOf course, being a battle royale, the game does offer a battle pass. The pass offers players new weapons, playable characters, Call of Duty points, blueprints, and more. Players can also earn plenty of new items by completing objectives offered with the pass.",
    game_url: "https://www.freetogame.com/open/call-of-duty-warzone",
    genre: "Shooter",
    platform: "Windows",
    publisher: "Activision",
    developer: "Infinity Ward",
    release_date: "2020-03-10",
    freetogame_profile_url: "https://www.freetogame.com/call-of-duty-warzone",
    minimum_system_requirements: {
      os: "Windows 7 64-Bit (SP1) or Windows 10 64-Bit",
      processor: "Intel Core i3-4340 or AMD FX-6300",
      memory: "8GB RAM",
      graphics: "NVIDIA GeForce GTX 670 / GeForce GTX 1650 or Radeon HD 7950",
      storage: "175GB HD space"
    },
    screenshots: [
      { id: 1124, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop" },
      { id: 1125, image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop" },
      { id: 1126, image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop" },
      { id: 1127, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop" }
    ],
    rating: 4.5
  };
};

const generateRelatedGames = () => {
  const images = [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=600&fit=crop"
  ];

  return Array.from({ length: 6 }, (_, i) => ({
    id: i + 100,
    title: `Game ${i + 1}`,
    coverImage: images[i],
    rating: 4 + Math.random(),
    platforms: ["PC", "PlayStation", "Xbox"].slice(0, Math.floor(Math.random() * 3) + 1),
    releaseDate: "2024"
  }));
};

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const game = generateMockGameDetails(id || "1");
  const relatedGames = generateRelatedGames();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/search')}
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
              <img
                src={game.screenshots[selectedImage].image}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {game.screenshots.map((screenshot, index) => (
                <button
                  key={screenshot.id}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-primary scale-105" : "border-transparent hover:border-primary/50"
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
          </div>

          {/* Right - Game Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-4xl font-bold">{game.title}</h1>
                {game.rating && (
                  <div className="flex items-center gap-1 bg-card px-3 py-1.5 rounded-lg border">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="text-lg font-semibold">{game.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
              <Badge variant="secondary" className="text-sm">{game.status}</Badge>
            </div>

            <p className="text-lg text-muted-foreground">{game.short_description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <div>
                  <p className="text-xs">Release Date</p>
                  <p className="font-semibold text-foreground">{game.release_date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Monitor className="h-5 w-5" />
                <div>
                  <p className="text-xs">Platform</p>
                  <p className="font-semibold text-foreground">{game.platform}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-5 w-5" />
                <div>
                  <p className="text-xs">Developer</p>
                  <p className="font-semibold text-foreground">{game.developer}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-5 w-5" />
                <div>
                  <p className="text-xs">Publisher</p>
                  <p className="font-semibold text-foreground">{game.publisher}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1">
                Play Now
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5 mr-2" />
                Add to Favorites
              </Button>
            </div>

            <Badge variant="outline" className="text-sm px-4 py-2">
              {game.genre}
            </Badge>
          </div>
        </div>

        {/* Trailer Section */}
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
            <h2 className="text-3xl font-bold mb-6">Minimum System Requirements</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">OS</p>
                    <p className="font-semibold">{game.minimum_system_requirements.os}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Processor</p>
                    <p className="font-semibold">{game.minimum_system_requirements.processor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Memory</p>
                    <p className="font-semibold">{game.minimum_system_requirements.memory}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Graphics</p>
                    <p className="font-semibold">{game.minimum_system_requirements.graphics}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Storage</p>
                    <p className="font-semibold">{game.minimum_system_requirements.storage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* People Also Viewed */}
        <section>
          <h2 className="text-3xl font-bold mb-6">People Also Viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {relatedGames.map((relatedGame) => (
              <GameCard
                key={relatedGame.id}
                {...relatedGame}
                onClick={() => navigate(`/game/${relatedGame.id}`)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GameDetails;
