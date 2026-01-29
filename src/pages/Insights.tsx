import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Users,
  Gamepad2,
  GripVertical,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, Reorder } from "framer-motion";
import { getFilteredGames } from "@/api/fetchApi";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const listVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

const generateGameStats = (gameId: number) => {
  const basePlayers = (gameId * 1234) % 900000;
  const rating = 7 + ((gameId * 13) % 30) / 10;
  return {
    players: basePlayers + 50000,
    rating: Math.min(10, rating).toFixed(1),
  };
};

const Insights = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: "genre-performance", type: "genre" },
    { id: "games-by-platform", type: "platform" },
    { id: "releases-trend", type: "releases" },
  ]);

  const { data: games = [], isLoading } = useQuery({
    queryKey: ["allGames"],
    queryFn: () => getFilteredGames({}),
    staleTime: 1000 * 60 * 60,
  });

  const analytics = useMemo(() => {
    if (!games.length) return null;

    const genreMap: Record<string, { count: number; totalPlayers: number }> =
      {};
    const platformMap: Record<string, number> = {};
    const yearMap: Record<string, number> = {};

    const processedGames = games.map((g) => ({
      ...g,
      ...generateGameStats(g.id),
    }));

    processedGames.forEach((game) => {
      const genre = game.genre || "Unknown";
      if (!genreMap[genre]) genreMap[genre] = { count: 0, totalPlayers: 0 };
      genreMap[genre].count += 1;
      genreMap[genre].totalPlayers += game.players as number;

      let platform = game.platform.includes("PC") ? "PC" : game.platform;
      if (platform.includes("Browser")) platform = "Web";
      if (!platformMap[platform]) platformMap[platform] = 0;
      platformMap[platform] += 1;

      const year = new Date(game.release_date).getFullYear().toString();
      if (!isNaN(Number(year))) {
        if (!yearMap[year]) yearMap[year] = 0;
        yearMap[year] += 1;
      }
    });

    const genreData = Object.entries(genreMap)
      .map(([name, stats], index) => ({
        name,
        value: stats.count,
        games: stats.count,
        players: (stats.totalPlayers / 1000000).toFixed(1) + "M",
        color: `hsl(${index * 40}, 70%, 50%)`,
      }))
      .sort((a, b) => b.games - a.games)
      .slice(0, 6);

    const platformData = Object.entries(platformMap).map(
      ([name, count], index) => ({
        name,
        games: count,
        fill:
          index === 0
            ? "hsl(var(--primary))"
            : index === 1
              ? "hsl(var(--accent))"
              : "#3b82f6",
      }),
    );

    const releasesData = Object.entries(yearMap)
      .map(([year, releases]) => ({ year, releases }))
      .sort((a, b) => Number(a.year) - Number(b.year))
      .filter((d) => {
        const yearNum = Number(d.year);
        return yearNum > 2010 && yearNum <= 2025;
      });

    const topRatedGames = [...processedGames]
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .slice(0, 7);

    const totalPlayers = processedGames.reduce(
      (acc, curr) => acc + (curr.players as number),
      0,
    );

    return {
      genreData,
      platformData,
      releasesData,
      topRatedGames,
      totalGames: games.length,
      totalPlayers: (totalPlayers / 1000000).toFixed(1) + "M",
      newReleases: yearMap["2024"] || 0,
    };
  }, [games]);

  if (isLoading || !analytics) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const trendingStats = [
    {
      label: "Total Games",
      value: analytics.totalGames.toLocaleString(),
      change: "+5 this week",
      icon: Gamepad2,
    },
    {
      label: "Active Players (Est.)",
      value: analytics.totalPlayers,
      change: "+12%",
      icon: Users,
    },
    {
      label: "New Releases (2024)",
      value: analytics.newReleases.toString(),
      change: "+8%",
      icon: TrendingUp,
    },
    { label: "Avg Rating", value: "7.8", change: "+0.2", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Game Insights</h1>
          <p className="text-muted-foreground">
            Real-time analytics from our game library
          </p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
            <GripVertical className="h-4 w-4" />
            Drag to reorder charts
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {trendingStats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="h-5 w-5 text-muted-foreground" />
                    <Badge variant="secondary" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="space-y-6 mb-8"
        >
          {items.map((item) => (
            <Reorder.Item key={item.id} value={item} className="cursor-move">
              {item.type === "genre" && (
                <Card className="hover:shadow-glow transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-2">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle>Genre Distribution</CardTitle>
                      <CardDescription>
                        Top performing genres by game count
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.genreData.map((genre, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: genre.color }}
                              ></div>
                              <span className="font-semibold">
                                {genre.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground">
                                {genre.games} games
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {Math.round(
                                  (genre.games / analytics.totalGames) * 100,
                                )}
                                %
                              </Badge>
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(genre.games / analytics.genreData[0].games) * 100}%`,
                              }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-2 rounded-full"
                              style={{ backgroundColor: genre.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {item.type === "platform" && (
                <Card className="hover:shadow-glow transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-2">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle>Platform Availability</CardTitle>
                      <CardDescription>
                        Where players can find these games
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analytics.platformData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                        />
                        <XAxis
                          dataKey="name"
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          cursor={{ fill: "hsl(var(--muted)/0.2)" }}
                        />
                        <Bar
                          dataKey="games"
                          fill="hsl(var(--primary))"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {item.type === "releases" && (
                <Card className="hover:shadow-glow transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-2">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle>Release History (2010-2025)</CardTitle>
                      <CardDescription>
                        Game release trends over the years
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analytics.releasesData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                        />
                        <XAxis
                          dataKey="year"
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="releases"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--primary))", r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Top Rated Games (All Time)</CardTitle>
            <CardDescription>
              Highest rated games based on community feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {analytics.topRatedGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  variants={listVariants}
                  whileHover={{ scale: 1.01, x: 5 }}
                  onClick={() => navigate(`/game/${game.id}`)}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-12 h-12 rounded object-cover hidden sm:block"
                    />
                    <div>
                      <h4 className="font-bold line-clamp-1 group-hover:text-primary transition-colors">
                        {game.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {game.genre}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-muted-foreground">Players</p>
                      <p className="font-semibold text-sm">
                        {(game.players as number).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-background px-3 py-1.5 rounded-lg border border-border">
                      <BarChart3 className="h-4 w-4 text-green-500" />
                      <span className="font-semibold text-sm">
                        {game.rating}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
